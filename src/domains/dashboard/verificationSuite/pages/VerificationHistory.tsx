/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { Badge, Flex, Pagination, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import GenericTable from '@components/atomic/GenericTable';
import useDebounceSearch from '@src/hooks/useDebounceSearch';
import { paths } from '@src/routes/paths';
import { formattedDateOnly, formattedTime } from '@utils/dateFormat';

import HistoryHeader from '../components/HistoryHeader';
import SuccessModal from '../components/SuccessModal';
import useFilter from '../hooks/useFilter';
import useHistoryApi from '../hooks/useHistoryApi';
import { setverificationResponse } from '../slices/verificationSlice';

const VerificationHistory = () => {
   
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const cancelModal = () => {
        setIsOpen(false);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    // Handling cases where last month has fewer days
    if (lastMonth.getDate() !== today.getDate()) {
        lastMonth.setDate(0);
    }
    const initialValues = {
        page: 1,
        itemsPerPage: 10,
        filter: '',
        status: 'ALL',
        // module: 'all',
        searchText: '',
        from: lastMonth.toISOString().split('T')[0],
        to: today.toISOString().split('T')[0],
    };
    const [filters, setFilters] = useState(initialValues);
    const [price, setPrice] = useState({});
    const { searchText, updateSearchText } = useDebounceSearch(setFilters);
    const { isLoading, count, history, downloadReport } = useHistoryApi(filters);

    const {
        handlePageChange,
        handleDateChange,
        handleFromChange,
        handleToChange,
        handleChangeFilters,
    } = useFilter({
        setFilters,
        initalStartDate: filters.from,
        initalEndDate: filters.to,
    });

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
        if (formattedType === 'Director Verify DIN') {
            formattedType = "Director's DIN";
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

    const getResultStatus = (orderResponse: any) => {
        if (
            orderResponse?.Result?.status === 'VALID' ||
            orderResponse?.Result?.status === 'SUCCESS' ||
            orderResponse?.Result?.status === true ||
            orderResponse?.Result?.account_status === 'VALID' ||
            orderResponse?.Result?.response?.[0]?.responseStatus === 'SUCCESS' ||
            orderResponse?.Result?.valid === true
        ) {
            return 'VALID';
        }
        return 'INVALID';
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
            title: 'Verification Type',
            dataIndex: 'VerificationType',
            key: 'VerificationType',
            render: (type: string) => (
                <Flex>
                    <Typography.Text>{formatVerificationType(type)}</Typography.Text>
                </Flex>
            ),
        },
        {
            title: 'Transaction ID',
            dataIndex: 'corporateTxnId',
            key: 'corporateTxnId',
            render: (id: string) => <Typography.Text>{id}</Typography.Text>,
        },
        {
            title: 'Input Details',
            dataIndex: 'orderResponse',
            key: 'orderResponse',
            // width: '30%',
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
            dataIndex: 'amountInINR',
            key: 'amountInINR',
            render: (creditAmount: any) => {
                const amount = parseFloat(creditAmount);
                return (
                    <Typography.Text>
                        {isNaN(amount) ? 'N/A' : `₹ ${amount.toFixed(2)}`}
                    </Typography.Text>
                );
            },
        },

        {
            title: 'Result',
            dataIndex: 'orderResponse',
            key: 'orderResponse',
            render: (orderResponse: any, record: any) => {
                const status =
                    orderResponse?.Result?.status === 'VALID' ||
                    orderResponse?.Result?.status === true ||
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
                            className="flex items-center gap-1"
                        >
                            <div
                                className="px-2 rounded-2xl"
                                style={{
                                    color: findColorByStatus(status).text,
                                    backgroundColor: findColorByStatus(status).background,
                                    padding: '1px 9px',
                                    border: '1px solid transparent',
                                    borderRadius: '15px',
                                    lineHeight: '1.2',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                }}
                            >
                                {status?.charAt(0) + status?.slice(1).toLowerCase()}
                            </div>
                        </Badge>
                    </Flex>
                );
            },
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) => {
                const status = getResultStatus(record.orderResponse);
                const isDisabled = status !== 'VALID';

                return (
                    <Flex>
                        <Typography.Text
                            className={
                                isDisabled
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-bgOrange2 cursor-pointer'
                            }
                            onClick={() => {
                                if (isDisabled) return;
                                dispatch(setverificationResponse(record));
                                navigate(paths.verificationSuite.verificationDetails);
                                setPrice(record);
                            }}
                        >
                            View
                        </Typography.Text>
                    </Flex>
                );
            },
        },
    ];
    return (
        <Flex vertical>
            <HistoryHeader
                handleSearch={updateSearchText}
                searchText={searchText}
                handleDateChange={handleDateChange}
                from={filters.from}
                to={filters.to}
                handleFromChange={handleFromChange}
                handleToChange={handleToChange}
                handleChangeFilters={handleChangeFilters}
                handleDownloadReport={downloadReport}
            />
            <GenericTable
                rowKey={record => record.corporateTxnId}
                className="w-full"
                bordered={false}
                columns={columns}
                dataSource={history}
                pagination={false}
                scroll={{ x: 992 }}
                loading={isLoading}
            />
            <Pagination
                current={filters.page}
                onChange={handlePageChange}
                size="default"
                className="text-end pt-7"
                style={{ display: 'block' }}
                total={count}
                showSizeChanger={false}
            />
            {isOpen && (
                <SuccessModal isOpen={isOpen} handleCancel={cancelModal} responseData={price} />
            )}
        </Flex>
    );
};

export default VerificationHistory;
