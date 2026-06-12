import { lazy } from 'react';

import { paths } from '../paths';

const LandingPage = lazy(() => import('@src/domains/dashboard/Domain & Hosting/pages/LandingPage'));
const Cart = lazy(() => import('@src/domains/dashboard/Domain & Hosting/pages/Cart'));
const VpsServer = lazy(() => import('@src/domains/dashboard/Domain & Hosting/pages/VpsServer'));
const SharedHosting = lazy(() => import('@src/domains/dashboard/Domain & Hosting/pages/SharedHosting'));
const GoogleWorkspace = lazy(() => import('@src/domains/dashboard/Domain & Hosting/pages/GoogleWorkspace'));
const TitanEmailPage = lazy(() => import('@src/domains/dashboard/Domain & Hosting/pages/TitanEmail'));
const Checkout = lazy(() => import('@src/domains/dashboard/Domain & Hosting/pages/Checkout'));
const ManageSubscriptions = lazy(() => import('@src/domains/dashboard/Domain & Hosting/pages/ManageSubscription'));

// -----------------------------------------------------------------------

export const domainHostingRoutes = [
    { element: <LandingPage />, index: true },
    {
        element: <Cart />,
        path: paths.domainHosting.cart,
    },
    {
        element: <Checkout />,
        path: paths.domainHosting.checkout,
    },
    {
        element: <VpsServer />,
        path: paths.domainHosting.vpsServer,
    },
    {
        element: <SharedHosting />,
        path: paths.domainHosting.sharedHosting,
    },
    {
        element: <GoogleWorkspace />,
        path: paths.domainHosting.googleWorkspace,
    },
    {
        element: <TitanEmailPage />,
        path: paths.domainHosting.titanEmail,
    },
    {
        element: <ManageSubscriptions />,
        path: paths.domainHosting.manageSubscription,
    },
];
