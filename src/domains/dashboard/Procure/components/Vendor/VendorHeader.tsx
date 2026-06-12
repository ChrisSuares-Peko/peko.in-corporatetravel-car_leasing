import React, { useState } from 'react';

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

import ImportCSVModal from './ImportCSVModal';
import ImportFromPayoutsModal from './ImportFromPayoutsModal';

type Props = {
    onAdd: () => void;
};

const VendorHeader: React.FC<Props> = ({ onAdd }) => {
    const [csvOpen,     setCsvOpen]     = useState(false);
    const [payoutsOpen, setPayoutsOpen] = useState(false);

    return (
        <>
            <Flex gap={8} align="center" wrap="wrap" justify="flex-end">
                <Button
                    icon={<DownloadOutlined style={{ color: '#FF4F4F' }} />}
                    className="!rounded-lg !border-[#FF4F4F] !text-[#FF4F4F]"
                    onClick={() => setPayoutsOpen(true)}
                >
                    Import from Payouts
                </Button>
                <Button
                    icon={<DownloadOutlined style={{ color: '#FF4F4F' }} />}
                    className="!rounded-lg !border-[#FF4F4F] !text-[#FF4F4F]"
                    onClick={() => setCsvOpen(true)}
                >
                    Import CSV
                </Button>
                <Button
                    type="primary"
                    danger
                    icon={<PlusOutlined />}
                    className="!rounded-lg"
                    onClick={onAdd}
                >
                    Add Vendor
                </Button>
            </Flex>
            <ImportCSVModal open={csvOpen} onClose={() => setCsvOpen(false)} />
            <ImportFromPayoutsModal open={payoutsOpen} onClose={() => setPayoutsOpen(false)} />
        </>
    );
};

export default VendorHeader;
