import React from 'react';

import { Typography } from 'antd';

import CloudSolutionPng from '../../../assets/img/cloud_solution.png';
import { TabLayout } from '../../../utils/vpsTabUtils';

const { Title } = Typography;

const MANAGE_ITEMS = [
    { title: 'Server Management', desc: 'You can Start, Stop, Restart, Reissue your VPS from the Server Management Panel.' },
    { title: 'Full Root Access', desc: 'With full root you are given complete control to manage your server resources.' },
    { title: 'VPS Access', desc: 'We allow you quick access to your VPS for easy management.' },
    { title: 'WHMCS', desc: 'Optionally you can install & migrate to WHMCS with your VPS Server-side results.' },
];

const ManageTab: React.FC = () => (
    <TabLayout image={{ src: CloudSolutionPng, alt: 'Cloud Solution' }}>
        {MANAGE_ITEMS.map(({ title, desc }) => (
            <div key={title} style={{ marginBottom: 16 }}>
                <Title level={5} style={{ marginBottom: 4 }}>{title}</Title>
                <p style={{ margin: 0, color: '#4B5563', fontSize: 13 }}>{desc}</p>
            </div>
        ))}
    </TabLayout>
);

export default ManageTab;
