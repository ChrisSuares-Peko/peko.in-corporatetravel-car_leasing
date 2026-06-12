import React from 'react';

import { Card, Col, Flex, Form, Row, Tag, Typography } from 'antd';
import { useFormikContext } from 'formik';

import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';
import purchaseRequestIcon1 from '@src/domains/dashboard/Procure/assets/icons/purchaseRequestIcon1.svg';

import VendorSectionHeader from './VendorSectionHeader';
import { CURRENCY_OPTIONS, PAYMENT_TERMS } from '../../utils/data';

const { Text } = Typography;

const TAG_OPTIONS = ['IT', 'Facilities', 'Logistics', 'Marketing', 'Services', 'Other'];

const STATUS_OPTIONS = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Blacklisted', label: 'Blacklisted' },
];

const TagSelector: React.FC = () => {
    const { values, setFieldValue } = useFormikContext<{ tags: string[] }>();
    const tags = values.tags ?? [];

    const toggleTag = (tag: string) => {
        const next = tags.includes(tag)
            ? tags.filter(t => t !== tag)
            : [...tags, tag];
        setFieldValue('tags', next);
    };

    return (
        <Flex vertical gap={6}>
            <Flex gap={8} wrap="wrap">
                {TAG_OPTIONS.map(tag => {
                    const active = tags.includes(tag);
                    return (
                        <Tag
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            style={{
                                cursor: 'pointer',
                                borderRadius: 20,
                                padding: '4px 14px',
                                fontSize: 13,
                                fontWeight: 500,
                                border: `1px solid ${active ? '#FF4F4F' : '#d9d9d9'}`,
                                color: active ? '#FF4F4F' : '#595959',
                                background: active ? '#fff1f0' : '#fff',
                                userSelect: 'none',
                            }}
                        >
                            {tag}
                        </Tag>
                    );
                })}
            </Flex>
            <Text type="secondary" className="text-xs block mt-1">
                Choose tags so buyers can filter and shortlist this vendor faster.
            </Text>
        </Flex>
    );
};

const BusinessInformation: React.FC = () => (
    <Card className="mb-4 rounded-xl mt-8" styles={{ body: { padding: '20px 24px' } }}>
        <VendorSectionHeader
            icon={purchaseRequestIcon1}
            bg="#fff1f0"
            title="Business Information"
            subtitle="Company details and contact information."
        />

        <TextInput
            name="businessName"
            type="text"
            label="Business Name"
            placeholder="Business name"
            isRequired
        />

        <TextInput
            name="tradeLicense"
            type="text"
            label="Trade License Number"
            placeholder="TL-DXB-YYYY-XXXXXX"
        />

        <Row gutter={16}>
            <Col span={12}>
                <TextInput
                    name="contactPerson"
                    type="text"
                    label="Contact Person"
                    placeholder="Name"
                    isRequired
                />
            </Col>
            <Col span={12}>
                <TextInput
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    isRequired
                />
            </Col>
        </Row>

        <TextInput
            name="phone"
            type="text"
            label="Phone"
            placeholder="+971 4 XXX XXXX"
        />

        <Form.Item label="Tags">
            <TagSelector />
        </Form.Item>

        <Row gutter={16}>
            <Col span={12}>
                <SelectInput
                    name="currency"
                    label="Preferred Currency"
                    placeholder="INR"
                    options={CURRENCY_OPTIONS}
                    isRequired
                />
            </Col>
            <Col span={12}>
                <SelectInput
                    name="paymentTerms"
                    label="Payment Terms"
                    placeholder="Net 30"
                    options={PAYMENT_TERMS}
                    isRequired
                />
            </Col>
        </Row>

        <SelectInput
            name="status"
            label="Status"
            placeholder="Select status"
            options={STATUS_OPTIONS}
            isRequired
        />
    </Card>
);

export default BusinessInformation;
