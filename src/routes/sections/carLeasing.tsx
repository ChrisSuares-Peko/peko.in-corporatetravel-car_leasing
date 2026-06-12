import { lazy } from 'react';

const CarLeasingHome = lazy(
    () => import('@src/domains/dashboard/CarLeasing/pages/CarLeasingHome')
);

export const carLeasingRoutes = [{ element: <CarLeasingHome />, index: true }];
