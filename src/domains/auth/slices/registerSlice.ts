import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RegisterUserState } from '../types/index';

const initialState = {
    step: 1,
    formData: {
        name: '',
        contactPersonName: '',
        phonenumber: '',
        email: '',
        password: '',
        referralCode: '',
         privacyPolicyAccepted: false,
        platformAgreementAccepted: false,
        marketingConsent: false,
    },
    loginData: {
        token: '',
        refreshToken: '',
        role: '',
        id: 0,
        username: '',
        roleName: '',
    },
    EmailVerificationData: {
        email: '',
        id: '',
    },
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        nextStep: state => {
            state.step += 1;
        },
        previousStep: (state, action: PayloadAction<number | undefined>) => {
            if (action.payload !== undefined) {
                state.step = action.payload;
            } else {
                state.step -= 1;
            }
        },
        setFormData: (state, action: PayloadAction<RegisterUserState>) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        setLoginData: (state, action: PayloadAction<RegisterUserState>) => {
            state.loginData = { ...state.loginData, ...action.payload };
        },
        setEmailVerificationData: (state, action: PayloadAction<RegisterUserState>) => {
            state.EmailVerificationData = { ...state.EmailVerificationData, ...action.payload };
        },
        resetRegisterState: () => initialState,
    },
});

export const {
    nextStep,
    previousStep,
    setFormData,
    resetRegisterState,
    setLoginData,
    setEmailVerificationData,
} = registrationSlice.actions;
export default registrationSlice.reducer;
