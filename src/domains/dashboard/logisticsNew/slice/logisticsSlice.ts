import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DropDown } from '@customtypes/general';

import { DeliveryCompanyOption } from '../types';

interface ShipmentDetailsPayload {
    originCity?: Partial<{
        city: string;
        state: string;
        countryName: string;
        countryCode: string;
    }>;
    destinationCity?: Partial<{
        city: string;
        state: string;
        countryName: string;
        countryCode: string;
    }>;
    originPostCode?: string;
    destinationPostCode?: string;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    isReturn?: boolean;
    deliveredTxnId?: string;
}
type PartialSearch = Partial<{
    originCity: Partial<{ searchtext: string; value: string; options: DropDown }>;
    destinationCity: Partial<{ searchtext: string; value: string; options: DropDown }>;
}>;
type OriginAddressPayload = Partial<{
    senderName: string;
    senderAddressLine: string;
    senderZipCode: string;
    senderPhone: string;
    senderAddressId: number | null;
}>;

type DestinationAddressPayload = Partial<{
    receiverName: string;
    receiverPhone: string;
    receiverAddressLine: string;
    receiverZipCode: string;
    receiverPhoneCode: string;
    receiverAddressId: number | null;
}>;
type Item = {
    name: string;
    price: string;
    quantity: string;
};
type ItemsPayload = {
    items: Item[];
};

interface LogisticsState {
    shipmentType: 'domestic' | 'international';
    shipmentDetails: {
        originCity?: Partial<{
            city: string;
            state: string;
            countryName: string;
            countryCode: string;
        }>;
        destinationCity?: Partial<{
            city: string;
            state: string;
            countryName: string;
            countryCode: string;
        }>;
        originPostCode: string;
        destinationPostCode: string;
        weight: number;
        length: number;
        width: number;
        height: number;
        isReturn: boolean;
        deliveredTxnId: string;
    };
    searchDetails: {
        originCity: {
            searchtext: string;
            value: string;
            options: DropDown;
        };
        destinationCity: {
            searchtext: string;
            value: string;
            options: DropDown;
        };
    };
    selectedDeliveryCompany: DeliveryCompanyOption | null;
    originAddress: {
        senderName: string;
        senderAddressLine: string;
        senderZipCode: string;
        senderPhone: string;
        senderAddressId: number | null;
    };
    destinationAddress: {
        receiverName: string;
        receiverPhone: string;
        receiverAddressLine: string;
        receiverZipCode: string;
        receiverPhoneCode: string;
        receiverAddressId: number | null;
    };
    items: Item[];
}

const initialState: LogisticsState = {
    shipmentType: 'domestic',
    shipmentDetails: {
        originCity: {
            city: '',
            state: '',
            countryName: '',
            countryCode: '',
        },
        destinationCity: {
            city: '',
            state: '',
            countryName: '',
            countryCode: '',
        },
        originPostCode: '',
        destinationPostCode: '',
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        isReturn: false,
        deliveredTxnId: '',
    },
    searchDetails: {
        originCity: {
            searchtext: '',
            value: '',
            options: [],
        },
        destinationCity: {
            searchtext: '',
            value: '',
            options: [],
        },
    },
    selectedDeliveryCompany: null,
    originAddress: {
        senderName: '',
        senderAddressLine: '',
        senderZipCode: '',
        senderPhone: '',
        senderAddressId: null,
    },
    destinationAddress: {
        receiverName: '',
        receiverPhone: '',
        receiverAddressLine: '',
        receiverZipCode: '',
        receiverPhoneCode: '',
        receiverAddressId: null,
    },
    items: [
        {
            name: '',
            price: '',
            quantity: '',
        },
    ],
};

const logisticsSlice = createSlice({
    name: 'logisticsV3',
    initialState,
    reducers: {
        updateShipmentDetails: (state, action: PayloadAction<ShipmentDetailsPayload>) => {
            const { originCity, destinationCity, ...rest } = action.payload;
            state.shipmentDetails = {
                ...state.shipmentDetails,
                ...rest,

                originCity: {
                    ...state.shipmentDetails.originCity,
                    ...(originCity || {}),
                },

                destinationCity: {
                    ...state.shipmentDetails.destinationCity,
                    ...(destinationCity || {}),
                },
            };
        },
        updateSearchDetails: (state, action: PayloadAction<PartialSearch>) => {
            state.searchDetails = {
                ...state.searchDetails,
                originCity: {
                    ...state.searchDetails.originCity,
                    ...(action.payload.originCity || {}),
                },
                destinationCity: {
                    ...state.searchDetails.destinationCity,
                    ...(action.payload.destinationCity || {}),
                },
            };
        },
        setSelectedDeliveryCompany: (
            state,
            action: PayloadAction<DeliveryCompanyOption | null>
        ) => {
            state.selectedDeliveryCompany = action.payload;
        },
        updateOriginAddress: (state, action: PayloadAction<OriginAddressPayload>) => {
            state.originAddress = {
                ...state.originAddress,
                ...action.payload,
            };
        },
        updateDestinationAddress: (state, action: PayloadAction<DestinationAddressPayload>) => {
            state.destinationAddress = {
                ...state.destinationAddress,
                ...action.payload,
            };
        },
        updateItems: (state, action: PayloadAction<ItemsPayload>) => {
            state.items = action.payload.items;
        },
        setShipmentType: (state, action: PayloadAction<'domestic' | 'international'>) => {
            state.shipmentType = action.payload;
        },
        resetLogisticsState: () => initialState,
    },
});

export const {
    updateShipmentDetails,
    setSelectedDeliveryCompany,
    updateSearchDetails,
    resetLogisticsState,
    updateOriginAddress,
    updateDestinationAddress,
    updateItems,
    setShipmentType,
} = logisticsSlice.actions;

export default logisticsSlice.reducer;
