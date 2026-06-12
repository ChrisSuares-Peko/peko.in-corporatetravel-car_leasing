import { OnboardingRecord } from './paymentLinkTypes';

export interface Step1Data {
    businessName: string;
    bankName?: string;
    accountNumber?: string;
    ifsc?: string;
}

export interface PanStepData {
    pan: string;
}

export interface BankStepData {
    accountNumber: string;
    bankName: string;
    ifsc: string;
    accountHolderName: string;
    phone: string;
}

export interface ActivatePaymentCollectionsProps {
    onCancel: () => void;
    onActivated: () => void;
    initialData?: OnboardingRecord | null;
    refresh: () => void;
}

export const MOCK_BUSINESS = {
    name: 'Acme Trading Pvt Ltd',
    bankName: 'HDFC Bank',
    accountMasked: '****8765',
    ifsc: 'HDFC0001234',
};

export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/i;

export const SETTLEMENT_POINTS = [
    'Payments will be settled to your registered bank account within T+1 business days',
    'Transaction charges apply as per your pricing plan',
    'You will receive email notifications for all successful payments',
];
