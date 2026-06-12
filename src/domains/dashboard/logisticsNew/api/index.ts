import { SuccessGenericResponse } from '@customtypes/general';
import { ApiClient } from '@src/services/config';

import { downloadResponse } from '../../Reports/types';
import {
    CalculateRatePayload,
    CalculateRateResponse,
    CityDetailsPayload,
    CityDetailsResponse,
    CityListingPayload,
    CityListingResponse,
    Country,
    InternationalCalculateRatePayload,
} from '../types';
import { TransactionsRequestPayload, TransactionsResponse } from '../types/orderHistory';
import {
    CancelOrderPayload,
    downloadInvoicePayload,
    TrackingApiResponse,
    TrackShipmentPayload,
} from '../types/tracking';

export const cityListing = async ({ userType, userId, searchText }: CityListingPayload) => {
    try {
        const res: SuccessGenericResponse<CityListingResponse> = await ApiClient.get(
            `${userType}/${userId}/travel/logistics_V3/fetch-cities`,
            {
                params: { searchText: searchText || '' },
            }
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const cityDetails = async ({ userType, userId, placeId }: CityDetailsPayload) => {
    try {
        const res: SuccessGenericResponse<CityDetailsResponse> = await ApiClient.get(
            `${userType}/${userId}/travel/logistics_V3/fetch-city-details`,
            {
                params: { placeId },
            }
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const calculateRate = async ({ userType, userId, ...payload }: CalculateRatePayload) => {
    try {
        const res: SuccessGenericResponse<CalculateRateResponse> = await ApiClient.post(
            `${userType}/${userId}/travel/logistics_V3/check-delivery-fee`,
            payload
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const checkAgencyBalance = async ({ userType, userId, amount }: any) => {
    try {
        const res: SuccessGenericResponse<any> = await ApiClient.post(
            `${userType}/${userId}/travel/logistics_V3/check-balance`,
            {
                amount,
            }
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

// export const logisticsPayment = async ({
//     userType,
//     userId,
//     ...payload
// }: LogisticsPaymentPayload) => {
//     try {
//         const res: SuccessGenericResponse<{}> = await ApiClient.post(
//             `${userType}/${userId}/travel/logistics_V3/payment`,
//             payload
//         );
//         const { data } = res;
//         return data;
//     } catch (error) {
//         return false;
//     }
// };

export const getTransactionsApi = async (payload: TransactionsRequestPayload) => {
    try {
        const res: SuccessGenericResponse<TransactionsResponse> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/travel/logistics_V3/orders`,
            {
                params: {
                    sort: payload.sort,
                    page: payload.page,
                    itemsPerPage: payload.itemsPerPage,
                    searchText: payload.search,
                    from: payload.from,
                    to: payload.to,
                },
            }
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const trackShipment = async ({ userType, userId, trackingNumber }: TrackShipmentPayload) => {
    try {
        const res: SuccessGenericResponse<TrackingApiResponse> = await ApiClient.post(
            `${userType}/${userId}/travel/logistics_V3/track-shipment`,
            { trackingNumber }
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const cancelOrderApi = async (payload: CancelOrderPayload) => {
    try {
        const res: SuccessGenericResponse<{}> = await ApiClient.post(
            `${payload.userType}/${payload.userId}/travel/logistics_V3/cancel-shipment`,
            {
                orderId: payload.orderId,
            }
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const downloadInvoice = async ({
    userType,
    userId,
    trackingNumber,
    amount,
}: downloadInvoicePayload) => {
    try {
        const res: SuccessGenericResponse<downloadResponse> = await ApiClient.get(
            `${userType}/${userId}/travel/logistics_V3/download-invoice`,
            {
                params: { trackingNumber, amount },
            }
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const lookupPostcodeApi = async ({
    userType,
    userId,
    postcode,
}: {
    userType: string;
    userId: number;
    postcode: string;
}): Promise<{ city: string; state: string } | false> => {
    try {
        const res: SuccessGenericResponse<{ city: string; state: string }> = await ApiClient.get(
            `${userType}/${userId}/travel/logistics_V3/lookup-postcode`,
            { params: { postcode } }
        );
        return res.data || false;
    } catch {
        return false;
    }
};

export const lookupInternationalPostcodeApi = async ({
    userType,
    userId,
    postcode,
    countryCode,
}: {
    userType: string;
    userId: number;
    postcode: string;
    countryCode: string;
}): Promise<{ city: string; state: string } | false> => {
    try {
        const res: SuccessGenericResponse<{ city: string; state: string }> = await ApiClient.get(
            `${userType}/${userId}/travel/logistics_V3/lookup-international-postcode`,
            { params: { postcode, countryCode } }
        );
        return res.data || false;
    } catch {
        return false;
    }
};

export const fetchCountries = async ({ userType, userId }: { userType: string; userId: number }) => {
    try {
        const res: SuccessGenericResponse<{ countries: Country[] }> = await ApiClient.post(
            `${userType}/${userId}/travel/logistics_V3/fetchCountry`,
            {}
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const calculateInternationalRate = async ({
    userType,
    userId,
    ...payload
}: InternationalCalculateRatePayload) => {
    try {
        const res: SuccessGenericResponse<CalculateRateResponse> = await ApiClient.post(
            `${userType}/${userId}/travel/logistics_V3/check-international-delivery-fee`,
            payload
        );
        const { data } = res;
        return data;
    } catch (error) {
        return false;
    }
};

export const getCountriesPhoneCodeAPI = async () => {
    try {
        const resp: SuccessGenericResponse<any> = await ApiClient.get(`user/general/phone-codes`);
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};
