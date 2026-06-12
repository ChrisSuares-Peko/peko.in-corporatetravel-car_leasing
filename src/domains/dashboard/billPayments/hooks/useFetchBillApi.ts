import { useCallback, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SurchargeResponse } from '@customtypes/general';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { getSurcharge } from '@src/services/surcharge';
import { formatNumberWithLocalString } from '@utils/priceFormat';

import { setPaymentData } from '../../payments/slices/payment';
import { billValidation, fetchBill, getServiceProvider } from '../api/index';
import { setPostpaid } from '../slices/billPaymentSlice';
import { Beneficiary, OptionsType, billAmountType } from '../types/index';
import { billPayments, financialServices, insurance, otherServices } from '../utils/data';
import { navigateToServiceType } from '../utils/tableColumn';

export type BbpsPlan = {
    planId: string;
    planName: string;
    amount: number;
    planType: string;
};

type PlanSelectionContext = {
    requestId: string;
    paramsValues: any;
    serviceProvider: string;
    billerName: string | undefined;
    billerAdhoc?: string;
    accessKeyName: string;
    apiUrl: string;
    serviceTitle: string;
    billerResponse: Record<string, any>;
};

function normalizeBillerRuleValue(value?: string): string {
    return (value || '').replace(/[\s-]+/g, '_').toUpperCase().trim();
}

/**
 * Extract the billerResponse object from a bill fetch or validation API response.
 *
 * - Validation API: billerResponse is nested at billData.billerResponse  → return it directly.
 * - Fetch API:      billerResponse fields are flat at the top level       → strip meta-fields and return the rest.
 */
function filterEmptyValues(obj: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    );
}

function extractBillerResponse(billData: any): Record<string, unknown> {
    const nested = billData?.billerResponse;
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
        const filtered = filterEmptyValues(nested as Record<string, unknown>);
        if (Object.keys(filtered).length > 0) return filtered;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { requestId: _r, additionalInfo: _a, exactness: _e, ccf1Amount: _c,
            responseCode: _rc, responseReason: _rr, complianceCode: _cc, complianceReason: _cr,
            billerResponse: _br, ...rest } = billData ?? {};
    return Object.keys(rest).length > 0 ? filterEmptyValues(rest) : {};
}

export default function usePaymentApi() {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [billerPlans, setBillerPlans] = useState<BbpsPlan[]>([]);
    const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
    const planSelectionContextRef = useRef<PlanSelectionContext | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handlePayment = useCallback(
        async (
            values: any,
            accessKeyName: string,
            billerName?: string,
            _mobileNo?: string,
            selectedBiller?: OptionsType
        ) => {
            setIsLoading(true);
            const { serviceProvider, amount: enteredAmount, ...rest } = values;
            dispatch(setPostpaid(values));
            const validParamNames = selectedBiller?.customerParams?.length
                ? new Set((selectedBiller.customerParams as any[]).map(p => p.paramName))
                : null;
            const entries = Object.entries(rest).filter(([key]) =>
                validParamNames ? validParamNames.has(key) : true
            );
            let paramsValues = {};
            if (entries.length === 1) {
                const [paramName, paramValue] = entries[0];
                paramsValues = {
                    input: {
                        paramName,
                        paramValue: paramValue as string,
                    },
                };
            } else {
                paramsValues = {
                    input: entries
                        .filter(([_, paramValue]) => paramValue !== '')
                        .map(([paramName, paramValue]) => ({
                            paramName,
                            paramValue: paramValue as string,
                        })),
                };
            }
            const allServices = [...billPayments, ...otherServices, ...insurance];
            const serviceData = allServices.find(obj => obj.accessKey === accessKeyName);

            if (!serviceData) {
                setIsLoading(false);
                return;
            }
            const { apiUrl } = serviceData!;

            const fetchRequirement =
                selectedBiller?.billerFetchRequiremet || selectedBiller?.billerFetchRequirement || '';
            const billValidationSupport = selectedBiller?.billerSupportBillValidation || '';
            const normalizedFetchRequirement = normalizeBillerRuleValue(fetchRequirement);
            const normalizedBillValidationSupport =
                normalizeBillerRuleValue(billValidationSupport);
            const isFetchMandatory = normalizedFetchRequirement === 'MANDATORY';
            const isFetchNotSupported = normalizedFetchRequirement === 'NOT_SUPPORTED';
            const isBillValidationMandatory = normalizedBillValidationSupport === 'MANDATORY';
            const isBillValidationNotSupported =
                normalizedBillValidationSupport === 'NOT_SUPPORTED';
            // QuickPay when fetch is not supported AND validation is either not supported or only optional
            // (optional validation is skipped for simplicity — direct payment is allowed)
            const isQuickPayFlow =
                isFetchNotSupported &&
                (isBillValidationNotSupported || normalizedBillValidationSupport === 'OPTIONAL');

            if (isQuickPayFlow) {
                const amount = Number(enteredAmount || 0);
                if (!amount || amount <= 0) {
                    setIsLoading(false);
                    return;
                }

                const surchargeData: SurchargeResponse | false = await getSurcharge({
                    userId: id,
                    userType: role,
                    amount,
                    accessKey: accessKeyName,
                    billerId: serviceProvider,
                });

                const ccf1Rupees = surchargeData ? parseFloat(surchargeData.ccf1Amount ?? '0') / 100 : 0;
                const platformFee = surchargeData ? Number(surchargeData.surcharge) + ccf1Rupees : 0;
                const total = amount + platformFee;

                const billSummary = [
                    { key: 'Service name', value: serviceData.title },
                    ...(billerName
                        ? [{ key: 'Service provider', value: billerName }]
                        : []),
                    {
                        key: 'Amount',
                        value: formatNumberWithLocalString(amount),
                    },
                ];

                const paymentSummary = [
                    {
                        key: 'Platform fee (inclusive of GST)',
                        value: `₹ ${formatNumberWithLocalString(platformFee)}`,
                    },
                ];

                const requestBody = {
                    accessKey: accessKeyName,
                    requestId: `QP-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
                    quickPay: 'Y',
                    amount,
                    billerId: serviceProvider,
                    billerName,
                    billerAdhoc: selectedBiller?.billerAdhoc,
                    customerParams: paramsValues,
                    billerResponse: {},
                    ccf1Amount: surchargeData ? surchargeData.ccf1Amount || null : null,
                };

                const path = navigateToServiceType(accessKeyName);
                dispatch(
                    setPaymentData({
                        billSummary,
                        paymentSummary,
                        totalAmount: total,
                        title: 'Recharge Summary',
                        payload: requestBody,
                        url: `payment/${apiUrl}/payment`,
                        earningCashbackAmount:
                            Number(surchargeData && surchargeData?.corporateCashback) || 0,
                        navigatePath: `${paths.dashboard.billPayments}/${path}`,
                    })
                );
                setIsLoading(false);
                navigate(paths.dashboard.payments);
                return;
            }

            const fetchBillPayload = {
                apiPath: apiUrl,
                userId: id,
                userType: role,
                billerId: serviceProvider,
                customerParams: paramsValues,
            };
            let billData: any | false = false;
            if (isFetchMandatory) {
                billData = await fetchBill(fetchBillPayload);
            } else if (isBillValidationMandatory) {
                billData = await billValidation(fetchBillPayload);
            } else {
                billData = await fetchBill(fetchBillPayload);
            }
            if (!billData) {
                setIsLoading(false);
                return;
            }

            // --- DTH / plan-based biller: validation returns plans ---
            if (billData.billerPlanResponseParam) {
                const planResponse = billData.billerPlanResponseParam;
                const plansRaw = Array.isArray(planResponse.billerPlanInfo)
                    ? planResponse.billerPlanInfo
                    : [planResponse.billerPlanInfo];

                const plans: BbpsPlan[] = plansRaw
                    .filter(Boolean)
                    .map((p: any) => {
                        const infoArray = Array.isArray(p.planInfo) ? p.planInfo : [p.planInfo];
                        const getInfo = (name: string) =>
                            infoArray.find((i: any) => i.infoName === name)?.infoValue || '';
                        return {
                            planId: getInfo('Plan_Id'),
                            planName: getInfo('Plan_Name'),
                            amount: Number(getInfo('Plan_Amount_In_Rupees')),
                            planType: p.planType || '',
                        };
                    });

                planSelectionContextRef.current = {
                    requestId: billData.requestId,
                    paramsValues,
                    serviceProvider,
                    billerName,
                    billerAdhoc: selectedBiller?.billerAdhoc,
                    accessKeyName,
                    apiUrl,
                    serviceTitle: serviceData.title,
                    billerResponse: extractBillerResponse(billData),
                };

                setBillerPlans(plans);
                setIsPlanDrawerOpen(true);
                setIsLoading(false);
                return;
            }

            // --- Prepaid Meter / balance-based biller: validation returns balance info ---
            if (isBillValidationMandatory && billData.additionalInfo && !billData.billAmount) {
                const info = billData.additionalInfo?.info;
                let infoArray: any[] = [];
                if (info) {
                    infoArray = Array.isArray(info) ? info : [info];
                }
                const balanceItems = infoArray.filter((i: any) =>
                    i.infoName?.toLowerCase().includes('balance')
                );

                // Use 100 as default amount for surcharge calculation (amount is user-entered later)
                const surchargeData: SurchargeResponse | false = await getSurcharge({
                    userId: id,
                    userType: role,
                    amount: 100,
                    accessKey: accessKeyName,
                    billerId: serviceProvider,
                });

                const billSummaryItems = [
                    { key: 'Service name', value: serviceData.title },
                    ...(billerName ? [{ key: 'Service provider', value: billerName }] : []),
                    ...balanceItems.map((item: any) => ({ key: item.infoName, value: `₹ ${formatNumberWithLocalString(item.infoValue)}` })),
                    { key: 'Amount', value: 0, isInput: true },
                ];

                const paymentSummary = [
                    {
                        key: 'Platform fee (inclusive of GST)',
                        value: `₹ ${formatNumberWithLocalString((surchargeData && surchargeData.surcharge) || 0)}`,
                    },
                ];

                const requestBody = {
                    accessKey: accessKeyName,
                    requestId: billData.requestId,
                    quickPay: 'N',
                    amount: 0,
                    billerId: serviceProvider,
                    billerName,
                    billerAdhoc: selectedBiller?.billerAdhoc,
                    customerParams: paramsValues,
                    billerResponse: extractBillerResponse(billData),
                };

                const path = navigateToServiceType(accessKeyName);
                dispatch(
                    setPaymentData({
                        billSummary: billSummaryItems,
                        paymentSummary,
                        totalAmount: 0,
                        title: 'Recharge Summary',
                        payload: requestBody,
                        url: `payment/${apiUrl}/payment`,
                        earningCashbackAmount:
                            Number(surchargeData && surchargeData?.corporateCashback) || 0,
                        minimumAmount: 1,
                        navigatePath: `${paths.dashboard.billPayments}/${path}`,
                    })
                );
                setIsLoading(false);
                navigate(paths.dashboard.payments);
                return;
            }

            // --- Validation succeeded but no bill amount (e.g. DTH basic validation) ---
            if (!billData.billAmount) {
                const surchargeData: SurchargeResponse | false = await getSurcharge({
                    userId: id,
                    userType: role,
                    amount: 100,
                    accessKey: accessKeyName,
                    billerId: serviceProvider,
                });

                const billSummaryItems = [
                    { key: 'Service name', value: serviceData.title },
                    ...(billerName ? [{ key: 'Service provider', value: billerName }] : []),
                    { key: 'Amount', value: 0, isInput: true },
                ];

                const paymentSummary = [
                    {
                        key: 'Platform fee (inclusive of GST)',
                        value: `₹ ${formatNumberWithLocalString((surchargeData && surchargeData.surcharge) || 0)}`,
                    },
                ];

                const requestBody = {
                    accessKey: accessKeyName,
                    requestId: billData.requestId,
                    quickPay: 'N',
                    amount: 0,
                    billerId: serviceProvider,
                    billerName,
                    billerAdhoc: selectedBiller?.billerAdhoc,
                    customerParams: paramsValues,
                    billerResponse: extractBillerResponse(billData),
                };

                const path = navigateToServiceType(accessKeyName);
                dispatch(
                    setPaymentData({
                        billSummary: billSummaryItems,
                        paymentSummary,
                        totalAmount: 0,
                        title: 'Recharge Summary',
                        payload: requestBody,
                        url: `payment/${apiUrl}/payment`,
                        earningCashbackAmount:
                            Number(surchargeData && surchargeData?.corporateCashback) || 0,
                        minimumAmount: 1,
                        navigatePath: `${paths.dashboard.billPayments}/${path}`,
                    })
                );
                setIsLoading(false);
                navigate(paths.dashboard.payments);
                return;
            }

            // --- Standard flow: fetch or validation returned bill amount ---
            if (billData) {
                const { requestId, additionalInfo, ...billerResponse } = billData;
                const { billAmount: amount, customerName, dueDate, billDate } = billerResponse;

                const billAmountNum = Number(amount);
                let surchargeData: SurchargeResponse | false = false;
                if (billAmountNum > 0) {
                    surchargeData = await getSurcharge({
                        userId: id,
                        userType: role,
                        amount: billAmountNum,
                        accessKey: accessKeyName,
                        billerId: serviceProvider,
                    });
                }
                const ccf1Rupees = surchargeData ? parseFloat(surchargeData.ccf1Amount ?? '0') / 100 : 0;
                const platformFee = surchargeData ? Number(surchargeData.surcharge) + ccf1Rupees : 0;
                const total = billAmountNum + platformFee;

                const rawInfo = additionalInfo?.info;
                let additionalInfoArray: any[] = [];
                if (rawInfo) {
                    additionalInfoArray = Array.isArray(rawInfo) ? rawInfo : [rawInfo];
                }
                const additionalBalanceItems = additionalInfoArray.filter((i: any) =>
                    i.infoName?.toLowerCase().includes('balance')
                );
                const maxAmountItem = additionalInfoArray.find((i: any) => {
                    const name = i.infoName?.toLowerCase() || '';
                    return (name.includes('maximum') || name.includes('limit')) && !name.includes('minimum');
                });
                const minAmountItem = additionalInfoArray.find((i: any) => {
                    const name = i.infoName?.toLowerCase() || '';
                    return name.includes('minimum') || (name.includes('minimum') && name.includes('limit'));
                });
                const additionalMaxAmount = maxAmountItem
                    ? Number(String(maxAmountItem.infoValue).replace(/,/g, ''))
                    : undefined;
                const additionalMinAmount = minAmountItem
                    ? Number(String(minAmountItem.infoValue).replace(/,/g, ''))
                    : undefined;

                const billSummary1 = [
                    {
                        key: 'Service name',
                        value: serviceData?.title!,
                    },
                    {
                        key: 'Consumer name',
                        value: customerName,
                    },
                    ...(values.CustomerId
                        ? [{ key: 'Customer ID', value: values.CustomerId }]
                        : []),
                    ...(values['Consumer Number']
                        ? [{ key: 'Consumer number', value: values['Consumer Number'] }]
                        : []),
                    ...(values['Distributor ID']
                        ? [{ key: 'Distributor ID', value: values['Distributor ID'] }]
                        : []),
                    ...(values['Mobile Number']
                        ? [{ key: 'Mobile number', value: values['Mobile Number'] || 'N/A' }]
                        : []),

                    ...(values['Unique Consumer ID']
                        ? [
                              {
                                  key: 'Unique Consumer ID',
                                  value: values['Unique Consumer ID'] || 'N/A',
                              },
                          ]
                        : []),
                    ...(values.serviceProvider
                        ? [{ key: 'Service provider', value: values.serviceProvider }]
                        : []),
                    {
                        key: 'Bill date',
                        value: billDate,
                    },
                    {
                        key: 'Due date',
                        value: dueDate,
                    },
                    ...additionalBalanceItems.map((item: any) => ({
                        key: item.infoName,
                        value: `₹ ${formatNumberWithLocalString(item.infoValue)}`,
                    })),
                    ...(maxAmountItem
                        ? [{ key: 'Maximum Recharge Amount', value: `₹ ${formatNumberWithLocalString(maxAmountItem.infoValue)}` }]
                        : []),
                    ...(minAmountItem
                        ? [{ key: 'Minimum Recharge Amount', value: `₹ ${formatNumberWithLocalString(minAmountItem.infoValue)}` }]
                        : []),
                    {
                        key: 'Amount',
                        value: formatNumberWithLocalString(amount ?? 0) ?? 0,
                        isInput: !!billData.exactness && billData.exactness !== billAmountType.exact,
                    },
                ];
                const billSummary = billSummary1.filter(
                    item => item.value !== undefined && item.value !== null
                );

                const paymentSummary = [
                    {
                        key: 'Platform fee (inclusive of GST)',
                        value: `₹ ${formatNumberWithLocalString(platformFee)}`,
                    },
                ];

                const requestBody = {
                    accessKey: accessKeyName,
                    requestId: requestId || '',
                    quickPay: 'N',
                    amount: Number(billData?.billAmount) || 0,
                    billerId: serviceProvider,
                    billerName,
                    billerAdhoc: selectedBiller?.billerAdhoc,
                    additionalInfo,
                    customerParams: paramsValues,
                    billerResponse: { ...billerResponse },
                    ccf1Amount: surchargeData ? surchargeData.ccf1Amount || null : null,
                };

                let maximumAmount: number | undefined;
                let minimumAmount: number | undefined;
                switch (billData.exactness || '') {
                    case billAmountType.any:
                        maximumAmount = undefined;
                        minimumAmount = undefined;
                        break;
                    case billAmountType.above:
                        maximumAmount = undefined;
                        minimumAmount = Number(amount);
                        break;
                    case billAmountType.below:
                        maximumAmount = Number(amount);
                        minimumAmount = undefined;
                        break;
                    default:
                        maximumAmount = undefined;
                        minimumAmount = undefined;
                }
                if (additionalMaxAmount != null && !Number.isNaN(additionalMaxAmount)) {
                    maximumAmount = additionalMaxAmount;
                }
                if (additionalMinAmount != null && !Number.isNaN(additionalMinAmount)) {
                    minimumAmount = additionalMinAmount;
                }
                const path = navigateToServiceType(accessKeyName);
                dispatch(
                    setPaymentData({
                        billSummary,
                        paymentSummary,
                        totalAmount: total,
                        title: 'Recharge Summary',
                        payload: requestBody,
                        url: `payment/${apiUrl}/payment`,
                        earningCashbackAmount:
                            Number(surchargeData && surchargeData?.corporateCashback) || 0,
                        maximumAmount,
                        minimumAmount,
                        navigatePath: `${paths.dashboard.billPayments}/${path}`,
                    })
                );
                setIsLoading(false);
                navigate(paths.dashboard.payments);
            }
        },
        [dispatch, id, navigate, role]
    );

    const handlePlanSelect = useCallback(
        async (plan: BbpsPlan) => {
            const ctx = planSelectionContextRef.current;
            if (!ctx) return;

            setIsLoading(true);
            setIsPlanDrawerOpen(false);

            const surchargeData: SurchargeResponse | false = await getSurcharge({
                userId: id,
                userType: role,
                amount: plan.amount,
                accessKey: ctx.accessKeyName,
                billerId: ctx.serviceProvider,
            });

            const ccf1Rupees = surchargeData ? parseFloat(surchargeData.ccf1Amount ?? '0') / 100 : 0;
            const platformFee = surchargeData ? Number(surchargeData.surcharge) + ccf1Rupees : 0;
            const total = plan.amount + platformFee;

            const billSummary = [
                { key: 'Service name', value: ctx.serviceTitle },
                ...(ctx.billerName ? [{ key: 'Service provider', value: ctx.billerName }] : []),
                { key: 'Plan', value: plan.planName },
                { key: 'Amount', value: formatNumberWithLocalString(plan.amount) },
            ];

            const paymentSummary = [
                {
                    key: 'Platform fee (inclusive of GST)',
                    value: `₹ ${formatNumberWithLocalString(platformFee)}`,
                },
            ];

            const requestBody = {
                accessKey: ctx.accessKeyName,
                requestId: ctx.requestId,
                quickPay: 'N',
                amount: plan.amount,
                billerId: ctx.serviceProvider,
                billerName: ctx.billerName,
                customerParams: ctx.paramsValues,
                billerResponse: ctx.billerResponse,
                planDetails: { Id: plan.planId, type: plan.planType },
                ccf1Amount: surchargeData ? surchargeData.ccf1Amount || null : null,
            };

            const path = navigateToServiceType(ctx.accessKeyName);
            dispatch(
                setPaymentData({
                    billSummary,
                    paymentSummary,
                    totalAmount: total,
                    title: 'Recharge Summary',
                    payload: requestBody,
                    url: `payment/${ctx.apiUrl}/payment`,
                    earningCashbackAmount:
                        Number(surchargeData && surchargeData?.corporateCashback) || 0,
                    navigatePath: `${paths.dashboard.billPayments}/${path}`,
                })
            );
            setIsLoading(false);
            navigate(paths.dashboard.payments);
        },
        [dispatch, id, navigate, role]
    );

    const handleBeneficiaryPayment = useCallback(
        async (beneficiary: Beneficiary) => {
            const { accessKey: accessKeyName, billerId, serviceProvider: billerName, customerParams } = beneficiary;

            const values: { [key: string]: string } = { serviceProvider: billerId! };
            customerParams.forEach(item => {
                if (item.name && item.value) values[item.name] = item.value;
            });

            // Resolve biller MDM data to correctly determine fetch/validation/quickPay flow
            const allServices = [...billPayments, ...otherServices, ...financialServices, ...insurance];
            const serviceData = allServices.find(obj => obj.accessKey === accessKeyName);
            let selectedBiller: OptionsType | undefined;

            if (serviceData && billerId) {
                const result = await getServiceProvider({
                    userId: id,
                    userType: role,
                    categoryName: serviceData.BBPSCategoryName,
                    searchText: billerId,
                });
                if (result && result.billersArray) {
                    const biller = result.billersArray.find((b: any) => b.billerId === billerId);
                    if (biller) {
                        selectedBiller = {
                            value: biller.billerId,
                            label: biller.billerName,
                            customerParams: Array.isArray(biller.billerInputParams)
                                ? biller.billerInputParams.map((p: any) => p.paramInfo)
                                : [],
                            billerFetchRequirement: biller.billerFetchRequirement,
                            billerFetchRequiremet: biller.billerFetchRequiremet,
                            billerSupportBillValidation: biller.billerSupportBillValidation,
                            billerAdhoc: biller.billerAdhoc,
                            interchangeFeeCCF1: biller.interchangeFeeCCF1,
                        };
                    }
                }
            }

            await handlePayment(values, accessKeyName, billerName, undefined, selectedBiller);
        },
        [id, role, handlePayment]
    );

    return { handlePayment, handleBeneficiaryPayment, handlePlanSelect, isLoading, billerPlans, isPlanDrawerOpen, setIsPlanDrawerOpen };
}
