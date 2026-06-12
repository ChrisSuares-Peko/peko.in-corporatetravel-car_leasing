import { useCallback, useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '@src/hooks/hooks';
import { useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import { saveReminders } from '../../api/invoices';
import { INTERVAL_TO_DAYS } from '../../constants/invoiceDetails';
import {
    InvoiceRemindersFormValues,
    ReminderItem,
    SaveReminderPayload,
} from '../../types/invoiceDetails';

const useInvoiceReminders = (invoiceId?: string, initialReminders: ReminderItem[] = []) => {
    const { id: userId, role } = useAppSelector(state => state.reducer.auth);
    const dispatch = useAppDispatch();
    const [reminders, setReminders] = useState<ReminderItem[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const hasApiResponse = useRef(false);

    useEffect(() => {
        if (!hasApiResponse.current) {
            setReminders(initialReminders);
        }
    }, [initialReminders]);

    const callApi = useCallback(
        async (
            updated: SaveReminderPayload[],
            setLoading: (v: boolean) => void,
            onSuccess?: () => void,
            successMessage?: string
        ) => {
            if (!invoiceId) return;
            setLoading(true);
            const resp = await saveReminders({
                userId,
                userType: role,
                invoiceId,
                reminders: updated,
            });
            if (resp && resp.status) {
                hasApiResponse.current = true;
                setReminders(resp.data.reminders ?? []);
                dispatch(
                    showToast({ description: successMessage ?? resp.message, variant: 'success' })
                );
                onSuccess?.();
            } else if (resp && !resp.status) {
                dispatch(showToast({ description: resp.message, variant: 'error' }));
            }
            setLoading(false);
        },
        [invoiceId, userId, role, dispatch]
    );

    const saveReminder = useCallback(
        async (values: InvoiceRemindersFormValues, onSuccess?: () => void) => {
            const days =
                values.interval === 'custom'
                    ? Number(values.customDays)
                    : (INTERVAL_TO_DAYS[values.interval] ?? 0);

            const updated: SaveReminderPayload[] = [
                ...reminders.map(r => ({
                    reminderInterval: r.reminderInterval,
                    sendSMS: r.sendSMS,
                    sendEmail: r.sendEmail,
                })),
                {
                    reminderInterval: days,
                    sendSMS: values.sendSms ?? false,
                    sendEmail: values.sendEmail ?? false,
                },
            ];
            await callApi(updated, setIsSaving, onSuccess, 'Reminder added successfully');
        },
        [reminders, callApi, setIsSaving]
    );

    const deleteReminder = useCallback(
        async (index: number) => {
            const updated: SaveReminderPayload[] = reminders
                .filter((_, i) => i !== index)
                .map(r => ({
                    reminderInterval: r.reminderInterval,
                    sendSMS: r.sendSMS,
                    sendEmail: r.sendEmail,
                }));
            await callApi(updated, setIsDeleting, undefined, 'Reminder deleted successfully');
        },
        [reminders, callApi, setIsDeleting]
    );

    return { reminders, saveReminder, deleteReminder, isSaving, isDeleting };
};

export default useInvoiceReminders;
