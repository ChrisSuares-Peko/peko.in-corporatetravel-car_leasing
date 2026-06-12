export interface RecentPayout {
    key: number;
    name: string;
    category: string;
    date: string;
    amount: string;
    status: string;
}

export interface PayoutDashboardData {
    totalPayoutsThisMonth: number;
    activeBeneficiaries: number;
    billsThisMonth: number;
    recentPayouts: RecentPayout[];
}

export interface FetchDashboardResponse {
    status: boolean;
    message: string;
    responseCode: string;
    data: PayoutDashboardData;
}

export type BeneficiaryPaymentCategory = 'RENT' | 'VENDOR_PAYMENT' | 'SALARY' | 'UTILITY' | 'OTHER';

export interface AddBeneficiaryPayload {
    type: 'INDIVIDUAL' | 'BUSINESS';
    name: string;
    email?: string;
    mobile?: string;
    accountNumber: string;
    ifscCode: string;
    bankName?: string;
    branchName?: string;
    upiId?: string;
    panNumber?: string;
    address?: string;
    transferMode?: 'ACCOUNT_TRANSFER' | 'UPI';
    decentroBeneficiaryId?: string;
    paymentCategory?: BeneficiaryPaymentCategory;
}

export interface Beneficiary extends AddBeneficiaryPayload {
    id: number;
    credentialId: string;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
}

export interface GetBeneficiariesParams {
    status?: 'ACTIVE' | 'INACTIVE';
    searchText?: string;
}

export interface GetBeneficiariesResponse {
    status: boolean;
    message: string;
    responseCode: string;
    data: Beneficiary[];
}

export interface AddBeneficiaryResponse {
    status: boolean;
    message: string;
    responseCode: string;
    data: Beneficiary;
}

export interface AddDomesticBankAccountPayload {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    currency: string;
    accountType?: string;
    branchName?: string;
}

export interface RentBillPayload {
    beneficiaryId: number;
    landlordName: string;
    propertyAddress: string;
    rentPeriod: string;
    dueDate: string;
    rentAmount: number;
    maintenanceCharges?: number;
    leaseAgreementNumber?: string;
    notes?: string;
    attachment?: string;
}

export interface RentBillResponse {
    id: number;
    credentialId: number;
    payoutBeneficiaryId: number;
    landlordName: string;
    rentAmount: number;
    totalAmount: number;
    status: string;
    createdAt: string;
}

export interface PendingRentPayout {
    rentBillId: number;
    beneficiaryId: number;
    amount: number;
    payeeName: string;
    createdAt: string;
    category: string;
}

export interface OtherBillPayload {
    beneficiaryId: number;
    billTitle: string;
    payeeName: string;
    billReferenceNumber?: string;
    dueDate: string;
    description: string;
    totalAmount: number;
    notes?: string;
    attachment?: string;
}

export interface OtherBillResponse {
    id: number;
    credentialId: number;
    payoutBeneficiaryId: number;
    billTitle: string;
    payeeName: string;
    totalAmount: number;
    status: string;
    createdAt: string;
}

export interface PayoutTransferPayload {
    rentBillId: number;
    beneficiaryId: number;
    amount: number;
    transferType: string;
    category: string;
    bankName?: string;
    accountNumber?: string;
    ifsc?: string;
    virtualAccountNumber?: string;
}

export interface PayoutTransferResponse {
    // pending/initiated fields
    transactionId?: number;
    referenceId?: string;
    // success fields
    status?: string;
    responseCode?: string;
    transferType?: string;
    bankReferenceNumber?: string;
    beneficiaryName?: string;
    newBalance?: number;
    providerResponse?: string;
    // common
    decentroTxnId?: string;
    transactionStatus: string;
}

export interface PayoutBeneficiary {
    name: string;
    bankName: string | null;
    accountNumber: string;
}

export interface PayoutTransaction {
    id: number;
    category: string;
    amount: string;
    payeeName: string;
    remarks: string | null;
    status: string;
    referenceId: string;
    decentroTxnId: string | null;
    transactionDate: string;
    transferType: string | null;
    createdAt: string;
    updatedAt: string;
    credentialId: number;
    payoutBeneficiaryId: number;
    payoutBeneficiary: PayoutBeneficiary;
}

export interface GetAllPayoutsParams {
    page?: number;
    itemsPerPage?: number;
    searchText?: string;
    status?: string;
}

export interface GetAllPayoutsResponse {
    status: boolean;
    message: string;
    responseCode: string;
    data: PayoutTransaction[];
    pagination: {
        total: number;
        page: number;
        itemsPerPage: number;
        totalPages: number;
    };
}

export interface DomesticBankAccount {
    id: number;
    name?: string;
    accountHolderName?: string;
    isPrimary?: boolean;
    accountNumber: string;
    ifscCode: string;
    bankName?: string;
    currency: string;
    accountType?: string;
    branchName?: string;
    status?: string;
}


export type OnboardingRecord ={
    id: number;
    credentialId: number;
    status: 'pending' | 'active' | 'suspended' | 'rejected';
    businessName: string;
    bankName: string | null;
    accountNumber: string | null;
    ifsc: string | null;
    virtualAccountId: string | null;
    virtualAccountNumber: string | null;
    virtualIfsc: string | null;
    consentAcceptedAt: string | null;
    activatedAt: string | null;
    createdAt: string;
    updatedAt: string;
}


export interface Step1Payload {
    userId: string | number;
    userType: string;
    businessName: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
}
 
export interface Step2Payload {
    userId: string | number;
    userType: string;
    consentAccepted: true;
}

export interface VerifyBankResponse {
    match: boolean;
    bankNameFromIfsc: string | null;
}