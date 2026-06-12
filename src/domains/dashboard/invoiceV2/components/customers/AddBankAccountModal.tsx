import React from 'react';

import { Button, Flex, Modal } from 'antd';
import { Formik } from 'formik';

import AddBankAccountForm from '../../forms/customer/AddBankAccountForm';
import { addBankAccountSchema } from '../../schema/customer/addBankAccountSchema';
import { BankAccountFormValues } from '../../types/customer';
import LeftHeader from '../shared/LeftHeader';

interface AddBankAccountModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (values: BankAccountFormValues) => void;
    editingAccount?: BankAccountFormValues;
}

const EMPTY_VALUES: BankAccountFormValues = {
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    swiftCode: '',
    iban: '',
};

const AddBankAccountModal: React.FC<AddBankAccountModalProps> = ({
    open,
    onClose,
    onAdd,
    editingAccount,
}) => (
        <Formik
            initialValues={editingAccount ?? EMPTY_VALUES}
            validationSchema={addBankAccountSchema}
            onSubmit={(values, { resetForm }) => {
                onAdd(values);
                resetForm();
                onClose();
            }}
            enableReinitialize
        >
            {({ handleSubmit, resetForm }) => {
                const handleClose = () => {
                    resetForm();
                    onClose();
                };

                const modalFooter = (
                    <Flex justify="flex-end" gap={10}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="primary" danger onClick={() => handleSubmit()}>
                            Verify & Add
                        </Button>
                    </Flex>
                );

                return (
                    <Modal
                        open={open}
                        onCancel={handleClose}
                        closable={false}
                        width={480}
                        destroyOnHidden
                        footer={modalFooter}
                        styles={{
                            content: { borderRadius: 20 },
                        }}
                    >
                        <Flex vertical gap={12}>
                            <LeftHeader
                                title={editingAccount ? 'Edit Bank Account' : 'Add Bank Account'}
                                description={editingAccount ? 'Update your bank account details' : 'Enter your bank account details'}
                            />
                            <AddBankAccountForm />
                        </Flex>
                    </Modal>
                );
            }}
        </Formik>
    );

export default React.memo(AddBankAccountModal);
