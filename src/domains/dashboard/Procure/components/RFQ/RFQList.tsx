import React, { useState } from 'react';

import { Button, Col, Pagination, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import GenericTable from '@components/atomic/GenericTable';
import { paths } from '@src/routes/paths';

import RFQHeader from './RFQHeader';
import { rfqData } from '../../utils/data';
import { getRFQColumns } from '../../utils/RFQColumns';

const { Title } = Typography;

const initialFilters = {
    searchText: '',
    type: undefined as string | undefined,
    page: 1,
    itemsPerPage: 10,
};

const RFQList: React.FC = () => {
    const [filters, setFilters] = useState(initialFilters);
    const navigate = useNavigate();

    const filtered = rfqData

    const paginated = filtered.slice(
        (filters.page - 1) * filters.itemsPerPage,
        filters.page * filters.itemsPerPage
    );

    const columns = getRFQColumns(
        row => navigate(`${paths.dashboard.procure}/rfq/${row.id}`),
        () => { }
    );

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                <Row justify="end" align="middle" className="p-2">
                    <Col>
                        <Button
                            type="primary"
                            danger
                            onClick={() => navigate(`${paths.dashboard.procure}/${paths.procure.rfq.index}/${paths.procure.rfq.create}`)}
                        >
                            New Request
                        </Button>
                    </Col>
                </Row>
                <Row justify="space-between" align="middle">
                    <Col className="mb-2 mr-10">
                        <Title level={4} style={{ fontWeight: 400, marginBottom: 0 }}>
                            Requests for Quote
                        </Title>
                    </Col>
                    <Col flex="auto">
                        <RFQHeader
                            searchText={filters.searchText}
                            onCategoryChange={val => setFilters(prev => ({ ...prev, type: val, page: 1 }))}
                            onSearch={val => setFilters(prev => ({ ...prev, searchText: val, page: 1 }))}
                            onDateChange={() => { }}
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

export default RFQList;
