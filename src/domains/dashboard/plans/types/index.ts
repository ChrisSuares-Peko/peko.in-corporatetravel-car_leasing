export interface PackagePrices {
    monthly: string;
    annually: string;
}

export enum PlanType {
    Monthly = 'monthly',
    Annually = 'annually',
}

export enum SubscriptionType {
    Current = 'CURRENT',
    Upgrade = 'UPGRADE',
    Downgrade = 'DOWNGRADE',
}

interface Discount {
    monthly: number;
    annually: number;
}

export interface ServicePackage {
    id: number;
    packageName: string;
    packagePrices: PackagePrices;
    description: string;
    serviceList: string;
    discount: Discount;
    services: string[];
    priorityLevel: number;
    packageLogo: string;
    individualPackages: {
        [key: string]: string;
    };
}

export interface PackagesData {
    packages: ServicePackage[];
    currentPackageId: number;
    currentPlanPriorityLevel: number;
}

export interface PackageDetails {
    id: number;
    packageName: string;
    packagePrices: PackagePrices;
    description: string;
    serviceList: string;
    discount: Discount;
}

interface DiscountDetails {
    price: number;
    message: string;
}

export interface PackageDetailsResponse {
    packageDetails: PackageDetails;
    discount: DiscountDetails;
    annualAddonPrice: number;
    monthlyAddonPrice: number;
}

export interface AddressFormValues {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    flatNO: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
}

export interface PaymentRequestPayload {
    amount: number;
    packageId: number;
    billingType: string;
    accessKey?: string;
    pgAmount?: number;
    successUrl: string;
    failureUrl: string;
    currentUrl: string;
    billingAddress?: AddressFormValues;
    couponCode?: string;
}

export interface AddOnPaymentRequestPayload {
    isAddOns: boolean;
    pgAmount: number;
    addonsAccessKey: string;
    packageId: number;
    quantity: number;
    accessKey: string;
    successUrl: string;
    failureUrl: string;
    currentUrl: string;
}

export interface userPayload {
    userType: string;
    userId: number;
}

export type PaymentResponse = {
    corporateFinalBalance: string;
    corporateCashback: string;
    orderId: number;
    datetime: string;
    amount: number;
    corporateTxnId: number;
};

export type PaytmCreateOrderResponse = {
    amount: string;
    orderId: number;
    session_id: string;
};

export type DynamicNumberObject = {
    [key: string]: number;
};

export interface TableData {
    groupPackages: DynamicNumberObject;
    individualPackages: DynamicNumberObject;
    groupPackageDiscounts: DynamicNumberObject;
}

export type TableDataPackages = {
    tableData: TableData;
};

export type SelectedType = 'monthly' | 'annually';

export type DiscountResult = {
    discountedAmount: number;
    discountPercentage: number;
};

export type MaxDiscountResult = {
    maxMonthlyDiscountPercentage: number;
    maxAnnualDiscountPercentage: number;
};

export type UsePaymentApiProps = {
    setCheckoutJsInstance: React.Dispatch<React.SetStateAction<any>>;
    checkoutJsInstance: any;
};

export type PaymentGeneric = {
    accessKey?: string;
    successUrl?: string;
    failureUrl?: string;
    amount?: number | string;
    total?: number;
    [key: string]: number | string | Object | undefined | null;
};

export interface ApplyCouponPayload {
    amount: number;
    couponCode: string;
    packageId?: number;
    accessKey?: string;
    billingType?: string;
}

export type ApplyCouponResponse = {
    originalAmount: string;
    discountAmount: number;
    finalAmount: number;
};

export enum SubscriptionPaymentMode {
    voucherCode = 'VOUCHER',
    card = 'CARD',
}

type SubscriptionPackage = {
    packageName: string;
    accessCode: string;
};

export type SubscriptionDetailsResponse = {
    billingType: string;
    subscriptionAmountPaid: string; 
    subscriptionPrice: string;
    status: string;
    package: SubscriptionPackage;
};
