import { Flex, Select, Typography } from 'antd';

const { Text } = Typography;

interface HeroSectionProps {
    heroBannerTitle: string;
    cheapestPrice: number | undefined | null;
    os: 'linux' | 'windows';
    serverLocation: 'in' | 'us';
    onOsChange: (value: 'linux' | 'windows') => void;
    onLocationChange: (value: 'in' | 'us') => void;
}

export const HeroSection = ({
    heroBannerTitle,
    cheapestPrice,
    os,
    serverLocation,
    onOsChange,
    onLocationChange,
}: HeroSectionProps) => (
    <div className="px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
        <div
            className="p-6 sm:p-10 lg:p-14"
            style={{
                background: 'linear-gradient(268.02deg, #F0F5FA -2.04%, #FFF2F2 100.06%)',
                borderRadius: '30px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '32px',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Text
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 600,
                        fontSize: '46px',
                        lineHeight: '54px',
                        color: '#1F1F1F',
                        display: 'block',
                        textTransform: 'capitalize',
                    }}
                >
                    {heroBannerTitle}
                </Text>
                {cheapestPrice && (
                    <div>
                        <Text
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 500,
                                fontSize: '20px',
                                lineHeight: '40px',
                                color: '#1F1F1F',
                                display: 'block',
                            }}
                        >
                            As low as
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 500,
                                fontSize: '20px',
                                lineHeight: '40px',
                                color: '#1F1F1F',
                                display: 'block',
                            }}
                        >
                            ₹{cheapestPrice}/mo
                        </Text>
                    </div>
                )}
            </div>

            <Flex gap={24} align="center" wrap>
                <Flex vertical gap={4} style={{ minWidth: '180px', flex: 1 }}>
                    <Text className="text-gray-700 font-medium text-sm">OS</Text>
                    <Select value={os} onChange={onOsChange} className="w-full" size="large">
                        <Select.Option value="linux">Linux</Select.Option>
                        <Select.Option value="windows">Windows</Select.Option>
                    </Select>
                </Flex>
                <Flex vertical gap={4} style={{ minWidth: '180px', flex: 1 }}>
                    <Text className="text-gray-700 font-medium text-sm">Server Location</Text>
                    <Select
                        value={serverLocation}
                        onChange={onLocationChange}
                        className="w-full"
                        size="large"
                    >
                        <Select.Option value="in">India</Select.Option>
                        <Select.Option value="us">USA</Select.Option>
                    </Select>
                </Flex>
            </Flex>
        </div>
    </div>
);
