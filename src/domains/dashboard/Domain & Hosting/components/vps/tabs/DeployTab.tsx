import React from 'react';

import { Flex, Typography } from 'antd';

import CloudBasedSolutionPng from '../../../assets/img/cloud_based_solution.png';
import CpanelIcon from '../../../assets/svg/cpanel.svg';
import PleskIcon from '../../../assets/svg/plesk.svg';
import WhmcsIcon from '../../../assets/svg/whmcs.svg';
import { iconCircle, TabLayout } from '../../../utils/vpsTabUtils';

const { Title } = Typography;

const PANEL_ICONS = [
    { label: 'cPanel/WHM', src: CpanelIcon },
    { label: 'Plesk', src: PleskIcon },
    { label: 'WHMCS', src: WhmcsIcon },
];

interface Props {
    osIcons: { label: string; src: string }[];
}

const DeployTab: React.FC<Props> = ({ osIcons }) => (
    <TabLayout image={{ src: CloudBasedSolutionPng, alt: 'Cloud Based Solution' }}>
        <div style={{ marginBottom: 20 }}>
            <Title level={5} style={{ marginBottom: 4 }}>Instant Provisioning</Title>
            <p style={{ margin: 0, color: '#4B5563', fontSize: 13 }}>
                Set up and running instantly! Our servers are provisioned within a few minutes.
            </p>
        </div>
        <div style={{ marginBottom: 20 }}>
            <Title level={5} style={{ marginBottom: 6 }}>Choose your Operating System</Title>
            <p style={{ marginBottom: 12, color: '#4B5563', fontSize: 13 }}>
                Get complete flexibility to choose the operating system that works for you. Here are
                operating systems available with our service.
            </p>
            <Flex gap={24} wrap="wrap">
                {osIcons.map(({ label, src }) => (
                    <Flex key={label} vertical align="center" gap={6}>
                        <div style={iconCircle}>
                            <img src={src} alt={label} style={{ width: 28, height: 28, objectFit: 'contain' }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#6B7280' }}>{label}</span>
                    </Flex>
                ))}
            </Flex>
        </div>
        <div>
            <Title level={5} style={{ marginBottom: 6 }}>Choose your management panel</Title>
            <p style={{ marginBottom: 12, color: '#4B5563', fontSize: 13 }}>
                Optionally, you can choose easy-to-use tools for easy Server Management.
            </p>
            <Flex gap={24} wrap="wrap">
                {PANEL_ICONS.map(({ label, src }) => (
                    <Flex key={label} vertical align="center" gap={6}>
                        <div style={iconCircle}>
                            <img src={src} alt={label} style={{ width: 28, height: 28, objectFit: 'contain' }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#6B7280' }}>{label}</span>
                    </Flex>
                ))}
            </Flex>
        </div>
    </TabLayout>
);

export default DeployTab;
