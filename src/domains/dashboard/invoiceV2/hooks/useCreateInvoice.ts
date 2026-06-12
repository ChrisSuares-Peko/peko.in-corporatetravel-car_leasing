import { useCallback, useEffect, useState } from 'react';

import { SuccessGenericResponse } from '@customtypes/general';
import { useAppDispatch } from '@src/hooks/hooks';
import { useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import {
    createInvoice,
    getAllCustomersForSelect,
    getInvoiceById,
    updateInvoice,
} from '../api/invoices';
import { CreateInvoiceFormValues, CustomerOption } from '../types/createInvoice';
import { calcDiscount, calcSubtotal, calcTax, calcTotal } from '../utils/invoiceCalculations';

const useCreateInvoice = (invoiceId?: string) => {
    const { id, role } = useAppSelector(state => state.reducer.auth);
    const dispatch = useAppDispatch();
    const [customers, setCustomers] = useState<CustomerOption[]>([]);
    const [editInitialValues, setEditInitialValues] = useState<CreateInvoiceFormValues | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    const fetchCustomers = useCallback(async () => {
        const data: false | CustomerOption[] = await getAllCustomersForSelect({
            userId: id,
            userType: role,
        });
        if (!data) {
            dispatch(
                showToast({
                    description: 'Something went wrong while fetching customers.',
                    variant: 'error',
                })
            );
        } else {
            setCustomers(data);
        }
    }, [dispatch, id, role]);

    const fetchInvoice = useCallback(async () => {
        if (!invoiceId) return;
        setIsLoading(true);
        const data = await getInvoiceById({ userId: id, userType: role, invoiceId });
        if (!data) {
            dispatch(showToast({ description: 'Failed to load invoice.', variant: 'error' }));
        } else {
            setEditInitialValues({
                buyer: {
                    customerId: data.customerId,
                    name: data.name,
                    gstNumber: data.gstNumber,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pincode,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    saveCustomer: false,
                },
                invoice: {
                    type: data.invoiceType as 'DOMESTIC' | 'INTERNATIONAL',
                    invoicePrefix: data.prefix || '',
                    invoiceNumber: data.invoiceNumber,
                    currency: data.currency,
                    invoiceDate: data.invoiceDate,
                    dueDate: data.dueDate,
                },
                items: data.items,
                additional: {
                    termsAndConditions: data.termsAndConditions,
                    notes: data.notes,
                    shippingCost: data.shippingCost,
                    amountPaid: data.amountPaid,
                    paymentMode: data.paymentMode,
                },
            });
        }
        setIsLoading(false);
    }, [invoiceId, id, role, dispatch]);

    const buildPayload = useCallback(
        (payload: CreateInvoiceFormValues) => {
            const { type: invoiceType, invoicePrefix: prefix, ...invoiceRest } = payload.invoice;
            return {
                userId: id,
                userType: role,
                ...payload.buyer,
                invoiceType,
                prefix,
                ...invoiceRest,
                items: payload.items,
                ...payload.additional,
                subtotal: calcSubtotal(payload.items),
                discount: calcDiscount(payload.items),
                tax: calcTax(payload.items),
                totalAmount: calcTotal(payload.items, payload.additional.shippingCost),
            };
        },
        [id, role]
    );

    const handleInvoice = useCallback(
        async (payload: CreateInvoiceFormValues, onSuccess?: (id: string) => void) => {
            setIsLoading(true);
            const builtPayload = buildPayload(payload);
            const resp: false | SuccessGenericResponse<{ id: string }> = invoiceId
                ? await updateInvoice({ ...builtPayload, invoiceId })
                : await createInvoice(builtPayload);

            if (resp && resp.status) {
                dispatch(
                    showToast({
                        description: invoiceId
                            ? 'Invoice updated successfully'
                            : 'Invoice generated successfully',
                        variant: 'success',
                    })
                );
                onSuccess?.(resp.data?.id ?? invoiceId ?? '');
            } else if (resp && !resp.status) {
                dispatch(showToast({ description: resp.message, variant: 'error' }));
            }
            setIsLoading(false);
        },
        [dispatch, invoiceId, buildPayload]
    );

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    useEffect(() => {
        fetchInvoice();
    }, [fetchInvoice]);

    return { customers, editInitialValues, isLoading, handleInvoice };
};

export default useCreateInvoice;
