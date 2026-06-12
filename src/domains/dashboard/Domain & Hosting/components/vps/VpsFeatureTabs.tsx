import React, { useMemo } from 'react';

import { Tabs, Typography } from 'antd';

import AdditionalStorageTab from './tabs/AdditionalStorageTab';
import DeployTab from './tabs/DeployTab';
import ManageTab from './tabs/ManageTab';
import SecureTab from './tabs/SecureTab';
import SupportTab from './tabs/SupportTab';

const { Title } = Typography;

interface Props {
    osIcons: { label: string; src: string }[];
}

const VpsFeatureTabs: React.FC<Props> = ({ osIcons }) => {
    const tabItems = useMemo(
        () => [
            { key: 'deploy', label: 'Deploy', children: <DeployTab osIcons={osIcons} /> },
            { key: 'additionalStorage', label: 'Additional Storage', children: <AdditionalStorageTab /> },
            { key: 'manage', label: 'Manage', children: <ManageTab /> },
            { key: 'secure', label: 'Secure', children: <SecureTab /> },
            { key: 'support', label: 'Get Support', children: <SupportTab /> },
        ],
        [osIcons]
    );

    return (
        <div style={{ padding: '24px 24px 0', borderBottom: '1px solid #F3F4F6' }}>
            <Title level={4} style={{ marginBottom: 0 }}>Features</Title>
            <Tabs items={tabItems} />
        </div>
    );
};

export default VpsFeatureTabs;
