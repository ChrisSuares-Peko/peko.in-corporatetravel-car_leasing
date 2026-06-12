import React, { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Pagination, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import GenericTable from '@components/atomic/GenericTable';
import { paths } from '@src/routes/paths';

import InvoicingHeader from '../components/Invoicing/InvoicingHeader';
import { invoicingData } from '../utils/data';
import { invoicingColumns } from '../utils/InvoicingColumns';

const { Title, Text } = Typography;

const initialFilters = {
    searchText: '',
    page: 1,
    itemsPerPage: 10,
};

const InvoicingPage: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);

    // TODO: replace with API hook — filtering/pagination disabled until integration
    const filtered  = invoicingData;
    const paginated = invoicingData;

    const columns = invoicingColumns((ref) =>
        navigate(`${paths.dashboard.procure}/${paths.procure.invoicing.index}/${ref}`)
    );

    return (
        <Row gutter={[0, 16]}>
            {/* Title row + button */}
            <Col span={24}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={4} style={{ fontWeight: 400, marginBottom: 0 }}>Invoicing</Title>
                        <Text type="secondary">Track vendor invoices, link them to purchase orders, and keep payments moving.</Text>
                    </Col>
                    <Col>
                        <InvoicingHeader />
                    </Col>
                </Row>
            </Col>

            {/* Full-width search */}
            <Col span={24}>
                <Input
                    placeholder="Search"
                    suffix={<SearchOutlined />}
                    allowClear
                    value={filters.searchText}
                    onChange={e => setFilters(prev => ({ ...prev, searchText: e.target.value, page: 1 }))}
                    maxLength={100}
                />
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

export default InvoicingPage;
