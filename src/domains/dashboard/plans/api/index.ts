import { SuccessGenericResponse, UserPayload } from '@customtypes/general';
import { ApiClient } from '@src/services/config';

import { TransactionDetailsPayload } from '../../payments/types';
import {
    AddOnPaymentRequestPayload,
    ApplyCouponPayload,
    ApplyCouponResponse,
    PackageDetailsResponse,
    PackagesData,
    PaymentGeneric,
    PaymentRequestPayload,
    PaymentResponse,
    PaytmCreateOrderResponse,
    SubscriptionDetailsResponse,
    TableDataPackages,
    userPayload,
} from '../types/index';

export const getPackages = async () => {
    try {
        const resp: SuccessGenericResponse<PackagesData> = await ApiClient.get(
            `user/subscription/list-packages`
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};

export const getPackageDetails = async (packageId: number) => {
    try {
        const resp: SuccessGenericResponse<PackageDetailsResponse> = await ApiClient.get(
            `user/subscription/package-details`,
            {
                params: {
                    packageId,
                },
            }
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};

export const postPaymentRequest = async ({
    userId,
    userType,
    ...payload
}: (PaymentRequestPayload & userPayload) | (AddOnPaymentRequestPayload & userPayload)) => {
    try {
        const resp: SuccessGenericResponse<PaytmCreateOrderResponse> = await ApiClient.post(
            `${userType}/${userId}/payment-gateway/cashfree-gateway/create-subscription-order`,
            payload
        );
        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};

export const getPackageTableDetails = async () => {
    try {
        const resp: SuccessGenericResponse<TableDataPackages> = await ApiClient.get(
            `user/subscription/list-table`
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};

export const postPaymentRequestForFree = async ({
    userId,
    userType,
    ...payload
}: PaymentRequestPayload & userPayload) => {
    try {
        const resp: SuccessGenericResponse<PaymentResponse> = await ApiClient.post(
            `${userType}/${userId}/payment-gateway/subscriptions/payment`,
            payload
        );
        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};

export const completePaytmPayment = async (payload: PaymentGeneric & UserPayload) => {
    try {
        const { userId, userType, ...restPayload } = payload;
        const resp: SuccessGenericResponse<PaymentResponse> = await ApiClient.post(
            `${userType}/${userId}/payment-gateway/cashfree-gateway/complete`,
            restPayload
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};

export const postApplyCoupon = async ({
    userId,
    userType,
    ...payload
}: ApplyCouponPayload & userPayload) => {
    try {
        const resp: SuccessGenericResponse<ApplyCouponResponse> = await ApiClient.post(
            `${userType}/${userId}/purchase/coupons`,
            payload
        );
        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};

export const postAddonPaymentRequest = async ({
    userId,
    userType,
    ...payload
}: (PaymentRequestPayload & userPayload) | (AddOnPaymentRequestPayload & userPayload)) => {
    try {
        const resp: SuccessGenericResponse<PaytmCreateOrderResponse> = await ApiClient.post(
            `${userType}/${userId}/payment-gateway/cashfree-gateway/create-order`,
            payload
        );
        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};

export const getTransactionDetails = async (payload: UserPayload & TransactionDetailsPayload) => {
    try {
        const resp: SuccessGenericResponse<SubscriptionDetailsResponse> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/payment-gateway/transactions/subscription/${payload.transactionId}`
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};
