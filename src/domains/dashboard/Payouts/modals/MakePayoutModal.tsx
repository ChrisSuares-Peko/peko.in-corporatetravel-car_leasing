import React, { useEffect, useState } from 'react';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Modal, Select, Space, Typography } from 'antd';

import { useAppDispatch } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';

import { usePaymentLinkOnboarding } from '../hooks/usePaymentLinkOnboarding';
import usePostPayoutTransferApi from '../hooks/usePostPayoutTransferApi';
import { PendingRentPayout, PayoutTransferResponse } from '../types';

const { Text, Title } = Typography;

const paymentModeOptions = [
    { value: 'NEFT', label: 'NEFT - National Electronic Funds Transfer' },
    { value: 'RTGS', label: 'RTGS - Real Time Gross Settlement' },
    { value: 'IMPS', label: 'IMPS - Immediate Payment Service' },
];

interface MakePayoutModalProps {
    visible: boolean;
    onCancel: () => void;
    payoutData: PendingRentPayout | null;
    onProcessPayment: (result: PayoutTransferResponse) => void;
}

const MakePayoutModal: React.FC<MakePayoutModalProps> = ({
    visible,
    onCancel,
    payoutData,
    onProcessPayment,
}) => {
    const dispatch = useAppDispatch();
    const { submitPayoutTransfer, isLoading } = usePostPayoutTransferApi();
    const { fetchStatus, record: onboardingRecord } = usePaymentLinkOnboarding();
    const [transferType, setTransferType] = useState<string>('NEFT');

    useEffect(() => {
        if (visible) {
            fetchStatus();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const handleProcess = async () => {
        if (!payoutData) return;

        const res = await submitPayoutTransfer({
            rentBillId: payoutData.rentBillId,
            beneficiaryId: payoutData.beneficiaryId,
            amount: payoutData.amount,
            transferType,
            category: payoutData.category,
            bankName: onboardingRecord?.bankName ?? undefined,
            accountNumber: onboardingRecord?.accountNumber ?? undefined,
            ifsc: onboardingRecord?.ifsc ?? undefined,
            virtualAccountNumber: onboardingRecord?.virtualAccountNumber ?? undefined,
        });
        if (res) {
            onProcessPayment(res);
        } else {
            dispatch(showToast({ description: 'Payout transfer failed. Please try again.', variant: 'error' }));
        }
    };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            centered
            width={520}
            styles={{ content: { borderRadius: 20 } }}
            title={<Title level={4} className="m-0">Make Payout</Title>}
        >
            <Space direction="vertical" size={20} className="w-full mt-5">
                <Space direction="vertical" size={8} className="w-full">
                    <Text strong>Payment Account</Text>
                    <Select
                        className="w-full"
                        disabled
                        value={onboardingRecord ? `${onboardingRecord.accountNumber} (${onboardingRecord.bankName})` : undefined}
                        placeholder="No account linked"
                        options={onboardingRecord ? [{ value: `${onboardingRecord.accountNumber} (${onboardingRecord.bankName})`, label: `${onboardingRecord.accountNumber} (${onboardingRecord.bankName})` }] : []}
                    />
                </Space>

                <Space direction="vertical" size={8} className="w-full">
                    <Text strong>Payment Mode</Text>
                    <Select
                        className="w-full"
                        value={transferType}
                        onChange={setTransferType}
                        options={paymentModeOptions}
                    />
                </Space>

                <Space
                    direction="vertical"
                    size={12}
                    className="w-full rounded-xl border border-[#e5e7eb] p-4 bg-[#F8FAFC]"
                >
                    <Text strong>Payment Details</Text>
                    <Divider className="m-0" />

                    <Flex justify="space-between" className="w-full">
                        <Text type="secondary">Vendor Name:</Text>
                        <Text>{payoutData?.payeeName ?? 'INT Trade Ltd.'}</Text>
                    </Flex>
                    <Flex justify="space-between" className="w-full">
                        <Text type="secondary">Bill Number:</Text>
                        <Text>#{payoutData?.rentBillId ?? '12544'}</Text>
                    </Flex>
                    <Flex justify="space-between" className="w-full">
                        <Text type="secondary">Date:</Text>
                        <Text>{payoutData?.createdAt ? new Date(payoutData.createdAt).toISOString().slice(0, 10) : '—'}</Text>
                    </Flex>
                    <Flex justify="space-between" className="w-full">
                        <Text type="secondary">Bank Account:</Text>
                        <Text>{onboardingRecord?.accountNumber ?? '—'}</Text>
                    </Flex>
                    <Flex justify="space-between" className="w-full">
                        <Text type="secondary">IFSC Code:</Text>
                        <Text>{onboardingRecord?.ifsc ?? '—'}</Text>
                    </Flex>

                    <Divider className="m-0" />

                    <Flex justify="space-between" className="w-full">
                        <Text strong>Total Amount:</Text>
                        <Text strong style={{ fontSize: 16 }}>
                            ₹{payoutData?.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'}
                        </Text>
                    </Flex>
                </Space>

                <Flex justify="end" gap={12} className="w-full">
                    <Button onClick={onCancel} style={{ borderRadius: 8 }}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        loading={isLoading}
                        onClick={handleProcess}
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        style={{ borderRadius: 8, background: '#FF4D4F', borderColor: '#FF4D4F' }}
                    >
                        Process Payment
                    </Button>
                </Flex>
            </Space>
        </Modal>
    );
};

export default MakePayoutModal;
