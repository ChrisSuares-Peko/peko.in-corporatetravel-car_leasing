import React from 'react';

import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

type Props = {
    searchText: string;
    onSearch: (val: string) => void;
};

const PurchaseOrdersHeader: React.FC<Props> = ({ searchText, onSearch }) => {
    const navigate = useNavigate();
    return (
        <Row gutter={[16, 16]} justify="end" align="middle">
            <Col xs={24} sm={12} md={5}>
                <Input
                    placeholder="Search"
                    suffix={<SearchOutlined />}
                    allowClear
                    value={searchText}
                    onChange={e => onSearch(e.target.value)}
                    maxLength={100}
                />
            </Col>
            <Col>
                <Button
                    type="primary"
                    danger
                    icon={<PlusOutlined />}
                    style={{ borderRadius: 8 }}
                    onClick={() => navigate(`${paths.dashboard.procure}/${paths.procure.purchaseOrders.index}/${paths.procure.purchaseOrders.create}`)}
                >
                    New PO
                </Button>
            </Col>
        </Row>
    );
};

export default PurchaseOrdersHeader;
