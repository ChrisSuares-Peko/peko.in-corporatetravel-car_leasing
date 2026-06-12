import React, { useState } from 'react';

import { Button, Flex, Modal, Table, Typography, Upload } from 'antd';
import type { UploadFile } from 'antd';

const { Text } = Typography;
const { Dragger } = Upload;

type Props = {
    open:    boolean;
    onClose: () => void;
};

const previewColumns = [
    { title: 'Business Name', dataIndex: 'businessName', key: 'businessName' },
    { title: 'Email',         dataIndex: 'email',        key: 'email' },
    {
        title: 'Tags', dataIndex: 'tags', key: 'tags',
        render: (v: string) => <Text style={{ color: '#fa8c16' }}>{v}</Text>,
    },
];

const previewData = [
    { key: 1, businessName: 'Emirates Airline Cargo', email: 'cargo@emirates.ae', tags: 'Logistics' },
    { key: 2, businessName: 'Emirates Airline Cargo', email: 'cargo@emirates.ae', tags: 'Logistics' },
    { key: 3, businessName: 'Emirates Airline Cargo', email: 'cargo@emirates.ae', tags: 'Logistics' },
];

const ImportCSVModal: React.FC<Props> = ({ open, onClose }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewing, setPreviewing] = useState(false);

    const handleConfirm = () => {
        console.log('Import confirmed');
        setFileList([]);
        setPreviewing(false);
        onClose();
    };

    const handleCancel = () => {
        setFileList([]);
        setPreviewing(false);
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            title={<Text strong style={{ fontSize: 16 }}>Import from CSV</Text>}
            footer={null}
            width={480}
            styles={{ body: { paddingTop: 16 } }}
        >
            <Dragger
                fileList={fileList}
                beforeUpload={(file) => {
                    setFileList([file]);
                    setPreviewing(true);
                    return false;
                }}
                onRemove={() => {
                    setFileList([]);
                    setPreviewing(false);
                }}
                accept=".csv,.xlsx,.pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ borderRadius: 8, marginBottom: 16 }}
            >
                <p className="ant-upload-text" style={{ fontSize: 13, color: '#262626' }}>
                    Click to upload CSV file
                </p>
                <p className="ant-upload-hint" style={{ fontSize: 12, color: '#8c8c8c' }}>
                    Upload JPEG, PNG, PDF, DOC etc.
                </p>
                <Button size="small" style={{ marginTop: 8, borderRadius: 6 }}>
                    Browse File
                </Button>
            </Dragger>

            {previewing && (
                <>
                    <Table
                        columns={previewColumns}
                        dataSource={previewData.slice(0, 2)}
                        pagination={false}
                        size="small"
                        style={{ marginBottom: 6 }}
                    />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        Previews shows 2 of {previewData.length} rows
                    </Text>
                </>
            )}

            <Flex gap={12} justify="center" style={{ marginTop: 20 }}>
                <Button
                    type="primary"
                    danger
                    style={{ borderRadius: 8, minWidth: 140 }}
                    onClick={handleConfirm}
                    disabled={!previewing}
                >
                    Confirm Import
                </Button>
                <Button style={{ borderRadius: 8, minWidth: 100 }} onClick={handleCancel}>
                    Cancel
                </Button>
            </Flex>
        </Modal>
    );
};

export default ImportCSVModal;
