import { Button, Flex, Form } from 'antd';
import { Formik } from 'formik';

import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';

import type { FormState } from './CreatePaymentLinkModal.types';
import { createPaymentLinkSchema } from '../../schema/paymentLinkSchema';
import { EXPIRY_OPTIONS } from '../../utils/data';

interface CreatePaymentLinkFormProps {
    loading: boolean;
    onCancel: () => void;
    onSubmit: (values: FormState) => void;
    initialValues: FormState;
}

const CreatePaymentLinkForm = ({
    loading,
    onCancel,
    onSubmit,
    initialValues,
}: CreatePaymentLinkFormProps) => (
    <Formik
        initialValues={initialValues}
        validationSchema={createPaymentLinkSchema}
        onSubmit={onSubmit}
        enableReinitialize
    >
        {({ handleSubmit }) => (
            <Form layout="vertical">
                <TextInput
                    name="amount"
                    type="text"
                    size="large"
                    isRequired
                    label="Amount"
                    placeholder="Enter amount"
                    allowTwoDecimalsOnly
                    inputMode="decimal"
                />

                <TextInput
                    name="purposeMessage"
                    type="text"
                    size="large"
                    isRequired
                    label="Payment Purpose"
                    allowAlphabetsAndSpaceOnly
                    placeholder="e.g. Invoice payment, Service fee"
                />

                <TextInput
                    name="customerName"
                    type="text"
                    size="large"
                    label="Customer Name (Optional)"
                    placeholder="Enter Customer Name (Optional)"
                />

                <TextInput
                    name="customerPhone"
                    type="text"
                    size="large"
                    label="Customer Phone (Optional)"
                    placeholder="Enter Customer Phone (Optional)"
                    allowNumbersOnly
                    maxLength={10}
                    inputMode="numeric"
                />

                <SelectInput
                    name="expiry"
                    label="Link Expiry"
                    placeholder="Select expiry"
                    options={EXPIRY_OPTIONS}
                    size="large"
                    isRequired
                />

                <Flex gap={12} className="mt-3">
                    <Button size="large" block onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        danger
                        size="large"
                        block
                        loading={loading}
                        onClick={() => handleSubmit()}
                    >
                        Create Payment Link
                    </Button>
                </Flex>
            </Form>
        )}
    </Formik>
);

export default CreatePaymentLinkForm;
