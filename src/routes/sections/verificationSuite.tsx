import { lazy } from 'react';

import { paths } from '../paths';

const HomePage = lazy(() => import('@src/domains/dashboard/verificationSuite/pages/HomePage'));

const HistoryPage = lazy(
    () => import('@src/domains/dashboard/verificationSuite/pages/VerificationHistory')
);
const DetailsPage = lazy(() => import('@src/domains/dashboard/verificationSuite/pages/Details'));

// -----------------------------------------------------------------------

export const verificationSuiteRoutes = [
    { element: <HomePage />, index: true },

    {
        element: <HistoryPage />,
        path: paths.verificationSuite.verificationHistory,
    },
    {
        element: <DetailsPage />,
        path: `${paths.verificationSuite.verificationHistory}/${paths.verificationSuite.verificationDetails}`,
    },
];
