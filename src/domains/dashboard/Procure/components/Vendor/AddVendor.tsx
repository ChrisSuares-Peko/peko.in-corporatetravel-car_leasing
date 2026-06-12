import React from 'react';

import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import BankingInformation from './BankingInformation';
import BusinessInformation from './BusinessInformation';
import VendorSidebar from './VendorSidebar';
import { addVendorSchema } from '../../schema';

const { Title, Text } = Typography;

const initialValues = {
    businessName: '',
    tradeLicense: '',
    contactPerson: '',
    email: '',
    phone: '',
    tags: [] as string[],
    currency: 'INR',
    paymentTerms: 'net30',
    status: 'Active',
    bankName: '',
    accountNumber: '',
    iban: '',
};

const AddVendor: React.FC = () => {
    const navigate = useNavigate();

    const handleCancel = () =>
        navigate(`${paths.dashboard.procure}/${paths.procure.vendor.index}`);

    const onSubmit = (_values: typeof initialValues) => {
        handleCancel();
    };

    return (
        <Row gutter={24} className="p-10">
            <Col xs={24} lg={16}>
                <Card className="rounded-2xl" styles={{ body: { borderRadius: 16, padding: 24 } }}>
                    <Title level={4} className="text-center" style={{ marginBottom: 4 }}>Add Vendor</Title>
                    <Text className="text-[#000000] text-sm block mb-10 text-center">
                        Register a new vendor in your directory.
                    </Text>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={addVendorSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit }) => (
                            <Form layout="vertical" onFinish={handleSubmit}>
                                <BusinessInformation />
                                <BankingInformation />

                                <Flex gap={12}>
                                    <Button type="primary" danger htmlType="submit">
                                        Save Vendor
                                    </Button>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Col>

            <VendorSidebar />
        </Row>
    );
};

export default AddVendor;
