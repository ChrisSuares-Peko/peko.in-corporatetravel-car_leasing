/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-const */
import React from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Badge, Divider, Flex, Modal, Result, Typography } from 'antd';
import Lottie from 'react-lottie';

import paymentSuccess from '@assets/animation/paymentSuccess2.json';
import ArrayDetailsCard from '@src/domains/dashboard/verificationSuite/components/ArrayDetailsCard';

import { InputConfigNew, verificationConfigNew } from '../../utils/verificationData';

type modalProps = {
    isOpen: boolean;
    handleCancel: () => void;
    data?: any;
    responseData?: any;
    // formValues?: any;
};
const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: paymentSuccess,
};

function getValueByPath(obj: any, path: string) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

const getNestedValue = (obj: any, path: any) => {
    const pathParts = path.split('.');
    return pathParts.reduce((acc: any, part: any) => {
        if (!acc) return undefined;

        // Handle array indices in path, e.g., 'address_list[0]'
        if (part.includes('[')) {
            const key = part.split('[')[0]; // Get the key before the array
            const index = parseInt(part.split('[')[1].replace(']', ''), 10); // Get the array index
            return acc[key] ? acc[key][index] : undefined;
        }
        return acc[part];
    }, obj);
};

const SuccessModal = ({ isOpen, handleCancel, data, responseData }: modalProps) => {
  

    const serviceKey = responseData?.orderResponse?.InputDetails?.Accesskey || data?.accessKey;

    const formatVerificationType = (type: string): string => {
        if (!type) return 'N/A';

        let formattedType = type.replace(/\bId\b/g, 'ID');

        if (formattedType === 'Aadhar Card' || formattedType === 'Aadhaar OCR') {
            formattedType = 'Aadhaar';
        }
        if (formattedType === 'Director Verify CIN') {
            formattedType = "Director's CIN";
        }
        if (formattedType === 'Director Verify DIN') {
            formattedType = "Director's DIN";
        }
        if (formattedType === 'GSTIN with PAN') {
            formattedType = 'Fetch GSTIN from PAN';
        }
        if (formattedType === 'Fetch GSTIN from PAN') {
            formattedType = 'GSTIN';
        }
        if (formattedType === 'Advance PAN') {
            formattedType = 'PAN';
        }

        return formattedType;
    };
    // for response data
    const currentConfig = verificationConfigNew[serviceKey];
    let dynamicGroupedDetails: { label: string; value: string }[][] = [];

    if (currentConfig) {
        const rawData = currentConfig.getData(data, responseData);
        const flatList = [
            // {
            //     label: 'Verification Date',
            //     value: formattedDateOnly(
            //         new Date(data?.datetime || responseData?.createdAt || new Date())
            //     ),
            // },
            ...currentConfig.fields.map(({ label, key }) => {
                let rawValue = getNestedValue(rawData, key);

                // Optional custom formatting for booleans
                if (key === 'valid' && typeof rawValue === 'boolean') {
                    rawValue = rawValue ? 'VALID' : 'INVALID';
                }

                return {
                    label,
                    value: rawValue ?? '-',
                };
            }),
        ];

        for (let i = 0; i < flatList.length; i += 2) {
            dynamicGroupedDetails.push(flatList.slice(i, i + 2));
        }
    }

    // for input data
    const currentInputConfig = InputConfigNew[serviceKey];

    let dynamicGroupedInputDetails: { label: string; value: string }[][] = [];

    if (currentInputConfig) {
        const rawData = currentInputConfig.getData(data, responseData);

        const flatList = [
            ...currentInputConfig.fields.map(({ label, key }) => ({
                label,
                value: getValueByPath(rawData, key) || '-',
            })),
        ];

        for (let i = 0; i < flatList.length; i += 2) {
            dynamicGroupedInputDetails.push(flatList.slice(i, i + 2));
        }
    }


    const validity = currentConfig?.getValidityStatus
        ? currentConfig.getValidityStatus(data, responseData)
        : 'INVALID'; // fallback if not provided

    const badgeColor = validity === 'VALID' ? '#16a34a' : '#dc2626';
    const badgeBg = validity === 'VALID' ? '#d1fae5' : '#fee2e2';
    const gstinList = responseData?.orderResponse?.Result?.gstin_list || data?.gstin_list || [];

    const capitalizeFirstLetter = (input: string | number): string | number => {
        if (typeof input === 'number') return input;

        // Don't modify if input contains any number
        if (/\d/.test(input)) return input;

        if (!input) return '';

        return input
            .toString() // Ensure the input is a string
            .replace(/_/g, ' ') // Replace underscores with spaces
            .toLowerCase() // Convert the entire string to lowercase
            .split(' ') // Split the string by spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
            .join(' '); // Join the words back with spaces
    };

    return (
        <Modal
            title=""
            open={isOpen}
            onCancel={handleCancel}
            closeIcon={<CloseOutlined />}
            centered
            width={650}
            footer={null}
            style={{ borderRadius: '25px', overflow: 'hidden' }}
        >
            <Flex vertical align="center" className="py-3">
                {validity === 'VALID' ? (
                    <>
                        <Result
                            className="md:w-3/6 p-0 -mt-3"
                            icon={<Lottie options={defaultOptions} height={100} />}
                            status="success"
                        />
                        <Typography.Text className="text-xl font-medium -mt-3">
                            {data?.serviceName ||
                                formatVerificationType(responseData?.VerificationType)}{' '}
                            is {capitalizeFirstLetter(validity)}.
                        </Typography.Text>
                    </>
                ) : (
                    <>
                        <Result
                            className="md:w-3/6 p-0 -mt-3"
                            // icon={<Lottie options={defaultOptions} height={100} />}
                            status="error"
                        />
                        <Typography.Text className="text-xl font-medium">
                            {data?.serviceName ||
                                formatVerificationType(responseData?.VerificationType)}{' '}
                            is {capitalizeFirstLetter(validity)}.
                        </Typography.Text>
                    </>
                )}

                {currentInputConfig && (
                    <>
                        {dynamicGroupedInputDetails.map((pair, index) => (
                            <Flex key={index} justify="space-between" className="w-full px-5 mt-5">
                                {pair.map((item, idx) => (
                                    <Flex vertical gap={7} key={idx}>
                                        <Typography.Text className="text-xs text-gray-500">
                                            {item.label}
                                        </Typography.Text>
                                        <Typography.Text className="font-medium w-96">
                                            {capitalizeFirstLetter(item.value)}
                                        </Typography.Text>
                                    </Flex>
                                ))}
                                {pair.length < 2 && <div style={{ width: '9rem' }} />}
                            </Flex>
                        ))}
                    </>
                )}

                <Flex className="w-full px-4 -mt-1">
                    <Divider />
                </Flex>

                {currentConfig && validity === 'VALID' && (
                    <>
                        {dynamicGroupedDetails.map((pair, index) => (
                            <Flex key={index} justify="space-between" className="w-full px-5 mt-5">
                                {pair.map((item: any, idx: any) => (
                                    <Flex vertical gap={7} key={idx}>
                                        <Typography.Text className="text-xs text-gray-500">
                                            {item.label}
                                        </Typography.Text>

                                        {/* Handling Aadhar OCR Verification */}
                                        {serviceKey === 'aadhar_ocr_verify' ? (
                                            <>
                                                {item.label === 'Ref.ID' ? (
                                                    <Typography.Text className="font-medium w-96">
                                                        {capitalizeFirstLetter(item.value)}
                                                    </Typography.Text>
                                                ) : (
                                                    <a
                                                        href={item.value}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        download
                                                        className="w-96 text-blue-800 "
                                                    >
                                                        Masked Aadhaar
                                                    </a>
                                                )}
                                            </>
                                        ) : item.label === 'Driving License Validity' ? (
                                            // Render Driving License Validity
                                            <>
                                                <Flex vertical>
                                                    <Typography.Text className="font-medium">
                                                        {' '}
                                                        {item.value?.non_transport?.from} to{' '}
                                                        {item.value?.non_transport?.to}{' '}
                                                        (Non-Transport)
                                                    </Typography.Text>
                                                </Flex>
                                                <Flex vertical>
                                                    {item.value?.transport?.from &&
                                                        item.value?.transport?.to && (
                                                            <Typography.Text className="font-medium">
                                                                {' '}
                                                                {
                                                                    item.value?.transport?.from
                                                                } to {item.value?.transport?.to}{' '}
                                                                (Transport)
                                                            </Typography.Text>
                                                        )}
                                                </Flex>
                                            </>
                                        ) : (
                                            // Default rendering for other fields
                                            <Typography.Text className="font-medium w-96">
                                                {capitalizeFirstLetter(item.value)}
                                            </Typography.Text>
                                        )}
                                    </Flex>
                                ))}
                                {pair.length < 2 && <div style={{ width: '9rem' }} />}
                            </Flex>
                        ))}

                        {/* ✅ Add this block for gstin_pan to render the gstin_list array */}
                        {serviceKey === 'gstin_pan' && gstinList?.length > 0 && (
                            <>
                                <Typography.Text className="text-xs text-gray-500 px-5 mt-5">
                                    Linked GSTINs
                                </Typography.Text>

                                {gstinList.map((gst: any, index: number) => (
                                    <Flex
                                        key={index}
                                        vertical
                                        className="w-full px-5 py-3 mt-3 border rounded-lg"
                                        style={{
                                            borderColor: '#e5e7eb',
                                            backgroundColor: '#f9fafb',
                                        }}
                                        gap={10}
                                    >
                                        <Flex justify="space-between">
                                            <Typography.Text className="text-xs text-gray-500">
                                                GSTIN
                                            </Typography.Text>
                                            <Typography.Text className="font-medium">
                                                {capitalizeFirstLetter(gst.gstin)}
                                            </Typography.Text>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Typography.Text className="text-xs text-gray-500">
                                                State
                                            </Typography.Text>
                                            <Typography.Text className="font-medium">
                                                {capitalizeFirstLetter(gst.state)}
                                            </Typography.Text>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Typography.Text className="text-xs text-gray-500">
                                                Status
                                            </Typography.Text>
                                            <Typography.Text className="font-medium">
                                                {capitalizeFirstLetter(gst.status)}
                                            </Typography.Text>
                                        </Flex>
                                    </Flex>
                                ))}
                            </>
                        )}

                        {[
                            'director_verify_cin',
                            'corporate_verify',
                            'director_verify_din',
                        ].includes(serviceKey) && (
                            <ArrayDetailsCard
                                data={responseData?.orderResponse?.Result}
                                serviceKey={serviceKey}
                            />
                        )}
                    </>
                )}

                <Flex vertical className="w-full px-5 mt-3" gap={8}>
                    <Typography.Text className="text-xs text-gray-500">Status</Typography.Text>
                    <Badge
                        status={validity === 'VALID' ? 'success' : 'error'}
                        text={capitalizeFirstLetter(validity)}
                        className="px-2 rounded-2xl"
                        style={{
                            color: badgeColor,
                            backgroundColor: badgeBg,
                            padding: '1px 9px',
                            borderRadius: '15px',
                        }}
                    />
                </Flex>
            </Flex>
        </Modal>
    );
};

export default SuccessModal;
