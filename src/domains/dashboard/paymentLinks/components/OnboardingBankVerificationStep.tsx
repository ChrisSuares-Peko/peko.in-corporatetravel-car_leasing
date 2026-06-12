import { ArrowRightOutlined, CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';
import { Formik } from 'formik';

import TextInput from '@components/atomic/inputs/TextInput';

import { bankVerificationSchema } from '../schema/onboardingSchema';
import { BankStepData, Step1Data } from '../types/activateCollectionsTypes';
import { OnboardingRecord } from '../types/paymentLinkTypes';

interface Props {
    step1Data: Step1Data | null;
    initialData?: OnboardingRecord | null;
    onBack: () => void;
    onContinue: (data: BankStepData) => void;
    saveDetails: (data: BankStepData) => Promise<OnboardingRecord | false>;
    loading?: boolean;
}

type BankVerificationFormValues = BankStepData;

const getVerifiedDataFromRecord = (record?: OnboardingRecord | null): BankStepData | null => {
    if (!record?.bankVerifiedAt || !record.accountNumber || !record.ifsc) {
        return null;
    }

    return {
        accountNumber: record.accountNumber,
        bankName: record.bankVerificationResponse?.bank_name || record.bankName || '',
        ifsc: record.ifsc,
        accountHolderName:
            record.bankVerificationResponse?.name_at_bank || record.accountHolderName || '',
        phone: record.phone || '',
    };
};

const buildInitialValues = (
    step1Data: Step1Data | null,
    initialData?: OnboardingRecord | null
): BankVerificationFormValues => ({
    accountNumber: step1Data?.accountNumber || initialData?.accountNumber || '',
    ifsc: step1Data?.ifsc || initialData?.ifsc || '',
    bankName: step1Data?.bankName || initialData?.bankName || '',
    accountHolderName: initialData?.accountHolderName || '',
    phone: initialData?.phone || '',
});

const OnboardingBankVerificationStep = ({
    step1Data,
    initialData,
    onBack,
    onContinue,
    saveDetails,
    loading,
}: Props) => {
    const verifiedData = getVerifiedDataFromRecord(initialData);
    const initialValues = buildInitialValues(step1Data, initialData);
    const accountForDisplay = verifiedData?.accountNumber || initialValues.accountNumber;
    const maskedAccount = accountForDisplay
        ? `${'*'.repeat(Math.max(0, accountForDisplay.length - 4))}${accountForDisplay.slice(-4)}`
        : '–';

    return (
        <Flex vertical gap={20} className="mt-4">
            <Flex vertical gap={3}>
                <Typography.Text className="text-[16px] font-semibold leading-[1.35] text-[#1F2A44]">
                    Verify Bank Account
                </Typography.Text>
                <Typography.Text className="text-xs leading-[1.4] text-[#667085]">
                    Bank account verification is required to enable settlements and ensure funds
                    reach you securely.
                </Typography.Text>
            </Flex>

            {verifiedData ? (
                <Card
                    className="rounded-xl border border-[#ABEFC6] shadow-none overflow-hidden"
                    styles={{ body: { padding: '16px 20px', background: '#F6FEF9' } }}
                >
                    <Flex vertical gap={12}>
                        <Flex align="center" gap={8}>
                            <CheckCircleFilled style={{ fontSize: 16, color: '#12B76A' }} />
                            <Typography.Text className="text-[14px] font-semibold text-[#027A48]">
                                Bank Account Verified Successfully
                            </Typography.Text>
                        </Flex>
                        <Flex vertical gap={8}>
                            {(
                                [
                                    { label: 'Account Number', value: maskedAccount },
                                    { label: 'Bank Name', value: verifiedData.bankName || '–' },
                                    { label: 'IFSC Code', value: verifiedData.ifsc || '–' },
                                    {
                                        label: 'Account Holder Name',
                                        value: verifiedData.accountHolderName || '–',
                                    },
                                    { label: 'Phone Number', value: verifiedData.phone || '–' },
                                ] as const
                            ).map(row => (
                                <Flex key={row.label} justify="space-between" gap={16}>
                                    <Typography.Text className="text-[13px] text-[#667085]">
                                        {row.label}
                                    </Typography.Text>
                                    <Typography.Text className="text-[13px] font-medium text-[#1F2A44] text-right">
                                        {row.value}
                                    </Typography.Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </Card>
            ) : (
                <Formik
                    initialValues={initialValues}
                    validationSchema={bankVerificationSchema}
                    enableReinitialize
                    onSubmit={async values => {
                        await saveDetails({
                            accountNumber: values.accountNumber.trim(),
                            ifsc: values.ifsc.trim().toUpperCase(),
                            bankName: values.bankName,
                            accountHolderName: values.accountHolderName.trim(),
                            phone: values.phone.trim(),
                        });
                    }}
                >
                    {({ values, handleSubmit }) => (
                        <Flex vertical gap={12}>
                            <Flex vertical gap={6}>
                                <Typography.Text className="text-[13px] font-medium text-[#344054]">
                                    Account Number <span style={{ color: '#FF4D4F' }}>*</span>
                                </Typography.Text>
                                <TextInput
                                    name="accountNumber"
                                    type="text"
                                    maxLength={18}
                                    minLength={9}
                                    placeholder="e.g. 0123456789"
                                    allowNumbersOnly
                                    values={values.accountNumber}
                                    formItemClass="!mb-0"
                                    classes="!h-10 !rounded-lg !text-[13px]"
                                />
                            </Flex>

                            <Flex vertical gap={6}>
                                <Typography.Text className="text-[13px] font-medium text-[#344054]">
                                    IFSC Code <span style={{ color: '#FF4D4F' }}>*</span>
                                </Typography.Text>
                                <TextInput
                                    name="ifsc"
                                    type="text"
                                    placeholder="e.g. HDFC0001234"
                                    values={values.ifsc}
                                    allowAlphabetsAndNumbersOnly
                                    convertToUppercase
                                    maxLength={11}
                                    formItemClass="!mb-0"
                                    classes="!h-10 !rounded-lg !text-[13px]"
                                />
                            </Flex>

                            <Flex vertical gap={6}>
                                <Typography.Text className="text-[13px] font-medium text-[#344054]">
                                    Account Holder Name <span style={{ color: '#FF4D4F' }}>*</span>
                                </Typography.Text>
                                <TextInput
                                    name="accountHolderName"
                                    type="text"
                                    placeholder="e.g. Acme Trading Pvt Ltd"
                                    values={values.accountHolderName}
                                    allowAlphabetsNumberAndSpecialCharacters={[
                                        ' ',
                                        '.',
                                        '&',
                                        '/',
                                        '-',
                                    ]}
                                    formItemClass="!mb-0"
                                    classes="!h-10 !rounded-lg !text-[13px]"
                                />
                            </Flex>

                            <Flex vertical gap={6}>
                                <Typography.Text className="text-[13px] font-medium text-[#344054]">
                                    Phone Number <span style={{ color: '#FF4D4F' }}>*</span>
                                </Typography.Text>
                                <TextInput
                                    name="phone"
                                    type="text"
                                    placeholder="e.g. 9876543210"
                                    values={values.phone}
                                    allowNumbersOnly
                                    maxLength={10}
                                    inputMode="numeric"
                                    formItemClass="!mb-0"
                                    classes="!h-10 !rounded-lg !text-[13px]"
                                />
                            </Flex>

                            <Card
                                className="rounded-xl border border-[#FEF0C7] shadow-none overflow-hidden"
                                styles={{ body: { padding: '14px 16px', background: '#FFFCF0' } }}
                            >
                                <Flex gap={10} align="flex-start">
                                    <InfoCircleOutlined
                                        style={{
                                            fontSize: 14,
                                            color: '#F79009',
                                            flexShrink: 0,
                                            marginTop: 1,
                                        }}
                                    />
                                    <Flex vertical gap={4}>
                                        <Typography.Text className="text-[13px] font-semibold text-[#344054]">
                                            Why is bank verification required?
                                        </Typography.Text>
                                        <Typography.Text className="text-[12px] leading-[1.5] text-[#667085]">
                                            As per RBI guidelines, bank account verification ensures
                                            that all settlements reach the correct and authorised
                                            account for your business.
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
                            </Card>

                            <Flex justify="flex-end" gap={10} className="pt-1">
                                <Button
                                    className="!h-9 !rounded-md !px-5 !text-[13px]"
                                    onClick={onBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    className="!h-9 !rounded-md !px-5 !text-[13px] !font-medium"
                                    loading={loading}
                                    icon={<ArrowRightOutlined />}
                                    onClick={() => handleSubmit()}
                                >
                                    Continue
                                </Button>
                            </Flex>
                        </Flex>
                    )}
                </Formik>
            )}

            {verifiedData && (
                <Flex justify="flex-end" gap={10} className="pt-1">
                    <Button className="!h-9 !rounded-md !px-5 !text-[13px]" onClick={onBack}>
                        Back
                    </Button>
                    <Button
                        type="primary"
                        danger
                        className="!h-9 !rounded-md !px-5 !text-[13px] !font-medium"
                        icon={<ArrowRightOutlined />}
                        onClick={() => onContinue(verifiedData)}
                    >
                        Continue
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};

export default OnboardingBankVerificationStep;
