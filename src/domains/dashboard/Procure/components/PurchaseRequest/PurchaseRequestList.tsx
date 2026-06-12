import React, { useState } from 'react';

import { Button, Col, Pagination, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import GenericTable from '@components/atomic/GenericTable';
import { paths } from '@src/routes/paths';

import PurchaseRequestHeader from './PurchaseRequestHeader';
import { usePurchaseRequests } from '../../hooks/usePurchaseRequests';
import { getPurchaseRequestColumns } from '../../utils/PurchaseRequestColumns';

const { Title } = Typography;

const initialFilters = {
    searchText: '',
    status: undefined as string | undefined,
    page: 1,
    itemsPerPage: 10,
};

const PurchaseRequestList: React.FC = () => {
    const [filters, setFilters] = useState(initialFilters);

    const { isLoading, tableData, count } = usePurchaseRequests(filters);

    const navigate = useNavigate();
    const handleNewRequest = () =>
        navigate(`${paths.dashboard.procure}/${paths.procure.purchaseRequests.index}/${paths.procure.purchaseRequests.create}`);

    const handleView = (row: any) =>
        navigate(`${paths.dashboard.procure}/${paths.procure.purchaseRequests.index}/${encodeURIComponent(row.ref)}`);

    const columns = getPurchaseRequestColumns(handleView);

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                <Row justify="end" align="middle" className="p-2">
                    <Col>
                        <Button type="primary" danger onClick={handleNewRequest}>
                            New Request
                        </Button>
                    </Col>
                </Row>
                <Row justify="space-between" align="middle">
                    <Col className="mb-2 mr-10">
                        <Title level={4} style={{ fontWeight: 400, marginBottom: 0 }}>
                            Purchase Request
                        </Title>
                    </Col>
                    <Col flex="auto">
                        <PurchaseRequestHeader
                            searchText={filters.searchText}
                            onStatusChange={val => setFilters(prev => ({ ...prev, status: val, page: 1 }))}
                            onSearch={val => setFilters(prev => ({ ...prev, searchText: val, page: 1 }))}
                        />
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <GenericTable
                    columns={columns}
                    dataSource={tableData}
                    rowKey="id"
                    loading={isLoading}
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
                    total={count}
                    pageSize={filters.itemsPerPage}
                    showSizeChanger={false}
                />
            </Col>
        </Row>
    );
};

export default PurchaseRequestList;
