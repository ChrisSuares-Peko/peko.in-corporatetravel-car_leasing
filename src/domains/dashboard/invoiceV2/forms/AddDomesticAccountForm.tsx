import React from 'react';

import { Col, Form, Row, Select } from 'antd';
import { useFormikContext } from 'formik';

import TextInput from '@components/atomic/inputs/TextInput';

import { AddDomesticAccountFormValues } from '../types/ManageBankAccounts';

const AddDomesticAccountForm: React.FC = () => {
    const { handleSubmit, setFieldValue, values, errors, touched } =
        useFormikContext<AddDomesticAccountFormValues>();

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
                <Col span={12}>
                    <TextInput
                        name="accountHolderName"
                        label="Account Holder Name"
                        placeholder="Enter Account Holder Name"
                        type="text"
                        isRequired
                        maxLength={100}
                        allowAlphabetsAndSpaceOnly
                    />
                </Col>
                <Col span={12}>
                    <TextInput
                        name="bankName"
                        label="Bank Name"
                        placeholder="Enter Bank Name"
                        type="text"
                        isRequired
                        allowAlphabetsAndSpaceOnly
                        maxLength={100}
                    />
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <TextInput
                        name="accountNumber"
                        label="Account Number"
                        placeholder="Enter Account Number"
                        type="text"
                        allowNumbersOnly
                        isRequired
                        maxLength={18}
                    />
                </Col>
                <Col span={12}>
                    <TextInput
                        name="currency"
                        label="Currency"
                        placeholder="Currency"
                        type="text"
                        isDisabled
                        isRequired
                    />
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <TextInput
                        name="ifscCode"
                        label="IFSC Code"
                        placeholder="Enter IFSC Code"
                        type="text"
                        convertToUppercase
                        isRequired
                        maxLength={11}
                    />
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={
                            <span>
                                Account Type <span className="text-red-500">*</span>
                            </span>
                        }
                        validateStatus={touched.accountType && errors.accountType ? 'error' : ''}
                        help={touched.accountType && errors.accountType}
                    >
                        <Select
                            value={values.accountType}
                            onChange={val => setFieldValue('accountType', val)}
                            options={[
                                { label: 'Savings', value: 'Savings' },
                                { label: 'Current', value: 'Current' },
                            ]}
                            size="large"
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <TextInput
                        name="branchName"
                        label="Branch Name"
                        placeholder="Enter Branch Name"
                        type="text"
                        isRequired
                        allowAlphabetsAndSpaceOnly
                        maxLength={100}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default React.memo(AddDomesticAccountForm);
