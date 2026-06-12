import { useState } from 'react';

import { SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import { Flex, Spin } from 'antd';
import { useParams } from 'react-router-dom';

import BankTransferModal from '../components/invoiceDetails/BankTransferModal';
import CollectPayment from '../components/invoiceDetails/CollectPayment';
import ENACHMandateModal from '../components/invoiceDetails/eNACHMandate/ENACHMandateModal';
import InvoiceEmptyState from '../components/invoiceDetails/InvoiceEmptyState';
import InvoiceReminders from '../components/invoiceDetails/InvoiceReminders';
import PaymentLinkModal from '../components/invoiceDetails/PaymentLinkModal.tsx';
import PaymentTimelineAndDetails from '../components/invoiceDetails/PaymentTimelineAndDetails';
import SendUPICollectModal from '../components/invoiceDetails/upiCollect/SendUPICollectModal';
import VirtualAccountModal from '../components/invoiceDetails/VirtualAccountModal';
import OnboardingModal from '../components/onboarding/OnboardingModal';
import useInvoiceDetails from '../hooks/invoiceDetails/useInvoiceDetails';
import useOnboarding from '../hooks/useOnboarding';
import { CollectPaymentKey } from '../types/invoiceDetails';
import '@react-pdf-viewer/core/lib/styles/index.css';

const ONBOARDING_REQUIRED = ['payment-link', 'bank'];
const PDF_WORKER_URL = '/javascript/pdf.worker.min.js';

const InvoiceDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { invoiceData, isLoading, isPreviewLoading, downloadPdf, isDownloading, pdfUrl } =
        useInvoiceDetails(id);
    const { checkOnboardingStatus } = useOnboarding();
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [pendingModal, setPendingModal] = useState<string | null>(null);
    const [loadingMethod, setLoadingMethod] = useState<CollectPaymentKey | null>(null);
    const isPreviewPending = isLoading || isPreviewLoading;

    const handleSelect = async (key: CollectPaymentKey) => {
        if (loadingMethod) return;

        if (ONBOARDING_REQUIRED.includes(key)) {
            setLoadingMethod(key);
            try {
                const isOnboarded = await checkOnboardingStatus();

                if (!isOnboarded) {
                    setPendingModal(key);
                    setShowOnboarding(true);
                    return;
                }
            } finally {
                setLoadingMethod(null);
            }
        }
        setActiveModal(key);
    };

    let previewContent = <InvoiceEmptyState />;

    if (isPreviewPending) {
        previewContent = (
            <Flex
                align="center"
                justify="center"
                className="w-full min-h-[720px] bg-[#F8FAFC]"
            >
                <Spin />
            </Flex>
        );
    } else if (pdfUrl) {
        previewContent = (
            <Flex className="invoice-pdf-preview w-full h-[calc(100vh-180px)] min-h-[720px] max-h-[1100px] overflow-hidden bg-[#F8FAFC]">
                <Flex className="h-full w-full">
                    <Worker workerUrl={PDF_WORKER_URL}>
                        <Viewer fileUrl={pdfUrl} defaultScale={SpecialZoomLevel.PageWidth} />
                    </Worker>
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex vertical className="w-full pt-3">
            <Flex gap={20} align="start">
                {/* Left: Invoice document preview */}
                <Flex className="flex-1">{previewContent}</Flex>

                {/* Right: Actions & Details */}
                <Flex vertical gap={32} className="flex-1">
                    {invoiceData?.status !== 'PAID' && (
                        <CollectPayment
                            invoiceType={invoiceData?.invoiceType}
                            onSelect={handleSelect}
                            loadingMethod={loadingMethod}
                        />
                    )}

                    <PaymentTimelineAndDetails
                        invoiceData={invoiceData}
                        downloadPdf={downloadPdf}
                        isDownloading={isDownloading}
                    />

                    {invoiceData?.status !== 'PAID' && (
                        <InvoiceReminders
                            invoiceId={id}
                            initialReminders={invoiceData?.reminderSettings}
                            dueDate={invoiceData?.dueDate}
                        />
                    )}
                </Flex>
            </Flex>

            <PaymentLinkModal
                open={activeModal === 'payment-link'}
                onCancel={() => setActiveModal(null)}
                invoiceData={{
                    id: invoiceData?.id ? Number(invoiceData.id) : undefined,
                    amount: invoiceData?.amountDue,
                    customerName: invoiceData?.name,
                    customerPhone: invoiceData?.phoneNumber,
                }}
            />

            <SendUPICollectModal
                open={activeModal === 'upi'}
                onCancel={() => setActiveModal(null)}
                onSuccess={() => setActiveModal(null)}
                onSwitchToPaymentLink={() => setActiveModal('payment-link')}
                invoiceData={{ amount: invoiceData?.amountDue }}
            />

            <BankTransferModal
                open={activeModal === 'bank'}
                onCancel={() => setActiveModal(null)}
            />

            <ENACHMandateModal
                open={activeModal === 'enach'}
                onCancel={() => setActiveModal(null)}
                onSuccess={() => setActiveModal(null)}
                invoiceData={{
                    customerName: invoiceData?.name,
                    customerEmail: invoiceData?.email,
                    customerPhone: invoiceData?.phoneNumber,
                }}
            />

            <VirtualAccountModal
                open={activeModal === 'virtual-iban'}
                onCancel={() => setActiveModal(null)}
                details={{
                    invoiceNo: invoiceData?.invoiceNumber,
                    companyName: invoiceData?.name,
                }}
            />

            <OnboardingModal
                open={activeModal === 'currency-account'}
                onCancel={() => setActiveModal(null)}
                type="currency-account"
            />

            <OnboardingModal
                open={showOnboarding}
                onCancel={() => {
                    setShowOnboarding(false);
                    setPendingModal(null);
                    setLoadingMethod(null);
                }}
                onSuccess={() => {
                    setShowOnboarding(false);
                    if (pendingModal) setActiveModal(pendingModal);
                    setPendingModal(null);
                    setLoadingMethod(null);
                }}
            />
        </Flex>
    );
};

export default InvoiceDetails;
