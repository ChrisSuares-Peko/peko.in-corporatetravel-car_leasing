import React from 'react';

import { Badge, Col, Flex, List, Result, Row, Typography } from 'antd';
import Lottie from 'react-lottie';

import paymentSuccess from '@assets/animation/paymentSuccess2.json';
import { useAppSelector } from '@src/hooks/store';
import { formattedDateOnly } from '@utils/dateFormat';

import ArrayDetailsCard from '../components/ArrayDetailsCard';
import { verificationConfigs, InputConfigs } from '../utils/data';

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

const Details = () => {
    const { verificationResponse: responseData } = useAppSelector(
        state => state.reducer.verificationSuite
    );
    const serviceKey = responseData?.orderResponse?.InputDetails?.Accesskey;

    const getBase64Image = (base64String: string) => {
        if (base64String.startsWith('data:image')) {
            return base64String; // Already has the correct prefix
        }
        return `data:image/jpeg;base64,${base64String}`; // Prepend prefix if missing (assuming JPEG)
    };



    // for response data
    const currentConfig = verificationConfigs[serviceKey];
    const dynamicGroupedDetails: { label: string; value: string }[][] = [];

    if (currentConfig) {
        const rawData = currentConfig.getData(responseData);
        const flatList = [
            {
                label: 'Verification Date',
                value: formattedDateOnly(new Date(responseData?.createdAt || new Date())),
            },
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
    const currentInputConfig = InputConfigs[serviceKey];
    const dynamicGroupedInputDetails: { label: string; value: string }[][] = [];

    if (currentInputConfig) {
        const rawData = currentInputConfig.getData(responseData);
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
        ? currentConfig.getValidityStatus(responseData)
        : 'INVALID'; // fallback if not provided

    const badgeColor = validity === 'VALID' ? '#16a34a' : '#dc2626';
    const badgeBg = validity === 'VALID' ? '#d1fae5' : '#fee2e2';
    const gstinList = responseData?.orderResponse?.Result?.gstin_list || [];

    const capitalizeFirstLetter = (input: string | number): string | number => {
        if (typeof input === 'number') return input;
        if (!input || input.trim() === '') return 'N/A';

        const lowercaseWords = ['is', 'or', 'and', 'of', 'the', 'in', 'on'];

        // Special case override
        const normalizedInput = input.replace(/_+/g, ' ').trim().toLowerCase();
        if (normalizedInput === 'account is valid') return 'Account is valid';

        return input
            .replace(/_+/g, ' ') // replace underscores with space
            .replace(/,+/g, ',') // collapse multiple commas
            .replace(/,\s*/g, ', ') // ensure one space after commas
            .replace(/\s+/g, ' ') // normalize spaces
            .trim()
            .split(/([\s,-]+)/) // keep separators
            .map((part, index) => {
                if (/\d/.test(part)) return part;
                const lower = part.trim().toLowerCase();
                if (lowercaseWords.includes(lower)) return lower;
                return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
            })
            .join('');
    };

    const formatVerificationType = (type: string): string => {
        if (!type) return 'N/A';

        let formattedType = type.replace(/\bId\b/g, 'ID');

        if (formattedType === 'Aadhar Card') {
            formattedType = 'Aadhaar OKYC';
        }
        if (formattedType === 'Director Verify CIN') {
            formattedType = 'Director Details from CIN';
        }
        if (formattedType === 'Director Verify DIN') {
            formattedType = 'Director Details from DIN';
        }
        if (formattedType === 'GSTIN with PAN') {
            formattedType = 'Fetch GSTIN from PAN';
        }
        if (formattedType === 'Advance PAN Verification') {
            formattedType = 'Advance PAN';
        }

        return formattedType;
    };
    const formattedType = formatVerificationType(responseData?.VerificationType);
    const shouldShowValidity = !['Director Details from CIN', 'Director Details from DIN'].includes(
        formattedType
    );

    return (
        <Row>
            <Col span={24} className="border rounded-2xl p-5">
                <Flex vertical>
                    {validity === 'VALID' ? (
                        <Flex vertical gap={5}>
                            <Flex>
                                <Result
                                    className=" p-0 -mt-3"
                                    icon={<Lottie options={defaultOptions} height={70} />}
                                    status="success"
                                />
                                {serviceKey === 'gstin_pan' ? (
                                    <Typography.Text className="text-xl font-medium mt-2">
                                        GSTINs Fetched Successfully
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text className="text-xl font-medium mt-2">
                                        {formattedType}
                                        {shouldShowValidity &&
                                            ` is ${capitalizeFirstLetter(validity)}`}
                                    </Typography.Text>
                                )}
                            </Flex>
                            {(responseData?.orderResponse?.Result?.reference_id ||
                                responseData?.orderResponse?.Result?.ref_id) && (
                                <Flex className="w-full mt-1 xs:justify-start justify-between md:justify-start">
                                    <Typography.Text className="text-gray-600 md:w-1/4">
                                        {formatVerificationType(responseData?.VerificationType)} Ref
                                        ID:
                                    </Typography.Text>
                                    <Typography.Text className="text-gray-600 font-medium xs:ml-2 sm:ml-0 md:ml-5">
                                        {responseData?.orderResponse?.Result?.reference_id ||
                                            responseData?.orderResponse?.Result?.ref_id}
                                    </Typography.Text>
                                </Flex>
                            )}

                            <Flex className="w-full mt-2 xs:justify-start justify-between md:justify-start">
                                <Typography.Text className="text-gray-600 sm:w-1/4">
                                    {formatVerificationType(responseData?.VerificationType)} status:
                                </Typography.Text>
                                <Badge
                                    status={validity === 'VALID' ? 'success' : 'error'}
                                    text={capitalizeFirstLetter(validity)}
                                    className="px-2 rounded-2xl xs:ml-2 sm:ml-0 md:ml-5"
                                    style={{
                                        color: badgeColor,
                                        backgroundColor: badgeBg,
                                        padding: '1px 9px',
                                        borderRadius: '15px',
                                    }}
                                />
                            </Flex>
                            <Flex className="w-1/3 mt-2" align="start" gap={8}>
                                <Typography.Text className="text-gray-600 min-w-[80px]">
                                    Message:
                                </Typography.Text>
                                {serviceKey === 'gstin_pan' ? (
                                    <Typography.Text className="text-gray-600 font-medium">
                                        GSTINs Fetched Successfully
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text className="text-gray-600 font-medium">
                                        {responseData?.orderResponse?.Result.message ||
                                            `${formatVerificationType(responseData?.VerificationType)} verified successfully`}
                                    </Typography.Text>
                                )}
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex vertical gap={5}>
                            <Flex gap={10}>
                                <Result
                                    className="p-0 "
                                    // icon={<Lottie height={60} />}
                                    status="error"
                                />
                                {serviceKey === 'gstin_pan' ? (
                                    <Typography.Text className="text-xl font-medium mt-6">
                                        GSTINs not found
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text className="text-xl font-medium mt-6">
                                        {formattedType}
                                        {shouldShowValidity &&
                                            ` is ${capitalizeFirstLetter(validity)}`}
                                    </Typography.Text>
                                )}
                            </Flex>
                            <Flex className="w-full mt-3 xs:justify-start justify-between md:justify-start">
                                <Typography.Text className="text-gray-600 w-1/4">
                                    {formatVerificationType(responseData?.VerificationType)} Ref ID:
                                </Typography.Text>
                                <Typography.Text className="text-gray-600 font-medium xs:ml-2 sm:ml-0 md:ml-5 ">
                                    {responseData?.orderResponse?.Result.reference_id}
                                </Typography.Text>
                            </Flex>
                            <Flex className="w-full mt-2 xs:justify-start justify-between md:justify-start">
                                <Typography.Text className="text-gray-600 w-1/4">
                                    {formatVerificationType(responseData?.VerificationType)} status:
                                </Typography.Text>
                                <Badge
                                    status={validity === 'VALID' ? 'success' : 'error'}
                                    text={capitalizeFirstLetter(validity)}
                                    className="px-2 rounded-2xl xs:ml-2 sm:ml-0 md:ml-5"
                                    style={{
                                        color: badgeColor,
                                        backgroundColor: badgeBg,
                                        padding: '1px 9px',
                                        borderRadius: '15px',
                                    }}
                                />
                            </Flex>
                            <Flex className="w-full  mt-2 xs:justify-start justify-between md:justify-start">
                                <Typography.Text className="text-gray-600 w-1/4">
                                    Message
                                </Typography.Text>
                                {serviceKey === 'gstin_pan' ? (
                                    <Typography.Text className="text-gray-600 font-medium xs:ml-2 sm:ml-0 md:ml-5">
                                        GSTINs not found
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text className="text-gray-600 font-medium xs:ml-2 sm:ml-0 md:ml-5">
                                        {responseData?.orderResponse?.Result.message ||
                                            ` ${formatVerificationType(responseData?.VerificationType)} not exists`}
                                    </Typography.Text>
                                )}
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </Col>
            <Col span={24} className="border rounded-2xl p-5 mt-5">
                {currentInputConfig && (
                    <>
                        <Typography.Text className="font-medium">Details Provided</Typography.Text>
                        <List
                            className="mt-3"
                            dataSource={dynamicGroupedInputDetails.flat()}
                            renderItem={(item, index) => (
                                <Row
                                    className={`py-4 px-6 ${index % 2 === 0 ? 'bg-listBg' : 'bg-white'} ${index === dynamicGroupedInputDetails.flat().length - 1 ? '' : 'border-none'}`}
                                    key={index}
                                >
                                    <Col span={24}>
                                        <Flex className="flex flex-col sm:flex-row">
                                            <div className="w-full sm:w-1/4">
                                                <Typography.Text className="text-gray-600 ">
                                                    {item.label}
                                                </Typography.Text>
                                            </div>
                                            <Flex
                                                gap={20}
                                                align="center"
                                                className="justify-between md:justify-start xs:ml-0 md:ml-5"
                                            >
                                                <Typography.Text className="text-gray-600 font-medium ">
                                                    {capitalizeFirstLetter(item.value)}
                                                </Typography.Text>
                                            </Flex>
                                        </Flex>
                                    </Col>
                                </Row>
                            )}
                        />
                    </>
                )}

                <Flex className="w-full gap-3" vertical>
                    <Typography.Text className="font-medium pt-5">
                        Verification Details
                    </Typography.Text>

                    <Row gutter={24}>
                        {dynamicGroupedDetails.flat().length > 7 ? (
                            <>
                                <Col xs={24} md={12}>
                                    <List
                                        className="mt-3"
                                        dataSource={dynamicGroupedDetails
                                            .flat()
                                            .slice(
                                                0,
                                                Math.ceil(dynamicGroupedDetails.flat().length / 2)
                                            )}
                                        renderItem={(item, index) =>  (
                                                <Row
                                                    className={`py-4 px-6 ${index % 2 === 0 ? 'bg-listBg' : 'bg-white'} border-none`}
                                                    key={index}
                                                >
                                                    <Col span={24}>
                                                        <Flex className="flex flex-col sm:flex-row">
                                                            <div className="w-full sm:w-3/6  ">
                                                                <Typography.Text className="text-gray-600">
                                                                    {item.label}
                                                                </Typography.Text>
                                                            </div>
                                                            <Flex
                                                                gap={20}
                                                                align="center"
                                                                className="justify-between md:justify-start w-64"
                                                            >
                                                                <Typography.Text className="text-gray-600 font-medium xs:ml-0 xl:ml-10  ">
                                                                    {item.label === 'Image Link' ? (
                                                                        <a
                                                                            href={getBase64Image(
                                                                                item.value
                                                                            )} // The base64 string as the href
                                                                            download={`${formatVerificationType(responseData?.VerificationType)}_Photo.jpeg`} // Download with a dynamic file name
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            {`${formatVerificationType(responseData?.VerificationType)} Photo`}
                                                                        </a>
                                                                    ) : (
                                                                        capitalizeFirstLetter(
                                                                            item.value
                                                                        )
                                                                    )}
                                                                </Typography.Text>
                                                            </Flex>
                                                        </Flex>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    />
                                </Col>

                                <Col xs={24} md={12}>
                                    <List
                                        className="mt-3"
                                        dataSource={dynamicGroupedDetails
                                            .flat()
                                            .slice(
                                                Math.ceil(dynamicGroupedDetails.flat().length / 2)
                                            )}
                                        renderItem={(item, index) => (
                                            <Row
                                                className={`py-4 px-6 ${index % 2 === 0 ? 'bg-listBg' : 'bg-white'} border-none`}
                                                key={index}
                                            >
                                                <Col span={24}>
                                                    <Flex className="flex flex-col sm:flex-row">
                                                        <div className="w-full sm:w-3/6">
                                                            <Typography.Text className="text-gray-600">
                                                                {item.label}
                                                            </Typography.Text>
                                                        </div>
                                                        <Flex
                                                            gap={20}
                                                            align="center"
                                                            className="justify-between md:justify-start w-64"
                                                        >
                                                            <Typography.Text className="text-gray-600 font-medium xs:ml-0 xl:ml-10">
                                                                {item.label === 'Image Link' ? (
                                                                    <a
                                                                        href={getBase64Image(
                                                                            item.value
                                                                        )} // The base64 string as the href
                                                                        download={`${formatVerificationType(responseData?.VerificationType)}_Photo.jpeg`} // Download with a dynamic file name
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {`${formatVerificationType(responseData?.VerificationType)} Photo`}
                                                                    </a>
                                                                ) : (
                                                                    capitalizeFirstLetter(
                                                                        item.value
                                                                    )
                                                                )}
                                                            </Typography.Text>
                                                        </Flex>
                                                    </Flex>
                                                </Col>
                                            </Row>
                                        )}
                                    />
                                </Col>
                            </>
                        ) : (
                            <Col span={24}>
                                <List
                                    className="mt-3"
                                    dataSource={dynamicGroupedDetails.flat()}
                                    renderItem={(item, index) => (
                                        <Row
                                            className={`py-4 px-6 ${index % 2 === 0 ? 'bg-listBg' : 'bg-white'} border-none`}
                                            key={index}
                                        >
                                            <Col span={24}>
                                                <Flex className="flex flex-col sm:flex-row">
                                                    <div className="w-full sm:w-1/4">
                                                        <Typography.Text className="text-gray-600 ">
                                                            {item.label}
                                                        </Typography.Text>
                                                    </div>
                                                    <Flex
                                                        gap={20}
                                                        align="center"
                                                        className="justify-between md:justify-start"
                                                    >
                                                        <Typography.Text className="text-gray-600 font-medium  xs:ml-0 md:ml-5 ">
                                                            {item.label === 'Image Link' ? (
                                                                <a
                                                                    href={getBase64Image(
                                                                        item.value
                                                                    )} // The base64 string as the href
                                                                    download={`${formatVerificationType(responseData?.VerificationType)}_Photo.jpeg`} // Download with a dynamic file name
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {`${formatVerificationType(responseData?.VerificationType)} Photo`}
                                                                </a>
                                                            ) : (
                                                                capitalizeFirstLetter(item.value)
                                                            )}
                                                        </Typography.Text>
                                                    </Flex>
                                                </Flex>
                                            </Col>
                                        </Row>
                                    )}
                                />
                            </Col>
                        )}
                    </Row>
                </Flex>
            </Col>
            <Col span={24} className="mt-5">
                {serviceKey === 'gstin_pan' && gstinList?.length > 0 && (
                    <>
                        <Typography.Text className=" text-gray-500 mt-5">
                            Linked GSTINs
                        </Typography.Text>

                        <Row gutter={[20, 20]}>
                            {gstinList.map((gst: any, index: number) => (
                                //    <Flex
                                //        key={index}
                                //        vertical
                                //        className="w-full px-5 py-3 mt-3 border rounded-lg"
                                //        style={{
                                //            borderColor: '#e5e7eb',
                                //            backgroundColor: '#f9fafb',
                                //        }}
                                //        gap={10}
                                //    >

                                <Col span={12}>
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
                                </Col>

                                //    </Flex>
                            ))}
                        </Row>
                    </>
                )}

                {[
                    'director_verify_cin',
                    'corporate_verify',
                    'director_verify_din',
                    'gst_return_check',
                ].includes(serviceKey) && (
                    <Row>
                      
                            <ArrayDetailsCard
                                data={responseData?.orderResponse?.Result}
                                serviceKey={serviceKey}
                            />
                
                    </Row>
                )}
            </Col>
        </Row>
    );
};

export default Details;
