import React from 'react';

import { Button, Flex, Typography } from 'antd';
import { Formik } from 'formik';

import AddDomesticAccountForm from '../../forms/AddDomesticAccountForm';
import { addDomesticAccountSchema } from '../../schema/addDomesticAccountSchema';
import { AddDomesticAccountFormValues, DomesticAccount } from '../../types/ManageBankAccounts';

interface AddDomesticAccountProps {
    onCancel: () => void;
    onSubmit: (values: AddDomesticAccountFormValues) => void;
    isLoading: boolean;
    defaultValues?: DomesticAccount;
}

const AddDomesticAccount: React.FC<AddDomesticAccountProps> = ({
    onCancel,
    onSubmit,
    isLoading,
    defaultValues,
}) => {
    const isEdit = !!defaultValues;

    return (
        <Flex vertical gap={24}>
            <Flex vertical gap={4}>
                <Typography.Text className="text-xl font-semibold text-[#101828]">
                    {isEdit ? 'Edit Domestic Account' : 'Add Domestic Account'}
                </Typography.Text>
                <Typography.Text className="text-sm text-[#6A7282]">
                    Enter your domestic bank account details for INR transactions
                </Typography.Text>
            </Flex>

            <Formik
                initialValues={{
                    accountHolderName: defaultValues?.accountHolderName || '',
                    bankName: defaultValues?.bankName || '',
                    accountNumber: defaultValues?.accountNumber || '',
                    currency: 'INR - Indian Rupee',
                    ifscCode: defaultValues?.ifscCode || '',
                    accountType: defaultValues?.accountType || 'Savings',
                    branchName: defaultValues?.branchName || '',
                }}
                validationSchema={addDomesticAccountSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ handleSubmit }) => (
                    <>
                        <AddDomesticAccountForm />
                        <Flex justify="end" gap={12}>
                            <Button
                                onClick={onCancel}
                                className="h-10 px-6 text-sm font-medium rounded-lg"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                danger
                                loading={isLoading}
                                className="h-10 px-6 text-sm font-medium rounded-lg"
                                onClick={() => handleSubmit()}
                            >
                                {isEdit ? 'Save Changes' : 'Add Account'}
                            </Button>
                        </Flex>
                    </>
                )}
            </Formik>
        </Flex>
    );
};

export default AddDomesticAccount;
