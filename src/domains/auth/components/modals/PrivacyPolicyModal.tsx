import React, { useState } from 'react';

import { Modal, Typography, Button, Checkbox, Flex } from 'antd';

interface PrivacyPolicyModalProps {
    isOpen: boolean;
    onAccept: () => void;
    version: string;
    isLoading: boolean;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
    isOpen,
    onAccept,
    version,
    isLoading,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Modal
            open={isOpen}
            centered
            closable={false} // removes the X button
            maskClosable={false} // disables click outside to close
            bodyStyle={{ paddingLeft: 20 }}
            footer={[
                <Button
                    key="accept"
                    type="primary"
                    loading={isLoading}
                    danger
                    disabled={!isChecked}
                    onClick={async () => {
                        try {
                            await onAccept();
                        } catch (err) {
                            console.error('Failed to accept privacy policy', err);
                        }
                    }}
                >
                    Accept
                </Button>,
            ]}
        >
            <Flex vertical gap={10}>
                <Typography.Title level={5}>
                    Action required: Review and consent to our Privacy Policy
                </Typography.Title>
                <Typography.Paragraph>
                    We have updated our Privacy Policy to explain how we collect, use, and process
                    personal data when you access or use the Platform. To continue using the
                    Platform, please review and consent to the Privacy Policy dated 7 January 2026.
                </Typography.Paragraph>
                <Typography.Link
                    href="https://peko.one/ae/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: '#ff4d4f',
                        fontWeight: '600',
                        textDecoration: 'underline',
                        display: 'inline-block',
                        width: 'fit-content',
                    }}
                >
                    View latest Privacy policy
                </Typography.Link>
                <div style={{ position: 'relative' }}>
                    <Checkbox
                        checked={isChecked}
                        onChange={e => setIsChecked(e.target.checked)}
                        style={{ position: 'absolute', top: 3, left: -30 }}
                    />
                    <Typography.Text style={{ display: 'block', lineHeight: '22px' }}>
                        I have read and understood the Privacy Policy dated 7 January 2026 and
                        consent to the collection, use, processing, and sharing of my personal data
                        as described therein.
                    </Typography.Text>
                </div>
            </Flex>
        </Modal>
    );
};

export default PrivacyPolicyModal;
