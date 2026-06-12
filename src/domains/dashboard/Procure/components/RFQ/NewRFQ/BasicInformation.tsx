import React from 'react';

import { Button, Card, Col, Flex, Form, Image, Row, Typography, Upload } from 'antd';

import DatePickerInput from '@components/atomic/inputs/DatePickerInput';
import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';

import newRFQsIcon from '../../../assets/icons/newRFQsIcon.svg';
import { purchaseRequestsData } from '../../../utils/data';

const { Text } = Typography;

const rfqTypes = [
    { key: 'RFQ', sub: 'Request for Quotation' },
    { key: 'RFI', sub: 'Request for Information' },
    { key: 'RFP', sub: 'Request for Proposal' },
];

type Props = {
    rfqType: string;
    setRfqType: (type: string) => void;
};

const BasicInformation: React.FC<Props> = ({ rfqType, setRfqType }) => (
    <Card className="rounded-xl mb-4" styles={{ body: { padding: '20px 24px' } }}>
        <Flex gap={10} align="center" className="mb-4">
            <Flex
                align="center"
                justify="center"
                className="shrink-0 w-7 h-7 rounded-lg bg-red-50"
            >
                <Image src={newRFQsIcon} alt="New RFQ" width={16} height={16} preview={false} />
            </Flex>
            <Flex vertical>
                <Text strong className="text-sm">Basic Information</Text>
                <Text className="text-xs text-gray-400">Title, type, and submission deadline for this request</Text>
            </Flex>
        </Flex>

        <TextInput
            name="title"
            type="text"
            label="Title"
            placeholder="e.g. Network Infrastructure RFQ 2026"
            isRequired
        />

        <Form.Item label="Type">
            <Row gutter={12}>
                {rfqTypes.map(t => (
                    <Col span={8} key={t.key}>
                        <Card
                            onClick={() => setRfqType(t.key)}
                            style={{
                                border: `1.5px solid ${rfqType === t.key ? '#ff4d4f' : '#f0f0f0'}`,
                                background: rfqType === t.key ? '#fff5f5' : '#fff',
                            }}
                            className="rounded-lg cursor-pointer transition-all duration-150"
                            styles={{ body: { padding: '10px 14px' } }}
                        >
                            <Text strong style={{ color: rfqType === t.key ? '#ff4d4f' : '#262626', fontSize: 13 }}>
                                {t.key}
                            </Text>
                            <Text className="text-xs text-gray-400 block mt-0.5">{t.sub}</Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Form.Item>

        <SelectInput
            name="prRef"
            label="Link to Purchase Request (optional)"
            placeholder="None"
            allowClear
            options={purchaseRequestsData.map(pr => ({ value: pr.ref, label: pr.ref }))}
        />

        <Row gutter={16}>
            <Col span={12}>
                <DatePickerInput
                    name="deadline"
                    label="Submission Deadline"
                    placeholder="Select date"
                    classes="w-full"
                    isRequired
                />
            </Col>
            <Col span={12}>
                <Form.Item label="Attachments">
                    <Upload beforeUpload={() => false} multiple showUploadList={false}>
                        <Flex
                            align="center"
                            justify="space-between"
                            className="border border-dashed border-gray-300 rounded-md py-1.5 px-3 bg-white cursor-pointer"
                            style={{ minWidth: 340 }}
                        >
                            <Text className="text-sm text-gray-500">Upload File</Text>
                            <Button size="small" type="default" className="rounded">Browse File</Button>
                        </Flex>
                    </Upload>
                </Form.Item>
            </Col>
        </Row>
    </Card>
);

export default BasicInformation;
