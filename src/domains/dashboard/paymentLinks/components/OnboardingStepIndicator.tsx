import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';

const STEPS = [
    { id: 1, label: 'Business Details' },
    { id: 2, label: 'PAN Verification' },
    { id: 3, label: 'Bank Verification' },
    { id: 4, label: 'Consent & Confirm' },
] as const;

const OnboardingStepIndicator = ({ step }: { step: 1 | 2 | 3 | 4 }) => (
    <Flex align="center" gap={0} className="border-b border-[#D7E2F0] flex-wrap">
        {STEPS.map(s => (
            <Flex
                key={s.id}
                align="center"
                gap={6}
                className="pb-[10px] pr-3 md:pr-5"
                style={{
                    borderBottom: step === s.id ? '2px solid #FF4D4F' : '2px solid transparent',
                    marginBottom: -1,
                }}
            >
                {step > s.id ? (
                    <CheckCircleFilled style={{ fontSize: 12, color: '#FF4D4F' }} />
                ) : (
                    <CheckCircleOutlined
                        style={{ fontSize: 12, color: step === s.id ? '#FF4D4F' : '#98A2B3' }}
                    />
                )}
                <Typography.Text
                    className="text-[12px] font-medium leading-none"
                    style={{ color: step === s.id ? '#FF4D4F' : '#667085' }}
                >
                    {s.label}
                </Typography.Text>
            </Flex>
        ))}
    </Flex>
);

export default OnboardingStepIndicator;
