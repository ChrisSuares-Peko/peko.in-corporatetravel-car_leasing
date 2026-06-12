import { useState, useCallback } from 'react';

import { saveAs } from 'file-saver';

import { downloadInvoice } from '../../api/subscription';
import { downloadResponse } from '../../types/subscription';

export const useDownloadInvoice = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getInvoiceData = useCallback(
        async (invoiceId: number, record: any) => {
            if (isLoading) setIsLoading(true);
            const data: downloadResponse | false = await downloadInvoice(
                invoiceId,
                record.tableName
            );
            if (data) {
                const uint8Array = new Uint8Array(data.pdfBuffer.data);

                const blob = new Blob([uint8Array], { type: 'application/pdf' });

                saveAs(blob, 'Invoice.pdf');
            }
            setIsLoading(false);
        },
        [isLoading]
    );

    return { isLoading, getInvoiceData };
};
