import { useCallback, useEffect, useRef, useState } from 'react';

import { load } from '@cashfreepayments/cashfree-js';
import { FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';

import { PAYMENT_FAiLURE_URL, PAYMENT_SUCCESS_URL, ENV } from '@src/config-global';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';
import { setUserInfo } from '@src/slices/userSlice';
import { accessKeys } from '@utils/accessKeys';
import { formatNumberWithLocalString, roundMoney } from '@utils/priceFormat';

import { postApplyCoupon } from '../../plans/api';
import { ApplyCouponResponse } from '../../plans/types';
import {
    createPaymentLink,
    doWalletPayment,
    createPGTransaction,
    completePGPayment,
    // checkAgencyBalanceApi,
} from '../api/index';
import { setPaymentData } from '../slices/payment';
import {
    CardPaymentResponse,
    PaymentMode,
    PaymentResponse,
    UsePaymentApiProps,
} from '../types/index';

export default function usePaymentApi({
    setCheckoutJsInstance,
    checkoutJsInstance,
}: UsePaymentApiProps) {
    const dispatch = useAppDispatch();
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const { user } = useAppSelector(state => state.reducer.user);
    const paymentState = useAppSelector(state => state.reducer.payment);
    const { searchInitiatedAt } = useAppSelector(
        state => state.reducer.airline
    );

    const [selectedPayment, setselectedPayment] = useState<PaymentMode>(PaymentMode.empty);
    const [isCashbackChecked, setIsCashbackChecked] = useState<boolean>(false);

    const { payload, totalAmount, url, minimumAmount, maximumAmount, couponDiscount } =
        useAppSelector(state => state.reducer.payment);
    const [isLoading, setIsLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    // const [totalAmountBeforeCoupon, setTotalAmountBeforeCoupon] = useState(totalAmount);
    const couponFormikRef = useRef<FormikProps<{ couponCode: string }> | null>(null);
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);

    const navigate = useNavigate();

    // remove coupon discount when page intial loading
    useEffect(() => {
        const updatedPaymentSummary = (paymentState?.paymentSummary || []).filter(
            item => item.key !== 'Coupon Discount'
        );
        dispatch(
            setPaymentData({
                ...paymentState,
                totalAmount: totalAmount + (couponDiscount || 0),
                paymentSummary: updatedPaymentSummary,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const applyCoupon = useCallback(
        async (code: string, setSubmitting: (isSubmitting: boolean) => void) => {
            if (!payload?.accessKey) {
                dispatch(
                    showToast({
                        description: 'Coupons are not available for this service',
                        variant: 'warning',
                    })
                );
                return;
            }
            const applyCouponPayload: any = {
                userId: id,
                userType: role,
                amount: totalAmount,
                couponCode: code,
            };
            if (
                payload.accessKey === 'accounting' ||
                payload.accessKey === 'whatsApp_for_busines'
            ) {
                applyCouponPayload.packageId = payload.packageId!;
                applyCouponPayload.billingType = payload?.subscriptionDuration!.toString()!;
            } else {
                applyCouponPayload.accessKey = payload.accessKey!;
            }
            setSubmitting(true);
            const data: ApplyCouponResponse | false = await postApplyCoupon(applyCouponPayload);
            if (data) {
                setCouponCode(code);
                setselectedPayment(PaymentMode.PAYTM);
                setIsCashbackChecked(false);
                setIsCouponApplied(true);
                setIsLoading(false);
                let formatedDiscount = formatNumberWithLocalString(data.discountAmount);
                formatedDiscount = formatedDiscount.replace(/,/g, ''); // remove commas (1,000.00 -> 1000.00)

                const updatedPaymentSummary = [
                    ...(paymentState?.paymentSummary || []), // Ensure it's an array and create a copy
                    {
                        key: 'Coupon Discount',
                        value: `₹ ${formatNumberWithLocalString(formatedDiscount)}`,
                    },
                ];
                // setTotalAmountBeforeCoupon(totalAmount);

                dispatch(
                    setPaymentData({
                        ...paymentState,
                        couponDiscount: roundMoney(Number(data.discountAmount)),
                        totalAmount: roundMoney(totalAmount - Number(formatedDiscount)),
                        paymentSummary: updatedPaymentSummary,
                        // billSummary: updatedBillSummary,
                    })
                );
            } else {
                setCouponCode('');
            }
            setSubmitting(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [payload, id, role, totalAmount, dispatch, paymentState, selectedPayment]
    );

    const removeCoupon = useCallback(() => {
        couponFormikRef?.current?.resetForm();
        setCouponCode('');
        setIsCouponApplied(false);
        const updatedPaymentSummary = (paymentState?.paymentSummary || []).filter(
            item => item.key !== 'Coupon Discount'
        );
        dispatch(
            setPaymentData({
                ...paymentState,
                couponDiscount: 0,
                totalAmount: totalAmount + (couponDiscount || 0),
                paymentSummary: updatedPaymentSummary,
            })
        );
    }, [dispatch, paymentState, couponDiscount, totalAmount]);

    const handleWalletPaymentRequest = async () => {
        if (!checkPayableAmount()) {
            return;
        }
        setIsLoading(true);
        // const isAgencyBalanceSufficient = await checkAgencyBalance(
        //     payload?.accessKey,
        //     payload?.amount
        // );
        // if (!isAgencyBalanceSufficient) {
        //     // show error and redirect
        //     setIsLoading(false);
        //     return;
        // }

        if (url) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { accessKey: _accessKey, ...payloadWithoutAccessKey } = payload ?? {};
            const payloadToSend = url.includes('domain-and-hosting') ? payloadWithoutAccessKey : payload;
            const requestBody = {
                ...payloadToSend,
                userId: id,
                userType: role,
                url,
                currentUrl: undefined,
            };
            const resp: PaymentResponse | false = await doWalletPayment(requestBody);
            setIsLoading(false);
            if (resp && resp.bulkPaymentData) {
                if (resp.corporateFinalBalance) {
                    dispatch(setUserInfo({ user: { ...user!, balance: resp.corporateFinalBalance } }));
                }
                const bulkPaymentDataString = encodeURIComponent(
                    JSON.stringify(resp.bulkPaymentData)
                );
                const isEsim =
                    payload?.accessKey === accessKeys.eSim ||
                    payload?.accessKey === accessKeys.eSimTunz ||
                    Array.isArray(payload?.orderGroups);
                const query = `?status=success&bulkPaymentData=${bulkPaymentDataString || ''}${isEsim ? '&serviceName=esim' : ''}`;
                navigate(paths.payments.paymentsuccess + query);
            } else if (resp) {
                if (resp.pending || resp.processing) {
                    const { firstBtnText, firstBtnLink } = findButtonTextAndLink(
                        payload?.accessKey
                    );
                    navigate(paths.payments.paymentPending, {
                        state: {
                            ...resp.details,
                            firstBtnText,
                            firstBtnLink,
                        },
                    });
                    return;
                }
                dispatch(setUserInfo({ user: { ...user!, balance: resp.corporateFinalBalance } }));
                const query = `?status=success&transactionId=${resp.corporateTxnId || ''}`;
                navigate(paths.payments.paymentsuccess + query);
            } else {
                navigate(paths.payments.paymentFailure);
            }
        }
    };

    const handlePaytmPaymentRequest = async ({
        isChecked,
        balance,
    }: {
        isChecked: boolean;
        balance: number;
    }) => {
        if (!checkPayableAmount()) {
            return;
        }
        setIsLoading(true);

        // const isAgencyBalanceSufficient = await checkAgencyBalance(
        //     payload?.accessKey,
        //     payload?.outbount?.amount
        // );
        // if (!isAgencyBalanceSufficient) {
        //     // show error and redirect
        //     setIsLoading(false);
        //     return;
        // }

        setIsSpinnerLoading(true);
        const AmountAfterWallet = totalAmount && totalAmount - balance;
        const pgAmount = isChecked ? AmountAfterWallet : totalAmount;
        const requestBody = {
            ...payload,
            pgAmount,
            userId: id,
            userType: role,
            couponCode: isCouponApplied ? couponCode : '',
            // Add timer information for airline bookings
            ...(payload?.accessKey === accessKeys.airline && {
                searchInitiatedAt: searchInitiatedAt || null,
            }),
        };

        const resp = await createPGTransaction(requestBody);

        if (resp && resp.status === false) {
            dispatch(
                showToast({
                    description: resp.message || 'Something went wrong. Please try after some time',
                    variant: 'error',
                })
            );
            setIsLoading(false);
            setIsSpinnerLoading(false);
            return;
        }
        if (resp && resp.status) {
            loadCheckoutScript();
            const checkoutOptions = {
                paymentSessionId: resp.data?.session_id,
                redirectTarget: '_modal', // _self
            };
            if (checkoutJsInstance) {
                checkoutJsInstance.checkout(checkoutOptions).then((result: any) => {
                    if (result.error) {
                        setIsSpinnerLoading(false);
                        setIsLoading(false);
                        // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                        console.log(
                            'User has closed the popup or there is some payment error, Check for Payment Status'
                        );
                        console.log(result.error);
                        // navigate(paths.payments.paymentFailure);
                    }
                    if (result.redirect) {
                        setIsSpinnerLoading(false);
                        // This will be true when the payment redirection page couldnt be opened in the same window
                        // This is an exceptional case only when the page is opened inside an inAppBrowser
                        // In this case the customer will be redirected to return url once payment is completed
                        console.log('Payment will be redirected');
                        navigate(paths.payments.paymentFailure);
                    }
                    if (result.paymentDetails) {
                        setIsSpinnerLoading(true);
                        // This will be called whenever the payment is completed irrespective of transaction status
                        console.log('Payment has been completed, Check for Payment Status');
                        completePGPayment({
                            userId: id,
                            userType: role,
                            ORDERID: resp.data.orderId,
                        }).then(res => {
                            if (res) {
                                setIsSpinnerLoading(false);
                                dispatch(
                                    setUserInfo({
                                        user: { ...user!, balance: res.corporateFinalBalance },
                                    })
                                );
                                if (res.pending || res.processing) {
                                    const { firstBtnText, firstBtnLink } = findButtonTextAndLink(
                                        payload?.accessKey
                                    );
                                    navigate(paths.payments.paymentPending, {
                                        state: {
                                            ...res.details,
                                            firstBtnText,
                                            firstBtnLink,
                                        },
                                    });
                                    return;
                                }
                                let query = '';
                                if (res.bulkPaymentData) {
                                    const bulkPaymentDataString = encodeURIComponent(
                                        JSON.stringify(res.bulkPaymentData)
                                    );
                                    const isEsim =
                                        payload?.accessKey === accessKeys.eSim ||
                                        payload?.accessKey === accessKeys.eSimTunz ||
                                        Array.isArray(payload?.orderGroups);
                                    query = `?status=success&bulkPaymentData=${bulkPaymentDataString || ''}${isEsim ? '&serviceName=esim' : ''}`;
                                } else {
                                    query = `?status=success&transactionId=${res.corporateTxnId || ''}`;
                                }
                                // const encodedQueryParams = btoa(query);
                                if (res.successUrl) {
                                    navigate(res.successUrl + query);
                                } else navigate(paths.payments.paymentsuccess + query);
                            } else {
                                navigate(paths.payments.paymentFailure);
                            }
                        });
                        setIsLoading(false);
                    }
                });
            }
        } else {
            dispatch(
                showToast({
                    description: 'Something went wrong. Please try after some time',
                    variant: 'error',
                })
            );
            setIsLoading(false);
            setIsSpinnerLoading(false);
        }
    };

    const loadCheckoutScript = useCallback(async () => {
        const cashfree = await load({
            mode: ENV === 'production' ? 'production' : 'sandbox',
        });
        setCheckoutJsInstance(cashfree);
    }, [setCheckoutJsInstance]);

    function checkPayableAmount() {
        if (Number(payload?.amount!) <= 0) {
            dispatch(
                showToast({
                    description: 'Please enter a valid amount',
                    variant: 'warning',
                })
            );
            return false;
        }
        if (
            (minimumAmount && Number(payload?.amount!) < minimumAmount) ||
            (maximumAmount && Number(payload?.amount!) > maximumAmount)
        ) {
            dispatch(
                showToast({
                    description:
                        'Please enter the amount between minimum and maximum denominations.',
                    variant: 'warning',
                })
            );
            return false;
        }
        return true;
    }

    // not working (plural gateway)
    const handleCardPaymentRequest = async ({
        isChecked,
        balance,
    }: {
        isChecked: boolean;
        balance: number;
    }) => {
        if (!checkPayableAmount()) {
            return;
        }
        setIsLoading(true);

        const pgAfterWallet = totalAmount && totalAmount - balance;
        const pgAmount = isChecked ? pgAfterWallet : totalAmount;

        const requestBody = {
            ...payload,
            pgAmount,
            userId: id,
            userType: role,
            successUrl: PAYMENT_SUCCESS_URL,
            failureUrl: PAYMENT_FAiLURE_URL,
            // Add timer information for airline bookings
            ...(payload?.accessKey === accessKeys.airline && {
                searchInitiatedAt: searchInitiatedAt || null,
            }),
        };
        const resp: CardPaymentResponse | false = await createPaymentLink(requestBody);
        if (resp) {
            window.location.href = resp.redirectLink;
        }
        setIsLoading(false);
    };

    // const checkAgencyBalance = async (accessKey?: string, amount?: string | number) => {
    //     if (accessKey === 'tbo_airline' && amount) {
    //         const res = await checkAgencyBalanceApi({
    //             userId: id,
    //             userType: role,
    //             amount,
    //         });
    //         return res;
    //     }
    //     return true;
    // };

    const findButtonTextAndLink = (accessKey?: string) => {
        switch (accessKey) {
            case accessKeys.airline:
                return {
                    firstBtnText: 'Go to Manage Bookings',
                    firstBtnLink: `${paths.dashboard.corporateTravel}/${paths.airline.index}/${paths.airline.manage}`,
                };
            case accessKeys.prepaid:
                return {
                    firstBtnText: 'Go to Mobile Recharge',
                    firstBtnLink: `/mobile-recharge`,
                };
            default:
                return {
                    firstBtnText: 'Go to bill payments',
                    firstBtnLink: '/bill-payments',
                };
        }
    };

    return {
        selectedPayment,
        setselectedPayment,
        isCashbackChecked,
        setIsCashbackChecked,
        handleCardPaymentRequest,
        handlePaytmPaymentRequest,
        handleWalletPaymentRequest,
        isLoading,
        isSpinnerLoading,
        loadCheckoutScript,
        couponFormikRef,
        isCouponApplied,
        applyCoupon,
        setCouponCode,
        removeCoupon,
    };
}
