import { useState } from 'react';

import { ArrowRightOutlined, CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Input, Typography } from 'antd';

import { PanStepData } from '../types/activateCollectionsTypes';
import { OnboardingRecord } from '../types/paymentLinkTypes';

interface Props {
    onCancel: () => void;
    onContinue: () => void;
    loading?: boolean;
    initialData?: OnboardingRecord | null;
    saveDetails: (data: PanStepData) => Promise<boolean>;
}

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;

const OnboardingPanVerificationStep = ({
    onCancel,
    onContinue,
    loading,
    initialData,
    saveDetails,
}: Props) => {
    const savedPan = initialData?.pan?.toUpperCase() || '';
    const hasVerifiedSavedPan = Boolean(savedPan && initialData?.panVerifiedAt);
    const [panInput, setPanInput] = useState(savedPan);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');

    const showVerifiedState = async () => {
        setError('');
        setVerified(true);
        setVerifying(false);
    };

    const handleContinue = async () => {
        if (verified) {
            onContinue();
        } else {
            const normalizedPan = panInput.trim().toUpperCase();

            if (!panInput.trim()) {
                setError('Please enter pan number');
                return;
            }
            if (!PAN_REGEX.test(normalizedPan)) {
                setError('Please enter a valid PAN number.');
                return;
            }

            if (hasVerifiedSavedPan && normalizedPan === savedPan) {
                onContinue();
                return;
            }

            setVerifying(true);
            const isValid = await saveDetails({ pan: normalizedPan });
            if (isValid) {
                await showVerifiedState();
            } else {
                setVerifying(false);
            }
        }
    };

    return (
        <Flex vertical gap={20} className="mt-4">
            <Flex vertical gap={3}>
                <Typography.Text className="text-[16px] font-semibold leading-[1.35] text-[#1F2A44]">
                    Verify PAN Details
                </Typography.Text>
                <Typography.Text className="text-xs leading-[1.4] text-[#667085]">
                    PAN verification is required to comply with KYC regulations and enable payment
                    collections.
                </Typography.Text>
            </Flex>

            {verified ? (
                <Card
                    className="rounded-xl border border-[#ABEFC6] shadow-none overflow-hidden"
                    styles={{ body: { padding: '16px 20px', background: '#F6FEF9' } }}
                >
                    <Flex align="center" gap={8}>
                        <CheckCircleFilled style={{ fontSize: 16, color: '#12B76A' }} />
                        <Flex vertical gap={2}>
                            <Typography.Text className="text-[14px] font-semibold text-[#027A48]">
                                PAN Verified Successfully
                            </Typography.Text>
                            <Typography.Text className="text-[13px] text-[#667085]">
                                {panInput.trim().toUpperCase()}
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Card>
            ) : (
                <Flex vertical gap={6}>
                    <Typography.Text className="text-[13px] font-medium text-[#344054]">
                        PAN Number <span style={{ color: '#FF4D4F' }}>*</span>
                    </Typography.Text>
                    <Input
                        placeholder="e.g. ABCDE1234F"
                        value={panInput}
                        onChange={e => {
                            setPanInput(e.target.value.toUpperCase());
                            setError('');
                        }}
                        maxLength={10}
                        className="!h-10 !rounded-lg !text-[13px]"
                        status={error ? 'error' : undefined}
                    />
                    {error && (
                        <Typography.Text className="text-[12px] text-[#FF4D4F]">
                            {error}
                        </Typography.Text>
                    )}
                </Flex>
            )}

            {!verified && (
                <Card
                    className="rounded-xl border border-[#FEF0C7] shadow-none overflow-hidden"
                    styles={{ body: { padding: '14px 16px', background: '#FFFCF0' } }}
                >
                    <Flex gap={10} align="flex-start">
                        <InfoCircleOutlined
                            style={{ fontSize: 14, color: '#F79009', flexShrink: 0, marginTop: 1 }}
                        />
                        <Flex vertical gap={4}>
                            <Typography.Text className="text-[13px] font-semibold text-[#344054]">
                                Why is PAN required?
                            </Typography.Text>
                            <Typography.Text className="text-[12px] leading-[1.5] text-[#667085]">
                                As per RBI guidelines, PAN verification is mandatory for businesses
                                collecting payments above ₹50,000 per transaction.
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Card>
            )}

            <Flex justify="flex-end" gap={10} className="pt-1">
                <Button className="!h-9 !rounded-md !px-5 !text-[13px]" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    danger
                    className="!h-9 !rounded-md !px-5 !text-[13px] !font-medium"
                    loading={verifying || loading}
                    icon={<ArrowRightOutlined />}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </Flex>
        </Flex>
    );
};

export default OnboardingPanVerificationStep;
