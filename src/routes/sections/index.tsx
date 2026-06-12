import { Navigate, useRoutes } from 'react-router-dom';

import ENachMandatePublicSuccess from '@src/domains/dashboard/paymentLinks/pages/ENachMandatePublicSuccess';
import PaymentLinkPublicSuccess from '@src/domains/dashboard/paymentLinks/pages/PaymentLinkPublicSuccess';
import PageNotFound from '@src/domains/pages/PageNotFound';
import { useRootPath } from '@src/hooks/useRootPath';
import { paths } from '@src/routes/paths';

// eslint-disable-next-line import/no-cycle
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
// import { planRoutes } from './plans';
import { systemUserRoutes } from './systemUser';

export default function Router() {
    const rootPath = useRootPath();
    return useRoutes([
        {
            path: '/',
            element: <Navigate to={rootPath} replace />,
        },

        // Auth routes
        ...authRoutes,

        // Dashboard routes
        ...dashboardRoutes,

        // Subscription routes
        // ...planRoutes,

        // System User routes
        ...systemUserRoutes,

        // Public payment-link success route (no auth required)
        { path: paths.paymentLinkPublicSuccess, element: <PaymentLinkPublicSuccess /> },
        { path: paths.eNachMandatePublicSuccess, element: <ENachMandatePublicSuccess /> },

        // No match 404
        { path: '/404', element: <PageNotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
