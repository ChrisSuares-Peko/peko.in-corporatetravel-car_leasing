import React, { useState } from 'react';

import { Card, Col, Flex, Row, Tag, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import DocumentsTab from '../components/PurchaseOrderDetails/DocumentsTab';
import JourneyTab from '../components/PurchaseOrderDetails/JourneyTab';
import NotesTab from '../components/PurchaseOrderDetails/NotesTab';
import OverviewTab from '../components/PurchaseOrderDetails/OverviewTab';
import POHeader from '../components/PurchaseOrderDetails/POHeader';
import { purchaseOrdersData } from '../utils/data';

const { Text } = Typography;

const mockVendor = 'Gulf Office Suppliers LLC';

const TABS = ['Overview', 'Documents', 'Notes', 'Journey'] as const;
type Tab = (typeof TABS)[number];

const PurchaseOrderDetailsPage: React.FC = () => {
    const { poId } = useParams<{ poId: string }>();
    const [activeTab, setActiveTab] = useState<Tab>('Overview');

    const po = purchaseOrdersData.find((p: (typeof purchaseOrdersData)[number]) => p.ref === poId) ?? purchaseOrdersData[0];

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                <Row gutter={16}>
                    {/* Main content */}
                    <Col xs={24} lg={activeTab === 'Overview' ? 17 : 24}>
                    <Card  className="rounded-xl" styles={{ body: { padding: '20px 24px' } }}>
                          <POHeader
                                poRef={po.ref}
                                vendor={mockVendor}
                                status={po.status}
                                eSign={po.eSign}
                            />
</Card>
                            {/* Tabs */}
                            <Flex gap={0} className="border-b border-[#f0f0f0] mb-4">
                                {TABS.map(tab => (
                                    <button
                                        type="button"
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 text-sm bg-transparent border-0 cursor-pointer border-b-2 -mb-px ${
                                            activeTab === tab
                                                ? 'border-[#ff4d4f] text-[#ff4d4f] font-medium'
                                                : 'border-transparent text-gray-500'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </Flex>
<Card  className="rounded-xl" styles={{ body: { padding: '20px 24px' } }}>
                          
                            {activeTab === 'Overview'   && <OverviewTab eSign={po.eSign} />}
                            {activeTab === 'Documents' && <DocumentsTab />}
                            {activeTab === 'Notes'     && <NotesTab />}
                            {activeTab === 'Journey'   && <JourneyTab />}
                        </Card>
                    </Col>
{/* Right sidebar — Status Meaning */}
{activeTab === 'Overview'   &&(
                    
                    <Col xs={24} lg={7}>
                        <Card className="rounded-xl" styles={{ body: { padding: '20px 20px' } }}>
                            <Text className="text-sm font-semibold text-[#262626] block mb-3">Status Meaning</Text>
                            <Text className="text-xs text-gray-400 block mb-4">
                                Business lifecycle and eSignature workflows are tracked separately.
                            </Text>
                            <Flex vertical gap={12}>
                                <Card className="rounded-lg !bg-[#fafafa] !border-0" styles={{ body: { padding: '12px 14px' } }}>
                                    <Text className="text-xs text-gray-400 block mb-1">PO Status</Text>
                                    <Text className="text-xs text-gray-500 block mb-2">Operational / business lifecycle</Text>
                                    <Tag style={{ color: '#43B75D', background: '#ECFDF5', border: 'none', borderRadius: 6, fontWeight: 500 }}>
                                        {po.status}
                                    </Tag>
                                </Card>
                                <Card className="rounded-lg !bg-[#fafafa] !border-0" styles={{ body: { padding: '12px 14px' } }}>
                                    <Text className="text-xs text-gray-400 block mb-1">eSign Status</Text>
                                    <Text className="text-xs text-gray-500 block mb-2">Signature workflow</Text>
                                    <Tag style={{ color: '#43B75D', background: '#ECFDF5', border: 'none', borderRadius: 6, fontWeight: 500 }}>
                                        {po.eSign}
                                    </Tag>
                                </Card>
                            </Flex>
                        </Card>
                    </Col>
)}
                </Row>
            </Col>
        </Row>
    );
};

export default PurchaseOrderDetailsPage;
