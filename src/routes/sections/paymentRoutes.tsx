import { lazy } from 'react';

import { paths } from '../paths';

const Payments = lazy(() => import('@src/domains/dashboard/payments/pages/Payment'));
const PaymentFailure = lazy(() => import('@src/domains/dashboard/payments/pages/PaymentFailure'));
const PaymentSuccess = lazy(() => import('@src/domains/dashboard/payments/pages/PaymentSuccess'));
const PaymentPending = lazy(() => import('@src/domains/dashboard/payments/pages/PaymentPending'));

export const paymentRoutes = [
    { element: <Payments />, index: true },
    { element: <PaymentSuccess />, path: paths.payments.paymentsuccess },
    { element: <PaymentFailure />, path: paths.payments.paymentFailure },
    { element: <PaymentPending />, path: paths.payments.paymentPending },
];
