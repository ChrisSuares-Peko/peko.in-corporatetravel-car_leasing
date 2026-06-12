import { useCallback, useEffect, useState } from 'react';

import { Button, Col, Flex, Modal, Row, Skeleton, Typography } from 'antd';
import { ReactSVG } from 'react-svg';

import { paths } from '@src/routes/paths';

import CalenderSVG from '../../assets/icons/Calender.svg';
import DataSVG from '../../assets/icons/Data.svg';
import useGetPlansAndDetails from '../../hooks/useGetPlansAndDetails';

interface TopUpModalProps {
    isOpen: boolean;
    handleCancel: () => void;
    handleSubmit: (selectedData: string, selectedValidity: string, selectedCountry: string) => void;
    isLoading: boolean;
    planId?: string;
    country?: string;
}
const TopUpModal = ({ isOpen, handleCancel, handleSubmit, isLoading, planId, country }: TopUpModalProps) => {
    const [selectedData, setSelectedData] = useState('');
    const [selectedValidity, setSelectedValidity] = useState('');
    const { isLoading: listLoading, plans } = useGetPlansAndDetails(planId as string, country as string);

    const handleDataClick = (data: string, validity: string) => {
        setSelectedData(String(data));
        setSelectedValidity(String(validity));
    };

    const handleValidityClick = (data: string) => {
        setSelectedValidity(String(data));
    };
    useEffect(() => {
        if (plans && plans.length > 0) {
            setSelectedData(String(plans[0].dataGB));
            setSelectedValidity(String(plans[0].validityDays ?? plans[0].periodDays));
        }
    }, [plans]);

    const { iccid } = JSON.parse(sessionStorage.getItem('ESIM') || '{}');
    const saveDetailsToSession = useCallback(() => {
        let url = '';
        if (iccid === '{}') {
            url = `${paths.dashboard.corporateTravel}/${paths.esim.index}/${paths.esim.orders}`;
        }
        if (iccid && planId && iccid !== '{}') {
            url = `${paths.dashboard.corporateTravel}/${paths.esim.index}/${paths.esim.orders}/${paths.esim.details}`;
        }

        // Create the details object
        const details = {
            url,
            service: 'eSim',
            planId,
            iccid,
        };
        sessionStorage.setItem('ESIM', JSON.stringify(details));
    }, [iccid, planId]);

    let uniqueValidity;
    if (plans) {
        uniqueValidity = Array.from(
            new Set(
                plans.flatMap((option: any) =>
                    option?.periodDays ?? option?.validityDays
                )
            )
        );
    }
    return (
        <Modal
            title={
                <Flex gap={16} align="start" className="font-medium mb-5">
                    Select Plan
                </Flex>
            }
            open={isOpen}
            onCancel={handleCancel}
            closeIcon={null}
            centered
            width={400}
            children={
                listLoading ? (
                    <Skeleton />
                ) : (
                    <Flex vertical align="start" justify="center" className=" mb-8" gap={20}>
                        <Flex className="w-full" align="center">
                            <Flex align="center" className="w-1/3">
                                <ReactSVG src={DataSVG} />
                                <Typography.Text className="text-sm ms-2">Data:</Typography.Text>
                            </Flex>
                            <Row gutter={[10, 10]} className="w-full">
                                {plans?.length && !listLoading
                                    ? plans.map(option => (
                                        <Col key={option?.planId}>
                                            <Button
                                                className={`text-gray-500 ${
                                                    String(selectedData) === String(option.dataGB)
                                                        ? 'text-red-500 border-red-500'
                                                        : 'hover:bg-gray-200'
                                                }`}
                                                onClick={() =>
                                                    handleDataClick(
                                                        option.dataGB,
                                                        option.validityDays ?? option.periodDays
                                                    )
                                                }
                                            >
                                                {option.dataGB} GB
                                            </Button>
                                        </Col>
                                    ))
                                    : 'N/A'}
                            </Row>
                        </Flex>
                        <Flex className="w-full" align="center">
                            <Flex align="center" className="w-1/3">
                                <ReactSVG src={CalenderSVG} />
                                <Typography.Text className="text-sm ms-0">
                                    Validity:
                                </Typography.Text>
                            </Flex>
                            <Row gutter={[8, 8]} className="w-full">
                                {uniqueValidity && plans?.length && !listLoading
                                    ? uniqueValidity.map(period => (
                                        <Col key={period}>
                                            <Button
                                                className={`text-gray-500 ${
                                                    String(selectedValidity) === String(period)
                                                        ? 'text-red-500 border-red-500'
                                                        : ''
                                                }`}
                                                onClick={() => handleValidityClick(period)}
                                                disabled={
                                                    !!(
                                                        selectedData === null ||
                                                        (selectedData &&
                                                            !plans.some(option =>
                                                                Number(option.dataGB) === Number(selectedData) &&
                                                                (
                                                                    Array.isArray(option.validityDays)
                                                                        ? option.validityDays.includes(period)
                                                                        : String(option.validityDays ?? option.periodDays) === String(period)
                                                                )
                                                            ))
                                                    )
                                                }
                                            >
                                                {period} {Number(period) === 1 ? 'Day' : 'Days'}
                                            </Button>
                                        </Col>
                                    ))
                                    : 'N/A'}
                            </Row>
                        </Flex>
                    </Flex>
                )
            }
            footer={[
                <Flex className="w-full" justify="flex-end" gap={10} key="">
                    <Button
                        key="submit"
                        type="primary"
                        danger
                        loading={isLoading}
                        onClick={() => {
                            if (!country) {
                                console.warn('TopUpModal - Country is missing!', { country });
                            }
                            handleSubmit(selectedData, selectedValidity, country || '');
                            saveDetailsToSession();
                        }}
                    >
                        Top-Up Now
                    </Button>

                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Flex>,
            ]}
        />
    );
};

export default TopUpModal;
