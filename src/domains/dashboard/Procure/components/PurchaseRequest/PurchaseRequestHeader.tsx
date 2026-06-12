import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Col, DatePicker, Input, Row, Select } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

type Props = {
    onStatusChange: (val: string | undefined) => void;
    onSearch: (val: string) => void;
    onDateChange?: RangePickerProps['onChange'];
    searchText: string;
};

const PurchaseRequestHeader: React.FC<Props> = ({ onStatusChange, onSearch, onDateChange, searchText }) => (
    <Row gutter={[16, 16]} justify="end" align="middle">
        <Col xs={24} sm={12} md={5}>
            <Select
                placeholder="Select Status"
                allowClear
                className="w-full"
                options={[
                    { label: 'Converted to RFQ', value: 'Converted to RFQ' },
                    { label: 'Converted to PO',  value: 'Converted to PO'  },
                    { label: 'Open',             value: 'Open'             },
                ]}
                onChange={onStatusChange}
            />
        </Col>
        <Col xs={24} sm={12} md={6}>
            <RangePicker className="w-full" onChange={onDateChange} />
        </Col>
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
    </Row>
);

export default PurchaseRequestHeader;
