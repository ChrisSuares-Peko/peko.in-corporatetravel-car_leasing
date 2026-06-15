import { lazy } from 'react';

const CarRentalsHome = lazy(
    () => import('@src/domains/dashboard/CarRentals/pages/CarRentalsHome')
);

export const carRentalsRoutes = [{ element: <CarRentalsHome />, index: true }];
