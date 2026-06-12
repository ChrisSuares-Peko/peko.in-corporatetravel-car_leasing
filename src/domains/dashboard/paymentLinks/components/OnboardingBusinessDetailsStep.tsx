import { useState } from 'react';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { showToast } from '@src/slices/apiSlice';

import BankAccountCard from './BankAccountCard';
import BusinessNameCard from './BusinessNameCard';
import { Step1Data } from '../types/activateCollectionsTypes';
import { OnboardingRecord } from '../types/paymentLinkTypes';

interface Props {
    onCancel: () => void;
    onContinue: (data: Step1Data) => void;
    loading: boolean;
    initialData?: OnboardingRecord | null;
}

const OnboardingBusinessDetailsStep = ({ onCancel, onContinue, loading, initialData }: Props) => {
    const dispatch = useDispatch();
    const [businessName, setBusinessName] = useState(initialData?.businessName || '');
    const [bankName, setBankName] = useState(initialData?.bankName || '');
    const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || '');
    const [ifsc, setIfsc] = useState(initialData?.ifsc || '');

    const handleContinue = () => {
        if (!businessName.trim()) {
            dispatch(showToast({ description: 'Enter your business name to continue.', variant: 'error' }));
            return;
        }

        const hasAnyBank = bankName.trim() || accountNumber.trim() || ifsc.trim();

        if (!hasAnyBank) {
            dispatch(showToast({ description: 'Enter your bank details to continue.', variant: 'error' }));
            return;
        }

        if (!bankName.trim()) {
            dispatch(showToast({ description: 'Bank name is required', variant: 'error' }));
            return;
        }
        if (!accountNumber.trim()) {
            dispatch(showToast({ description: 'Account number is required', variant: 'error' }));
            return;
        }
        if (!ifsc.trim()) {
            dispatch(showToast({ description: 'IFSC code is required', variant: 'error' }));
            return;
        }

        onContinue({
            businessName: businessName.trim(),
            bankName: bankName.trim(),
            accountNumber: accountNumber.trim(),
            ifsc: ifsc.trim().toUpperCase(),
        });
    };

    return (
        <Flex vertical gap={20} className="mt-4">
            <Flex vertical gap={3}>
                <Typography.Text className="text-[16px] font-semibold leading-[1.35] text-[#1F2A44]">
                    Review Business Details
                </Typography.Text>
                <Typography.Text className="text-xs leading-[1] text-[#667085] md:whitespace-nowrap">
                    Confirm your business details before activating payment collections. You can
                    edit any field.
                </Typography.Text>
            </Flex>

            <BusinessNameCard value={businessName} onChange={setBusinessName} />

            <BankAccountCard
                bankName={bankName}
                accountNumber={accountNumber}
                ifsc={ifsc}
                onBankNameChange={setBankName}
                onAccountNumberChange={setAccountNumber}
                onIfscChange={setIfsc}
            />

            <Flex justify="flex-end" gap={10} className="pt-1">
                <Button className="!h-9 !rounded-md !px-5 !text-[13px]" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    danger
                    className="!h-9 !rounded-md !px-5 !text-[13px] !font-medium"
                    loading={loading}
                    disabled={!businessName || !bankName || !accountNumber || !ifsc}
                    icon={<ArrowRightOutlined />}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </Flex>
        </Flex>
    );
};

export default OnboardingBusinessDetailsStep;
