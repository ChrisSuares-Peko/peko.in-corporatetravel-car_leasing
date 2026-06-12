import { useCallback, useState } from 'react';

import { useAppSelector } from '@src/hooks/store';

import {
    createPaymentLink,
} from '../api';
import { CreatePaymentLinkPayload, CreatePaymentLinkResponse } from '../types/paymentLinkTypes';

type CreatePaymentLinkInput = Omit<CreatePaymentLinkPayload, 'userId' | 'userType'>;

const getNormalizedPaymentLink = (response: CreatePaymentLinkResponse) =>
    response.paymentLink || response.providerResponse?.data?.upi_uris?.common_uri || '';

export const useCreatePaymentLink = (accessKey:"invoice" | "payment_link") => {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [loading, setLoading] = useState(false);

    const createLink = useCallback(
        async (payload: CreatePaymentLinkInput) => {
            setLoading(true);
            const response = await createPaymentLink({
                userId: id,
                userType: role,
                accessKey,
                ...payload,
            });
            setLoading(false);

            if (!response) {
                return false;
            }

            return {
                ...response,
                paymentLink: getNormalizedPaymentLink(response),
            } as CreatePaymentLinkResponse;
        },
        [accessKey, id, role]
    );

    return { loading, createLink };
};
