import React from 'react';

import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';

import PurchaseRequestDrawer from '../components/PurchaseRequest/PurchaseRequestDrawer';
import { purchaseRequestsData } from '../utils/data';

const PurchaseRequestDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const record = purchaseRequestsData.find(r => r.ref === id) ?? purchaseRequestsData[0];

    return (
        <Row justify="center">
            <Col xs={24} sm={22} md={18} lg={14} xl={12}>
                <PurchaseRequestDrawer record={record} />
            </Col>
        </Row>
    );
};

export default PurchaseRequestDetailsPage;
