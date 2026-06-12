import React, { useState } from 'react';

import { Col, Pagination, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import GenericTable from '@components/atomic/GenericTable';
import { paths } from '@src/routes/paths';

import PurchaseOrdersHeader from '../components/PurchaseOrder/PurchaseOrdersHeader';
import { purchaseOrdersData } from '../utils/data';
import { purchaseOrdersColumns } from '../utils/PurchaseOrderColumns';

const { Title, Text } = Typography;

const initialFilters = {
    searchText: '',
    page: 1,
    itemsPerPage: 10,
};

const PurchaseOrdersPage: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);

    // TODO: replace with API hook — filtering/pagination disabled until integration
    const filtered  = purchaseOrdersData;
    const paginated = purchaseOrdersData;

    const columns = purchaseOrdersColumns(id =>
        navigate(`${paths.dashboard.procure}/${paths.procure.purchaseOrders.index}/${id}`)
    );

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                <Row justify="space-between" align="middle">
                    <Col className="mb-2 mr-10">
                        <Title level={4} style={{ fontWeight: 400, marginBottom: 0 }}>Purchase Orders</Title>
                        <Text type="secondary">Manage your issued POs — from draft to signed, delivered, and paid.</Text>
                    </Col>
                    <Col flex="auto">
                        <PurchaseOrdersHeader
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

export default PurchaseOrdersPage;
