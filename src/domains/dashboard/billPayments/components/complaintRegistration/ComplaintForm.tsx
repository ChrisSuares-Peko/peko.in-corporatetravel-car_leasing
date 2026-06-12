import React from 'react';

import { Button, Col, Flex, Form, Row } from 'antd';
import { Formik } from 'formik';

import InputTextArea from '@components/atomic/inputs/InputTextArea';
import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';

import useComplaintRegistrationApi from '../../hooks/useComplaintRegisterApi';
import { complaintSchema } from '../../schema';

const ComplaintForm = () => {
    const { complaintRegistration, isLoading } = useComplaintRegistrationApi();
    // const { serviceProviderData, isLoading: loading } = useServiceProviderApi('All');

    // const billerOptions =
    //     serviceProviderData?.map(item => ({
    //         value: item.value, // Assuming `billerId` is the unique identifier
    //         label: item.label, // Assuming `billerName` is the display name
    //     })) || [];

    return (
        <Formik
            initialValues={{
                // complaintType: '',
                // participationType: '',
                txnRefId: '',
                // billerId: '',
                complaintDisposition: '',
                complaintDesc: '',
            }}
            validationSchema={complaintSchema}
            onSubmit={values => {
                complaintRegistration(values);
            }}
        >
            {({ handleSubmit, resetForm }) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <Row className="mt-6" gutter={[20, 5]}>
                        {/* Type of Complaint */}
                        {/* <Col xs={24} md={12} order={1}>
                            <TextInput
                                isRequired
                                name="complaintType"
                                type="text"
                                label="Type of Complaint"
                                placeholder="Enter Type of Complaint"
                                allowAlphabetsAndSpaceOnly
                                maxLength={50}
                            />
                        </Col> */}

                        {/* Designation */}
                        {/* <Col xs={24} md={12} order={2}>
                            <TextInput
                                isRequired
                                name="participationType"
                                type="text"
                                label="Type of Participation"
                                placeholder="Enter Type of Participation"
                                allowAlphabetsAndSpaceOnly
                                maxLength={50}
                            />
                        </Col> */}

                        {/* Mobile Number */}

                        {/* <Col xs={24} md={12} order={4}>
                            <SelectInput
                                isRequired
                                name="billerId"
                                options={billerOptions}
                                label="Biller Id"
                                placeholder={loading ? 'Loading billers...' : 'Select Biller'}
                                // disabled={loading} // Disable while loading data
                            />
                        </Col> */}

                        <Col xs={24} xl={24} md={18} order={1}>
                            <SelectInput
                                isRequired
                                name="complaintDisposition"
                                options={[
                                    {
                                        value: 'Transaction Successful, account not updated',
                                        label: 'Transaction Successful, account not updated',
                                    },
                                    {
                                        value: 'Amount deducted, biller account credited but transaction ID not received',
                                        label: 'Amount deducted, biller account credited but transaction ID not received',
                                    },
                                    {
                                        value: 'Amount deducted, biller account not credited & transaction ID not received',
                                        label: 'Amount deducted, biller account not credited & transaction ID not received',
                                    },
                                    {
                                        value: 'Amount deducted multiple times',
                                        label: 'Amount deducted multiple times',
                                    },
                                    {
                                        value: 'Double payment updated',
                                        label: 'Double payment updated',
                                    },
                                    {
                                        value: 'Erroneously paid to wrong account',
                                        label: 'Erroneously paid to wrong account',
                                    },
                                    {
                                        value: 'Others (provide details in description)',
                                        label: 'Others (provide details in description)',
                                    },
                                ]}
                                label="Reason for raising the concern"
                                placeholder="Select Reason"
                            />
                        </Col>
                        <Col xs={24} md={12} order={2}>
                            <TextInput
                                isRequired
                                name="txnRefId"
                                type="text"
                                label="B-Connect Transaction ID"
                                placeholder="Enter B-Connect Transaction ID"
                                maxLength={50}
                            />
                        </Col>

                        <Col xs={24} md={24} order={3}>
                            <InputTextArea
                                autoSize={{ minRows: 3 }}
                                name="complaintDesc"
                                label="Complaint Description"
                                placeholder="Enter Complaint Description"
                                isRequired
                                maxLength={200}
                            />
                        </Col>
                    </Row>

                    {/* navigation section */}
                    <Flex gap={10} className="mt-6">
                        <Button htmlType="button" className="w-36" onClick={() => resetForm()}>
                            Clear
                        </Button>
                        <Button
                            type="primary"
                            loading={isLoading}
                            danger
                            htmlType="submit"
                            className="w-36"
                        >
                            Submit
                        </Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default ComplaintForm;
