import { JSXElementConstructor, ReactElement, useCallback, useMemo, useRef } from 'react';

import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Divider } from 'antd';
import { useLocation } from 'react-router-dom';

import AccountIcon from '@assets/icons/Accounts.svg';
import AnnouncementIcon from '@assets/icons/Announcements.svg';
import BillPaymentsIcon from '@assets/icons/bpIcon.svg';
import ConnectIcon from '@assets/icons/Connect.svg';
import CorporateCardIcon from '@assets/icons/CorporateCard.svg';
import DashboardIcon from '@assets/icons/Dashboard.svg';
import GiftCardsIcon from '@assets/icons/GiftCards.svg';
import NeddHelpIcon from '@assets/icons/Help.svg';
import InsuranceIcon from '@assets/icons/Insurance.svg';
import InvoicingIcon from '@assets/icons/Invoicing.svg';
import LogisticsIcon from '@assets/icons/Logistics.svg';
import ManageIcon from '@assets/icons/Manage.svg';
import MobileRechargeIcon from '@assets/icons/MobileRecharge.svg';
import MoreServicesIcon from '@assets/icons/MoreServices.svg';
import PaymentLinkIcon from '@assets/icons/PaymentLink.svg';
import PayrollIcon from '@assets/icons/Payroll.svg';
import PekoCloudIcon from '@assets/icons/pekocloud.svg';
import ProcureIcon from '@assets/icons/ProcureIcon.svg';
import ReportsIcon from '@assets/icons/Reports.svg';
import SettingIcon from '@assets/icons/Settings.svg';
import SubscriptionIcon from '@assets/icons/Subscriptions.svg';
import SuppliesIcon from '@assets/icons/Supplies.svg';
import TaxIcon from '@assets/icons/Tax.svg';
import TravelIcon from '@assets/icons/Travel.svg';
import TurboIcon from '@assets/icons/Turbo.svg';
import VendorPayoutsIcon from '@assets/icons/VendorPayouts.svg';
import verification from '@assets/icons/VerificationService2.svg';
import WhatsAppForBusinessIcon from '@assets/icons/WhatsAppForBusiness.svg';
import WorksIcon from '@assets/icons/Works.svg';
import { UserRole } from '@customtypes/general';
import { useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { checkCorporateSidebar, checkRole, checkSidebarkAccess } from '@utils/checkAccess';

import { NavIcon } from './NavIcon';
import { NavText } from './NavText';

interface NavItem {
    key: string;
    label: React.ReactNode | string;
    icon?: ReactElement<CustomIconComponentProps, string | JSXElementConstructor<any>>;
    stringLabel?: string;
    alwaysShow?: boolean;
}
export function useNavData() {
    const location = useLocation();
    const { role } = useAppSelector(state => state.reducer.auth);
    const navData = useRef<NavItem[]>();

    const checkRouteIsActive = useCallback(
        (route: string) => {
            const pathArray = location.pathname.split('/').filter(Boolean);
            const firstRoute = pathArray.length > 0 ? `/${pathArray[0]}` : '/';
            return firstRoute === route;
        },
        [location.pathname]
    );

    const sidebarConfig: NavItem[] = useMemo(
        () => [
            {
                key: paths.dashboard.home,
                label: NavText('Dashboard', checkRouteIsActive(paths.dashboard.home)),
                icon: NavIcon(DashboardIcon, checkRouteIsActive(paths.dashboard.home)),
                stringLabel: 'Dashboard',
            },
            {
                key: paths.dashboard.mobileRecharge,
                stringLabel: 'Mobile Recharge',
                icon: NavIcon(
                    MobileRechargeIcon,
                    location.pathname.includes(paths.dashboard.mobileRecharge)
                ),
                label: NavText(
                    'Mobile Recharge',
                    location.pathname.includes(paths.dashboard.mobileRecharge)
                ),
            },
            {
                key: paths.dashboard.billPayments,
                stringLabel: 'Bill Payments',
                icon: NavIcon(
                    BillPaymentsIcon,
                    location.pathname.includes(paths.dashboard.billPayments)
                ),
                label: NavText(
                    'Bill Payments',
                    location.pathname.includes(paths.dashboard.billPayments)
                ),
            },
            {
                key: paths.dashboard.corporateTravel,
                stringLabel: 'Corporate Travel',
                icon: NavIcon(
                    TravelIcon,
                    location.pathname.includes(paths.dashboard.corporateTravel),
                    true
                ),
                label: NavText(
                    'Corporate Travel',
                    location.pathname.includes(paths.dashboard.corporateTravel)
                ),
            },
            {
                key: paths.dashboard.payroll,
                stringLabel: 'Payroll',
                icon: NavIcon(PayrollIcon, location.pathname.includes(paths.dashboard.payroll)),
                label: NavText(
                    'Payroll',
                    location.pathname.includes(paths.dashboard.payroll),
                    'new'
                ),
            },
            {
                key: paths.dashboard.vendorPayouts,
                stringLabel: 'Vendor Payouts',
                icon: NavIcon(
                    VendorPayoutsIcon,
                    location.pathname.includes(paths.dashboard.vendorPayouts)
                ),
                label: NavText(
                    'Vendor Payouts',
                    location.pathname.includes(paths.dashboard.vendorPayouts)
                ),
            },
               {
                key: paths.dashboard.payout,
                stringLabel: 'Payouts',
                icon: NavIcon(
                    VendorPayoutsIcon,
                    location.pathname.includes(paths.dashboard.payout)
                ),
                label: NavText(
                    'Payouts',
                    location.pathname.includes(paths.dashboard.payout)
                ),
            },
            {
                key: paths.dashboard.officeSupplies,
                stringLabel: 'Office Supplies',
                icon: NavIcon(
                    SuppliesIcon,
                    location.pathname.includes(paths.dashboard.officeSupplies)
                ),
                label: NavText(
                    'Office Supplies',
                    location.pathname.includes(paths.dashboard.officeSupplies)
                ),
            },
            {
                key: paths.dashboard.subscriptions,
                stringLabel: 'Softwares',
                icon: NavIcon(
                    SubscriptionIcon,
                    location.pathname.includes(paths.dashboard.subscriptions)
                ),
                label: NavText(
                    'Softwares',
                    location.pathname.includes(paths.dashboard.subscriptions)
                ),
            },
            {
                key: paths.dashboard.logistics,
                stringLabel: 'Logistics',
                icon: NavIcon(LogisticsIcon, location.pathname.includes(paths.dashboard.logistics)),
                label: NavText('Logistics', location.pathname.includes(paths.dashboard.logistics)),
            },
            {
                key: paths.dashboard.giftCards,
                stringLabel: 'Gift Cards',
                icon: NavIcon(GiftCardsIcon, location.pathname.includes(paths.dashboard.giftCards)),
                label: NavText('Gift Cards', location.pathname.includes(paths.dashboard.giftCards)),
            },
            {
                key: paths.dashboard.connect,
                label: NavText('Marketplace', checkRouteIsActive(paths.dashboard.connect), 'free'),
                icon: NavIcon(ConnectIcon, checkRouteIsActive(paths.dashboard.connect)),
                stringLabel: 'Marketplace',
            },
            {
                key: paths.dashboard.invoicing,
                stringLabel: 'Invoicing',
                icon: NavIcon(InvoicingIcon, location.pathname.includes(paths.dashboard.invoicing)),
                label: NavText('Invoicing', location.pathname.includes(paths.dashboard.invoicing)),
            },
            {
                key: paths.dashboard.verificationSuite,
                stringLabel: 'Verification Suite',
                icon: NavIcon(
                    verification,
                    location.pathname.includes(paths.dashboard.verificationSuite),
                    true
                ),
                label: NavText(
                    'Verification Suite',
                    location.pathname.includes(paths.dashboard.verificationSuite)
                ),
            },

            {
                key: paths.dashboard.tax,
                stringLabel: 'Accounting & Tax',
                icon: NavIcon(TaxIcon, location.pathname.includes(paths.dashboard.tax)),
                label: NavText('Accounting & Tax', location.pathname.includes(paths.dashboard.tax)),
            },
            {
                key: paths.dashboard.insurance,
                stringLabel: 'Insurance',
                icon: NavIcon(InsuranceIcon, location.pathname.includes(paths.dashboard.insurance)),
                label: NavText('Insurance', location.pathname.includes(paths.dashboard.insurance)),
            },
            {
                key: paths.dashboard.works,
                stringLabel: 'Works',
                icon: NavIcon(WorksIcon, location.pathname.includes(paths.dashboard.works), true),
                label: NavText('Works', location.pathname.includes(paths.dashboard.works), 'new'),
            },
            {
                key: paths.dashboard.pekoCloud,
                label: NavText('Hub', location.pathname.includes(paths.dashboard.pekoCloud)),
                icon: NavIcon(PekoCloudIcon, location.pathname.includes(paths.dashboard.pekoCloud)),
                stringLabel: 'Hub',
            },

            {
                key: paths.dashboard.whatsappForBusiness,
                label: NavText(
                    'WhatsApp for Business',
                    checkRouteIsActive(paths.dashboard.whatsappForBusiness)
                ),
                icon: NavIcon(
                    WhatsAppForBusinessIcon,
                    checkRouteIsActive(paths.dashboard.whatsappForBusiness)
                ),
                stringLabel: 'WhatsApp for Business',
            },
            {
                key: paths.dashboard.turbo,
                label: NavText(
                    'Turbo',
                    checkRouteIsActive(paths.dashboard.turbo)
                ),
                icon: NavIcon(
                    TurboIcon,
                    checkRouteIsActive(paths.dashboard.turbo),
                    true
                ),
                stringLabel: 'Turbo',
            },
            {
                key: paths.dashboard.corporateCard,
                stringLabel: 'Corporate Card',
                icon: NavIcon(
                    CorporateCardIcon,
                    location.pathname.includes(paths.dashboard.corporateCard),
                    true
                ),
                label: NavText(
                    'Corporate Card',
                    location.pathname.includes(paths.dashboard.corporateCard)
                ),
            },
            // {
            //     key: paths.dashboard.eSign,
            //     stringLabel: 'eSign',
            //     icon: NavIcon(
            //         CorporateCardIcon,
            //         location.pathname.includes(paths.dashboard.eSign),
            //         true
            //     ),
            //     label: NavText(
            //         'eSign',
            //         location.pathname.includes(paths.dashboard.eSign)
            //     ),
            // },
            {
                key: paths.dashboard.domainHosting,
                label: NavText('Domain & Hosting', checkRouteIsActive(paths.dashboard.domainHosting)),
                icon: NavIcon(PekoCloudIcon, checkRouteIsActive(paths.dashboard.domainHosting)),
                stringLabel: 'Domain & Hosting',
            },
            {  
                key: paths.dashboard.paymentLinks,
                stringLabel: 'Payment Links',
                icon: NavIcon(
                    PaymentLinkIcon,
                    location.pathname.includes(paths.dashboard.paymentLinks)
                ),
                label: NavText(
                    'Payment Links',
                    location.pathname.includes(paths.dashboard.paymentLinks)
                ),
            },
            {
                key: paths.dashboard.procure,
                stringLabel: 'Procure',
                alwaysShow: true,
                icon: NavIcon(
                    ProcureIcon,
                    location.pathname.includes(paths.dashboard.procure),
                    true
                ),
                label: NavText(
                    'Procure',
                    location.pathname.includes(paths.dashboard.procure),
                ),
            },
            {
                key: paths.dashboard.moreServices,
                stringLabel: 'More Services',
                icon: NavIcon(
                    MoreServicesIcon,
                    location.pathname.includes(paths.dashboard.moreServices)
                ),
                label: NavText(
                    'More Services',
                    location.pathname.includes(paths.dashboard.moreServices)
                ),
            },
            { key: '', label: <Divider /> },
            {
                key: paths.dashboard.reports,
                stringLabel: 'Reports',
                icon: NavIcon(ReportsIcon, location.pathname.includes(paths.dashboard.reports)),
                label: NavText('Reports', location.pathname.includes(paths.dashboard.reports)),
            },
            {
                key: paths.dashboard.needHelp,
                stringLabel: 'Need Help',
                icon: NavIcon(NeddHelpIcon, location.pathname.includes(paths.dashboard.needHelp)),
                label: NavText('Need Help?', location.pathname.includes(paths.dashboard.needHelp)),
            },
            {
                key: paths.dashboard.settings,
                label: NavText('Settings', checkRouteIsActive(paths.dashboard.settings)),
                icon: NavIcon(SettingIcon, checkRouteIsActive(paths.dashboard.settings)),
                stringLabel: 'Settings',
            },
        ],
        [checkRouteIsActive, location.pathname]
    );

    const adminSidebarConfig: NavItem[] = useMemo(
        () => [
            {
                key: checkRole('dashboard'),
                label: NavText('Dashboard', location.pathname.includes(checkRole('dashboard'))),
                icon: NavIcon(DashboardIcon, location.pathname.includes(checkRole('dashboard'))),
                stringLabel: 'Dashboard',
            },
            {
                key: checkRole('accounts'),
                label: NavText('Accounts', location.pathname.includes(checkRole('accounts'))),
                icon: NavIcon(AccountIcon, location.pathname.includes(checkRole('accounts'))),
                stringLabel: 'Accounts',
            },
            {
                key: checkRole('users'),
                label: NavText('Users', location.pathname.includes(checkRole('users'))),
                icon: NavIcon(AccountIcon, location.pathname.includes(checkRole('users'))),
                stringLabel: 'Users',
            },
            {
                key: checkRole('announcement'),
                label: NavText(
                    'Announcements',
                    location.pathname.includes(checkRole('announcement'))
                ),
                icon: NavIcon(
                    AnnouncementIcon,
                    location.pathname.includes(checkRole('announcement'))
                ),
                stringLabel: 'Announcements',
            },
            {
                key: checkRole('officeSupplies'),
                label: NavText(
                    'Office Supplies',
                    location.pathname.includes(checkRole('officeSupplies'))
                ),
                icon: NavIcon(
                    SuppliesIcon,
                    location.pathname.includes(checkRole('officeSupplies'))
                ),
                stringLabel: 'Office Supplies',
            },

            {
                key: checkRole('reports'),
                label: NavText('Reports', location.pathname.includes(checkRole('reports'))),
                icon: NavIcon(ReportsIcon, location.pathname.includes(checkRole('reports'))),
                stringLabel: 'Reports',
            },
            {
                key: checkRole('payrollConfig'),
                label: NavText('Payroll', location.pathname.includes(checkRole('payrollConfig'))),
                icon: NavIcon(PayrollIcon, location.pathname.includes(checkRole('payrollConfig'))),
                stringLabel: 'Payroll',
            },

            {
                key: checkRole('manage'),
                label: NavText('Manage', location.pathname.includes(checkRole('manage'))),
                icon: NavIcon(ManageIcon, location.pathname.includes(checkRole('manage'))),
                stringLabel: 'Manage',
            },
            {
                key: checkRole('systemConfiguration'),
                label: NavText(
                    'System Configuration',
                    location.pathname.includes(checkRole('systemConfiguration'))
                ),
                icon: NavIcon(
                    SettingIcon,
                    location.pathname.includes(checkRole('systemConfiguration'))
                ),
                stringLabel: 'System Configuration',
            },

            {
                key: checkRole('settings'),
                label: NavText('Settings', location.pathname.includes(checkRole('settings'))),
                icon: NavIcon(SettingIcon, location.pathname.includes(checkRole('settings'))),
                stringLabel: 'Settings',
            },

            {
                key: checkRole('needHelp'),
                label: NavText('Need Help', location.pathname.includes(checkRole('needHelp'))),
                icon: NavIcon(NeddHelpIcon, location.pathname.includes(checkRole('needHelp'))),
                stringLabel: 'Need Help',
            },
        ],
        [location.pathname]
    );

    const generateCorporateData = useCallback(() => {
        const items: NavItem[] = sidebarConfig
            .filter(item => checkCorporateSidebar(item.stringLabel!) || item.key === '' || item.alwaysShow)
            .map(item => ({
                key: item.key,
                label: item.label,
                icon: item.icon,
            }));

        navData.current = items;
    }, [sidebarConfig]);

    const generateSystemData = useCallback(() => {
        const items = adminSidebarConfig
            .filter(item => checkSidebarkAccess(item.stringLabel!) || item.key === '')
            .map(item => ({
                key: item.key,
                label: item.label,
                icon: item.icon,
            }));

        navData.current = items;
    }, [adminSidebarConfig]);

    if (role === UserRole.CORPORATE) {
        generateCorporateData();
    } else if (role === UserRole.SYSTEM) {
        generateSystemData();
    }

    return navData.current;
}
