import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LoginState {
    token: string;
    refreshToken: string;
    sessionId: string;
    isAuthenticated?: boolean;
    role: string;
    id: number;
    username: string;
    roleName: string;
    redirectUrl: string;
    packageName: string;
    acs_user_id: string;
    corporateId?: any;
    subCorporateId?: number;
    showPrivacyPolicyModal: boolean;
}

const initialState: LoginState = {
    token: '',
    refreshToken: '',
    sessionId: '',
    isAuthenticated: false,
    role: '',
    id: 0,
    username: '',
    roleName: '',
    redirectUrl: '',
    packageName: '',
    acs_user_id: '',
    corporateId: 0,
    subCorporateId: 0,
    showPrivacyPolicyModal: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<Partial<LoginState>>) => {
            state = { ...state, ...action.payload };
            return state;
        },
        setRedirectUrl: (state, action: PayloadAction<string>) => {
            state.redirectUrl = action.payload;
            return state;
        },
        setPrivacyModalVisible: (state, action: PayloadAction<boolean>) => {
            state.showPrivacyPolicyModal = action.payload;
        },
        setLogout: state => {
            state = initialState;
            return state;
        },
    },
});

export const { loginSuccess, setLogout, setRedirectUrl, setPrivacyModalVisible } = loginSlice.actions;

export default loginSlice.reducer;
