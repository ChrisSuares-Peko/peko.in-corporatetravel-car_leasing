import { useState } from 'react';

import { Flex, message, Modal, Typography } from 'antd';

import CreatePaymentLinkForm from './createPaymentLink/CreatePaymentLinkForm';
import type { FormState } from './createPaymentLink/CreatePaymentLinkModal.types';
import CreatePaymentLinkSuccess from './createPaymentLink/CreatePaymentLinkSuccess';
import { useCreatePaymentLink } from '../hooks/useCreatePaymentLink';
import { CreatePaymentLinkModalProps } from '../types/paymentLinkTypes';
import { defaultForm, EXPIRY_OPTIONS, MAX_EXPIRY_MINUTES } from '../utils/data';

const CreatePaymentLinkModal = ({ open, onClose, onSubmit }: CreatePaymentLinkModalProps) => {
    const { loading, createLink } = useCreatePaymentLink('payment_link');
    const [paymentLink, setPaymentLink] = useState('');
    const [created, setCreated] = useState(false);
    const [formResetKey, setFormResetKey] = useState(0);
    const [submittedForm, setSubmittedForm] = useState<FormState>(defaultForm);

    const getExpiryInMinutes = (expiry: string) =>
        EXPIRY_OPTIONS.find(option => option.value === expiry)?.minutes || MAX_EXPIRY_MINUTES;

    const handleCreate = async (values: FormState) => {
        const expiryMinutes = getExpiryInMinutes(values.expiry);

        const result = await createLink({
            amount: Number(values.amount),
            purpose_message: values.purposeMessage,
            expiry_time: expiryMinutes,
            customerName: values.customerName,
            customerPhone: values.customerPhone,
        });

        if (!result) {
            return;
        }

        setPaymentLink(result.paymentLink || '');
        setSubmittedForm(values);
        setCreated(true);
        onSubmit();
    };

    const handleReset = () => {
        setCreated(false);
        setPaymentLink('');
        setSubmittedForm(defaultForm);
        setFormResetKey(prev => prev + 1);
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const copyLink = (app?: string) => {
        if (app) {
            navigator.clipboard.writeText(`${paymentLink}?app=${app}`);
        } else {
            navigator.clipboard.writeText(paymentLink);
        }
        message.success('Link copied to clipboard');
    };

    const shareOnWhatsapp = () => {
        if (!paymentLink) {
            message.error('Payment link is not available to share');
            return;
        }

        const text = `Hi, please complete your payment using this link: ${paymentLink}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const expiryLabel =
        EXPIRY_OPTIONS.find(option => option.value === submittedForm.expiry)?.label || '24 hours';

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            classNames={{
                body: '!rounded-3xl !p-0',
                content: '!rounded-3xl !p-0',
                wrapper: '!rounded-3xl',
            }}
            width={600}
            style={{ maxWidth: '95vw' }}
            centered
        >
            <Flex vertical gap={18} className="rounded-3xl px-6 py-5 sm:px-7 sm:py-6">
                <Flex vertical gap={4}>
                    <Typography.Title
                        level={4}
                        className="!mb-0 !text-[20px] !font-semibold !leading-[1.25] !text-[#1F2A44]"
                    >
                        Create Payment Link
                    </Typography.Title>
                    <Typography.Text className="text-[13px] leading-[1.45] text-[#667085]">
                        Enter payment details to generate a shareable link
                    </Typography.Text>
                </Flex>

                <Flex vertical className="pt-1">
                    {created ? (
                        <CreatePaymentLinkSuccess
                            paymentLink={paymentLink}
                            submittedForm={submittedForm}
                            expiryLabel={expiryLabel}
                            onCopy={copyLink}
                            onShareWhatsapp={shareOnWhatsapp}
                            onCreateAnother={handleReset}
                        />
                    ) : (
                        <CreatePaymentLinkForm
                            key={formResetKey}
                            loading={loading}
                            initialValues={defaultForm}
                            onCancel={handleClose}
                            onSubmit={handleCreate}
                        />
                    )}
                </Flex>
            </Flex>
        </Modal>
    );
};

export default CreatePaymentLinkModal;
