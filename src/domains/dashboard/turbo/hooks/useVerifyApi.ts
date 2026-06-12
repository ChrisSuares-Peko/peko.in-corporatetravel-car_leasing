import { useCallback, useState } from 'react';


import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import { verify } from '../api';
import {
    resetRcResponse,
    resetResponse,
    setRcVerifyResponse,
    setverifyResponse,
} from '../slices/turboSlice';

export default function useVerify() {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [details, setDetails] = useState<any>();
    const dispatch = useAppDispatch();
 
    const verifyApi = useCallback(
        async (payload: any) => {
            setIsLoading(true);
            const data: any = await verify({
                userId: id,
                userType: role,
                doc_identity_no: payload.doc_identity_no,
                type: payload.type,
                dob: payload?.dob,
            });

            if (data) {
                if (payload.type === 'dl') {
                    if (data.data.dlNumber === null) {
                        dispatch(
                            showToast({
                                description: `Something went wrong while getting the DL details`,
                                variant: 'error',
                            })
                        );
                    } else {
                        setDetails(data);
                        dispatch(setverifyResponse(data.data));
                    }
                } else if (data.data.vehicleNumber === null) {
                    dispatch(
                        showToast({
                            description: `Something went wrong while getting the RC details`,
                            variant: 'error',
                        })
                    );
                } else {
                    setDetails(data);
                    dispatch(setRcVerifyResponse(data.data));
                }
            } else if (payload.type === 'dl') {
                dispatch(resetResponse());
            } else {
                dispatch(resetRcResponse());
            }
            setRefresh(false);
            setIsLoading(false);
            if(data.data){
                return true;
            }
            return false;
        },
        [dispatch, id, role]
    );

    return { details, loading: isLoading, verifyApi , refresh};
}
