import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SurchargeResponse } from '@customtypes/general';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { getSurcharge } from '@src/services/surcharge';
import { showToast } from '@src/slices/apiSlice';
import { accessKeys } from '@utils/accessKeys';
import { formatNumberWithLocalString } from '@utils/priceFormat';

import { setPostpaid } from '../../billPayments/slices/billPaymentSlice';
import { setPaymentData } from '../../payments/slices/payment';
import { fetchBill, fetchBillTest, JRIVendorBalance } from '../api/index';
import { setPrepaidBeneficiary } from '../slice/beneficiarySlice';
import { setPrepaid } from '../slice/prepaidFormSlice';
import { Beneficiary, billAmountType, FetchBillResponse, JriBalanceResponse } from '../types/index';
import { circleList } from '../utils/data';

export default function usePayment() {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handlePrepaidPay = useCallback(
        async (values: any) => {
            const { amount, mobileNumber, serviceProvider, circle } = values;
            dispatch(setPrepaid(values));
            const vendorBalance: JriBalanceResponse | false = await JRIVendorBalance({
                userId: id,
                userType: role,
                amount: Number(amount),
            });

            if (vendorBalance) {
                const surchargeData: SurchargeResponse | false = await getSurcharge({
                    userId: id,
                    userType: role,
                    amount: Number(amount),
                    accessKey: accessKeys.prepaid,
                });
                let total = 0;
                if (surchargeData) {
                    total = Number(amount) + Number(surchargeData.surcharge);
                } else {
                    total = Number(amount);
                }

                const providerCircle =
                    circleList.find(
                        obj =>
                            obj.value?.replace(/\s+/g, '').toLowerCase() ===
                            circle.replace(/\s+/g, '').toLowerCase()
                    )?.label ||
                    circleList.find(
                        obj =>
                            obj.label?.replace(/\s+/g, '').toLowerCase() ===
                            circle.replace(/\s+/g, '').toLowerCase()
                    )?.label;
                const formattedProviderCircle =
                    providerCircle?.toLowerCase() === 'all' ? 'All' : providerCircle;
                const formattedServiceProvider =
                    serviceProvider.toLowerCase() === 'bsnl'
                        ? serviceProvider.toUpperCase()
                        : serviceProvider.charAt(0).toUpperCase() +
                          serviceProvider.slice(1).toLowerCase();

                const billSummary = [
                    {
                        key: 'Service name',
                        value: 'Mobile Prepaid',
                    },
                    {
                        key: 'Mobile number',
                        value: mobileNumber,
                    },
                    {
                        key: 'Service provider',
                        value: formattedServiceProvider,
                    },
                    {
                        key: 'Circle',
                        value: formattedProviderCircle,
                    },
                    {
                        key: 'Amount',
                        value: formatNumberWithLocalString(amount ?? 0),
                    },
                ];
                const paymentSummary = [
                    {
                        key: 'Platform fee (inclusive of GST)',
                        value: `₹ ${formatNumberWithLocalString((surchargeData && surchargeData.surcharge) || 0)}`,
                    },
                ];
                const requestBody = {
                    account: mobileNumber,
                    amount,
                    location: providerCircle,
                    serviceProvider,
                    accessKey: accessKeys.prepaid,
                    currentUrl: window.location.href,
                };
                dispatch(
                    setPaymentData({
                        billSummary,
                        paymentSummary,
                        totalAmount: parseFloat(total.toFixed(2)),
                        title: 'Recharge Summary',
                        payload: requestBody,
                        url: 'payment/prepaid/payment',
                        earningCashbackAmount:
                            Number(surchargeData && surchargeData?.corporateCashback) || 0,
                        navigatePath: `${paths.dashboard.mobileRecharge}/${paths.telecomPayments.prepaid}`,
                    })
                );
                navigate(paths.dashboard.payments);
            }
        },
        [dispatch, id, navigate, role]
    );

    const handlePostpaidPay = useCallback(
        async (values: any, billerName?: string) => {
            setIsLoading(true);

            const { serviceProvider, ...rest } = values;
            dispatch(setPostpaid(values));
            const entries = Object.entries(rest);
            let customerParams = {};
            if (entries.length === 1) {
                const [paramName, paramValue] = entries[0];
                customerParams = {
                    input: {
                        paramName,
                        paramValue: paramValue as string,
                    },
                };
            } else {
                customerParams = {
                    input: entries.map(([paramName, paramValue]) => ({
                        paramName,
                        paramValue: paramValue as string,
                    })),
                };
            }

            // const customerParams = Object.entries(rest).map(
            //     ([name, value]): { name: string; value: string } => ({
            //         name,
            //         value: value as string,
            //     })
            // );

            const fetchBillPayload = {
                userId: id,
                userType: role,
                billerId: serviceProvider,
                customerParams,
            };
            const billData: FetchBillResponse | false = await fetchBill(fetchBillPayload);

            if (billData) {
                const { requestId, additionalInfo, ...billerResponse } = billData;
                const { billAmount: amount, customerName } = billerResponse;

                const surchargeData: SurchargeResponse | false = await getSurcharge({
                    userId: id,
                    userType: role,
                    amount: Number(amount),
                    accessKey: accessKeys.postpaid,
                });
                let total = 0;
                if (surchargeData) {
                    total = Number(amount) + Number(surchargeData.surcharge);
                } else {
                    total = Number(amount);
                }

                const billSummary = [
                    {
                        key: 'Service name',
                        value: 'Mobile Postpaid',
                    },
                    {
                        key: 'Customer name',
                        value: customerName,
                    },
                    {
                        key: 'Due date',
                        value: billerResponse?.dueDate,
                    },
                    {
                        key: 'Amount',
                        value: formatNumberWithLocalString(Number(amount) ?? 0),
                    },
                ];
                const paymentSummary = [
                    {
                        key: 'Platform fee (inclusive of GST)',
                        value: `₹ ${formatNumberWithLocalString((surchargeData && surchargeData.surcharge) || 0)}`,
                    },
                ];

                const requestBody = {
                    billerId: serviceProvider,
                    billerName,
                    requestId: requestId || '',
                    amount: Number(billData?.billAmount) || 0,
                    accessKey: accessKeys.postpaid,
                    additionalInfo,
                    currentUrl: window.location.href,
                    customerParams,
                    billerResponse: { ...billerResponse }, // Creates a new object without additionalInfo
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

                dispatch(
                    setPaymentData({
                        billSummary,
                        paymentSummary,
                        totalAmount: total,
                        title: 'Recharge Summary',
                        payload: requestBody,
                        url: 'payment/postpaid/payment',
                        earningCashbackAmount:
                            Number(surchargeData && surchargeData?.corporateCashback) || 0,
                        minimumAmount,
                        maximumAmount,
                        navigatePath: `${paths.dashboard.mobileRecharge}/${paths.telecomPayments.postpaid}`,
                    })
                );
                setIsLoading(false);

                navigate(paths.dashboard.payments);
            }
            setIsLoading(false);
        },
        [dispatch, id, navigate, role]
    );
    const handleTestPay = useCallback(
        async (values: any, billerName?: string) => {
            setIsLoading(true);

            const { serviceProvider, ...rest } = values;

            const entries = Object.entries(rest);
            let customerParams = {};
            if (entries.length === 1) {
                const [paramName, paramValue] = entries[0];
                customerParams = {
                    input: {
                        paramName,
                        paramValue: paramValue as string,
                    },
                };
            } else {
                customerParams = {
                    input: entries.map(([paramName, paramValue]) => ({
                        paramName,
                        paramValue: paramValue as string,
                    })),
                };
            }

            // const customerParams = Object.entries(rest).map(
            //     ([name, value]): { name: string; value: string } => ({
            //         name,
            //         value: value as string,
            //     })
            // );

            const fetchBillPayload = {
                userId: id,
                userType: role,
                billerId: serviceProvider,
                customerParams,
            };
            const billData: FetchBillResponse | false = await fetchBillTest(fetchBillPayload);

            if (billData) {
                const { requestId, additionalInfo, ...billerResponse } = billData;
                const { billAmount: amount, customerName } = billerResponse;

                const surchargeData: SurchargeResponse | false = await getSurcharge({
                    userId: id,
                    userType: role,
                    amount: Number(amount),
                    accessKey: accessKeys.test,
                });
                let total = 0;
                if (surchargeData) {
                    total = Number(amount) + Number(surchargeData.surcharge);
                } else {
                    total = Number(amount);
                }

                const billSummary = [
                    {
                        key: 'Service name',
                        value: 'OTME',
                    },
                    {
                        key: 'Customer name',
                        value: customerName,
                    },
                    {
                        key: 'Due date',
                        value: billerResponse?.dueDate,
                    },
                    {
                        key: 'Amount',
                        value: formatNumberWithLocalString(Number(amount) ?? 0),
                    },
                ];
                const paymentSummary = [
                    {
                        key: 'Platform fee (inclusive of GST)',
                        value: `₹ ${formatNumberWithLocalString((surchargeData && surchargeData.surcharge) || 0)}`,
                    },
                ];

                const requestBody = {
                    billerId: serviceProvider,
                    billerName,
                    requestId: requestId || '',
                    amount: Number(billData?.billAmount) || 0,
                    accessKey: accessKeys.test,
                    additionalInfo,
                    currentUrl: window.location.href,
                    customerParams,
                    billerResponse: { ...billerResponse }, // Creates a new object without additionalInfo
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

                dispatch(
                    setPaymentData({
                        billSummary,
                        paymentSummary,
                        totalAmount: total,
                        title: 'Recharge Summary',
                        payload: requestBody,
                        url: 'payment/test/payment',
                        earningCashbackAmount:
                            Number(surchargeData && surchargeData?.corporateCashback) || 0,
                        minimumAmount,
                        maximumAmount,
                        navigatePath: `${paths.dashboard.mobileRecharge}/${paths.telecomPayments.test}`,
                    })
                );
                setIsLoading(false);

                navigate(paths.dashboard.payments);
            }
        },
        [dispatch, id, navigate, role]
    );
    const handleBeneficiaryPay = async (beneficiary: Beneficiary, pathname: string) => {
        setIsLoading(true);
        const { customerParams, billerId, accessKey } = beneficiary;

        const prepaidPath = `${paths.dashboard.mobileRecharge}/${paths.telecomPayments.prepaid}`;

        if (accessKey === accessKeys.prepaid) {
            if (pathname === prepaidPath) {
                dispatch(setPrepaidBeneficiary(beneficiary));
            } else {
                navigate(prepaidPath, { state: beneficiary });
            }
            dispatch(
                showToast({
                    description: 'Please browse plans to select your desired recharge amount.',
                    variant: 'success',
                })
            );
        } else {
            const values: { [key: string]: string } = {
                serviceProvider: billerId!,
            };
            customerParams.forEach((item: any) => {
                values[item.name] = item.value;
            });
            await handlePostpaidPay(values);
        }
        setIsLoading(false);
    };

    return { handlePrepaidPay, handlePostpaidPay, handleBeneficiaryPay, isLoading, handleTestPay };
}
