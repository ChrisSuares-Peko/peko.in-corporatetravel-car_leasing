import React, { useEffect, useState } from 'react';

import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Flex, Pagination, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';

import GenericTable from '@components/atomic/GenericTable';
import {
    generateOrderBtn,
    generatePaymentStatusBtn,
} from '@src/domains/systemUser/ecom_manager/home/utils/dashData';
import GetProducts from '@src/domains/systemUser/ecom_manager/home/utils/GetProducts';
import { useAppSelector } from '@src/hooks/store';
import useDebounceSearch from '@src/hooks/useDebounceSearch';
import { formattedDateOnly, formattedTime } from '@utils/dateFormat';
import { useFindRolesService } from '@utils/findRolesService';
import { formatNumberWithLocalString } from '@utils/priceFormat';

import Header from './Header';
import OrderUpdateModal from './OrderModal';
import ViewAddressModal from './ViewAddressModal';
import useFilter from '../hooks/useFilter';
import useOrders from '../hooks/useOrders';
import { RolePermissionAccessData } from '../types/types';

const OrderContent = () => {
    const today = dayjs();
    const todayFormatted = today.format('YYYY-MM-DD');
    const oneMonthAgoFormatted = today.subtract(1, 'month').format('YYYY-MM-DD');
    const initialValues = {
        searchText: '',
        category: '',
        sort: 'DESC',
        page: 1,
        itemsPerPage: 10,
        from: oneMonthAgoFormatted,
        to: todayFormatted,
        id: '',
        sortField: '',
    };
    const [filters, setFilters] = useState(initialValues);
    const [openModal, setOpenModal] = useState(false);
    const [viewAddress, setViewAddress] = useState(false);
    const [modalData, setModalData] = useState();
    const [accessPermission, setAccessPermission] = useState<RolePermissionAccessData>();
    const { services } = useAppSelector(state => state.reducer.services) ?? {};
    const service = useFindRolesService(services?.data, 'Orders', 'Manage'); // Get the service
    useEffect(() => {
        if (service) {
            setAccessPermission(service); // Update state if service is found
        }
    }, [service]);
    const {
        handlePageChange,
        handleDateChange,
        handleFromChange,
        handleToChange,
        handleTableChange,
    } = useFilter({
        setFilters,
        initalStartDate: initialValues.from,
        initalEndDate: initialValues.to,
    });
    const { searchText, updateSearchText } = useDebounceSearch(setFilters);
    const { isLoading, tableData, count, getAllTableData, downloadReport } = useOrders(filters);
    const handleCloseModal = () => {
        setOpenModal(false);
        setViewAddress(false);
        setModalData(undefined);
    };
    const handleRefresh = () => {
        getAllTableData();
    };
    const handleEdit = (record: any) => {
        setModalData(record);
        setOpenModal(true);
    };
    const columns = [
        {
            title: 'Transaction Date',
            dataIndex: 'transactionDate',
            sorter: true,
            key: 'transactionDate',
            render: (createdAt: any) => (
                <Flex vertical>
                    <Typography.Text>{formattedDateOnly(new Date(createdAt))}</Typography.Text>
                    <Typography.Text>{formattedTime(new Date(createdAt))}</Typography.Text>
                </Flex>
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'orderResponse',
            key: 'orderResponse',
            render: (record: any) => <GetProducts orderResponse={record} />,
        },
        {
            title: 'Corporate Name',
            sorter: true,
            dataIndex: ['credential', 'name'],
            key: 'credential.name',
            render: (_: any, data: any) => data.credential.name || '-',
        },
        {
            title: 'Corporate ID',
            sorter: true,
            dataIndex: ['credential', 'username'],
            key: 'credential.username',
            render: (_: any, data: any) => data.credential.username || '-',
        },
        {
            title: 'Price',
            dataIndex: 'amountInINR',
            sorter: true,
            key: 'amountInINR',
            render: (data: any) => `₹ ${formatNumberWithLocalString(Number(data))}`,
        },
        {
            title: 'Current Status',
            dataIndex: 'ecomOrderStatus',
            sorter: true,
            key: 'ecomOrderStatus',
            render: (status: string) => generateOrderBtn(status),
        },
        {
            title: 'Payment Status',
            sorter: true,
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => generatePaymentStatusBtn(status),
        },
        {
            title: 'Edit',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) =>
                record?.ecomOrderStatus !== 'CANCELLED' ? (
                    <Tooltip
                        placement="top"
                        title={
                            !accessPermission?.update
                                ? 'Sorry, you do not have permission to perform this action'
                                : ''
                        }
                    >
                        <span>
                            {!accessPermission?.update ? (
                                <EditOutlined
                                    style={{ color: 'gray', cursor: 'not-allowed' }}
                                    disabled
                                />
                            ) : (
                                <EditOutlined onClick={() => handleEdit(record)} />
                            )}
                        </span>
                    </Tooltip>
                ) : (
                    ''
                ),
        },
        {
            title: 'View',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) => (
                <EyeOutlined
                    onClick={() => {
                        setModalData(record);
                        setViewAddress(true);
                    }}
                />
            ),
        },
    ];
    return (
        <Flex vertical gap={20}>
            <Header
                handleDownloadReport={downloadReport}
                handleSearch={updateSearchText}
                searchText={searchText}
                handleDateChange={handleDateChange}
                handleFromChange={handleFromChange}
                handleToChange={handleToChange}
                from={filters.from}
                to={filters.to}
            />
            <GenericTable
                rowKey={record => record.id}
                columns={columns}
                dataSource={tableData}
                pagination={false}
                loading={isLoading}
                // scroll={{ x: 992 }}
                onChange={handleTableChange}
            />
            <Pagination
                current={filters.page}
                size="default"
                className="text-end pt-7 justify-end"
                onChange={handlePageChange}
                total={count}
                showSizeChanger={false}
            />
            {openModal && (
                <OrderUpdateModal
                    data={modalData}
                    open={openModal}
                    handleCancel={handleCloseModal}
                    handleRefresh={handleRefresh}
                />
            )}
            {viewAddress && (
                <ViewAddressModal
                    handleCancel={handleCloseModal}
                    open={viewAddress}
                    data={modalData}
                />
            )}
        </Flex>
    );
};

export default OrderContent;
