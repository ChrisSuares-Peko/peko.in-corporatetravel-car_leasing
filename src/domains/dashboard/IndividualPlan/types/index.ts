export interface PackagePrice {
    monthly: string;
    annually: string;
}

export interface Discount {
    monthly: number;
    annually: number;
}

export interface PackageDetails {
    id: number;
    packageName: string;
    packagePrices: PackagePrice;
    description: string;
    discount: Discount;
}

export interface SubscriptionDetailsResponse {
    packageDetails: PackageDetails[];
    isPurchased: boolean;
    previousSubscription: PreviousSubscription;
}

export interface PreviousSubscription {
    billingType: 'MONTHLY' | 'ANNUALLY';
    status: 'EXPIRED';
    packageId: number;
    packageName: string;
    packageType?: string;
    subscriptionId?: number;
}

export interface ISubscriptionDetailsPayload {
    accessKey?: string;
    packageName?: string;
}

export interface featureType {
    icon: string;
    title: string;
    description: string;
}
