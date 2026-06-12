import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '@src/hooks/hooks';
import { useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import {
    addBankAccountApi,
    deleteBankAccountApi,
    editBankAccountApi,
    getBankAccountsApi,
    setPrimaryBankAccountApi,
} from '../../api/manageBankAccount';
import { AddDomesticAccountFormValues, DomesticAccount } from '../../types/ManageBankAccounts';

let cachedAccounts: DomesticAccount[] | null = null;

const useDomesticAccounts = () => {
    const { id, role } = useAppSelector(state => state.reducer.auth);
    const dispatch = useAppDispatch();
    const [accounts, setAccounts] = useState<DomesticAccount[]>(cachedAccounts ?? []);
    const [isLoading, setIsLoading] = useState(!cachedAccounts);

    const fetchData = useCallback(async () => {
        if (!cachedAccounts) setIsLoading(true);
        const resp = await getBankAccountsApi({ userId: id, userType: role });
        if (resp && resp.status) {
            cachedAccounts = resp.data ?? [];
            setAccounts(cachedAccounts);
        } else if (resp && !resp.status) {
            dispatch(showToast({ description: resp.message, variant: 'error' }));
        }
        setIsLoading(false);
    }, [id, role, dispatch]);

    const addDomesticAccount = useCallback(
        async (values: AddDomesticAccountFormValues, onSuccess?: () => void) => {
            setIsLoading(true);
            const resp = await addBankAccountApi({ userId: id, userType: role, ...values });
            if (resp && resp.status) {
                dispatch(
                    showToast({
                        description: 'Bank account added successfully.',
                        variant: 'success',
                    })
                );
                onSuccess?.();
                fetchData();
            } else if (resp && !resp.status) {
                dispatch(showToast({ description: resp.message, variant: 'error' }));
            }
            setIsLoading(false);
        },
        [id, role, dispatch, fetchData]
    );

    const editDomesticAccount = useCallback(
        async (accountId: string, values: AddDomesticAccountFormValues, onSuccess?: () => void) => {
            setIsLoading(true);
            const resp = await editBankAccountApi({
                userId: id,
                userType: role,
                accountId,
                ...values,
            });
            if (resp && resp.status) {
                dispatch(
                    showToast({
                        description: 'Bank account updated successfully.',
                        variant: 'success',
                    })
                );
                onSuccess?.();
                fetchData();
            } else if (resp && !resp.status) {
                dispatch(showToast({ description: resp.message, variant: 'error' }));
            }
            setIsLoading(false);
        },
        [id, role, dispatch, fetchData]
    );

    const setAsPrimary = useCallback(
        async (accountId: string) => {
            const resp = await setPrimaryBankAccountApi({ userId: id, userType: role, accountId });
            if (resp && resp.status) {
                dispatch(
                    showToast({ description: 'Primary account updated.', variant: 'success' })
                );
                fetchData();
            } else if (resp && !resp.status) {
                dispatch(showToast({ description: resp.message, variant: 'error' }));
            }
        },
        [id, role, dispatch, fetchData]
    );

    const deleteDomesticAccount = useCallback(
        async (accountId: string, onSuccess?: () => void) => {
            const resp = await deleteBankAccountApi({ userId: id, userType: role, accountId });
            if (resp && resp.status) {
                dispatch(
                    showToast({
                        description: 'Bank account deleted successfully.',
                        variant: 'success',
                    })
                );
                onSuccess?.();
                fetchData();
            } else if (resp && !resp.status) {
                dispatch(showToast({ description: resp.message, variant: 'error' }));
            }
        },
        [id, role, dispatch, fetchData]
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        accounts,
        isLoading,
        fetchData,
        addDomesticAccount,
        editDomesticAccount,
        deleteDomesticAccount,
        setAsPrimary,
    };
};

export default useDomesticAccounts;
