import { lazy } from 'react';

const CarRentalsHome = lazy(
    () => import('@src/domains/dashboard/CarRentals/pages/CarRentalsHome')
);
const CarRentalsResults = lazy(
    () => import('@src/domains/dashboard/CarRentals/pages/CarRentalsResults')
);

export const carRentalsRoutes = [
    { element: <CarRentalsHome />, index: true },
    { element: <CarRentalsResults />, path: 'results' },
];
