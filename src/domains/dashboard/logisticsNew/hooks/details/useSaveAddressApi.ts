import { useState } from 'react';

import { useAppSelector } from '@src/hooks/store';

import { saveAddressApi } from '../../api/address';
import { Address } from '../../types';
import { SaveAddressPayload } from '../../types/address';

export const useSaveAddressApi = () => {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [isLoading, setIsLoading] = useState(true);

    const handleSenderAddress = async (originAddress: Address, addressId: number | null) => {
        const response: SaveAddressPayload | false = await saveAddressApi({
            userId: id,
            userType: role,
            id: addressId || undefined,
            name: originAddress.name,
            addressLine1: originAddress.addressLine,
            city: originAddress.city,
            countryCode: originAddress.countryCode ?? '',
            country: originAddress.country,
            // addressLine2: '',
            default: 0,
            phoneNumber: originAddress.mobile,
            zipCode: originAddress.postCode,
            isReceiver: 0,
        });
        if (response) {
            setIsLoading(false);
            return response;
        }
        setIsLoading(false);
        return false;
    };

    const handleRecieverAddress = async (destinationAddress: Address, addressId: number | null) => {
        const response: SaveAddressPayload | false = await saveAddressApi({
            userId: id,
            userType: role,
            id: addressId || undefined,
            name: destinationAddress.name,
            addressLine1: destinationAddress.addressLine,
            city: destinationAddress.city,
            countryCode: destinationAddress.countryCode ?? '',
            country: destinationAddress.country ?? '',
            // addressLine2: '',
            default: 0,
            phoneNumber: destinationAddress.mobile,
            zipCode: destinationAddress.postCode,
            isReceiver: 1,
            phoneCode: destinationAddress.phoneCode,
        });
        if (response) {
            setIsLoading(false);
            return response;
        }
        setIsLoading(false);
        return false;
    };

    return { isLoading, handleSenderAddress, handleRecieverAddress };
};
