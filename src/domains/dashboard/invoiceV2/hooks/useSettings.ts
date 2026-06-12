import { useCallback, useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '@src/hooks/hooks';
import { useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import { getSettingsApi, saveSettingsApi } from '../api/invoices';
import { DEFAULT_DOCUMENT_PREFIXES } from '../constants/settings';
import {
    BusinessDetailsValues,
    DocumentSettingsValues,
    SettingsFormValues,
} from '../types/settings';
import { fileToPayload } from '../utils/helperFunctions';
import { prefixArrayToRecord, prefixRecordToArray } from '../utils/settingsUtils';

const useSettings = ({ autoFetch = true } = {}) => {
    const { id, role } = useAppSelector(state => state.reducer.auth);
    const dispatch = useAppDispatch();

    const [settings, setSettings] = useState<SettingsFormValues | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const hasFetched = useRef(false);

    const fetchSettings = useCallback(async (force = false) => {
        if (hasFetched.current && !force) return;
        setIsLoading(true);
        const resp = await getSettingsApi({ userId: id, userType: role });
        if (resp && resp.status) {
            hasFetched.current = true;
            const d = resp.data;

            setSettings({
                businessName: d.businessName || '',
                address: d.address || '',
                city: d.city || '',
                state: d.state || '',
                pincode: d.pincode || '',
                phone: d.phoneNumber || '',
                email: d.email || '',
                gstNo: d.gstNo || '',
                selectedDocumentType: 'Invoice',
                autoUpdateDocNumber: d.autoUpdateDocumentNumber ?? true,
                documentPrefixes: d.documentNumberPrefix?.length
                    ? prefixArrayToRecord(d.documentNumberPrefix)
                    : DEFAULT_DOCUMENT_PREFIXES,
                termsAndConditions: d.termsAndConditions || '',
                notes: d.notes || '',
                logo: null,
                signature: null,
                logoUrl: d.logoUrl || null,
                signatureUrl: d.signatureUrl || null,
            });
        } else if (resp && !resp.status) {
            dispatch(showToast({ description: resp.message, variant: 'error' }));
        }
        setIsLoading(false);
    }, [id, role, dispatch]);

    const saveSettings = useCallback(
        async (values: {
            businessDetails: BusinessDetailsValues;
            documentSettings: DocumentSettingsValues;
        }) => {
            setIsLoading(true);
            const { businessDetails: b, documentSettings: d } = values;
            const [logo, signature] = await Promise.all([
                d.logo instanceof File ? fileToPayload(d.logo) : undefined,
                d.signature instanceof File ? fileToPayload(d.signature) : undefined,
            ]);
            const resp = await saveSettingsApi({
                userId: id,
                userType: role,
                businessName: b.businessName ?? '',
                address: b.address ?? '',
                city: b.city ?? '',
                state: b.state ?? '',
                pincode: b.pincode ?? '',
                phoneNumber: b.phone,
                email: b.email ?? '',
                gstNo: b.gstNo || undefined,
                autoUpdateDocumentNumber: d.autoUpdateDocNumber,
                termsAndConditions: d.termsAndConditions || undefined,
                notes: d.notes || undefined,
                logo,
                signature,
                removeLogo: d.removeLogo || undefined,
                removeSignature: d.removeSignature || undefined,
                documentPrefixes: d.documentPrefixes
                    ? prefixRecordToArray(d.documentPrefixes)
                    : undefined,
            });
            if (resp && resp.status) {
                dispatch(
                    showToast({ description: 'Settings saved successfully.', variant: 'success' })
                );
                fetchSettings(true);
            } else if (resp && !resp.status) {
                dispatch(showToast({ description: resp.message, variant: 'error' }));
            }
            setIsLoading(false);
        },
        [id, role, dispatch, fetchSettings]
    );

    useEffect(() => {
        if (autoFetch) fetchSettings();
    }, [fetchSettings, autoFetch]);

    return { settings, saveSettings, isLoading, fetchSettings };
};

export default useSettings;
