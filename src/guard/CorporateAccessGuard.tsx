import { useCallback, useEffect, useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import CorporateAccessDenied from '@src/domains/failed/pages/CorporateAccessDenied';
import { useAppSelector } from '@src/hooks/store';
// import { paths } from '@src/routes/paths';
import { checkServiceAccessAndSubService } from '@utils/checkAccess';

import CorporateAccessLoadingSkeleton from './CorporateAccessLoadingSkeleton';

const PROTOTYPE_MODE = import.meta.env.VITE_PROTOTYPE_MODE === 'true';


type CorporateAccessGuardProps = {
    children: React.ReactNode;
};

const whitelabeledRoutes = [
    'payments',
    'service not available',
    'plans',
    'profile',
    'peko club',
    'notifications',
    'early access',
    'service down',
    'peko credit',
    'procure',
];

export default function CorporateAccessGuard({ children }: CorporateAccessGuardProps) {
    if (PROTOTYPE_MODE) return <>{children}</>;

    const { roleName } = useAppSelector(state => state.reducer.auth);
    const { services } = useAppSelector(state => state.reducer.services);
    const location = useLocation();
    const currentPath = location.pathname.toLowerCase();

    const [grantAccess, setGrantAccess] = useState<boolean | null>(null);

     const serviceCategory =
            currentPath
                .split('/')[1]
                ?.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ') || '';

        const subService =
            currentPath
                .split('/')[2]
                ?.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ') || '';
         let hasAccess = false;

         if (whitelabeledRoutes.includes(serviceCategory.toLowerCase())) {
        hasAccess = true;
    } else {
        hasAccess = checkServiceAccessAndSubService(serviceCategory, subService);
    }

 const checkRole = useCallback(() => {
        if (hasAccess) {
            setGrantAccess(true);
        } else setGrantAccess(false);
    }, [hasAccess]);

    useEffect(() => {
        checkRole();
    }, [checkRole]);
    if (grantAccess === null) {
        return <CorporateAccessLoadingSkeleton />;
    }
  

    if (serviceCategory.toLowerCase() === 'dashboard' && grantAccess === false) {
        if (roleName === 'corporate sub user') {
            const firstRoute = services?.data.find(obj => obj.hasAccess === true);
            if (firstRoute?.label) {
                return <Navigate to={`/${firstRoute.label.toLowerCase().replace(/\s+/g, '-')}`} />;
            }
        }
    }
    console.log("grantAccess corporateAccess",grantAccess)
    if (grantAccess === false) {
        return <CorporateAccessDenied />;
    }
    if (grantAccess === null) {
        return null;
    }

    return <>{children}</>;
}
