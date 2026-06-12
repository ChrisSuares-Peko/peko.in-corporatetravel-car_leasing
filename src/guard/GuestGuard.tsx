import { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { PATH_AFTER_LOGIN } from '@src/config-global';
import { useAppSelector } from '@src/hooks/store';

type GuestGuardProps = {
    children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
    const navigate = useNavigate();

    const { isAuthenticated } = useAppSelector(state => state.reducer.auth);
    const check = useCallback(() => {
        if (isAuthenticated) {
            navigate(PATH_AFTER_LOGIN, { replace: true });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        check();
    }, [check]);

    return <>{children}</>;
}
