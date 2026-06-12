export type CustomerStats = {
    totalCustomers: number;
    activeCustomers: number;
    totalRevenue: number;
    avgTransaction: number;
};

export type TopCustomerBase = {
    id: number;
    rank: number;
    name: string;
    transactionCount: number;
    totalRevenue: number;
    changePercent?: number;
    percentOfTotal?: number;
};

export type CustomerDashboardResponse = {
    totalCustomers: number;
    activeCustomers: number;
    totalRevenue: number;
    avgTransaction: number;
    topByRevenue: TopCustomerBase[];
    topByTransactions: TopCustomerBase[];
};

export type BankAccountFormValues = {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    swiftCode: string;
    iban?: string;
};

export type AddCustomerFormValues = {
    name: string;
    gstin?: string;
    phoneNumber: string;
    email: string;
    upiId?: string;
    primaryAddress: string;
    primaryCity: string;
    primaryState: string;
    primaryPincode: string;
    primaryCountry: string;
    shippingSameAsPrimary?: boolean;
    shippingAddress?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingPincode?: string;
    bankAccounts?: BankAccountFormValues[];
};

export type CustomerRow = AddCustomerFormValues & {
    id: string;
    transactions: number;
    status: 'Active' | 'Inactive';
};

export type GetAllCustomersResponse = {
    customers: CustomerRow[];
    recordsTotal: number;
};

export interface GetAllCustomersPayload {
    sort?: 'ASC' | 'DESC';
    sortField?: string;
    page?: number;
    itemsPerPage?: number;
    searchText?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
}
