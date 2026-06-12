import React, { useState } from 'react';

import { Flex, Modal, Typography } from 'antd';

import CollectPaymentOptions from './CollectPaymentOptions';
import PaymentReceived from './PaymentReceived';
import RecordManually from './RecordManually';
import UpiCollect from './UpiCollect';
import {
    COLLECT_PAYMENT_STEP_META,
    COLLECT_PAYMENT_SUCCESS_STEPS,
} from '../../constants/collectPayment';
import useOnboarding from '../../hooks/useOnboarding';
import { CollectPaymentStep, SendPaymentLinkFormValues } from '../../types/CollectPayment';
import { InvoiceRow } from '../../types/invoice';
import OnboardingModal from '../onboarding/OnboardingModal';
import LeftHeader from '../shared/LeftHeader';
import PaymentLinkCreated from '../shared/PaymentLinkCreated';
import SendPaymentLink from '../shared/SendPaymentLink';

type Props = {
    open: boolean;
    onClose: () => void;
    invoice: InvoiceRow | null;
    step: CollectPaymentStep;
    onStepChange: (step: CollectPaymentStep) => void;
    onPaymentSuccess?: () => void;
};

const CollectPaymentModal: React.FC<Props> = ({
    open,
    onClose,
    invoice,
    step,
    onStepChange,
    onPaymentSuccess,
}) => {
    const [paymentLinkData, setPaymentLinkData] = useState<SendPaymentLinkFormValues | null>(null);
    const [paymentLink, setPaymentLink] = useState<string | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [loadingStep, setLoadingStep] = useState<CollectPaymentStep | null>(null);
    const { checkOnboardingStatus } = useOnboarding();
    const { title, subtitle } = COLLECT_PAYMENT_STEP_META[step];
    const isSuccessStep = COLLECT_PAYMENT_SUCCESS_STEPS.includes(step);

    const handleStepSelect = async (nextStep: CollectPaymentStep) => {
        if (loadingStep) return;

        if (nextStep === 'send-link') {
            setLoadingStep(nextStep);
            try {
                const isOnboarded = await checkOnboardingStatus();
                if (!isOnboarded) {
                    setShowOnboarding(true);
                    return;
                }
            } finally {
                setLoadingStep(null);
            }
        }
        onStepChange(nextStep);
    };

    return (
        <>
            <Modal
                open={open}
                onCancel={() => {
                    setPaymentLinkData(null);
                    setPaymentLink(null);
                    onClose();
                }}
                width={520}
                centered
                footer={null}
                closable={false}
                destroyOnHidden
                className="[&_.ant-modal-content]:rounded-[20px] [&_.ant-modal-content]:p-7"
            >
                <Flex vertical gap={12}>
                    {!isSuccessStep && (
                        <>
                            <LeftHeader title={title} description={subtitle} />

                            {/* Invoice summary card */}
                            <Flex
                                justify="space-between"
                                align="center"
                                className="bg-[#F8FAFC] rounded-2xl px-5 py-3"
                            >
                                <Flex vertical gap={4}>
                                    <Typography.Text className="text-[#101828] text-sm font-semibold block">
                                        {invoice?.invoiceNumber}
                                    </Typography.Text>
                                    <Typography.Text className="text-[#475569] text-xs font-normal block">
                                        {invoice?.name}
                                    </Typography.Text>
                                </Flex>
                                <Typography.Text className="text-green-700 text-base font-semibold">
                                    ₹{invoice?.amountDue}
                                </Typography.Text>
                            </Flex>
                        </>
                    )}

                    {/* Dynamic content */}
                    {step === 'options' && (
                        <CollectPaymentOptions
                            onSelect={handleStepSelect}
                            loadingStep={loadingStep}
                        />
                    )}
                    {step === 'send-link' && (
                        <SendPaymentLink
                            onCancel={onClose}
                            invoiceId={invoice?.id}
                            onSuccess={(values, link) => {
                                setPaymentLinkData(values);
                                setPaymentLink(link);
                                onStepChange('payment-link-created');
                            }}
                            initialValues={{
                                amount: invoice?.amountDue || invoice?.totalAmount || '',
                                customerName: invoice?.name || '',
                                customerPhone: invoice?.phoneNumber || '',
                            }}
                        />
                    )}
                    {step === 'upi' && (
                        <UpiCollect
                            invoice={invoice}
                            onSuccess={() => onStepChange('payment-received')}
                        />
                    )}
                    {step === 'record' && (
                        <RecordManually
                            invoice={invoice}
                            onCancel={onClose}
                            onPaymentSuccess={onPaymentSuccess}
                        />
                    )}
                    {step === 'payment-link-created' && paymentLinkData && paymentLink && (
                        <PaymentLinkCreated
                            values={paymentLinkData}
                            paymentLink={paymentLink}
                            onCreateAnother={() => onStepChange('send-link')}
                            title={title}
                            subtitle={subtitle}
                        />
                    )}
                    {step === 'payment-received' && (
                        <PaymentReceived invoice={invoice} onClose={onClose} title={title} />
                    )}
                </Flex>
            </Modal>

            <OnboardingModal
                open={showOnboarding}
                onCancel={() => setShowOnboarding(false)}
                onSuccess={() => {
                    setShowOnboarding(false);
                    onStepChange('send-link');
                }}
            />
        </>
    );
};

export default CollectPaymentModal;
