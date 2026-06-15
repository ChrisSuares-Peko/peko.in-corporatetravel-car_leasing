import { lazy } from 'react';

const CarRentalsHome = lazy(
    () => import('@src/domains/dashboard/CarRentals/pages/CarRentalsHome')
);
const CarRentalsResults = lazy(
    () => import('@src/domains/dashboard/CarRentals/pages/CarRentalsResults')
);
const CarRentalsCart = lazy(
    () => import('@src/domains/dashboard/CarRentals/pages/CarRentalsCart')
);

export const carRentalsRoutes = [
    { element: <CarRentalsHome />, index: true },
    { element: <CarRentalsResults />, path: 'results' },
    { element: <CarRentalsCart />, path: 'cart' },
];
