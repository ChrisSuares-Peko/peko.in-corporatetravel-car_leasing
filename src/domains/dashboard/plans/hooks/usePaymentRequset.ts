import { useCallback, useEffect, useState } from 'react';

import { load } from '@cashfreepayments/cashfree-js';
import { useNavigate } from 'react-router-dom';

import { ENV } from '@src/config-global';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';
// import { setUserInfo } from '@src/slices/userSlice';
import { accessKeys } from '@utils/accessKeys';

import { useCashfreeSDK } from './useCashfreeSdk';
import { postPaymentRequest } from '../api/index';
import {
    AddOnPaymentRequestPayload,
    PaymentRequestPayload,
    PaytmCreateOrderResponse,
    SubscriptionPaymentMode,
} from '../types/index';

export default function usePaymentRequest() {
    const [checkoutJsInstance, setCheckoutJsInstance] = useState<any>(null);
    useCashfreeSDK();
  
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedPaymentMode, setselectedPaymentMode] = useState<SubscriptionPaymentMode>(
        SubscriptionPaymentMode.card
    );
    const handlePaymentRequest = async (payload: PaymentRequestPayload) => {
        setIsLoading(true);
        payload.accessKey = accessKeys.purchaseSubscription;
        payload.pgAmount = payload.amount;
        const cashfree: any = (window as any)?.Cashfree({
            mode: 'sandbox',
        });
        const resp: false | PaytmCreateOrderResponse = await postPaymentRequest({
            ...payload,
            userId: id,
            userType: role,
        });
        if (resp && resp.session_id) {
            cashfree
                .subscriptionsCheckout({
                    subsSessionId: resp.session_id,
                    // redirectTarget: "_blank"
                })
                .then((result: any) => {
                    if (result.error) {
                        showToast({
                            description: 'Something went wrong. Please try after some time',
                            variant: 'error',
                        });
                    } else if (resp) {
                        // setIsSpinnerLoading(false);
                        // dispatch(
                        //     setUserInfo({
                        //         user: { ...user!, balance: res.corporateFinalBalance },
                        //     })
                        // );
                        // const query = `?status=success&transactionId=${resp.corporateTxnId || ''}`;
                        // const encodedQueryParams = btoa(query);
                        // navigate(paths.payments.paymentsuccess + query);
                    } else {
                        navigate(`/${paths.plans.index}/${paths.payments.paymentFailure}`);
                    }
                });
        } else {
            dispatch(
                showToast({
                    description: 'Something went wrong. Please try after some time',
                    variant: 'error',
                })
            );
            setIsSpinnerLoading(false);
            setIsLoading(false);
        }
    };

    const handleAddOnPaymentRequest = async (payload: AddOnPaymentRequestPayload) => {
        setIsLoading(true);
        if (payload.pgAmount > 0) {
            const resp: false | PaytmCreateOrderResponse = await postPaymentRequest({
                ...payload,
                userId: id,
                userType: role,
            });
            if (resp && resp.session_id) {
                checkoutJsInstance
                    .subscriptionsCheckout({
                        subsSessionId: resp.session_id,
                        // redirectTarget: "_blank"
                    })
                    .then((result: any) => {
                        if (result.error) {
                            showToast({
                                description: 'Something went wrong. Please try after some time',
                                variant: 'error',
                            });
                        } else if (resp) {
                            // setIsSpinnerLoading(false);
                            // dispatch(
                            //     setUserInfo({
                            //         user: { ...user!, balance: res.corporateFinalBalance },
                            //     })
                            // );
                            // const query = `?status=success&transactionId=${resp.corporateTxnId || ''}`;
                            // const encodedQueryParams = btoa(query);
                            // navigate(paths.payments.paymentsuccess + query);
                        } else {
                            navigate(`/${paths.plans.index}/${paths.payments.paymentFailure}`);
                        }
                    });
            } else {
                dispatch(
                    showToast({
                        description: 'Something went wrong. Please try after some time',
                        variant: 'error',
                    })
                );
                setIsSpinnerLoading(false);
                setIsLoading(false);
            }
        }
    };

    const loadCheckoutScript = useCallback(async () => {
        const cashfreeLoad = await load({
            mode: ENV === 'production' ? 'production' : 'sandbox',
        });
        setCheckoutJsInstance(cashfreeLoad);
    }, [setCheckoutJsInstance]);

    useEffect(() => {
        loadCheckoutScript();
    }, [loadCheckoutScript]);

    return {
        handlePaymentRequest,
        handleAddOnPaymentRequest,
        isLoading,
        isSpinnerLoading,
        loadCheckoutScript,
        selectedPaymentMode,
        setselectedPaymentMode,
    };
}
