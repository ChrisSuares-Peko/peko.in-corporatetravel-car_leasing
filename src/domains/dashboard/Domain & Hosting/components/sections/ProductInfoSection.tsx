import { Button, Col, Row, Typography } from 'antd';

const { Text } = Typography;

interface ProductInfoSectionProps {
    osTitle: string;
    os: 'linux' | 'windows';
    onBuyNow: () => void;
}

export const ProductInfoSection = ({ osTitle, os, onBuyNow }: ProductInfoSectionProps) => (
    <div className="px-4 sm:px-6 py-8 sm:py-10 max-w-7xl mx-auto">
        <div
            className="p-6 sm:p-8 lg:py-14 lg:px-12"
            style={{
                background: '#FFFFFF',
                boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.06)',
                borderRadius: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 600,
                        fontSize: '28px',
                        lineHeight: '38px',
                        color: '#1E293B',
                    }}
                >
                    Product Info
                </Text>
                <Button
                    type="primary"
                    style={{
                        backgroundColor: '#FF4F4F',
                        borderColor: '#FF4F4F',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        height: '45px',
                        borderRadius: '10px',
                        padding: '0 24px',
                    }}
                    onClick={onBuyNow}
                >
                    Buy now
                </Button>
            </div>

            <Row gutter={[24, 24]}>
                {[
                    { label: 'Product Category', value: os === 'linux' ? 'Linux Hosting' : 'Windows Hosting', underline: false },
                    { label: 'Product Name', value: osTitle, underline: true },
                    { label: 'Brand', value: 'Standard CPAN', underline: false },
                ].map(({ label, value, underline }) => (
                    <Col key={label} xs={24} lg={8}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Text
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    lineHeight: '38px',
                                    color: '#1E293B',
                                    display: 'block',
                                }}
                            >
                                {label}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: '28px',
                                    color: '#6F6C8F',
                                    display: 'block',
                                    textDecoration: underline ? 'underline' : 'none',
                                }}
                            >
                                {value}
                            </Text>
                        </div>
                    </Col>
                ))}
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Text
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '38px',
                                color: '#1E293B',
                                display: 'block',
                            }}
                        >
                            Product Description
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '28px',
                                color: '#6F6C8F',
                                display: 'block',
                            }}
                        >
                            {os === 'linux'
                                ? 'Linux Shared Hosting is a highly cost-effective, user-friendly option of web hosting that can be purchased by anyone for any kind of online business. Small start-ups and other business units can use a shared server platform for hosting their websites.'
                                : 'Windows Shared Hosting is a highly cost-effective, user-friendly option of web hosting that can be purchased by anyone for any kind of online business with .NET technologies. Small start-ups and other business units can use a shared server platform for hosting their websites.'}
                        </Text>
                    </div>
                </Col>
                <Col xs={24} lg={8}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Text
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '38px',
                                color: '#1E293B',
                                display: 'block',
                            }}
                        >
                            Ideal for
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '28px',
                                color: '#6F6C8F',
                                display: 'block',
                            }}
                        >
                            Small & Medium Businesses, Startups, Bloggers, and anyone building their first website.
                        </Text>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
);
