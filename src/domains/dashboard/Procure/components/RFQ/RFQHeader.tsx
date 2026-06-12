import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Col, DatePicker, Input, Row, Select } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

type Props = {
    onCategoryChange: (val: string | undefined) => void;
    onSearch: (val: string) => void;
    onDateChange: RangePickerProps['onChange'];
    searchText: string;
};

const RFQHeader: React.FC<Props> = ({ onCategoryChange, onSearch, onDateChange, searchText }) => (
    <Row gutter={[16, 16]} justify="end" align="middle">
        <Col xs={24} sm={12} md={6}>
            <Select
                placeholder="Select card user, merchant, category"
                allowClear
                className="w-full"
                options={[
                    { label: 'RFQ', value: 'RFQ' },
                    { label: 'RFI', value: 'RFI' },
                    { label: 'RFP', value: 'RFP' },
                ]}
                onChange={onCategoryChange}
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

export default RFQHeader;
