export type DomesticAccount = {
    id: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    currency: string;
    isPrimary: boolean;
    accountType: 'Savings' | 'Current';
    branchName?: string;
};

export type VirtualAccount = {
    id: string;
    name: string;
    bankName: string;
    accountNumber: string;
    swiftCode?: string;
    ifsc?: string;
    iban?: string;
    currency: string;
    type: 'International' | 'Domestic';
};

export type VirtualAccountResponse = {
    id: number;
    status: string;
    activatedAt: string | null;
    businessName: string | null;
    bankName: string | null;
    accountNumber: string | null;
    ifsc: string | null;
    virtualAccountNumber: string | null;
    virtualIfsc: string | null;
};

export type EscrowAccount = {
    id: string;
    name: string;
    bankName: string;
    accountNumber: string;
    swiftCode: string;
    currency: string;
};

export type AddDomesticAccountFormValues = {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    currency: string;
    ifscCode: string;
    accountType: 'Savings' | 'Current';
    branchName?: string;
};
