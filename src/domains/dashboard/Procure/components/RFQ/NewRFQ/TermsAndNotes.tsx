import React from 'react';

import { Card, Flex, Image, Typography } from 'antd';

import TextAreaInput from '@components/atomic/inputs/TextAreaInput';

import newRFQsIcon from '../../../assets/icons/newRFQsIcon.svg';

const { Text } = Typography;

const TermsAndNotes: React.FC = () => (
    <Card className="mb-4 rounded-xl border border-gray-100" styles={{ body: { padding: '20px 24px' } }}>
        <Flex gap={10} align="center" className="mb-4">
            <Flex
                align="center"
                justify="center"
                className="w-7 h-7 rounded-lg shrink-0 bg-red-50"
            >
                <Image src={newRFQsIcon} alt="New RFQ" width={16} height={16} preview={false} />
            </Flex>
            <Flex vertical>
                <Text strong className="text-sm">Terms &amp; Notes</Text>
                <Text className="text-xs text-gray-400">Any conditions vendors should be aware of</Text>
            </Flex>
        </Flex>

        <TextAreaInput
            name="terms"
            label="Terms &amp; Conditions"
            placeholder="Vendors must provide valid UAE trade license and VAT registration certificate. Prices to be quoted in ₹ inclusive of VAT."
            minRows={3}
        />

        <TextAreaInput
            name="notes"
            label="Notes"
            placeholder="Vendors must provide valid UAE trade license and VAT registration certificate. Prices to be quoted in ₹ inclusive of VAT."
            minRows={3}
        />
    </Card>
);

export default TermsAndNotes;
