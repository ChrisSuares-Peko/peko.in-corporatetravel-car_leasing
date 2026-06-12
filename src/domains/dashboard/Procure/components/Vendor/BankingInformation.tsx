import React from 'react';

import { Card, Col, Row } from 'antd';

import TextInput from '@components/atomic/inputs/TextInput';
import bankingInformationIcon from '@src/domains/dashboard/Procure/assets/icons/bankingInformationIcon.svg';

import VendorSectionHeader from './VendorSectionHeader';

const BankingInformation: React.FC = () => (
    <Card className="mb-4 rounded-xl mt-8" styles={{ body: { padding: '20px 24px' } }}>
        <VendorSectionHeader
            icon={bankingInformationIcon}
            bg="#f0f5ff"
            title="Banking Information"
            subtitle="Bank details used for vendor payouts."
        />

        <TextInput
            name="bankName"
            type="text"
            label="Bank Name"
            placeholder="e.g. Emirates NBD"
        />

        <Row gutter={16}>
            <Col span={12}>
                <TextInput
                    name="accountNumber"
                    type="text"
                    label="Account Number"
                    placeholder="Account number"
                />
            </Col>
            <Col span={12}>
                <TextInput
                    name="iban"
                    type="text"
                    label="IBAN"
                    placeholder="AE07 3331 2312 3139 0239 Re."
                />
            </Col>
        </Row>
    </Card>
);

export default BankingInformation;
