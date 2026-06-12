import React from 'react';

import { RightOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';

import IndiaFlagIcon from '../../assets/svg/india.svg';
import UsaFlagIcon from '../../assets/svg/usa.svg';

const { Title } = Typography;

const WIZARD_STEPS = [
    { n: 1 as const, label: 'Select a Plan' },
    { n: 2 as const, label: 'Choose Add-ons' },
];

const LOCATIONS = [
    { key: 'us' as const, label: 'USA', icon: UsaFlagIcon },
    { key: 'india' as const, label: 'India', icon: IndiaFlagIcon },
] as const;

interface VpsWizardHeaderProps {
    step: 1 | 2;
    serverLocation: 'india' | 'us';
    setServerLocation: (loc: 'india' | 'us') => void;
    onBack: () => void;
}

const VpsWizardHeader: React.FC<VpsWizardHeaderProps> = ({
    step,
    serverLocation,
    setServerLocation,
    onBack,
}) => (
    <>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Title level={2} style={{ margin: 0 }}>
                Set Up Your VPS In 2 Easy Steps
            </Title>
        </div>

        <div
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                minHeight: 40,
            }}
        >
            <Flex align="center" gap={0}>
                {WIZARD_STEPS.map(({ n, label }, i) => (
                    <Flex key={n} align="center" gap={0}>
                        {i > 0 && (
                            <RightOutlined
                                style={{
                                    color: '#9CA3AF',
                                    fontSize: 12,
                                    margin: '0 12px',
                                    flexShrink: 0,
                                }}
                            />
                        )}
                        <Flex
                            align="center"
                            gap={10}
                            onClick={() => n === 1 && step === 2 && onBack()}
                            style={{ cursor: n === 1 && step === 2 ? 'pointer' : 'default' }}
                        >
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    background: step === n ? '#F0655B' : '#E5E7EB',
                                    color: step === n ? '#fff' : '#6B7280',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {n}
                            </div>
                            <span
                                style={{
                                    fontSize: 14,
                                    fontWeight: step === n ? 600 : 400,
                                    color: step === n ? '#111827' : '#9CA3AF',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {label}
                            </span>
                        </Flex>
                    </Flex>
                ))}
            </Flex>

            {step === 1 && (
                <Flex align="center" gap={8} style={{ position: 'absolute', right: 0 }}>
                    {LOCATIONS.map(({ key, label, icon }) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setServerLocation(key)}
                            style={{
                                border: `1.5px solid ${serverLocation === key ? '#F0655B' : '#E5E7EB'}`,
                                borderRadius: 20,
                                padding: '4px 12px 4px 8px',
                                cursor: 'pointer',
                                background: serverLocation === key ? '#FFF5F5' : '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                            }}
                        >
                            <img
                                src={icon}
                                alt={label}
                                style={{ width: 22, height: 16, objectFit: 'cover', borderRadius: 2 }}
                            />
                            <span
                                style={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: serverLocation === key ? '#F0655B' : '#374151',
                                }}
                            >
                                {label}
                            </span>
                        </button>
                    ))}
                </Flex>
            )}
        </div>
    </>
);

export default VpsWizardHeader;
