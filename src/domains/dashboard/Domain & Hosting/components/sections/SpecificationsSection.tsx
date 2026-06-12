import { Button, Col, Row, Typography } from 'antd';

const { Text, Title } = Typography;

interface Specs {
    columns: string[];
    rows: Record<string, string[]>[];
}

interface SpecificationsSectionProps {
    osTitle: string;
    hostingSpecs: Specs;
    onViewAllSpecs: () => void;
}

export const SpecificationsSection = ({
    osTitle,
    hostingSpecs,
    onViewAllSpecs,
}: SpecificationsSectionProps) => (
    <div className="mb-12 sm:mb-16 px-4 sm:px-6 py-8 sm:py-10 max-w-7xl mx-auto">
        <Title
            level={3}
            style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: '28px',
                lineHeight: '38px',
                color: '#1E293B',
                marginBottom: '60px',
            }}
        >
            {osTitle} Technical Specifications
        </Title>
        <div style={{ marginTop: '40px' }}>
            <Row gutter={[24, 40]} align="top">
                {hostingSpecs.columns.map(col => (
                    <Col key={col} xs={24} sm={12} lg={5}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '30px',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '22px',
                                    lineHeight: '26px',
                                    color: '#1E293B',
                                    display: 'block',
                                }}
                            >
                                {col}
                            </Text>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                                {hostingSpecs.rows[0][col as keyof typeof hostingSpecs.rows[0]]?.map(
                                    (item: string, idx: number) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '6px',
                                                    height: '6px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#FF4F4F',
                                                    flexShrink: 0,
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: '12px',
                                                    lineHeight: '22px',
                                                    color: '#6F6C8F',
                                                }}
                                            >
                                                {item}
                                            </Text>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </Col>
                ))}
                <Col xs={24} lg={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                    <Button
                        type="primary"
                        onClick={onViewAllSpecs}
                        style={{
                            backgroundColor: '#FF4F4F',
                            borderColor: '#FF4F4F',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 600,
                            fontSize: '16px',
                            height: '45px',
                            borderRadius: '10px',
                            padding: '0 24px',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        View all tech specs
                    </Button>
                </Col>
            </Row>
        </div>
    </div>
);
