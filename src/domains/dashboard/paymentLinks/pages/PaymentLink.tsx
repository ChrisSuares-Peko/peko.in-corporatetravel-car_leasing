import { useState } from 'react';

import { Col, Flex, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import CreatePaymentLinkModal from '../components/CreatePaymentLinkModal';
import GenerateQrCodeModal from '../components/GenerateQrCodeModal';
import CollectPaymentSection from '../components/paymentLinkPage/CollectPaymentSection';
import PaymentLinkPageHeader from '../components/paymentLinkPage/PaymentLinkPageHeader';
import PaymentLinkStatsCards from '../components/paymentLinkPage/PaymentLinkStatsCards';
import RecentTransactionsCard from '../components/paymentLinkPage/RecentTransactionsCard';
import SendUpiCollectModal from '../components/SendUpiCollectModal';
import ShareBankDetailsModal from '../components/ShareBankDetailsModal';
import useGetDashboardData from '../hooks/useGetDashboardData';
import { CollectPaymentAction, OnboardingRecord } from '../types/paymentLinkTypes';

interface PaymentLinkProps {
    onboardingRecord?: OnboardingRecord | null;
}

const PaymentLink = ({ onboardingRecord }: PaymentLinkProps) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [bankModalOpen, setBankModalOpen] = useState(false);
    const [upiModalOpen, setUpiModalOpen] = useState(false);

    const {
        activePaymentLinksCount,
        totalAmountThisMonth,
        transactions,
        isLoading,
        fetchDashboardData,
    } = useGetDashboardData();

    const handleCollectOptionClick = (modalType: CollectPaymentAction) => {
        if (modalType === 'createLink') setModalOpen(true);
        if (modalType === 'generateQr') setQrModalOpen(true);
        if (modalType === 'bankDetails') setBankModalOpen(true);
        if (modalType === 'upiCollect') setUpiModalOpen(true);
        if (modalType === 'enach') navigate(paths.paymentLinks.ENachMandates);
        if (modalType === 'virtualAccountStatement') navigate(paths.paymentLinks.VirtualAccountStatement);
    };

    return (
        <Flex vertical gap={20} className="p-4 md:p-6">
            <PaymentLinkPageHeader onCreatePaymentLink={() => setModalOpen(true)} />

            {/* Two-column layout */}
            <Row gutter={24} align="stretch">
                {/* Left: stats + collect payment */}
                <Col xs={24} lg={16}>
                    <Flex vertical gap={24}>
                        <PaymentLinkStatsCards
                            activePaymentLinksCount={activePaymentLinksCount}
                            totalAmountThisMonth={totalAmountThisMonth}
                            isLoading={isLoading}
                        />
                        <CollectPaymentSection onOptionClick={handleCollectOptionClick} />
                    </Flex>
                </Col>

                {/* Right: Recent Transactions */}
                <Col xs={24} lg={8}>
                    <RecentTransactionsCard
                        transactions={transactions}
                        isLoading={isLoading}
                        onViewAll={() => navigate(paths.paymentLinks.Transactions)}
                    />
                </Col>
            </Row>

            <CreatePaymentLinkModal
                open={modalOpen}
                onSubmit={fetchDashboardData}
                onClose={() => setModalOpen(false)}
            />
            <GenerateQrCodeModal
                open={qrModalOpen}
                onSubmit={fetchDashboardData}
                onClose={() => setQrModalOpen(false)}
            />
            <ShareBankDetailsModal
                open={bankModalOpen}
                onClose={() => setBankModalOpen(false)}
                bankDetailsData={onboardingRecord}
            />
            <SendUpiCollectModal open={upiModalOpen} onClose={() => setUpiModalOpen(false)} />
        </Flex>
    );
};

export default PaymentLink;
