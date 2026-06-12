import { useState, useEffect, useCallback } from 'react';

import { saveAs } from 'file-saver';

import { useAppDispatch } from '@src/hooks/hooks';
import { useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import { downloadInvoicePdfApi, getInvoiceById } from '../../api/invoices';
import { GetInvoiceByIdResponse } from '../../types/invoice';

const getPdfBufferData = (data: any): number[] | undefined =>
    data?.pdfBuffer?.data ?? data?.buffer?.data;

const useInvoiceDetails = (id?: string) => {
    const { id: userId, role } = useAppSelector(state => state.reducer.auth);
    const dispatch = useAppDispatch();
    const [invoiceData, setInvoiceData] = useState<GetInvoiceByIdResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [pdfPreview, setPdfPreview] = useState<string | null>(null);
    const fetchPdfPreview = useCallback(
        async (invoiceId: string) => {
            setIsPreviewLoading(true);
            const resp = await downloadInvoicePdfApi({ userId, userType: role, invoiceId });
            try {
                if (!resp || !resp.status) {
                    setPdfPreview(prev => {
                        if (prev) URL.revokeObjectURL(prev);
                        return null;
                    });
                    return;
                }
                const bufferData = getPdfBufferData(resp.data);
                if (!bufferData) {
                    setPdfPreview(prev => {
                        if (prev) URL.revokeObjectURL(prev);
                        return null;
                    });
                    return;
                }

                const bytes = new Uint8Array(bufferData);
                const blob = new Blob([bytes], { type: resp.data.fileType || 'application/pdf' });
                const nextUrl = URL.createObjectURL(blob);

                setPdfPreview(prev => {
                    if (prev) URL.revokeObjectURL(prev);
                    return nextUrl;
                });
            } finally {
                setIsPreviewLoading(false);
            }
        },
        [userId, role]
    );

    const fetchInvoice = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setInvoiceData(null);
        setPdfPreview(prev => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
        const data = await getInvoiceById({ userId, userType: role, invoiceId: id });
        if (!data) {
            dispatch(
                showToast({ description: 'Failed to load invoice details.', variant: 'error' })
            );
        } else {
            setInvoiceData(data);
            fetchPdfPreview(id);
        }
        setIsLoading(false);
    }, [id, userId, role, dispatch, fetchPdfPreview]);

    const downloadPdf = useCallback(
        async (invoiceId?: string) => {
            if (!invoiceId) return;
            setIsDownloading(true);
            const resp = await downloadInvoicePdfApi({
                userId,
                userType: role,
                invoiceId,
                type: 'download',
            });
            if (resp && resp.status) {
                const bufferData = getPdfBufferData(resp.data);
                if (!bufferData) {
                    setIsDownloading(false);
                    return;
                }
                const arrayBuffer = new Uint8Array(bufferData);
                const blob = new Blob([arrayBuffer], {
                    type: resp.data.fileType || 'application/pdf',
                });
                saveAs(blob, `invoice-${invoiceId}.pdf`);
            } else if (resp && !resp.status) {
                dispatch(showToast({ description: resp.message, variant: 'error' }));
            }
            setIsDownloading(false);
        },
        [userId, role, dispatch]
    );

    useEffect(() => {
        fetchInvoice();
    }, [fetchInvoice]);

    useEffect(
        () => () => {
            if (pdfPreview) {
                URL.revokeObjectURL(pdfPreview);
            }
        },
        [pdfPreview]
    );

    return {
        invoiceData,
        isLoading,
        isPreviewLoading,
        downloadPdf,
        isDownloading,
        pdfUrl: pdfPreview,
    };
};

export default useInvoiceDetails;
