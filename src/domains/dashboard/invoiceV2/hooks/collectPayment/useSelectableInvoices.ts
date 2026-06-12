import { useCallback, useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '@src/hooks/hooks';
import { useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import { getAllInvoices } from '../../api/invoices';
import { InvoiceRow } from '../../types/invoice';

const useSelectableInvoices = (enabled = false) => {
    const { id, role } = useAppSelector(state => state.reducer.auth);
    const dispatch = useAppDispatch();
    const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPending, setTotalPending] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const hasFetched = useRef(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const data = await getAllInvoices({
            userId: id,
            userType: role,
            sort: 'DESC',
            sortField: 'createdAt',
            searchText: '',
            page: 1,
            status: 'Pending,Overdue',
            itemsPerPage: 999,
        });
        if (!data) {
            dispatch(
                showToast({
                    description: 'Something went wrong while fetching invoices.',
                    variant: 'error',
                })
            );
        } else {
            setInvoices(data.invoiceData);
            setTotalPending(data.recordsTotal);
        }
        setIsLoading(false);
    }, [id, role, dispatch]);

    useEffect(() => {
        if (refresh) {
            fetchData();
            setRefresh(false);
            return;
        }
        if (!enabled || hasFetched.current) return;
        hasFetched.current = true;
        fetchData();
    }, [fetchData, refresh, enabled]);

    return { invoices, isLoading, totalPending, setRefresh };
};

export default useSelectableInvoices;
