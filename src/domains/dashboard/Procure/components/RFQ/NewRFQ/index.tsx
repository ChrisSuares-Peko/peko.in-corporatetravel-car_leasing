import React, { useState } from 'react';

import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import BasicInformation from './BasicInformation';
import LineItems, { LineItem } from './LineItems';
import SelectVendors, { vendorsList } from './SelectVendors';
import TermsAndNotes from './TermsAndNotes';
import TipsPanel from './TipsPanel';
import { newRFQSchema } from '../../../schema';

const { Title, Text } = Typography;

interface Props {
    prRef?: string;
}

const NewRFQ: React.FC<Props> = ({ prRef }) => {
    const navigate = useNavigate();
    const [rfqType, setRfqType] = useState<string>('RFQ');
    const [items, setItems] = useState<LineItem[]>([
        { key: '1', description: '', qty: 1, unit: 'Unit', price: 0 },
    ]);
    const [selectedVendors, setSelectedVendors] = useState<typeof vendorsList>(
        [vendorsList[0], vendorsList[1], vendorsList[2]]
    );
    const [, setShowAddVendor] = useState(false);

    const handleCancel = () =>
        navigate(`${paths.dashboard.procure}/${paths.procure.rfq.index}`);

    const initialValues = {
        title: '',
        prRef: prRef ?? '',
        deadline: '',
        terms: '',
        notes: '',
    };

    const onSubmit = (_values: typeof initialValues) => {
        handleCancel();
    };

    const addItem = () =>
        setItems(prev => [...prev, { key: String(Date.now()), description: '', qty: 1, unit: 'Unit', price: 0 }]);

    const removeItem = (key: string) =>
        setItems(prev => prev.filter(i => i.key !== key));

    const updateItem = (key: string, field: keyof LineItem, value: string | number) =>
        setItems(prev => prev.map(i => i.key === key ? { ...i, [field]: value } : i));

    return (
        <Row gutter={24}>
            <Col xs={24} lg={16}>
                <Card className="rounded-2xl" styles={{ body: { borderRadius: 16, padding: 24 } }}>
                    <Title level={4} className="!mb-1 text-center">New RFQ / RFP / RFI</Title>
                    <Text className="text-gray-400 text-xs block mb-5 text-center">
                        Send a sourcing request to one or more vendors
                    </Text>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={newRFQSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit }) => (
                            <Form layout="vertical" onFinish={handleSubmit}>
                                <BasicInformation rfqType={rfqType} setRfqType={setRfqType} />
                                <LineItems items={items} addItem={addItem} removeItem={removeItem} updateItem={updateItem} />
                                <SelectVendors
                                    selectedVendors={selectedVendors}
                                    setSelectedVendors={setSelectedVendors}
                                    setShowAddVendor={setShowAddVendor}
                                />
                                <TermsAndNotes />

                                <Flex gap={12}>
                                    <Button type="primary" size="large" danger htmlType="submit">
                                        Create and Send
                                    </Button>
                                    <Button size="large" onClick={handleCancel}>Cancel</Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Col>

            <Col xs={24} lg={8}>
                <TipsPanel />
            </Col>
        </Row>
    );
};

export default NewRFQ;
