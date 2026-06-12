import { SuccessGenericResponse, UserPayload } from '@customtypes/general';
import { ApiClient } from '@src/services/config';

import { refundTransationsRespone, getData, transactionData } from '../types/refundTransactions';

export const getAllData = async (payload: UserPayload & getData) => {
    try {
        const resp: SuccessGenericResponse<refundTransationsRespone> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/payment/refund-transaction/transactions`,
            {
                params: {
                    searchText: payload.searchText,
                    endDate: payload.to,
                    fromStart: payload.from,
                    corporateId: payload.corporateId,
                    serviceAccessKey: payload.category,
                    itemsPerPage: payload.itemsPerPage,
                    page: payload.page,
                },
            }
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};
export const sentRefundTransaction = async (payload: UserPayload & transactionData) => {
    try {
        const resp: SuccessGenericResponse<any> = await ApiClient.put(
            `${payload.userType}/${payload.userId}/payment/refund-transaction`,
            {
                corporateTxnId: payload.corporateTxnId,
                cryptoWalletAddress: payload.cryptoWalletAddress,
            }
        );
        // const { data } = resp;
        return resp;
    } catch (err) {
        return false;
    }
};
