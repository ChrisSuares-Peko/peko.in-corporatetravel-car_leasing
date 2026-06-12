import { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Table, Typography, Flex, Input, TableColumnsType, Pagination, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import useFilter from '@src/domains/dashboard/GiftCards/hooks/useFilter';
import { useAppDispatch } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { formattedDateTime } from '@utils/dateFormat';
import { toTitleCase } from '@utils/wordFormat';

import { useOrderHistoryTable } from '../hooks/useOrderHistoryTable';
import { setAddressData, setFormData, setProductData } from '../slices/checkoutSlice';
import { OrderHistoryTableData, filterState } from '../types/types';

type OrderHistoryPageProps = {};

const OrderHistoryPage: React.FC<OrderHistoryPageProps> = () => {
    const initialValues = {
        search: '',
        start: 1,
        length: 10,
        draw: 1,
        from: '',
        to: '',
    };
    const [filter, setFilter] = useState<filterState>(initialValues);
    const { handleSearch, handlePageChange } = useFilter({ setFilter });
    const { data, isLoading, count } = useOrderHistoryTable(
        filter.draw,
        filter.start,
        filter.length,
        filter.search
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const OrderHistoryColumns: TableColumnsType<OrderHistoryTableData> = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date: Date) => formattedDateTime(new Date(date)),
        },
        {
            title: 'Gift Card Name',
            dataIndex: 'giftCardName',
        },
        {
            title: 'Order ID',
            dataIndex: 'txnId',
        },

        {
            title: 'Order Type',
            dataIndex: 'orderType',
            render: (orderType: string) => {
                if (orderType === 'Buy for other') return 'Buy for Other';
                if (orderType === 'Buy for self') return 'Buy for Self';
                if (orderType === 'Buy for Employee') return 'Buy for Employees';
                return orderType ?? '-';
            },
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (quantity: string) => quantity ?? '-',
        },
        {
            title: 'Payment Mode',
            dataIndex: 'paymentMode',
            render: (text: string) => <span>{toTitleCase(text)}</span>,
        },
        {
            title: 'Total Amount',
            dataIndex: 'amount',
            render: (amount: number) => (
               <Typography.Text>₹ {Number(amount).toFixed(2)}</Typography.Text>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text: string) => (
                <span
                    className={`${text === 'SUCCESS' ? 'text-textGreen' : 'text-bgOrange2'} capitalize`}
                >
                    {text === 'FAILURE' ? 'Failed' : text.toLowerCase()}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Button
                    tabIndex={0}
                    type="default"
                    className="border-bgOrange text-bgOrange"
                    onClick={() => {
                        dispatch(setFormData(record.formData));
                        dispatch(setProductData(record.productDetails));
                        dispatch(setAddressData(record.addressDetails));
                        navigate(
                            `${paths.dashboard.giftCards}/${paths.giftcards.details}/${record.productDetails.id}/${paths.giftcards.checkout}`
                        );
                    }}
                >
                    Buy Again
                </Button>
            ),
        },
    ];

    return (
        <Flex vertical gap={20} className="pt-7">
            <Flex justify="space-between" className="mb-4">
                <Typography.Paragraph className={`text-xl  font-medium `}>
                    Order History
                </Typography.Paragraph>
                <Flex align="center">
                    <Input
                        placeholder="Search"
                        allowClear
                        suffix={<SearchOutlined />}
                        variant="outlined"
                        style={{
                            width: 'calc(100% - 10px)',
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                        }}
                        value={filter.search}
                        onChange={handleSearch}
                    />
                </Flex>
            </Flex>
            <Table
                columns={OrderHistoryColumns}
                dataSource={data.map(item => ({ ...item, key: item.txnId }))}
                loading={isLoading}
                pagination={false}
            />
            <Pagination
                current={filter.start}
                onChange={handlePageChange}
                size="default"
                className="text-end pt-7"
                total={count}
            />
        </Flex>
    );
};

export default OrderHistoryPage;
