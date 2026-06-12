import { useCallback, useEffect, useState } from 'react';

import { saveAs } from 'file-saver';

import { CommonFileBuffer } from '@customtypes/general';
import { useAppSelector } from '@src/hooks/store';

import { getAllTransaction, getFileBufferReport } from '../api/index';

export default function useHistoryApi({
    searchText,
    status,
    sort,
    page,
    itemsPerPage,
    filter,
    from,
    to,
    sortField,
}: any) {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<any>([]);
    const [count, setCount] = useState<number>(1);
    const getHistory = useCallback(async () => {
        setIsLoading(true);
        const data: any | false = await getAllTransaction({
            userId: id,
            userType: role,
            from,
            to,
            searchText,
            sort,
            page,
            itemsPerPage,
            filter,
            sortField,
            status,
        });

        if (data) {
            const dedupedMap = new Map<string, any>();

            data?.data?.forEach((orderHistory: any) => {
                let orderResponse = {};

                try {
                    if (orderHistory?.orderResponse) {
                        orderResponse = JSON.parse(orderHistory.orderResponse);
                    }
                } catch (error) {
                 
                    orderResponse = {};
                }

                const txnKey = orderHistory.corporateTxnId;

                const current = dedupedMap.get(txnKey);
                const isRefunded = orderHistory.status === 'REFUNDED';

                // Prefer REFUNDED, or keep the first if no entry yet
                if (!current || (isRefunded && current.status !== 'REFUNDED')) {
                    dedupedMap.set(txnKey, {
                        createdAt: orderHistory.createdAt ?? '',
                        corporateTxnId: orderHistory.corporateTxnId,
                        transactionCategory: orderHistory.transactionCategory ?? '',
                        orderId: orderHistory.orderId ?? '',
                        amountInINR: orderHistory.amountInINR ?? '',
                        paymentMode: orderHistory.paymentMode ?? '',
                        orderResponse,
                        VerificationType: orderHistory.VerificationType ?? '',
                        accessKey: orderHistory.Accesskey ?? '',
                        status: orderHistory.status, // Include status for logic
                    });
                }
            });

            const dedupedArr = Array.from(dedupedMap.values());
            setHistory(dedupedArr);
            setCount(data.recordsTotal);
        }

        setIsLoading(false);
    }, [id, role, from, to, searchText, sort, page, itemsPerPage, filter, sortField, status]);

    const downloadReport = async (type: string) => {
        const data: CommonFileBuffer | false = await getFileBufferReport({
            userId: id,
            userType: role,
            type,
            status,
            from,
            to,
            searchText,
            sort,
            page,
            itemsPerPage,
            sortField,
        });
        if (data) {
            const arrayBuffer = new Uint8Array(data.buffer.data);

            // Convert ArrayBuffer to Blob
            const blob = new Blob([arrayBuffer], {
                type: data.fileType,
            });

            // Trigger download
            if (type === 'excel') {
                saveAs(blob, `Verification Report.xlsx`);
            } else if (type === 'csv') {
                saveAs(blob, `Verification Report.csv`);
            } else if (type === 'pdf') {
                saveAs(blob, `Verification Report.pdf`);
            }
        }
    };

    useEffect(() => {
        getHistory();
    }, [getHistory]);

    return { isLoading, history, count, downloadReport };
}
