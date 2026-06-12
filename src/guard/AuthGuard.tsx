import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';

type AuthGuardProps = {
    children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const navigate = useNavigate();

    const { isAuthenticated } = useAppSelector(state => state.reducer.auth);

    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (!isAuthenticated) {
            const href = paths.auth.jwt.login;
            navigate(href);
        } else {
            setChecked(true);
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        check();
    }, [check]);

    if (!checked) {
        return null;
    }

    return <>{children}</>;
}
