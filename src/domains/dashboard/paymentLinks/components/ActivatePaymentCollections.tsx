import { useState } from 'react';

import { Card, Flex, Typography } from 'antd';

import ActivationSuccess from './ActivationSuccess';
import OnboardingBankVerificationStep from './OnboardingBankVerificationStep';
import OnboardingBusinessDetailsStep from './OnboardingBusinessDetailsStep';
import OnboardingConsentStep from './OnboardingConsentStep';
import OnboardingPanVerificationStep from './OnboardingPanVerificationStep';
import OnboardingStepIndicator from './OnboardingStepIndicator';
import { usePaymentLinkOnboarding } from '../hooks/usePaymentLinkOnboarding';
import {
    ActivatePaymentCollectionsProps,
    BankStepData,
    PanStepData,
    Step1Data,
} from '../types/activateCollectionsTypes';
import { OnboardingRecord } from '../types/paymentLinkTypes';

const ActivatePaymentCollections = ({
    onCancel,
    onActivated,
    initialData,
    refresh,
}: ActivatePaymentCollectionsProps) => {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
    const [activatedRecord, setActivatedRecord] = useState<OnboardingRecord | null>(null);
    const { loading, record, submitStep1, submitPanStep, submitBankStep, submitStep2 } =
        usePaymentLinkOnboarding();
    const currentOnboardingData = record ?? initialData;

    const handleStep1Continue = async (data: Step1Data) => {
        const result = await submitStep1(data);
        if (!result) {
            return;
        }
        setStep1Data(data);
        setStep(2);
    };

    const handlePanContinue = () => {
        setStep(3);
    };

    const handleBankContinue = (_data: BankStepData) => {
        setStep(4);
    };

    const handleActivate = async () => {
        const result = await submitStep2();
        if (!result) {
            return;
        }
        setActivatedRecord(result);
    };

    const handleContinue = () => {
        refresh();
        onActivated();
    };

    if (activatedRecord) {
        return (
            <ActivationSuccess
                virtualAccountNumber={activatedRecord.virtualAccountNumber}
                onContinue={handleContinue}
            />
        );
    }

    return (
        <Flex align="center" justify="center" className="w-full px-4 py-6">
            <Card
                className="w-full max-w-[600px] rounded-[20px] border border-[#D7E2F0] shadow-none"
                styles={{ body: { padding: '32px 36px' } }}
            >
                <Flex vertical gap={20}>
                    <Flex vertical gap={2}>
                        <Typography.Title
                            level={3}
                            className="!mb-0 !text-[22px] !font-bold !leading-[1.3] !text-[#1F2A44]"
                        >
                            Activate Payment Collections
                        </Typography.Title>
                        <Typography.Text className="text-[13px] leading-[1.45] text-[#667085]">
                            Just 4 quick steps to start accepting payments
                        </Typography.Text>
                    </Flex>

                    <OnboardingStepIndicator step={step} />

                    {step === 1 && (
                        <OnboardingBusinessDetailsStep
                            onCancel={onCancel}
                            onContinue={handleStep1Continue}
                            loading={loading}
                            initialData={currentOnboardingData}
                        />
                    )}

                    {step === 2 && (
                        <OnboardingPanVerificationStep
                            onCancel={() => setStep(1)}
                            onContinue={handlePanContinue}
                            initialData={currentOnboardingData}
                            saveDetails={async (data: PanStepData) => {
                                const result = await submitPanStep(data);
                                if (!result) {
                                    return false;
                                }
                                return true;
                            }}
                            loading={loading}
                        />
                    )}

                    {step === 3 && (
                        <OnboardingBankVerificationStep
                            step1Data={step1Data}
                            initialData={currentOnboardingData}
                            onBack={() => setStep(2)}
                            onContinue={handleBankContinue}
                            saveDetails={async data => {
                                const result = await submitBankStep({
                                    accountNumber: data.accountNumber,
                                    ifsc: data.ifsc,
                                    bankName: data.bankName,
                                    name: data.accountHolderName,
                                    phone: data.phone,
                                });

                                if (!result) {
                                    return false;
                                }

                                return result;
                            }}
                            loading={loading}
                        />
                    )}

                    {step === 4 && (
                        <OnboardingConsentStep
                            onBack={() => setStep(3)}
                            onActivate={handleActivate}
                            loading={loading}
                            step1Data={step1Data}
                        />
                    )}
                </Flex>
            </Card>
        </Flex>
    );
};

export default ActivatePaymentCollections;
