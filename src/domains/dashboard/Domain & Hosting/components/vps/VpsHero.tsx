import React from 'react';

import { Flex, Typography } from 'antd';

const { Title } = Typography;

const HERO_BULLETS = [
    'High performance NVMe SSD Storage Volumes',
    'Instant Provisioning',
    'Full Root Access',
];

interface VpsHeroProps {
    minPrice: number | null;
}

const VpsHero: React.FC<VpsHeroProps> = ({ minPrice }) => (
    <div
        style={{
            background: 'linear-gradient(to bottom, #fff 0%, #FFF5F5 100%)',
            padding: '40px 32px',
        }}
    >
        <div style={{ maxWidth: 760 }}>
            <Title level={3} style={{ marginBottom: 16, lineHeight: 1.4, fontWeight: 700 }}>
                High-Performance Servers For Faster Websites &amp; Applications With Linux KVM VPS
                Server
            </Title>
            <Flex vertical gap={6} style={{ marginBottom: 20 }}>
                {HERO_BULLETS.map(item => (
                    <Flex key={item} align="center" gap={8}>
                        <span style={{ color: '#F0655B', fontSize: 16, lineHeight: 1 }}>•</span>
                        <span style={{ color: '#4B5563', fontSize: 14 }}>{item}</span>
                    </Flex>
                ))}
            </Flex>
            {minPrice != null && (
                <p style={{ margin: 0, color: '#121212', fontSize: 14, fontWeight: 700 }}>
                    As low as <strong style={{ color: '#F0655B' }}>₹{minPrice}</strong>/MO
                </p>
            )}
        </div>
    </div>
);

export default VpsHero;
