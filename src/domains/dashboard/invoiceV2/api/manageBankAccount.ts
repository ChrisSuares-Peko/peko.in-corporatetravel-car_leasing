import { SuccessGenericResponse, UserPayload } from '@customtypes/general';
import { ApiClient } from '@src/services/config';

import { AddDomesticAccountFormValues, DomesticAccount } from '../types/ManageBankAccounts';

export const getBankAccountsApi = async (payload: UserPayload) => {
    try {
        const { userId, userType } = payload;
        const resp: SuccessGenericResponse<DomesticAccount[]> = await ApiClient.get(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/bank-accounts`
        );
        return resp;
    } catch {
        return false;
    }
};

export const setPrimaryBankAccountApi = async (payload: UserPayload & { accountId: string }) => {
    try {
        const { userId, userType, accountId } = payload;
        const resp: SuccessGenericResponse<{}> = await ApiClient.patch(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/bank-accounts/${accountId}/set-primary`
        );
        return resp;
    } catch {
        return false;
    }
};

export const deleteBankAccountApi = async (payload: UserPayload & { accountId: string }) => {
    try {
        const { userId, userType, accountId } = payload;
        const resp: SuccessGenericResponse<{}> = await ApiClient.delete(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/bank-accounts/${accountId}`
        );
        return resp;
    } catch {
        return false;
    }
};

export const editBankAccountApi = async (
    payload: UserPayload & AddDomesticAccountFormValues & { accountId: string }
) => {
    try {
        const { userId, userType, accountId, ...body } = payload;
        const resp: SuccessGenericResponse<DomesticAccount> = await ApiClient.put(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/bank-accounts/${accountId}`,
            body
        );
        return resp;
    } catch {
        return false;
    }
};

export const addBankAccountApi = async (
    payload: UserPayload & AddDomesticAccountFormValues
) => {
    try {
        const { userId, userType, ...body } = payload;
        const resp: SuccessGenericResponse<DomesticAccount> = await ApiClient.post(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/bank-accounts`,
            body
        );
        return resp;
    } catch {
        return false;
    }
};
