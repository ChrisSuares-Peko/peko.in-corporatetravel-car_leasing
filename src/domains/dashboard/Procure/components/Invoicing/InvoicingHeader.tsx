import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type Props = {
    onAdd?: () => void;
};

const InvoicingHeader: React.FC<Props> = ({ onAdd }) => (
    <Button
        type="primary"
        danger
        icon={<PlusOutlined />}
        style={{ borderRadius: 8 }}
        onClick={onAdd}
    >
        Add Vendor
    </Button>
);

export default InvoicingHeader;
