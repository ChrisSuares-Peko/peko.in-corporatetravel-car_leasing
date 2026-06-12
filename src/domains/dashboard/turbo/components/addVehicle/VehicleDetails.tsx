/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';

import { Badge, Button, Card, Col, Divider, Flex, Image, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ConfirmationModal from '@components/molecular/modals/ConfirmationModal';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';

import RenewalCards from './RenewalCards';
import car from '../../assets/car.png';
import useDeleteFleet from '../../hooks/deleteFleet';
import useAddDocApi from '../../hooks/useAddDocApi';
import { resetInputParams, resetRcResponse } from '../../slices/turboSlice';
import { renewalCardsData } from '../../utils/data';

const VehicleDetails = ({ inputParams, verifyRcResponse, id, setRefresh }: any) => {
    const navigate = useNavigate();
    const { deleteApi } = useDeleteFleet();
    // const [loading,setIsLoading]=useState(false)
    const dispatch = useDispatch();
    const { addDocApi, loading } = useAddDocApi();
    function getVehicleAge(regDate: any) {
        const reg = new Date(regDate);
        const now = new Date();

        let age = now.getFullYear() - reg.getFullYear();

        // If registration month-date is ahead of today, subtract 1
        if (
            now.getMonth() < reg.getMonth() ||
            (now.getMonth() === reg.getMonth() && now.getDate() < reg.getDate())
        ) {
            age--;
        }

        return age;
    }
    const capitalizeFirstLetter = (text: any): string => {
        if (typeof text === 'string') {
            return text
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        return text; // return as-is if not a string
    };
    const vehicleDetails = [
        { label: 'Vehicle No.', value: verifyRcResponse?.vehicleNumber },
        { label: 'Make & Model', value: verifyRcResponse?.model },
        { label: 'Class', value: verifyRcResponse.rawData?.class },
        { label: 'Body Type', value: capitalizeFirstLetter(verifyRcResponse?.rawData?.body_type) },
        { label: 'Fuel Type', value: capitalizeFirstLetter(verifyRcResponse?.fuelType) },
        { label: 'Color', value: capitalizeFirstLetter(verifyRcResponse?.rawData?.vehicle_colour) },
    ];

    const registrationAndTaxDetails = [
        {
            label: 'Registration Date',
            value: dayjs(verifyRcResponse?.regDate).format('YYYY-MM-DD'),
        },
        {
            label: 'Expiry Date',
            value: dayjs(verifyRcResponse?.rawData?.rc_expiry_date).format('YYYY-MM-DD'),
        },
        // { label: 'Tax Validity', value: formattedDateTime(verifyRcResponse.regDate) },
        { label: 'Vehicle Age', value: getVehicleAge(verifyRcResponse?.regDate) },
        { label: 'Owner Count', value: verifyRcResponse?.rawData?.owner_count },
    ];

    const insuranceAndPucDetails = [
        { label: 'Insurance Company', value: verifyRcResponse?.insuranceCompany },
        { label: 'Policy Number', value: verifyRcResponse?.policyNumber },
        {
            label: 'Insurance Valid Upto',
            value: dayjs(verifyRcResponse.insuranceValidUpto).format('YYYY-MM-DD'),
        },
        // { label: 'Upload Insurance Document', value: 'Click to Upload', isUpload: true },

        { label: 'PUC Number', value: verifyRcResponse.rawData.pucc_number },
        {
            label: 'PUC Valid Upto',
            value: dayjs(verifyRcResponse.pucValidUpto).format('YYYY-MM-DD'),
        },
        // { label: 'Upload PUC Document', value: 'Click to Upload', isUpload: true },
    ];
    const technicalDetails = [
        { label: 'Engine Number', value: verifyRcResponse.engineNumber },
        { label: 'Chassis Number', value: verifyRcResponse.chassisNumber },
        { label: 'Cylinders / CC', value: verifyRcResponse.rawData.vehicle_cylinders_no },
        { label: 'Unladen / Gross Weight', value: verifyRcResponse.rawData.unladen_weight },
        { label: 'Wheelbase', value: verifyRcResponse.rawData.wheelbase },
        { label: 'Seat / Sleeper Capacity', value: verifyRcResponse.rawData.vehicle_seat_capacity },
    ];
    const complianceLegalFlags = [
        { label: 'RC Status', value: verifyRcResponse?.rcStatus }, // text like ACTIVE
        {
            label: 'Blacklist Status',
            value: verifyRcResponse?.blacklistStatus ? 'Blacklisted' : 'Not Blacklisted',
        }, // convert true/false to Yes/No
        {
            label: 'Permit Valid Upto',
            value: verifyRcResponse?.rawData?.permit_valid_upto
                ? dayjs(verifyRcResponse.rawData.permit_valid_upto).format('YYYY-MM-DD')
                : 'N/A',
        },
        { label: 'Non-use Status', value: verifyRcResponse?.rawData?.non_use_status || 'N/A' },
    ];

    const ownerInfo = [
        { label: 'Owner Name', value: capitalizeFirstLetter(verifyRcResponse.ownerName) },
        {
            label: "Father's Name",
            value: capitalizeFirstLetter(verifyRcResponse.rawData.owner_father_name),
        },
        {
            label: 'Present Address',
            value: capitalizeFirstLetter(verifyRcResponse.presentAddress),
        },
    ];
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const handleDelete = () => {
        deleteApi({ id }).then((res: any) => {
            if (res) {
                setRefresh(true);
                dispatch(
                    showToast({
                        description: 'Vehicle deleted successfully',
                        variant: 'success',
                    })
                );
                dispatch(resetRcResponse());
                navigate(`${paths.dashboard.turbo}/${paths.turbo.addVehicle}`);
            }
            setOpenConfirmationModal(false);
        });
    };

    const handleSubmit = async () => {
        const res = await addDocApi(inputParams);
        if (res) {
            dispatch(
                showToast({
                    description: 'Vehicle added successfully',
                    variant: 'success',
                })
            );
            dispatch(resetInputParams());
            dispatch(resetRcResponse());
            navigate(`${paths.dashboard.turbo}/${paths.turbo.manageFleet}`);
        }
    };

    return (
        <>
            <Card className="mt-4 rounded-xl">
                <Flex
                    justify="space-between"
                    className="flex-col w-full gap-3 sm:flex-row sm:items-center"
                >
                    <Typography.Text className="text-xl font-medium">
                        {verifyRcResponse?.vehicleNumber}
                    </Typography.Text>

                    {id ? (
                        <Button
                            className="w-full px-6 sm:w-fit"
                            danger
                            onClick={() => setOpenConfirmationModal(true)}
                            loading={loading}
                        >
                            Delete Fleet
                        </Button>
                    ) : (
                        <Button
                            className="w-full px-6 sm:w-fit"
                            type="primary"
                            onClick={handleSubmit}
                            danger
                            loading={loading}
                        >
                            Add Vehicle to Fleet
                        </Button>
                    )}
                </Flex>

                <Row gutter={[30, 10]} className="mt-5">
                    <Col
                        xs={24}
                        xl={8}
                        className="px-10 rounded-xl"
                    // style={{ background: '#FBFBFB' }}
                    >
                        <Flex
                            justify="center"
                            align="center"
                            className="px-5 rounded-xl"
                            style={{ height: '100%', minHeight: '200px', background: '#FBFBFB' }} // set a height to center vertically
                        >
                            <Image src={car} preview={false} />
                        </Flex>
                    </Col>

                    <Col xs={24} xl={16}>
                        <Row gutter={[10, 10]}>
                            {renewalCardsData.map(item => {
                                let dynamicRenewalDate = '';

                                if (item.title === 'Insurance') {
                                    dynamicRenewalDate = verifyRcResponse?.insuranceExpiry
                                        ? dayjs(verifyRcResponse.insuranceExpiry).format(
                                              'YYYY-MM-DD'
                                          )
                                        : 'N/A';
                                } else if (item.title === 'Registration') {
                                    dynamicRenewalDate = verifyRcResponse?.rawData?.rc_expiry_date
                                        ? dayjs(verifyRcResponse.rawData.rc_expiry_date).format(
                                              'YYYY-MM-DD'
                                          )
                                        : 'N/A';
                                } else if (item.title === 'Pollution') {
                                    dynamicRenewalDate = verifyRcResponse?.pucValidUpto
                                        ? dayjs(verifyRcResponse.pucValidUpto).format('YYYY-MM-DD')
                                        : 'N/A';
                                } else if (item.title === 'Fitness Upto') {
                                    dynamicRenewalDate = 'N/A'; // Fitness date not available
                                }

                                return (
                                    <Col xs={24} md={6} key={item.title}>
                                        <RenewalCards
                                            icon={item.icon}
                                            title={item.title}
                                            renewalDate={dynamicRenewalDate}
                                            bgColor={item.bgColor}
                                        />
                                    </Col>
                                );
                            })}

                            <>
                                <Typography.Text className="px-2 mt-2 text-sm font-semibold">
                                    Vehicle Overview
                                </Typography.Text>
                                <Flex
                                    justify="space-between"
                                    className="hidden w-full px-2 mt-1 md:flex "
                                >
                                    {vehicleDetails.map((item, index) => (
                                        <Flex key={index} vertical>
                                            <Typography.Text className="font-medium">
                                                {item.value}
                                            </Typography.Text>
                                            <Typography.Text
                                                type="secondary"
                                                className="mt-2 text-xs"
                                            >
                                                {item.label}
                                            </Typography.Text>
                                        </Flex>
                                    ))}
                                </Flex>
                                <Flex
                                    justify="space-between"
                                    className="flex-wrap w-full px-2 mt-1 md:hidden xs:flex"
                                >
                                    {vehicleDetails.map((item, index) => (
                                        <Flex
                                            key={index}
                                            vertical
                                            className="w-full mb-4 sm:w-1/3 sm:mb-0"
                                        >
                                            <Typography.Text className="font-medium">
                                                {item.value}
                                            </Typography.Text>
                                            <Typography.Text
                                                type="secondary"
                                                className="mt-2 text-xs"
                                            >
                                                {item.label}
                                            </Typography.Text>
                                        </Flex>
                                    ))}
                                </Flex>

                                <Divider />
                                <Typography.Text className="px-2 text-sm font-semibold">
                                    Registration & Tax
                                </Typography.Text>
                                <Flex justify="space-between" className="hidden w-full px-2 md:flex">
                                    {registrationAndTaxDetails.map((item, index) => (
                                        <Flex key={index} vertical>
                                            {item.label === 'Vehicle Age' ? (
                                                <Typography.Text className="mt-1 font-medium">
                                                    {item.value} {item.value > 1 ? 'Years' : 'Year'}
                                                </Typography.Text>
                                            ) : (
                                                <Typography.Text className="mt-1 font-medium">
                                                    {item.value}
                                                </Typography.Text>
                                            )}

                                            <Typography.Text
                                                type="secondary"
                                                className="mt-2 text-xs "
                                            >
                                                {item.label}
                                            </Typography.Text>
                                        </Flex>
                                    ))}
                                </Flex>
                                <Flex justify="space-between"
                                    className="flex-wrap w-full px-2 mt-1 md:hidden xs:flex">
                                    {registrationAndTaxDetails.map((item, index) => (
                                        <Flex key={index} vertical>
                                            {item.label === 'Vehicle Age' ? (
                                                <Typography.Text className="mt-1 font-medium">
                                                    {item.value} {item.value > 1 ? 'Years' : 'Year'}
                                                </Typography.Text>
                                            ) : (
                                                <Typography.Text className="mt-1 font-medium">
                                                    {item.value}
                                                </Typography.Text>
                                            )}

                                            <Typography.Text
                                                type="secondary"
                                                className="mt-2 text-xs "
                                            >
                                                {item.label}
                                            </Typography.Text>
                                        </Flex>
                                    ))}
                                </Flex>

                                <Flex justify="space-between" className="w-full px-2 mt-2">
                                    <Flex vertical>
                                        <Typography.Text className="font-medium">
                                            {capitalizeFirstLetter(verifyRcResponse?.regAuthority)}
                                        </Typography.Text>
                                        <Typography.Text type="secondary" className="mt-2 text-xs">
                                            RTO / Authority{' '}
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
                            </>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <Row gutter={[30, 30]} className="mt-7">
                <Col xs={24} md={12}>
                    <div className="h-full p-6 border rounded-xl">
                        <Typography.Text className="text-sm font-semibold">
                            Insurance & PUC
                        </Typography.Text>
                        <Row gutter={[20, 20]} className="mt-4">
                            {insuranceAndPucDetails.map((item, index) => (
                                <Col xs={12} xl={6} key={index}>
                                    <Flex gap={5} className='flex-col justify-between h-full'>
                                        <Flex flex={1}>
                                            <Typography.Text className="text-base font-medium">
                                                {item.value || 'N/A'}
                                            </Typography.Text>
                                        </Flex>

                                        <Typography.Text type="secondary" className="mt-1 text-xs">
                                            {item.label}
                                        </Typography.Text>
                                    </Flex>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>

                <Col xs={24} md={12}>
                    <div className="h-full p-6 border rounded-xl">
                        <Typography.Text className="text-sm font-semibold">
                            Owner Info
                        </Typography.Text>

                        <div className="flex flex-wrap px-2 mt-4 gap-y-4 xl:hidden">
                            {ownerInfo.map((item, index) => (
                                <div key={index} className="w-1/2">
                                    <Flex vertical>
                                        <Typography.Text className="text-xs font-medium">
                                            {item.value}
                                        </Typography.Text>
                                        <Typography.Text type="secondary">
                                            {item.label}
                                        </Typography.Text>
                                    </Flex>
                                </div>
                            ))}
                        </div>

                        <Flex justify="space-between" className="hidden gap-4 mt-4 xl:flex">
                            {ownerInfo.map((item, index) => (
                                <Flex
                                    key={index}
                                    vertical
                                    className="justify-between flex-1"
                                >
                                    <Typography.Text className="font-medium">
                                        {item.value || 'N/A'}
                                    </Typography.Text>
                                    <Typography.Text type="secondary" className="mt-2 text-xs">
                                        {item.label}
                                    </Typography.Text>
                                </Flex>
                            ))}
                        </Flex>


                        <Flex justify="space-between" className="w-full mt-8">
                            <Flex vertical>
                                <Typography.Text className="font-medium">
                                    {capitalizeFirstLetter(verifyRcResponse?.permanentAddress)}
                                </Typography.Text>
                                <Typography.Text type="secondary" className="mt-2 text-xs">
                                    Permanent Address
                                </Typography.Text>
                            </Flex>
                        </Flex>
                    </div>
                </Col>
            </Row>

            <Row gutter={[30, 30]} className="mt-7">
                <Col xs={24} md={12}>
                    <div className="h-full p-6 border rounded-xl">
                        <Typography.Text className="text-sm font-semibold">
                            Technical Details
                        </Typography.Text>
                        <Row gutter={[20, 20]} className="mt-4">
                            {technicalDetails.map((item, index) => (
                                <Col xs={12} xl={6} key={index}>
                                    <Flex vertical gap={5} className='justify-between h-full'>
                                        {item.label === 'Wheelbase' ? (
                                            <Typography.Text className="text-base font-medium">
                                                {item.value} MM
                                            </Typography.Text>
                                        ) : item.label === 'Unladen / Gross Weight' ? (
                                            <Typography.Text className="text-base font-medium">
                                                {item.value} KG
                                            </Typography.Text>
                                        ) : (
                                            <Typography.Text className="text-base font-medium">
                                                {item.value}
                                            </Typography.Text>
                                        )}

                                        <Typography.Text type="secondary" className="text-xs">
                                            {item.label}
                                        </Typography.Text>
                                    </Flex>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>

                <Col xs={24} md={12}>
                    <div className="h-full p-6 border rounded-xl">
                        <Typography.Text className="text-sm font-semibold">
                            Compliance & Legal Flags
                        </Typography.Text>
                        <Row gutter={[20, 20]} className="mt-4">
                            {complianceLegalFlags.map((item, index) => (
                                <Col xs={12} xl={6} key={index}>
                                    <Flex vertical gap={5}>
                                        {item.label === 'RC Status' ||
                                        item.label === 'Blacklist Status' ? (
                                            <Badge
                                                status={
                                                    item.value !== 'ACTIVE' ||
                                                    item.value === 'Blacklisted'
                                                        ? 'error'
                                                        : 'success'
                                                }
                                                text={capitalizeFirstLetter(item.value) || 'N/A'}
                                                style={{
                                                    color:
                                                        item.value === 'ACTIVE' ||
                                                        item.value === 'Yes'
                                                            ? '#027A48'
                                                            : '#D92D20',
                                                    backgroundColor:
                                                        item.value === 'ACTIVE' ||
                                                        item.value === 'Yes'
                                                            ? '#ECFDF3'
                                                            : '#FEF3F2',
                                                    padding: '1px 9px',
                                                    border: '1px solid transparent',
                                                    borderRadius: '15px',
                                                }}
                                            />
                                        ) : (
                                            <Typography.Text className="text-base font-medium">
                                                {item.value || 'N/A'}
                                            </Typography.Text>
                                        )}
                                        <Typography.Text type="secondary" className="mt-1 text-xs">
                                            {item.label}
                                        </Typography.Text>
                                    </Flex>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
                {openConfirmationModal && (
                    <ConfirmationModal
                        isOpen={openConfirmationModal}
                        handleCancel={() => setOpenConfirmationModal(false)}
                        title="Are you sure you want to delete this vehicle? This action will permanently remove the vehicle and its associated data (e.g., documents, driver assignment) from your fleet."
                        handleSubmit={handleDelete}
                        isLoading={false}
                    />
                )}
            </Row>
        </>
    );
};

export default VehicleDetails;
