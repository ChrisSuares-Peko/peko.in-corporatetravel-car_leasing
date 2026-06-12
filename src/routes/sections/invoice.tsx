import { lazy } from 'react';

import { paths } from '../paths';

const Customer = lazy(() => import('@domains/dashboard/invoiceV2/pages/Customers'));
const Dashboard = lazy(() => import('@domains/dashboard/invoiceV2/pages/Dashboard'));
const Invoice = lazy(() => import('@domains/dashboard/invoiceV2/pages/Invoice'));
const CreateInvoice = lazy(() => import('@domains/dashboard/invoiceV2/pages/CreateInvoice'));
const InvoiceDetails = lazy(() => import('@domains/dashboard/invoiceV2/pages/InvoiceDetails'));

export const invoiceRoutes = [
    { element: <Dashboard />, index: true },
    { element: <Invoice />, path: paths.invoice.allInvoice },
    { element: <CreateInvoice />, path: paths.invoice.create },
    { element: <CreateInvoice />, path: paths.invoice.edit },
    { element: <Customer />, path: paths.invoice.customers },
    {
        element: <InvoiceDetails />,
        path: paths.invoice.invoicedetails,
    },
];
