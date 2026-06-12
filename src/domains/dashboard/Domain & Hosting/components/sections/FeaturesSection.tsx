import { Typography } from 'antd';

const { Text, Title } = Typography;

interface Feature {
    icon: React.ReactNode;
    title: string;
    cardTitle: string;
    cardDescription: string;
    cardImage?: string;
}

interface FeaturesSectionProps {
    featureTitleOs: string;
    hostingFeatures: Feature[];
    selectedFeature: number;
    onSelectFeature: (idx: number) => void;
    os: 'linux' | 'windows';
}

export const FeaturesSection = ({
    featureTitleOs,
    hostingFeatures,
    selectedFeature,
    onSelectFeature,
    os,
}: FeaturesSectionProps) => (
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
            {featureTitleOs} Features
        </Title>

        <div
            style={{
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                marginTop: '40px',
                marginBottom: '12px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    minWidth: '600px',
                }}
            >
                {hostingFeatures.map((feature, idx) => (
                    <div
                        key={idx}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectFeature(idx)}
                        onKeyDown={e => e.key === 'Enter' && onSelectFeature(idx)}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: os === 'linux' && idx === 0 ? '0' : '10px 8px',
                            gap: os === 'linux' && idx === 0 ? '0' : '6px',
                            cursor: 'pointer',
                            borderBottom:
                                selectedFeature === idx ? '2px solid #FF4F4F' : '2px solid transparent',
                        }}
                    >
                        {feature.icon}
                        <Text
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '22px',
                                color: '#1E293B',
                                textAlign: 'center',
                            }}
                        >
                            {feature.title}
                        </Text>
                    </div>
                ))}
            </div>
        </div>

        <div
            className="p-6 sm:p-10 lg:py-[60px] lg:px-[50px]"
            style={{
                background: '#FFFFFF',
                boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.06)',
                borderRadius: '28px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '50px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    flex: 1,
                    minWidth: '220px',
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        fontSize: '24px',
                        lineHeight: '38px',
                        color: '#1E293B',
                        display: 'block',
                    }}
                >
                    {hostingFeatures[selectedFeature]?.cardTitle}
                </Text>
                <Text
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '28px',
                        color: '#6F6C8F',
                        display: 'block',
                    }}
                >
                    {hostingFeatures[selectedFeature]?.cardDescription}
                </Text>
            </div>
            <div
                style={{
                    width: '289px',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                {hostingFeatures[selectedFeature]?.cardImage ? (
                    <img
                        src={hostingFeatures[selectedFeature]?.cardImage}
                        alt={hostingFeatures[selectedFeature]?.title}
                        style={{ maxWidth: '70%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                ) : (
                    hostingFeatures[selectedFeature]?.icon && (
                        <div style={{ fontSize: '80px', opacity: 0.15 }}>
                            {hostingFeatures[selectedFeature]?.icon}
                        </div>
                    )
                )}
            </div>
        </div>
    </div>
);
