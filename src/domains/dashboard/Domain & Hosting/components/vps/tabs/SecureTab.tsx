import React from 'react';

import { Flex, Typography } from 'antd';

import CloudSecurityPng from '../../../assets/img/cloud_security.png';
import AcronisIcon from '../../../assets/svg/acronis.svg';
import KvmIcon from '../../../assets/svg/kvm.svg';
import OpenStackIcon from '../../../assets/svg/openstack.svg';
import { TabLayout } from '../../../utils/vpsTabUtils';

const { Title } = Typography;

const INFRA_ICONS = [
    { label: 'OpenStack', src: OpenStackIcon },
    { label: 'KVM', src: KvmIcon },
    { label: 'Acronis', src: AcronisIcon },
];

const SecureTab: React.FC = () => (
    <TabLayout image={{ src: CloudSecurityPng, alt: 'Cloud Security' }}>
        <div style={{ marginBottom: 16 }}>
            <Title level={5} style={{ marginBottom: 4 }}>DDoS Protection</Title>
            <p style={{ margin: 0, color: '#4B5563', fontSize: 13 }}>
                Our state-of-the-art infrastructure ensures your VPS is protected against any attacks.
            </p>
        </div>
        <div style={{ marginBottom: 16 }}>
            <Title level={5} style={{ marginBottom: 4 }}>State-of-the-Art Infrastructure</Title>
            <p style={{ margin: '0 0 12px', color: '#4B5563', fontSize: 13 }}>
                All our servers are powered by world infrastructure to keep them online and running.
            </p>
            <Flex gap={16} align="center" wrap="wrap">
                {INFRA_ICONS.map(({ label, src }) => (
                    <div
                        key={label}
                        style={{ border: '1px solid #E5E7EB', borderRadius: 6, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                        <img src={src} alt={label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{label}</span>
                    </div>
                ))}
            </Flex>
        </div>
        <div>
            <Title level={5} style={{ marginBottom: 4 }}>Private Networking</Title>
            <p style={{ margin: 0, color: '#4B5563', fontSize: 13 }}>
                Setup and use network instantly in a few clicks.
            </p>
        </div>
    </TabLayout>
);

export default SecureTab;
