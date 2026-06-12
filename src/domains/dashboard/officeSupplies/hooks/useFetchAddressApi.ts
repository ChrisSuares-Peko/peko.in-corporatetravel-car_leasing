import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '@src/hooks/store';

import { getSavedAddressApi } from '../api/address';
import { AddressOptions, SavedAddressResponse } from '../types/address';

export function useFetchAddressApi() {
    const { role, id } = useAppSelector(state => state.reducer.auth);

    const [addressOptions, setAddressOptions] = useState<AddressOptions[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAddress = useCallback(async () => {
        const data: SavedAddressResponse | false = await getSavedAddressApi({
            userId: id,
            userType: role,
        });
        if (data) {
            const addressData = data as SavedAddressResponse;
            const arr: AddressOptions[] = addressData?.data?.map(address => ({
                label: address.name,
                value: JSON.stringify({
                    address: `${address.name}\n${address?.addressLine1}\n${address?.addressLine2}\n${address.city ?? ''} ${address.country ?? ''} ${address.zipCode ?? ''}`,
                    email: address.email ?? '',
                    phoneNumber: address.phoneNumber ?? '',
                }),
            }));
            setAddressOptions(arr);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [id, role]);

    useEffect(() => {
        getAddress();
    }, [getAddress]);

    return { addressOptions, isLoading };
}
