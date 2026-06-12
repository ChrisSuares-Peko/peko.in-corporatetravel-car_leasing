import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '@src/hooks/hooks';
import { useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import { getAllData, sentRefundTransaction } from '../api/refundTransaction';
import { Transaction, getData, refundTransationsRespone } from '../types/refundTransactions';

const useRefundTransaction = (payload: getData) => {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const dispatch = useAppDispatch();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [count, setCount] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    // const [otpLoader, setOtpLoader] = useState(false);
    const [tableData, setTableData] = useState<Transaction[]>();
    const getDataFromApi = useCallback(async () => {
        setIsLoading(true);
        const data: refundTransationsRespone | false = await getAllData({
            userId: id,
            userType: role,
            ...payload,
        });
        if (data) {
            setTableData(data.rows);
            setCount(data.count);
        }
        setRefresh(false);
        setIsLoading(false);
    }, [id, payload, role]);

    // const getOtp = useCallback(async () => {
    //     setOtpLoader(true);
    //     const data: BulkDataRespone | false = await getOtpData({
    //         userId: id,
    //         userType: role,
    //     });
    //     if (data) {
    //         setOtpLoader(false);
    //         return true;
    //     }
    //     setOtpLoader(false);
    //     return false;
    // }, [id, role]);

    const refundTransaction = useCallback(
        async (payloaData: any) => {
            setLoader(true);
            const data: any | false = await sentRefundTransaction({
                userId: id,
                userType: role,
                ...payloaData,
            });

            if (data && data.status) {
                if (data.message==='Refund process is completed') {
                    setRefresh(true);
                    setLoader(false);
                    dispatch(
                        showToast({
                            description: `Refund process is completed`,
                            variant: 'success',
                        })
                    );
                } 
                 else {
                    setLoader(false);
                    dispatch(
                        showToast({
                            description: `Refund process is initiated`,
                            variant: 'info',
                        })
                    );
                }
                
            } else {
                dispatch(
                    showToast({
                        description: `Something went wrong, try again`,
                        variant: 'error',
                    })
                );
            }

            return setLoader(false);
        },
        [id, role, dispatch]
    );

    useEffect(() => {
        getDataFromApi();
    }, [getDataFromApi, refresh]);

    return { isLoading, tableData, count, refundTransaction, loader };
};

export default useRefundTransaction;
