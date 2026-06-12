import React from 'react';

import { Flex, Typography } from 'antd';

import newRFQImage from '@src/domains/dashboard/Procure/assets/images/newRFQImage.svg';

const { Title, Text } = Typography;

const tips = [
    'Select at least 2–3 vendors for competitive pricing.',
    'Set a realistic deadline — vendors typically need 3–5 business days.',
    "Use RFI if you're still exploring the market, RFQ for known items, RFP for complex solutions.",
];

const steps = [
    'Vendors receive a unique link to submit their proposal.',
    'Proposals appear in your dashboard as they come in.',
    'Compare proposals side-by-side and accept the best one.',
];

const TipsPanel: React.FC = () => (
    <>
        <div className="mb-4" style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0f0f0' }}>
            <div className="flex justify-center bg-[#FAF9F6] rounded-xl" style={{ padding: '20px 16px', marginBottom: 16 }}>
                <img src={newRFQImage} alt="tips" style={{ width: 160, opacity: 0.9 }} />
            </div>

            <Title level={5} className="!mb-3">Tips</Title>
            <Flex vertical gap={8} className="mb-6">
                {tips.map((tip, i) => (
                    <Flex key={i} gap={8} align="flex-start">
                        <div className="shrink-0 w-2 h-2 rounded-full mt-1.5" style={{ background: '#ff4d4f' }} />
                        <Text className="text-xs text-gray-600">{tip}</Text>
                    </Flex>
                ))}
            </Flex>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0f0f0' }}>
            <Title level={5} className="!mb-4">What happens next?</Title>
            <Flex vertical gap={10}>
                {steps.map((step, i) => (
                    <Flex key={i} gap={16} align="center"
                        style={{ background: '#f9f9f9', borderRadius: 10, padding: '14px 16px' }}>
                        <div style={{
                            flexShrink: 0, width: 32, height: 32, borderRadius: 8,
                            background: '#fff', border: '1px solid #f0f0f0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 600, fontSize: 13, color: '#262626',
                        }}>
                            {i + 1}
                        </div>
                        <Text className="text-xs" style={{ color: '#595959' }}>{step}</Text>
                    </Flex>
                ))}
            </Flex>
        </div>
    </>
);

export default TipsPanel;
