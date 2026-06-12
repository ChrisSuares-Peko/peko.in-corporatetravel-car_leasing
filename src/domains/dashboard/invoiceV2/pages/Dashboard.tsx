import React, { useMemo, useState } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import TypographyText from '@components/atomic/typography/typographyText';
import { paths } from '@routes/paths';

import globalImg from '../assets/icons/global.svg';
import CollectPaymentModal from '../components/collectPayment/CollectPaymentModal';
import SelectInvoiceDrawer from '../components/collectPayment/SelectInvoiceDrawer';
import QuickAccessCard from '../components/dashboard/QuickAccessCard';
import RecentInvoiceRow from '../components/dashboard/RecentInvoiceRow';
import StatCard from '../components/dashboard/StatCard';
// import InternationalRemittanceModal from '../components/internationalRemittance/InternationalRemittanceModal';
import ManageBankAccountsModal from '../components/manageBankAccounts/ManageBankAccountsModal';
import SettingsDrawer from '../components/SettingsDrawer';
import ComingSoonModal from '../components/shared/ComingSoonModal';
import { QUICK_ACCESS_CONFIG, STAT_CARDS_CONFIG } from '../constants/dashboard';
import useSelectableInvoices from '../hooks/collectPayment/useSelectableInvoices';
import useDashboardData from '../hooks/useDashboardData';
import { StatCardItem } from '../types';
import { CollectPaymentStep } from '../types/CollectPayment';
import { QuickAccessItem } from '../types/dashboard';
import { InvoiceRow } from '../types/invoice';
import { formatAmount, formatDateAndTime } from '../utils/helperFunctions';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { stats, recentInvoices } = useDashboardData();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isRemittanceOpen, setIsRemittanceOpen] = useState(false);
    const [isBankAccountsOpen, setIsBankAccountsOpen] = useState(false);
    const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
    const [isSelectInvoiceOpen, setIsSelectInvoiceOpen] = useState(false);
    const [isCollectPaymentOpen, setIsCollectPaymentOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(null);
    const [collectPaymentStep, setCollectPaymentStep] = useState<CollectPaymentStep>('options');
    const {
        invoices: selectableInvoices,
        isLoading: isSelectableLoading,
        totalPending,
        setRefresh: refreshSelectableInvoices,
    } = useSelectableInvoices(isSelectInvoiceOpen);

    const statCards = useMemo<StatCardItem[]>(
        () => [
            {
                ...STAT_CARDS_CONFIG[0],
                value: formatAmount(stats?.totalInvoiceAmount || 0),
                growthPercent: stats?.vsLastMonthPercent,
            },
            { ...STAT_CARDS_CONFIG[1], value: formatAmount(stats?.totalDueAmount || 0) },
        ],
        [stats]
    );

    const quickAccessItems = useMemo<QuickAccessItem[]>(
        () => [
            { ...QUICK_ACCESS_CONFIG[0], onClick: () => navigate(paths.invoice.create) },
            { ...QUICK_ACCESS_CONFIG[1], onClick: () => setIsComingSoonOpen(true) },
            { ...QUICK_ACCESS_CONFIG[2], onClick: () => navigate(paths.invoice.customers) },
            { ...QUICK_ACCESS_CONFIG[3], onClick: () => setIsBankAccountsOpen(true) },
            { ...QUICK_ACCESS_CONFIG[4], onClick: () => setIsSelectInvoiceOpen(true) },
        ],
        [navigate]
    );

    return (
        <Content className="px-0">
            {/* Header */}
            <Flex justify="space-between" align="center" className="mt-5 mb-6">
                <Flex vertical gap={6}>
                    <TypographyText className="text-[#101828] text-2xl font-semibold leading-8">
                        Invoicing
                    </TypographyText>
                    <TypographyText className="text-[#6A7282] text-base font-normal leading-6">
                        Manage your invoices and track payments
                    </TypographyText>
                </Flex>
                <Button
                    icon={<SettingOutlined />}
                    className="h-9 px-5 border-[#FF4F4F] text-[#FF4F4F] font-medium text-sm rounded-lg"
                    onClick={() => setIsSettingsOpen(true)}
                >
                    Settings
                </Button>
            </Flex>

            {/* Body: 2 columns */}
            <Flex gap={20} align="stretch" className="invoice-body-flex">
                {/* LEFT column */}
                <Flex vertical gap={32} className="flex-1">
                    {/* Stats row */}
                    <Flex gap={16}>
                        {statCards.map(({ id, ...card }) => (
                            <StatCard key={id} {...card} />
                        ))}
                    </Flex>

                    {/* Quick Access */}
                    <Flex vertical gap={12}>
                        <TypographyText className="text-base font-semibold leading-6">
                            Quick Access
                        </TypographyText>
                        <Flex justify="space-between" align="flex-start">
                            {quickAccessItems.map(({ id, ...item }) => (
                                <QuickAccessCard key={id} {...item} />
                            ))}
                        </Flex>
                    </Flex>

                    {/* Activate International Payments banner */}
                    <Flex
                        justify="space-between"
                        align="center"
                        className="bg-[#F8FAFC] rounded-2xl px-6 py-4"
                    >
                        <Flex align="center" gap={16}>
                            <ReactSVG src={globalImg} />
                            <TypographyText className="text-[#101828] text-base font-semibold leading-6">
                                Activate International Payments
                            </TypographyText>
                        </Flex>
                        <Button
                            className="h-9 px-5 border-[#FF4F4F] text-[#FF4F4F] font-medium text-sm rounded-lg hover:bg-transparent"
                            onClick={() => setIsRemittanceOpen(true)}
                        >
                            Activate Now
                        </Button>
                    </Flex>
                </Flex>

                {/* RIGHT column — Recent Invoices */}
                <Flex
                    vertical
                    gap={20}
                    className="w-[430px] bg-[#F9F9F9] rounded-2xl p-6 flex-shrink-0 self-stretch"
                >
                    <Flex justify="space-between" align="center">
                        <TypographyText className="text-[#101828] text-base font-semibold leading-6">
                            Recent Invoices
                        </TypographyText>
                        <Link
                            to={paths.invoice.allInvoice}
                            className="text-[#FF4F4F] text-sm font-normal no-underline hover:text-[#FF4F4F]"
                        >
                            View all
                        </Link>
                    </Flex>
                    <Flex vertical gap={12} className="flex-1">
                        {recentInvoices.length > 0 ? (
                            recentInvoices.map(inv => (
                                <RecentInvoiceRow
                                    key={inv.id}
                                    name={inv.name}
                                    date={formatDateAndTime(inv.createdAt)}
                                    amount={Number(inv.totalAmount)}
                                    isCredit={false}
                                />
                            ))
                        ) : (
                            <Flex justify="center" align="center" className="flex-1 h-full">
                                <Typography.Text className="text-sm text-[#A1A1AA]">
                                    No recent invoices
                                </Typography.Text>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </Flex>

            <SettingsDrawer open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            {/* <InternationalRemittanceModal
                open={isRemittanceOpen}
                onClose={() => setIsRemittanceOpen(false)}
            /> */}
            <ComingSoonModal
                open={isRemittanceOpen}
                onClose={() => setIsRemittanceOpen(false)}
                title="Coming Soon!"
                description="International Remittance feature is currently under development. We'll notify you when it's ready."
            />
            <ManageBankAccountsModal
                open={isBankAccountsOpen}
                onClose={() => setIsBankAccountsOpen(false)}
            />
            <ComingSoonModal
                open={isComingSoonOpen}
                onClose={() => setIsComingSoonOpen(false)}
                title="Coming Soon!"
                description="E-Invoice feature is currently under development. We'll notify you when it's ready."
            />
            <SelectInvoiceDrawer
                open={isSelectInvoiceOpen}
                onClose={() => setIsSelectInvoiceOpen(false)}
                onSelectInvoice={inv => {
                    setSelectedInvoice(inv);
                    setIsSelectInvoiceOpen(false);
                    setCollectPaymentStep('options');
                    setIsCollectPaymentOpen(true);
                }}
                invoices={selectableInvoices}
                isLoading={isSelectableLoading}
                totalPending={totalPending}
            />
            <CollectPaymentModal
                open={isCollectPaymentOpen}
                onClose={() => {
                    setIsCollectPaymentOpen(false);
                    setCollectPaymentStep('options');
                }}
                invoice={selectedInvoice}
                step={collectPaymentStep}
                onStepChange={setCollectPaymentStep}
                onPaymentSuccess={() => refreshSelectableInvoices(true)}
            />
        </Content>
    );
};

export default Dashboard;
