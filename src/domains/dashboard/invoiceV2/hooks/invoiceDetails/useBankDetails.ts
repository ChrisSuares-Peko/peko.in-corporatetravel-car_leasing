import { useEffect, useState } from 'react';

import { useAppSelector } from '@src/hooks/store';

import { getPaymentOnboardingStatus } from '../../api/onboarding';
import { VirtualAccount } from '../../types/ManageBankAccounts';

const useBankDetails = () => {
    const { id: userId, role: userType } = useAppSelector(state => state.reducer.auth);
    const [details, setDetails] = useState<VirtualAccount | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsFetching(true);
            try {
                const resp = await getPaymentOnboardingStatus({ userId, userType });
                if (resp && resp.status && resp.data?.activatedAt) {
                    const d = resp.data;
                    setDetails({
                        id: String(d.id ?? '1'),
                        name: d.businessName || '',
                        bankName: d.bankName || '',
                        accountNumber: d.virtualAccountNumber || '',
                        ifsc: d.ifsc || '',
                        currency: 'INR',
                        type: 'Domestic',
                    });
                }
            } finally {
                setIsFetching(false);
            }
        };
        fetchDetails();
    }, [userId, userType]);

    return { details, isFetching };
};

export default useBankDetails;
