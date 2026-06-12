import React, { useState } from 'react';


import { Button, Col, Flex, Pagination, Row, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';

import GenericTable from '@components/atomic/GenericTable';
import { paths } from '@src/routes/paths';

import ProposalsHeader from './ProposalsHeader';
import { ProposalStatus, rfqData } from '../../utils/data';

const { Title, Text } = Typography;

const statusCfg: Record<ProposalStatus, { color: string; bg: string }> = {
    Accepted:       { color: '#43B75D', bg: '#ECFDF5' },
    Rejected:       { color: '#ff4d4f', bg: '#fff1f0' },
    'Under review': { color: '#fa8c16', bg: '#fff7e6' },
    Shortlisted:    { color: '#D97706', bg: '#FFFBEB' },
};

const allProposals = rfqData.flatMap(rfq =>
    ((rfq as any).proposals ?? []).map((p: any) => ({
        ...p,
        rfqTitle:   rfq.title,
        rfqRef:     rfq.ref,
        vendors:    rfq.vendors,
        validUntil: '30 Apr 2026',
    }))
);

const buildColumns = (onView: (id: string) => void): TableColumnsType<any> => [
    {
        title: 'RFQ', key: 'rfq',
        render: (_: any, row: any) => (
            <Flex vertical gap={2}>
                <Text style={{ fontSize: 13, color: '#262626', fontWeight: 500 }}>
                    {row.rfqTitle.length > 22 ? `${row.rfqTitle.substring(0, 22)}...` : row.rfqTitle}
                </Text>
                <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{row.rfqRef}</Text>
            </Flex>
        ),
    },
    {
        title: 'Vendor', dataIndex: 'vendorName', key: 'vendor', width: 180,
        render: (v: string) => <Text style={{ fontSize: 13, color: '#262626' }}>{v}</Text>,
    },
    {
        title: 'Total', dataIndex: 'amount', key: 'amount', width: 100,
        render: (v: string) => <Text style={{ fontSize: 13, color: '#FF4F4F', fontWeight: 600 }}>{v}</Text>,
    },
    {
        title: 'Valid until', dataIndex: 'validUntil', key: 'validUntil', width: 110,
        render: (v: string) => <Text style={{ fontSize: 13, color: '#262626' }}>{v}</Text>,
    },
    {
        title: 'Vendors', dataIndex: 'vendors', key: 'vendors', width: 80,
        render: (v: number) => <Text style={{ fontSize: 13, color: '#262626' }}>{v}</Text>,
    },
    {
        title: 'Mode', dataIndex: 'channel', key: 'channel', width: 80,
        render: (v: string) => <Text style={{ fontSize: 13, color: '#52c41a' }}>{v}</Text>,
    },
    {
        title: 'Status', dataIndex: 'status', key: 'status', width: 120,
        render: (status: ProposalStatus) => {
            const cfg = statusCfg[status] ?? { color: '#595959', bg: '#f5f5f5' };
            return (
                <Tag style={{ color: cfg.color, background: cfg.bg, border: 'none', borderRadius: 6, fontWeight: 500 }}>
                    {status}
                </Tag>
            );
        },
    },
    {
        title: 'Actions', key: 'actions', width: 80,
        render: (_: any, row: any) => (
            <Button size="small" danger variant="outlined" style={{ borderRadius: 6 }} onClick={() => onView(row.id)}>
                View
            </Button>
        ),
    },
];

const initialFilters = {
    searchText: '',
    status: undefined as string | undefined,
    page: 1,
    itemsPerPage: 10,
};

const ProposalsList: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);

    // TODO: replace with API hook — filtering/pagination disabled until integration
    const filtered  = allProposals;
    const paginated = allProposals;

    const columns = buildColumns(id =>
        navigate(`${paths.dashboard.procure}/${paths.procure.proposals.index}/${id}`)
    );

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
              
                <Row justify="space-between" align="middle">
                    <Col className="mb-2 mr-10">
                        <Title level={4} style={{ fontWeight: 400, marginBottom: 0 }}>Proposals</Title>
                        <Typography.Text type='secondary'>Review and compare vendor proposals. Accept the best one to create a PO.</Typography.Text>
                    </Col>
                    <Col flex="auto">
                        <ProposalsHeader
                            searchText={filters.searchText}
                            onSearch={val => setFilters(prev => ({ ...prev, searchText: val, page: 1 }))}
                        />
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <GenericTable
                    columns={columns}
                    dataSource={paginated}
                    rowKey="id"
                    scroll={{ x: 900 }}
                    pagination={false}
                />
            </Col>

            <Col span={24}>
                <Pagination
                    current={filters.page}
                    size="default"
                    className="text-end"
                    onChange={page => setFilters(prev => ({ ...prev, page }))}
                    total={filtered.length}
                    pageSize={filters.itemsPerPage}
                    showSizeChanger={false}
                />
            </Col>
        </Row>
    );
};

export default ProposalsList;
