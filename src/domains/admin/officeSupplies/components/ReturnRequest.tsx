import React, { useEffect, useState } from 'react';

import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Flex, Pagination, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { toUpper } from 'lodash';

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

import Header from './Header';
import ReturnModal from './ReturnModal';
import ViewAddressModal from './ViewAddressModal';
import useFilter from '../hooks/useFilter';
import useReturnRequest from '../hooks/useReturnRequest';
import { RolePermissionAccessData } from '../types/types';

const ReturnRequests = () => {
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
    const [productDetails, setProductDetails] = useState();
    const [accessPermission, setAccessPermission] = useState<RolePermissionAccessData>();
    const { services } = useAppSelector(state => state.reducer.services) ?? {};
    const service = useFindRolesService(services?.data, 'Return Request'); // Get the service
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
    const { isLoading, tableData, count, getAllTableData, downloadReport } =
        useReturnRequest(filters);
    const handleCloseModal = () => {
        setOpenModal(false);
        setViewAddress(false);
        setModalData(undefined);
        setProductDetails(undefined);
    };
    const handleRefresh = () => {
        getAllTableData();
    };
    const handleEdit = (record: any, product: any) => {
        setModalData(record);
        setProductDetails(product);
        setOpenModal(true);
    };
    const columns = [
        {
            title: 'Transaction Date',
            sorter: true,
            dataIndex: 'transactionDate',
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
            render: (_: any, data: any) => data.credential.name,
        },
        {
            title: 'Corporate ID',
            sorter: true,
            dataIndex: ['credential', 'username'],
            key: 'credential.name',
            render: (_: any, data: any) => data.credential.username,
        },
        // {
        //     title: 'Price',
        //     dataIndex: 'amountInAed',
        //     key: 'amountInAed',
        //     render: (data: any) => (
        //         <Typography.Text>AED {formatNumberWithLocalString(Number(data))}</Typography.Text>
        //     ),
        // },

        {
            title: 'Current Status',
            dataIndex: 'orderResponse',
            key: 'orderResponse',
            render: (record: any) => {
                const orderData = JSON.parse(record);
                const orderstatus = toUpper(orderData.products[0].status);
                return generateOrderBtn(orderstatus);
            },
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
            render: (_: any, record: any) => {
                const orderData = JSON.parse(record.orderResponse);
                const { products } = orderData;
                return (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {products.map((product: any, index: number) => (
                            <div key={index}>
                                <Flex justify="start">
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
                                                <EditOutlined
                                                    onClick={() => handleEdit(record, product)}
                                                    style={{ marginRight: '8px' }}
                                                />
                                            )}
                                        </span>
                                    </Tooltip>
                                </Flex>
                            </div>
                        ))}
                    </div>
                );
            },
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
        <>
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
                    // scroll={{ x: 800 }}
                    onChange={handleTableChange}
                />
                <Pagination
                    current={filters.page}
                    size="default"
                    className="text-end pt-7"
                    onChange={handlePageChange}
                    total={count}
                    showSizeChanger={false}
                />
            </Flex>
            {openModal && (
                <ReturnModal
                    data={modalData}
                    product={productDetails}
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
        </>
    );
};

export default ReturnRequests;
