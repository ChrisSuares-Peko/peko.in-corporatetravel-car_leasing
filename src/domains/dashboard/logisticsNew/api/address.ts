import { SuccessGenericResponse } from '@customtypes/general';
import { ApiClient } from '@src/services/config';

import {
    Address,
    SaveAddressPayload,
    SavedAddressPayload,
    SavedAddressResponse,
    ValidateAddressPayload,
} from '../types/address';

export const getSavedAddressApi = async ({ isReceiver, userId, userType }: SavedAddressPayload) => {
    try {
        const resp: SuccessGenericResponse<Address[]> = await ApiClient.get(
            `${userType}/${userId}/travel/logistics_V3/fetchAddresses?isReceiver=${isReceiver}`
        );
        const addresses = resp.data;
        return { addresses: Array.isArray(addresses) ? addresses : [] } as SavedAddressResponse;
    } catch (err) {
        return false;
    }
};

export const saveAddressApi = async ({ userType, userId, ...body }: SaveAddressPayload) => {
    try {
        const res: SuccessGenericResponse<SaveAddressPayload> = await ApiClient.post(
            `${userType}/${userId}/travel/logistics_V3/addAddress`,
            body
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const validateAddressApi = async ({ userType, userId, address }: ValidateAddressPayload) => {
    try {
        const res: SuccessGenericResponse<SaveAddressPayload> = await ApiClient.post(
            `${userType}/${userId}/travel/logistics/validateAddress`,
            {
                address,
            }
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};
