import { ApiClient } from '@src/services/config';

type UserBase = { userType: string; userId: string };

export type PurchaseRequestFilters = {
    searchText?: string;
    status?: string;
    from?: string;
    to?: string;
    page: number;
    itemsPerPage: number;
};

export const getPurchaseRequests = async ({ userType, userId, ...params }: UserBase & PurchaseRequestFilters) => {
    try {
        const data: any = await ApiClient.get(`${userType}/${userId}/procure/purchase-requests`, { params });
        return data;
    } catch {
        return false;
    }
};
