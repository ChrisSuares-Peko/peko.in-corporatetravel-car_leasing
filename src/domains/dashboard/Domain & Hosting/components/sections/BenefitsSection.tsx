import { Typography } from 'antd';

const { Title, Text } = Typography;

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface BenefitsSectionProps {
    osTitle: string;
    hostingBenefits: Benefit[];
}

export const BenefitsSection = ({ osTitle, hostingBenefits }: BenefitsSectionProps) => (
    <div className="mb-12 sm:mb-16 px-4 sm:px-6 py-8 sm:py-10 max-w-7xl mx-auto">
        <Title
            level={3}
            style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: '28px',
                lineHeight: '38px',
                color: '#1E293B',
                marginBottom: '20px',
            }}
        >
            Why choose {osTitle}
        </Title>
        <div
            className="p-6 sm:p-8 lg:py-14 lg:px-12"
            style={{
                background: '#FFFFFF',
                boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.06)',
                borderRadius: '28px',
            }}
        >
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                {hostingBenefits.map((benefit, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        {benefit.icon}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    lineHeight: '26px',
                                    color: '#1E293B',
                                    textAlign: 'center',
                                    display: 'block',
                                }}
                            >
                                {benefit.title}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: '22px',
                                    color: '#6F6C8F',
                                    textAlign: 'center',
                                    display: 'block',
                                }}
                            >
                                {benefit.description}
                            </Text>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
