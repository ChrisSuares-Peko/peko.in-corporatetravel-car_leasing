import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Typography } from 'antd';
import { useFormikContext } from 'formik';

import InputTextArea from '@components/atomic/inputs/InputTextArea';
import SelectInputWithSearch from '@components/atomic/inputs/SelectInputWithSearch';
import TextInput from '@components/atomic/inputs/TextInput';

import AddBankAccountModal from '../../components/customers/AddBankAccountModal';
import BankAccountCard from '../../components/customers/BankAccountCard';
import { STATE_OPTIONS } from '../../constants';
import { AddCustomerFormValues } from '../../types/customer';

const AddCustomerForm: React.FC = () => {
    const { handleSubmit, values, setFieldValue } = useFormikContext<AddCustomerFormValues>();
    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const bankAccounts = values.bankAccounts ?? [];

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            {/* Basic Information */}
            <Typography.Text strong className="block text-sm text-[#101828] mb-2.5">
                Basic Information
            </Typography.Text>

            <TextInput
                name="name"
                label="Customer Name"
                placeholder="Enter Customer Name"
                type="text"
                isRequired
                maxLength={50}
            />

            <TextInput
                name="gstin"
                label="GSTIN"
                placeholder="Enter GSTIN"
                type="text"
                convertToUppercase
                maxLength={15}
            />

            <TextInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter Mobile Number"
                type="text"
                isRequired
                allowNumbersOnly
                maxLength={10}
            />

            <TextInput
                name="email"
                label="Email"
                placeholder="Enter Email"
                type="email"
                isRequired
            />

            <TextInput name="upiId" label="UPI ID" placeholder="Enter UPI ID" type="text" />

            {/* Primary Address */}
            <Typography.Text strong className="block text-sm text-[#101828] mb-2.5">
                Primary Address
            </Typography.Text>

            <InputTextArea
                name="primaryAddress"
                label="Address"
                placeholder="Enter Customer Address"
                isRequired
                autoSize={{ minRows: 3, maxRows: 5 }}
            />

            <TextInput
                name="primaryCity"
                label="City"
                placeholder="Enter City"
                type="text"
                isRequired
                allowAlphabetsAndSpaceOnly
                maxLength={50}
            />

            <SelectInputWithSearch
                name="primaryState"
                label="State"
                placeholder="Select State"
                options={STATE_OPTIONS}
                isRequired
            />

            <TextInput
                name="primaryPincode"
                label="Pincode"
                placeholder="Enter Pincode"
                type="text"
                allowNumbersOnly
                maxLength={6}
                isRequired
            />

            <TextInput
                name="primaryCountry"
                label="Country"
                placeholder="Country"
                type="text"
                isDisabled
                isRequired
            />

            {/* Bank Details (Optional) */}
            <Flex
                vertical
                justify="space-between"
                className="mb-3 border border-[#E4E4E7] rounded-xl p-3.5 min-h-[96px]"
            >
                <Flex justify="space-between" align="center">
                    <Typography.Text strong className="text-sm text-[#101828]">
                        Bank Details (Optional)
                    </Typography.Text>
                    <Button
                        size="small"
                        icon={<PlusOutlined className="text-[10px]" />}
                        className="border-[#FF4F4F] text-[#FF4F4F] rounded-md text-[11px] h-6 px-2"
                        onClick={() => setIsBankModalOpen(true)}
                    >
                        Add Bank Detail
                    </Button>
                </Flex>
                {bankAccounts.length === 0 ? (
                    <Typography.Text className="text-xs text-[#A1A1AA] text-center block">
                        No bank accounts added yet
                    </Typography.Text>
                ) : (
                    <Flex vertical gap={8} className="mt-2">
                        {bankAccounts.map((account, index) => (
                            <BankAccountCard
                                key={index}
                                account={account}
                                onEdit={() => {
                                    setEditingIndex(index);
                                    setIsBankModalOpen(true);
                                }}
                            />
                        ))}
                    </Flex>
                )}
            </Flex>

            {/* Shipping Address (Optional) */}
            <Flex justify="space-between" align="center" className="mb-2.5">
                <Typography.Text strong className="text-sm text-[#101828]">
                    Shipping Address (Optional)
                </Typography.Text>
                <Checkbox
                    checked={!!values.shippingSameAsPrimary}
                    onChange={e => setFieldValue('shippingSameAsPrimary', e.target.checked)}
                >
                    <Typography.Text className="text-xs text-[#475569]">
                        Same as primary
                    </Typography.Text>
                </Checkbox>
            </Flex>

            {!values.shippingSameAsPrimary && (
                <>
                    <InputTextArea
                        name="shippingAddress"
                        label="Address"
                        placeholder="Enter Customer Address"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        isRequired
                    />

                    <TextInput
                        name="shippingCity"
                        label="City"
                        placeholder="Enter City"
                        type="text"
                        isRequired
                        allowAlphabetsAndSpaceOnly
                        maxLength={50}
                    />

                    <SelectInputWithSearch
                        name="shippingState"
                        label="State"
                        placeholder="Select State"
                        options={STATE_OPTIONS}
                        isRequired
                    />

                    <TextInput
                        name="shippingPincode"
                        label="Pincode"
                        placeholder="Enter Pincode"
                        type="text"
                        allowNumbersOnly
                        maxLength={6}
                        isRequired
                    />
                </>
            )}

            <AddBankAccountModal
                open={isBankModalOpen}
                editingAccount={editingIndex !== null ? bankAccounts[editingIndex] : undefined}
                onClose={() => {
                    setIsBankModalOpen(false);
                    setEditingIndex(null);
                }}
                onAdd={account => {
                    if (editingIndex !== null) {
                        setFieldValue(
                            'bankAccounts',
                            bankAccounts.map((a, i) => (i === editingIndex ? account : a))
                        );
                    } else {
                        setFieldValue('bankAccounts', [...bankAccounts, account]);
                    }
                }}
            />
        </Form>
    );
};

export default React.memo(AddCustomerForm);
