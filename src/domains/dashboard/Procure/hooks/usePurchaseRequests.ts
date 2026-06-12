import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '@src/hooks/store';

import { getPurchaseRequests, PurchaseRequestFilters } from '../api';
import { purchaseRequestsData } from '../utils/data';

export const usePurchaseRequests = ({ searchText, status, from, to, page, itemsPerPage }: PurchaseRequestFilters) => {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState<any[]>([]);
    const [count, setCount] = useState(0);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const data: any = await getPurchaseRequests({ userType: role, userId: String(id), searchText, status, from, to, page, itemsPerPage });
        if (data) {
            setTableData(data.rows ?? data);
            setCount(data.recordsTotal ?? data.length ?? 0);
        } else {
            setTableData(purchaseRequestsData);
            setCount(purchaseRequestsData.length);
        }
        setIsLoading(false);
    }, [id, role, searchText, status, from, to, page, itemsPerPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { isLoading, tableData, count };
};
