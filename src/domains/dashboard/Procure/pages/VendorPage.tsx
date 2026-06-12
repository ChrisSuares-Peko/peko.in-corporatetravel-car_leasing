import React, { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Pagination, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import GenericTable from '@components/atomic/GenericTable';
import { paths } from '@src/routes/paths';

import VendorHeader from '../components/Vendor/VendorHeader';
import { vendorData } from '../utils/data';
import { vendorColumns } from '../utils/VendorColumns';

const { Title, Text } = Typography;

const initialFilters = {
    searchText: '',
    page: 1,
    itemsPerPage: 10,
};

const VendorPage: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);

    // TODO: replace with API hook — filtering/pagination disabled until integration
    const filtered  = vendorData;
    const paginated = vendorData;

    const columns = vendorColumns((_id) => {
        // TODO: navigate to vendor detail page
    });

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                {/* Row 1: title left, buttons right */}
                <Row justify="space-between" align="middle" style={{ marginBottom: 10 }}>
                    <Col>
                        <Title level={4} style={{ fontWeight: 400, marginBottom: 0 }}>Vendor Directory</Title>
                        <Text  className='text-[#475569]'>Your central supplier book. Manage contacts, bank details, and procurement history.</Text>
                    </Col>
                    <Col>
                        <VendorHeader
                            onAdd={() => navigate(`${paths.dashboard.procure}/${paths.procure.vendor.index}/${paths.procure.vendor.create}`)}
                        />
                    </Col>
                </Row>
                {/* Row 2: full-width search */}
                <Input
                    placeholder="Search"
                    suffix={<SearchOutlined />}
                    allowClear
                    value={filters.searchText}
                    onChange={e => setFilters(prev => ({ ...prev, searchText: e.target.value, page: 1 }))}
                    maxLength={100}
                    style={{ marginBottom: 4 }}
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

export default VendorPage;
