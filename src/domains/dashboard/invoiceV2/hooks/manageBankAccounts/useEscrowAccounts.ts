import { useEffect, useState } from 'react';

import { EscrowAccount } from '../../types/ManageBankAccounts';
import { DEMO_ESCROW_ACCOUNTS } from '../../utils/dummyData';

const useEscrowAccounts = () => {
    const [accounts, setAccounts] = useState<EscrowAccount[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        // TODO: replace with real API call
        setTimeout(() => {
            setAccounts(DEMO_ESCROW_ACCOUNTS);
            setIsLoading(false);
        }, 0);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { accounts, isLoading, fetchData };
};

export default useEscrowAccounts;
