import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';

const PROTOTYPE_MODE = import.meta.env.VITE_PROTOTYPE_MODE === 'true';

type AuthGuardProps = {
    children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const navigate = useNavigate();

    const { isAuthenticated } = useAppSelector(state => state.reducer.auth);

    const [checked, setChecked] = useState(PROTOTYPE_MODE);

    const check = useCallback(() => {
        if (!isAuthenticated && !PROTOTYPE_MODE) {
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
