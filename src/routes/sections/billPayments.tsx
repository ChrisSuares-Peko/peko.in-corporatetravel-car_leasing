import { lazy } from 'react';

import BillPaymentPage from '@src/domains/dashboard/billPayments/pages/BillPaymentPage';
import { billPayments, financialServices, insurance, otherServices } from '@src/domains/dashboard/billPayments/utils/data';

import { paths } from '../paths';

const BillPaymentsList = lazy(
    () => import('@src/domains/dashboard/billPayments/pages/BillPaymentsList')
);
const ComplaintRegistration = lazy(
    () => import('@src/domains/dashboard/billPayments/pages/ComplaintRegistration')
);
const Register = lazy(() => import('@src/domains/dashboard/billPayments/pages/RegistrationForm'));
const BulkPayReviewPage = lazy(
    () => import('@src/domains/dashboard/billPayments/components/BulkPayReview')
);
const SuccessPage = lazy(() => import('@domains/dashboard/billPayments/pages/ComplaintSuccess'));

// -----------------------------------------------------------------------

const allBillServices = [
    ...billPayments.filter(s => s.url !== paths.telecomPayments.test),
    ...financialServices,
    ...insurance,
    ...otherServices,
];

export const billPaymentRoutes = [
    { element: <BillPaymentsList />, index: true },
    ...allBillServices.map(service => ({
        element: (
            <BillPaymentPage
                title={service.title}
                accessKeyName={service.accessKey}
                serviceCategory={service.BBPSCategoryName}
            />
        ),
        path: service.url,
    })),
    { element: <ComplaintRegistration />, path: paths.billPayments.complaintRegistration },
    {
        element: <Register />,
        path: `${paths.billPayments.complaintRegistration}/${paths.billPayments.ComplaintRegister}`,
    },
    { element: <SuccessPage />, path: paths.billPayments.success },
    {
        element: <BulkPayReviewPage />,
        path: `${paths.billPayments.electricity}/${paths.billPayments.bulkPayment}`,
    },
];
