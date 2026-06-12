import { Suspense, lazy } from 'react';

import { Skeleton } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

// layouts
import DashboardLayout from '@layouts/DashboardLayout';
import ServiceNotFound from '@src/domains/dashboard/503/pages/ServiceNotFound';
import ServiceNotAvailable from '@src/domains/failed/pages/ServiceNotAvailable';
import AuthGuard from '@src/guard/AuthGuard';
import CorporateAccessGuard from '@src/guard/CorporateAccessGuard';
import CorporateUserGuard from '@src/guard/CorporateUserGuard';

import { billPaymentRoutes } from './billPayments';
import { bussinessDocsRoutes } from './bussinessDocs';
import { carbonFootprintRoutes } from './carbonFootprint';
import { carLeasingRoutes } from './carLeasing';
import { connectRoutes } from './connect';
import { corporateTravelRoutes } from './corporateTravel';
import { domainHostingRoutes } from './domainHosting';
import { emailDomainRoutes } from './emailDomain';
import { eSignRoutes } from './eSign';
import { giftCardsRoutes } from './giftCards';
import { HikeRoutes } from './Hike';
import { homeRoutes } from './home';
import { insuranceRoutes } from './insurance';
import { invoiceRoutes } from './invoice';
import { logisticsRoutes } from './logistics';
import { needHelpRoutes } from './needHelp';
import { officeAddressRoutes } from './officeAddress';
import { officeSuppliesRoutes } from './officeSupplies';
import { paymentLinkRoutes } from './paymentLinks';
import { paymentRoutes } from './paymentRoutes';
import { payoutRoutes }  from './payouts';
import { payrollRoutes } from './payroll';
import { paytmBposRoutes } from './paytmBpos';
import { pekoCloudRoutes } from './pekoCloud';
import { pekoConnectRoutes } from './pekoConnect';
import { pekoCreditRoutes } from './pekoCredit';
import { PekoWalletRoutes } from './pekoWallet';
import { planRoutes } from './plans';
import { procureRoutes } from './procure';
import { profileRoutes } from './profile';
import { reportsRoutes } from './reports';
import { settingsRoutes } from './settings';
import { soundBoxRoutes } from './soundbox';
import { subscriptionRoutes } from './subscriptions';
import { telecomPaymentsRoutes } from './telecomPayments';
import { TurboRoutes } from './turbo';
import { verificationSuiteRoutes } from './verificationSuite';
import { WhatsappForBusinessRoutes } from './whatsappForBusiness';
import { workRoutes } from './works';
import { paths } from '../paths';
// ----------------------------------------------------------------------
const HomePage = lazy(() => import('@domains/dashboard/Home/pages/Home'));
const MoreServices = lazy(() => import('@domains/dashboard/MoreServices/pages/MoreServices'));
const ComingSoon = lazy(() => import('@domains/dashboard/MoreServices/pages/ComingSoon'));
const Reports = lazy(() => import('@domains/dashboard/Reports/pages/Reports'));
const NotificationsPage = lazy(
    () => import('@src/domains/dashboard/notifications/pages/NotificationsList')
);
// ----------------------------------------------------------------------

export const dashboardRoutes = [
    {
        path: '',
        element: (
            <AuthGuard>
                <CorporateUserGuard>
                    <DashboardLayout>
                        <CorporateAccessGuard>
                            <ErrorBoundary fallback={<ServiceNotAvailable />}>
                                <Suspense fallback={<Skeleton />}>
                                    <Outlet />
                                </Suspense>
                            </ErrorBoundary>
                        </CorporateAccessGuard>
                    </DashboardLayout>
                </CorporateUserGuard>
            </AuthGuard>
        ),
        children: [
            { path: paths.dashboard.home, children: homeRoutes },
            { element: <HomePage />, path: paths.dashboard.logistics },
            { element: <HomePage />, path: paths.dashboard.tax },
            { element: <Reports />, path: paths.dashboard.reports },
            { element: <MoreServices />, path: paths.dashboard.moreServices },
            { element: <ComingSoon />, path: paths.dashboard.comingSoon },
            { element: <HomePage />, path: paths.dashboard.vendorPayouts },
            { element: <HomePage />, path: paths.dashboard.corporateCard },
            { element: <NotificationsPage />, path: paths.dashboard.notifications },
            { element: <ServiceNotFound />, path: '503' },
            { element: <ServiceNotAvailable />, path: paths.dashboard.serviceNotAvailable },
            {
                path: paths.dashboard.profile,
                children: profileRoutes,
            },
            {
                path: paths.dashboard.subscriptions,
                children: subscriptionRoutes,
            },
            {
                path: paths.dashboard.officeSupplies,
                children: officeSuppliesRoutes,
            },
            { path: paths.dashboard.plans, children: planRoutes },
            {
                path: paths.dashboard.mobileRecharge,
                children: telecomPaymentsRoutes,
            },
            {
                path: paths.dashboard.billPayments,
                children: billPaymentRoutes,
            },
            {
                path: paths.dashboard.corporateTravel,
                children: corporateTravelRoutes,
            },
            {
                path: paths.dashboard.connect,
                children: connectRoutes,
            },
            {
                path: paths.dashboard.turbo,
                children: TurboRoutes,
            },
            {
                path: paths.dashboard.carLeasing,
                children: carLeasingRoutes,
            },
            {
                path: paths.dashboard.works,
                children: workRoutes,
            },
            {
                path: paths.dashboard.giftCards,
                children: giftCardsRoutes,
            },
            {
                path: paths.dashboard.businessDocs,
                children: bussinessDocsRoutes,
            },
            {
                path: paths.dashboard.officeAddress,
                children: officeAddressRoutes,
            },
            {
                path: paths.dashboard.zeroCarbon,
                children: carbonFootprintRoutes,
            },
            {
                path: paths.dashboard.needHelp,
                children: needHelpRoutes,
            },
            {
                path: paths.dashboard.hike,
                children: HikeRoutes,
            },
            {
                path: paths.dashboard.reports,
                children: reportsRoutes,
            },
            {
                path: paths.dashboard.insurance,
                children: insuranceRoutes,
            },
            {
                path: paths.dashboard.whatsappForBusiness,
                children: WhatsappForBusinessRoutes,
            },
            {
                path: paths.paymentLinks.index,
                children: paymentLinkRoutes,
            },
            {
                path: paths.dashboard.soundBox,
                children: soundBoxRoutes,
            },
            {
                path: paths.dashboard.invoicing,
                children: invoiceRoutes,
            },
            {
                path: paths.dashboard.payments,
                children: paymentRoutes,
            },
            {
                path: paths.dashboard.payout,
                children:payoutRoutes,
            },
            {
                path: paths.dashboard.logistics,
                children: logisticsRoutes,
            },
            {
                path: paths.dashboard.payroll,
                children: payrollRoutes,
            },
            {
                path: paths.dashboard.paytmBpos,
                children: paytmBposRoutes,
            },
            {
                path: paths.dashboard.eSign,
                children: eSignRoutes,
            },
            {
                path: paths.dashboard.pekoCloud,
                children: pekoCloudRoutes,
            },
            {
                path: paths.dashboard.pekoCredit,
                children: pekoCreditRoutes,
            },
            {
                path: paths.dashboard.settings,
                children: settingsRoutes,
            },
            {
                path: paths.dashboard.emailDomain,
                children: emailDomainRoutes,
            },
            {
                path: paths.dashboard.pekoConnect,
                children: pekoConnectRoutes,
            },
            {
                path: paths.dashboard.pekoWallet,
                children: PekoWalletRoutes,
            },
            {
                path: paths.dashboard.verificationSuite,
                children: verificationSuiteRoutes,
            },
            {
                path: paths.dashboard.domainHosting,
                children: domainHostingRoutes,
            },
            {
                path: paths.dashboard.procure,
                children: procureRoutes,
            },
        ],
    },
];
