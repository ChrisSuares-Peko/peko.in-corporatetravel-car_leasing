import { lazy } from 'react';

import { paths } from '../paths';

const ManageFleet = lazy(() => import('@src/domains/dashboard/turbo/pages/ManageFleet'));
const OperationLog = lazy(() => import('@src/domains/dashboard/turbo/pages/OperationLog'));
const HomePage = lazy(() => import('@src/domains/dashboard/turbo/pages/Dashboard'));
const AddVehicle = lazy(() => import('@src/domains/dashboard/turbo/pages/AddVehicle'));
const ViewDetails = lazy(() => import('@src/domains/dashboard/turbo/pages/ViewDetails'));
const DriverProfile = lazy(() => import('@src/domains/dashboard/turbo/pages/DriverProfiles'));
const AddDriver = lazy(() => import('@src/domains/dashboard/turbo/pages/AddDriver'));
const DocCentre = lazy(() => import('@src/domains/dashboard/turbo/pages/DocumentCenter'));
const DriverDetails = lazy(() => import('@src/domains/dashboard/turbo/pages/DriverDetails'));
const ManageSubscription = lazy(
    () => import('@src/domains/dashboard/turbo/pages/ManageSubscription')
);

// -----------------------------------------------------------------------

export const TurboRoutes = [
    { element: <HomePage />, index: true },
    {
        element: <AddVehicle />,
        path: paths.turbo.addVehicle,
    },
    {
        element: <ViewDetails />,
        path: `${paths.turbo.manageFleet}/${paths.turbo.viewDetails}`,
    },
    {
        element: <DriverProfile />,
        path: paths.turbo.driverProfiles,
    },
    {
        element: <AddDriver />,
        path: paths.turbo.addDriver,
    },
    {
        element: <DriverDetails />,
        path: `${paths.turbo.driverProfiles}/${paths.turbo.driverDetails}`,
    },
    {
        element: <DocCentre />,
        path: paths.turbo.documentCentre,
    },
    {
        element: <ManageSubscription />,
        path: paths.turbo.manageSubscription,
    },
    {
        element: <OperationLog />,
        path: paths.turbo.operationLog,
    },
    {
        element: <ManageFleet />,
        path: paths.turbo.manageFleet,
    },
];
