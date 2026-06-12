import React, { useEffect, useState } from 'react';

import {
    BankOutlined,
    CloseCircleOutlined,
    GlobalOutlined,
    SafetyOutlined,
} from '@ant-design/icons';
import { Button, Flex, Modal, Typography } from 'antd';

import DomesticAccounts from './DomesticAccounts';
import EscrowAccounts from './EscrowAccounts';
import VirtualAccounts from './VirtualAccounts';

interface ManageBankAccountsModalProps {
    open: boolean;
    onClose: () => void;
}

type TabKey = 'domestic' | 'virtual' | 'escrow';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'domestic', label: 'Domestic Accounts', icon: <BankOutlined /> },
    { key: 'virtual', label: 'Virtual Accounts', icon: <GlobalOutlined /> },
    { key: 'escrow', label: 'Escrow Accounts', icon: <SafetyOutlined /> },
];

const ManageBankAccountsModal: React.FC<ManageBankAccountsModalProps> = ({ open, onClose }) => {
    const [activeTab, setActiveTab] = useState<TabKey>('domestic');

    useEffect(() => {
        if (open) setActiveTab('domestic');
    }, [open]);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={820}
            destroyOnHidden
            closeIcon={<CloseCircleOutlined className="text-[#6A7282] text-xl" />}
            className="[&_.ant-modal-content]:rounded-[24px] [&_.ant-modal-content]:p-0 [&_.ant-modal-content]:overflow-hidden"
        >
            {/* Header */}
            <Flex justify="space-between" align="center" className="px-12 py-8">
                <Typography.Text className="text-2xl font-normal text-[#101828]">
                    Manage Bank Accounts
                </Typography.Text>
            </Flex>

            {/* Tab nav */}
            <Flex className="border-b border-[#E4E4E7] px-12">
                {TABS.map(({ key, label, icon }) => (
                    <Button
                        key={key}
                        type="text"
                        icon={icon}
                        onClick={() => setActiveTab(key)}
                        className={`rounded-none pb-3 pt-2 text-sm font-medium border-b-2 border-x-0 border-t-0 hover:!bg-transparent ${
                            activeTab === key
                                ? 'border-[#FF4F4F] !text-[#FF4F4F]'
                                : 'border-transparent !text-[#6A7282] hover:!text-[#344054]'
                        }`}
                    >
                        {label}
                    </Button>
                ))}
            </Flex>

            {/* Tab content */}
            <div className="px-12 py-6 overflow-y-auto max-h-[60vh] pr-10">
                <div style={{ display: activeTab === 'domestic' ? 'block' : 'none' }}>
                    <DomesticAccounts />
                </div>
                <div style={{ display: activeTab === 'virtual' ? 'block' : 'none' }}>
                    <VirtualAccounts />
                </div>
                <div style={{ display: activeTab === 'escrow' ? 'block' : 'none' }}>
                    <EscrowAccounts />
                </div>
            </div>
        </Modal>
    );
};

export default React.memo(ManageBankAccountsModal);
