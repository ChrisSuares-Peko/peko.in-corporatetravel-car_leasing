import { SuccessGenericResponse, UserPayload } from '@customtypes/general';
import { ApiClient } from '@src/services/config';

import {
    PaymentGeneric,
    CardPaymentResponse,
    WalletBalanceResponse,
    PaymentResponse,
    TransactionDetailsResponse,
    TransactionDetailsPayload,
    PaytmCreateOrderPayload,
    PaytmCreateOrderResponse,
    BulkPaymentStatusResp,
    CheckAgencyBalance,
    PaymentMethodsResponse,
} from '../types/index';

export const createPaymentLink = async (payload: PaymentGeneric & UserPayload) => {
    try {
        const { userId, userType, ...restPayload } = payload;
        const resp: CardPaymentResponse = await ApiClient.post(
            `${userType}/${userId}/payment-gateway/plural-gateway/create-order`,
            restPayload
        );
        return resp;
    } catch (err) {
        return false;
    }
};

export const getWalletBalance = async (payload: UserPayload) => {
    try {
        const resp: SuccessGenericResponse<WalletBalanceResponse> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/others/profile/walletDetails`
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};

export const createPGTransaction = async (payload: UserPayload & PaytmCreateOrderPayload) => {
    try {
        const resp: SuccessGenericResponse<PaytmCreateOrderResponse> = await ApiClient.post(
            `${payload.userType}/${payload.userId}/payment-gateway/cashfree-gateway/create-order`,
            payload
        );
        return resp;
    } catch (err) {
        return false;
    }
};

export const completePGPayment = async (payload: PaymentGeneric & UserPayload) => {
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

export const doWalletPayment = async (payload: PaymentGeneric & UserPayload & { url: string }) => {
    try {
        const { userId, userType, url, ...restPayload } = payload;
        const resp: SuccessGenericResponse<PaymentResponse> = await ApiClient.post(
            `${userType}/${userId}/${url}`,
            restPayload
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};

export const getTransactionDetails = async (payload: UserPayload & TransactionDetailsPayload) => {
    try {
        const resp: SuccessGenericResponse<TransactionDetailsResponse> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/payment-gateway/transactions/details/${payload.transactionId}`
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};

export const getBulkPaymentDataApi = async (
    payload: UserPayload,
    esimStoredBatchId: string | null
) => {
    try {
        const resp: SuccessGenericResponse<any> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/payment/bulk-payment/bulkPaymentData/${esimStoredBatchId}`
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};

export const getBulkPaymentStatusApi = async (payload: UserPayload, batchId: number) => {
    try {
        const resp: SuccessGenericResponse<BulkPaymentStatusResp> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/payment-gateway/bulk-payment/status/${batchId}`
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};

export const checkAgencyBalanceApi = async (payload: CheckAgencyBalance) => {
    try {
        await ApiClient.post(
            `${payload.userType}/${payload.userId}/travel/flight/validate-amount`,
            {
                amount: payload.amount,
                passengers: payload.passengers,
                traceId: payload.traceId,
            }
        );
        return true;
    } catch (err) {
        return false;
    }
};

export const fetchAvailablePgMethods = async (payload: UserPayload & { accessKey: string, billerId?:string }) => {
    try {
        const resp: SuccessGenericResponse<PaymentMethodsResponse> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/payment-gateway/payment-methods`,
            {
                params: {
                    accessKey: payload.accessKey,
                    billerId: payload?.billerId,
                },
            }
        );

        const { data } = resp;
        return data;
    } catch (error) {
        return false; // Return false in case of an error
    }
};
