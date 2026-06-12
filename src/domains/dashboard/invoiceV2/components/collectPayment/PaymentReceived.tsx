import React from 'react';

import { CheckOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

import { InvoiceRow } from '../../types/invoice';
import CenteredHeader from '../shared/CenteredHeader';

type Props = {
    invoice: InvoiceRow | null;
    onClose: () => void;
    title: string;
};

const PaymentReceived: React.FC<Props> = ({ invoice, onClose, title }) => (
    <Flex vertical gap={24} className="pt-2">
        <CenteredHeader
            icon={<CheckOutlined className="text-white text-lg" />}
            outerClass="bg-[#E8FAF0]"
            middleClass="bg-[#D1F4E0]"
            innerClass="bg-[#45D483]"
            title={title}
            description={`UPI payment of ₹${invoice?.amountDue} marked as received for ${invoice?.invoiceNumber}.`}
        />

        <Button type="primary" danger block className="h-9 rounded-lg" onClick={onClose}>
            Done
        </Button>
    </Flex>
);

export default PaymentReceived;
