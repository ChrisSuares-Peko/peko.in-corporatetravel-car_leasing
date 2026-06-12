import { lazy } from 'react';

const PaymentDashboard = lazy(() => import('@src/domains/dashboard/Payouts/Pages/PayoutDashboard'));
const BillPayoutPage = lazy(() => import('@src/domains/dashboard/Payouts/Pages/BillPayoutPage'));
const AllPayoutsPage = lazy(() => import('@src/domains/dashboard/Payouts/Pages/AllPayoutsPage'));

export const payoutRoutes = [
    { element: <PaymentDashboard />, index: true },
    { element: <BillPayoutPage />, path: 'bill-payout' },
    { element: <AllPayoutsPage />, path: 'all-payouts' },
];