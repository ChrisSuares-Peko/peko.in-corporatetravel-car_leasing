import { useState, useEffect, useCallback } from 'react';

import { useAppDispatch } from '@src/hooks/hooks';
import { useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import { getAllInvoices, deleteInvoiceApi, getDashboardStats } from '../api/invoices';
import { DashboardStats } from '../types/dashboard';
import { GetAllInvoicesPayload, GetAllInvoicesResponse } from '../types/invoice';

const useInvoice = (filters: GetAllInvoicesPayload) => {
    const { id, role } = useAppSelector(state => state.reducer.auth);
    const dispatch = useAppDispatch();

    const [invoiceList, setInvoiceList] = useState<GetAllInvoicesResponse>();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const fetchStats = useCallback(async () => {
        const resp = await getDashboardStats({ userId: id, userType: role });
        if (resp && resp.status) {
            setStats(resp.data);
        }
    }, [id, role]);

    const fetchInvoiceList = useCallback(async () => {
        setIsLoading(true);
        const data = await getAllInvoices({ userId: id, userType: role, ...filters });
        if (!data) {
            dispatch(
                showToast({
                    description: 'Something went wrong while fetching invoices.',
                    variant: 'error',
                })
            );
        } else {
            setInvoiceList(data);
        }
        setRefresh(false);
        setIsLoading(false);
    }, [dispatch, id, role, filters]);

    const deleteInvoice = useCallback(
        async (invoiceId: string) => {
            setIsDeleting(true);
            const resp = await deleteInvoiceApi({ userId: id, userType: role, invoiceId });
            if (resp && resp.status) {
                dispatch(
                    showToast({ description: 'Invoice deleted successfully', variant: 'success' })
                );
                setRefresh(true);
            } else if (resp && !resp.status) {
                dispatch(showToast({ description: resp.message, variant: 'error' }));
            }
            setIsDeleting(false);
        },
        [dispatch, id, role]
    );

    useEffect(() => {
        fetchInvoiceList();
        fetchStats();
    }, [fetchInvoiceList, fetchStats, refresh]);

    return { invoiceList, stats, isLoading, isDeleting, setRefresh, deleteInvoice };
};

export default useInvoice;
