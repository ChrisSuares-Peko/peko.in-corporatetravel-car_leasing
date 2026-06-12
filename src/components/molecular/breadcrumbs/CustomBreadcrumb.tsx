import React from 'react';

import { Breadcrumb, Typography } from 'antd';
import { FiChevronRight } from 'react-icons/fi';
import { useLocation, Link } from 'react-router-dom';

import { paths } from '@src/routes/paths';

type BreadCrumbProps = object;

const CustomBreadCrumb: React.FC<BreadCrumbProps> = () => {
    const location = useLocation();
    // const { role } = useAppSelector(state => state.reducer.auth);
    const { pathname } = location;
    const pathnames = pathname
        .split('/')
        .filter(item => item)
        .map(item => decodeURIComponent(item));
    const capitalize = (s: string) => {
        if (s === 'eSign') {
            return s;
        }
        if (s === 'esim') {
            return 'eSIM';
        }
        if (s === 'add-ons') {
            return 'Add ons';
        }
        if (s === 'eSIM') return s;
        if (s === 'esim-plans') {
            return 'eSIM Plans';
        }
        if (s === 'ip-whitelist') {
            return 'IP Whitelist';
        }
        if (s === 'ncmc') {
            return 'NCMC';
        }
        if (s === 'nps') {
            return 'NPS';
        }
        if (s === 'clubs-associations') {
            return 'Clubs & Associations';
        }
        if (s === 'hospital-pathology') {
            return 'Hospital & Pathology';
        }
        if (s === 'lpg-cylinder') {
            return 'LPG Cylinder';
        }
        if (s === 'dth-recharge') {
            return 'DTH Recharge';
        }
        if (s === 'fastag') {
            return 'FASTag';
        }
        if (s === 'orders') {
            if (pathname.includes('/corporate-travel/eSIM/')) return 'Order History';
        }
        if (s === 'modify-or-cancel-booking') {
            return 'Modify/Cancel Booking';
        }
        if (s === 'company-incorporation' || s === 'procure') {
            return 'Procure';
        }
        // Return procurement reference numbers as-is (e.g. PO-2026-001, RFQ-2026-001, PR-2026-001)
        if (/^(PO|RFQ|PR|INV)-\d{4}-\d{3,}$/.test(s)) {
            return s;
        }
        return s
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    const nestedRoutes = [
        'details',
        'product-details',
        'order-details',
        'project-details',
        'purchase',
        // 'wallet-history',
    ];

    const blackListedRoutes = [
        'payment-success',
        'payment-failure',
        'payment-pending',
        // role !== 'system_user' && 'peko-wallet',
        'payments',
        'hotels',
        'airline',
        'system-user',
        'plans',
        'review-order',
        'contact-us',
        'topup-success',
    ];

    const extraBreadcrumbItems: any = pathnames
        .map((name, index) => {
            const isIndexLast = index + 1 === pathnames.length - 1;
            let routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            if (nestedRoutes.includes(name) && isIndexLast) {
                return {
                    key: name,
                    title: (
                        <Typography.Text className=" font-normal text-sm text-[#FF9B9B]">
                            {capitalize(name)}
                        </Typography.Text>
                    ),
                };
            }
            if (nestedRoutes.includes(name) && !isIndexLast) {
                routeTo = `/${pathnames.slice(0, index + 2).join('/')}`;
                return {
                    key: name,
                    title: (
                        <Link to={routeTo}>
                            <Typography.Text className=" font-normal text-sm text-[#667085]">
                                {capitalize(name)}
                            </Typography.Text>
                        </Link>
                    ),
                };
            }

            const isLast = index === pathnames.length - 1;

            // Check if it's a UUID (more accurate check)
            const isUUID = parseInt(name, 10) > 0;

            // if ((isLast && isUUID) || pathnames.length === 1) {
            //     return { title: '', key: '' };
            // }
            if (isUUID || pathnames.length === 1 || blackListedRoutes.includes(name)) {
                return { title: '', key: '' };
            }

            if (isLast && !isUUID) {
                return {
                    title: (
                        <Typography.Text className=" font-normal text-sm text-[#FF9B9B]">
                            {capitalize(name)}
                        </Typography.Text>
                    ),
                    key: name,
                };
            }

            if (name === 'tax-and-more') {
                return {
                    title: (
                        <Link to={routeTo}>
                            <Typography.Text className=" font-normal text-sm text-[#667085]">
                                Tax & More
                            </Typography.Text>
                        </Link>
                    ),
                    key: name,
                };
            }
            if (name === paths.whatsappForBusiness.index) {
                return {
                    title: (
                        <Link to={routeTo}>
                            <Typography.Text className=" font-normal text-sm text-[#667085]">
                                WhatsApp for Business
                            </Typography.Text>
                        </Link>
                    ),
                    key: name,
                };
            }

            return {
                title: (
                    <Link to={routeTo}>
                        <Typography.Text className=" font-normal text-sm text-[#667085]">
                            {capitalize(name)}
                        </Typography.Text>
                    </Link>
                ),
                key: name,
            };
        })
        .filter(item => item.key !== '');

    const breadcrumbs = [...extraBreadcrumbItems];

    return (
        breadcrumbs.length > 0 && (
            <div id="custom-breadcrumb" className="bg-white">
                <Breadcrumb
                    items={breadcrumbs}
                    separator={
                        <div className="-mx-1 pt-[2px]">
                            <FiChevronRight className="text-base " />
                        </div>
                    }
                    className={` ${extraBreadcrumbItems.length > 0 ? 'mb-4' : 'mb-0'}`}
                />
            </div>
        )
    );
};

export default CustomBreadCrumb;
