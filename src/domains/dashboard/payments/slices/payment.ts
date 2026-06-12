import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { summaryTexts } from '@customtypes/general';

import { PaymentGeneric } from '../types/index';

export interface PaymentState {
    billSummary: summaryTexts[];
    paymentSummary: summaryTexts[];
    title: string;
    totalAmount: number;
    couponDiscount?: number;
    payload: PaymentGeneric | null;
    url: string | null;
    minimumAmount?: null | number;
    maximumAmount?: null | number;
    earningCashbackAmount?: null | number;
    navigatePath?: any;
}

const initialState: PaymentState = {
    billSummary: [],
    paymentSummary: [],
    title: '',
    totalAmount: 0,
    couponDiscount: 0,
    payload: null,
    url: null,
    minimumAmount: null,
    maximumAmount: null,
    navigatePath: 'dashboard',
};

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentData: (state, action: PayloadAction<PaymentState>) => {
            state = initialState;
            state = { ...state, ...action.payload };
            return state;
        },
        resetPaymentData: state => {
            state = initialState;
            return state;
        },
    },
});

export const { setPaymentData, resetPaymentData } = paymentSlice.actions;

export default paymentSlice.reducer;
