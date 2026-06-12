import React, { useState } from 'react';

import { Badge, Flex, Pagination, Typography } from 'antd';
import dayjs from 'dayjs';

import GenericTable from '@components/atomic/GenericTable';
import useDebounceSearch from '@src/hooks/useDebounceSearch';
import { formattedDateOnly, formattedTime } from '@utils/dateFormat';

import Header from './Header';
import SuccessModal from './SuccessModal';
import useFilter from '../../hooks/useFilter';
import useHistoryApi from '../../hooks/useVerificationHistory';

export type DropDown = {
    value: number | string;
    label: string;
}[];

const Verification = () => {
    const today = dayjs();
    const todayFormatted = today.format('YYYY-MM-DD');
    const initialValues = {
        searchText: '',
        category: '',
        sort: 'DESC',
        sortField: '',
        page: 1,
        status: 'ALL',
        itemsPerPage: 10,
        from: todayFormatted,
        to: todayFormatted,
        id: '',
    };
    const [filters, setFilters] = useState(initialValues);
    const {
        handlePageChange,
        handleDateChange,
        handleFromChange,
        handleToChange,
        handleTableChange,
        handleCategoryFilters,
    } = useFilter({
        setFilters,
        initalStartDate: initialValues.from,
        initalEndDate: initialValues.to,
    });
    const [price, setPrice] = useState({});
    const { searchText, updateSearchText } = useDebounceSearch(setFilters);
    const { isLoading, count, downloadReport, history } = useHistoryApi(filters);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const cancelModal = () => {
        setIsOpen(false);
    };

    const statusStyles = {
        VALID: {
            text: '#16a34a',
            background: '#d1fae5',
        },
        INVALID: {
            text: '#d97b7b',
            background: '#ffc2c2',
        },
    };
    function findColorByStatus(status: string) {
        let value = statusStyles.VALID;
        if (status === 'VALID' || status === 'INVALID') {
            value = statusStyles[status];
        }
        return value;
    }
    const formatVerificationType = (type: string): string => {
        if (!type || type.trim() === '') return 'N/A';
        let formattedType = type
            .replace(/Aadhar/gi, 'Aadhaar') // Replace any casing of 'Adhar' with 'Aadhaar'
            .replace(/\bId\b/g, 'ID');
        if (formattedType === 'Director Verify CIN') {
            formattedType = "Director's CIN";
        }
        if (formattedType === 'GSTIN with PAN') {
            formattedType = 'Fetch GSTIN from PAN';
        }
        if (formattedType === 'Aadhaar Card') {
            formattedType = 'Aadhaar OKYC';
        }
        if (formattedType === 'Advance PAN Verification') {
            formattedType = 'Advance PAN';
        }

        return formattedType;
    };

    const knownAcronyms = ['PAN', 'CIN', 'DIN', 'DL', 'IFSC', 'GST', 'KYC'];

    function formatServiceField(text: any) {
        if (!text || typeof text !== 'string') return '';

        const upperText = text.toUpperCase();

        // Check if it's GSTIN or a known acronym
        if (upperText === 'GSTIN' || knownAcronyms.includes(upperText)) {
            return upperText;
        }

        // Special case: EPIC Number
        const normalized = text.trim().toLowerCase();
        if (normalized === 'epic_number') return 'EPIC Number';

        return text
            .replace(/_/g, ' ') // Replace underscores with spaces
            .toLowerCase() // Convert to lowercase
            .replace(/\b\w/g, (char: string) => char.toUpperCase()); // Capitalize each word
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            render: (transactionDate: any) => (
                <Flex vertical>
                    <Typography.Text>
                        {formattedDateOnly(new Date(transactionDate))}
                    </Typography.Text>
                    <Typography.Text>{formattedTime(new Date(transactionDate))}</Typography.Text>
                </Flex>
            ),
        },
        {
            title: 'Transaction ID',
            sorter: true,
            dataIndex: 'corporateTxnId',
            key: 'corporateTxnId',
            render: (id: string) => <Typography.Text>{id}</Typography.Text>,
        },
        {
            title: 'Corporate ID',
            sorter: false,
            dataIndex: ['credential', 'username'],
            render: (data: any, record: any) => (
                <Typography.Text>{record?.credential?.username || 'N/A'}</Typography.Text>
            ),
        },
        {
            sorter: false,
            title: 'Corporate Name',
            dataIndex: ['credential', 'name'],
            render: (data: any, record: any) => (
                <Typography.Text>{record?.credential?.name || 'N/A'}</Typography.Text>
            ),
        },
        {
            sorter: false,

            title: 'Partner Name',
            dataIndex: ['credential', 'registeredByCredential'],
            render: (data: any, record: any) => (
                <Typography.Text>
                    {record?.credential?.registeredByCredential || '-'}
                </Typography.Text>
            ),
        },

        {
            title: 'Verification Type',
            sorter: true,
            dataIndex: 'VerificationType',
            key: 'VerificationType',
            render: (type: string) => (
                <Flex>
                    <Typography.Text>{formatVerificationType(type)}</Typography.Text>
                </Flex>
            ),
        },

        {
            title: 'Input Details',
            dataIndex: 'orderResponse',
            key: 'orderResponse',

            render: (orderResponse: any) => {
                if (!orderResponse || orderResponse === '') {
                    return <Typography.Text>N/A</Typography.Text>;
                }
                const inputDetails = orderResponse?.InputDetails || {};
                const result = orderResponse?.Result || {};
                let filteredInputDetails;
                if (orderResponse?.InputDetails?.Accesskey === 'aadhar_ocr_verify') {
                    filteredInputDetails = Object.entries(result).filter(
                        ([key]) =>
                            key.toLowerCase() !== 'reference_id' &&
                            key.toLowerCase() !== 'status' &&
                            key.toLowerCase() !== 'verification_id'
                    );
                } else {
                    filteredInputDetails = Object.entries(inputDetails).filter(
                        ([key]) =>
                            key.toLowerCase() !== 'accesskey' &&
                            key.toLowerCase() !== 'verificationtype'
                    );
                }

                const formatKey = (key: string) => {
                    if (key.toLowerCase() === 'dob') {
                        return 'DOB';
                    }
                    if (key === 'dl_number') {
                        return 'DL Number';
                    }

                    return formatServiceField(key === 'phone' ? 'Mobile Number' : key); // Default formatting
                };

                return (
                    <Flex vertical gap={4} className="w-96">
                        {filteredInputDetails.map(([key, value]) =>
                            value ? (
                                <Typography.Text key={key}>
                                    {formatKey(key)}: {String(value)}
                                </Typography.Text>
                            ) : null
                        )}
                    </Flex>
                );
            },
        },

        {
            title: 'Amount',
            sorter: true,
            dataIndex: 'amountInINR',
            key: 'amountInINR',
            render: (creditAmount: string) => (
                <Typography.Text>₹ {parseFloat(creditAmount).toFixed(2)}</Typography.Text>
            ),
        },

        {
            title: 'Result',
            dataIndex: 'orderResponse',
            key: 'orderResponse',
            render: (orderResponse: any, record: any) => {
                const status =
                    orderResponse?.Result?.status === 'VALID' ||
                    orderResponse?.Result?.status === 'SUCCESS' ||
                    orderResponse?.Result?.account_status === 'VALID' ||
                    orderResponse?.Result?.response?.[0]?.responseStatus === 'SUCCESS' ||
                    orderResponse?.Result?.valid === true
                        ? 'VALID'
                        : 'INVALID';
                return (
                    <Flex>
                        {/* <Typography.Text
                                                              className="px-5 py-1 text-sm rounded-xl text-nowrap"
                                                              style={{
                                                                  color: findColorByStatus(status).text,
                                                                  background: findColorByStatus(status).background,
                                                                  borderColor: findColorByStatus(status).border,
                                                              }}
                                                          >
                                                              {status}
                                                          </Typography.Text> */}
                        <Badge
                            status={status === 'VALID' ? 'success' : 'error'}
                            // eslint-disable-next-line no-unsafe-optional-chaining
                            text={status?.charAt(0) + status?.slice(1).toLowerCase()}
                            className="px-2 rounded-2xl"
                            style={{
                                color: findColorByStatus(status).text,
                                backgroundColor: findColorByStatus(status).background,
                                padding: '1px 9px',
                                border: '1px ',
                                borderRadius: '15px',
                            }}
                        />
                    </Flex>
                );
            },
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) => (
                <Flex>
                    <Typography.Text
                        className="text-bgOrange2 cursor-pointer"
                        onClick={() => {
                            setIsOpen(true);
                            setPrice(record);
                        }}
                    >
                        View
                    </Typography.Text>
                </Flex>
            ),
        },
    ];

    return (
        <Flex vertical gap={20}>
            <Header
                handleDownloadReport={downloadReport}
                from={filters.from}
                to={filters.to}
                handleDateChange={handleDateChange}
                handleFromChange={handleFromChange}
                handleToChange={handleToChange}
                handleSearch={updateSearchText}
                searchText={searchText}
                handleChangeFilters={handleCategoryFilters}
            />
            <GenericTable
                rowKey={record => record.id}
                columns={columns}
                dataSource={history}
                pagination={false}
                loading={isLoading}
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
            {isOpen && (
                <SuccessModal isOpen={isOpen} handleCancel={cancelModal} responseData={price} />
            )}
        </Flex>
    );
};

export default Verification;
