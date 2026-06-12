import { lazy } from 'react';

import { paths } from '../paths';

const ProcureLandingPage = lazy(() => import('@domains/dashboard/Procure/pages/LandingPage'));
const PurchaseRequestsPage = lazy(
    () => import('@domains/dashboard/Procure/pages/PurchaseRequestsPage')
);
const NewPurchaseRequestPage = lazy(
    () => import('@domains/dashboard/Procure/components/PurchaseRequest/NewPurchaseRequest')
);
const PurchaseRequestDetailsPage = lazy(
    () => import('@domains/dashboard/Procure/pages/PurchaseRequestDetailsPage')
);
const RFQPage = lazy(() => import('@domains/dashboard/Procure/pages/RFQPage'));
const NewRFQPage = lazy(() => import('@domains/dashboard/Procure/components/RFQ/NewRFQ'));
const RFQViewPage = lazy(() => import('@domains/dashboard/Procure/components/RFQ/RFQView'));
const ProposalsPage = lazy(() => import('@domains/dashboard/Procure/pages/ProposalsPage'));
const ProposalDetailsPage = lazy(() => import('@domains/dashboard/Procure/components/Proposals/ProposalDetailsPage'));
const ProposalComparisonPage = lazy(() => import('@domains/dashboard/Procure/components/Proposals/ProposalComparisonPage'));
const PurchaseOrdersPage = lazy(
    () => import('@domains/dashboard/Procure/pages/PurchaseOrdersPage')
);
const InvoicingPage = lazy(
    () => import('@src/domains/dashboard/Procure/pages/InvoicingPage')
);
const InvoiceDetailsPage = lazy(
    () => import('@domains/dashboard/Procure/pages/InvoiceDetailsPage')
);
const VendorPage = lazy(
    () => import('@src/domains/dashboard/Procure/pages/VendorPage')
);
const AddVendorPage = lazy(
    () => import('@domains/dashboard/Procure/components/Vendor/AddVendor')
);
// const CreatePurchaseOrderPage = lazy(
//     () => import('@domains/dashboard/Procure/components/PurchaseOrder/VendorProposalSubmission')
// );
const NewPurchaseOrderPage = lazy(
    () => import('@domains/dashboard/Procure/components/PurchaseOrder/NewPurchaseOrder')
);
const PurchaseOrderDetailsPage = lazy(
    () => import('@domains/dashboard/Procure/pages/PurchaseOrderDetailsPage')
);

export const procureRoutes = [
    { index: true, element: <ProcureLandingPage /> },
    {
        path: paths.procure.purchaseRequests.index,
        element: <PurchaseRequestsPage />,
    },
    {
        path: `${paths.procure.purchaseRequests.index}/${paths.procure.purchaseRequests.create}`,
        element: <NewPurchaseRequestPage />,
    },
    {
        path: `${paths.procure.purchaseRequests.index}/${paths.procure.purchaseRequests.view}`,
        element: <PurchaseRequestDetailsPage />,
    },
    { path: paths.procure.rfq.index,                                            element: <RFQPage /> },
    { path: `${paths.procure.rfq.index}/${paths.procure.rfq.create}`,           element: <NewRFQPage /> },
    { path: `${paths.procure.rfq.index}/${paths.procure.rfq.view}`,             element: <RFQViewPage /> },
    { path: paths.procure.proposals.index,                                                          element: <ProposalsPage /> },
    { path: `${paths.procure.proposals.index}/${paths.procure.proposals.view}`,                    element: <ProposalDetailsPage /> },
    { path: `${paths.procure.proposals.index}/${paths.procure.proposals.compare}`,                 element: <ProposalComparisonPage /> },
    { path: paths.procure.purchaseOrders.index,  element: <PurchaseOrdersPage /> },
    { path: `${paths.procure.purchaseOrders.index}/${paths.procure.purchaseOrders.view}`,   element: <PurchaseOrderDetailsPage /> },
    { path: `${paths.procure.purchaseOrders.index}/${paths.procure.purchaseOrders.create}`, element: <NewPurchaseOrderPage /> },
    { path: paths.procure.invoicing.index,  element: <InvoicingPage /> },
    { path: `${paths.procure.invoicing.index}/${paths.procure.invoicing.view}`, element: <InvoiceDetailsPage /> },
    { path: paths.procure.vendor.index,  element: <VendorPage /> },
    { path: `${paths.procure.vendor.index}/${paths.procure.vendor.create}`, element: <AddVendorPage /> },
];
