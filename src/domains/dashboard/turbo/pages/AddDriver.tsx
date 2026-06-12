import React, { useState } from 'react';

import { Button, Card, Flex, Skeleton, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';

import DriverCard from '../components/driverProfile/DriverCard';
import HeaderBanner from '../components/homepage/HeaderBanner';
import useAddDocApi from '../hooks/useAddDocApi';
import { resetInputParams, resetResponse } from '../slices/turboSlice';

const AddDriver = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [loading,setIsLoading]=useState(false)
    const { verifyResponse, inputParams } = useAppSelector(state => state.reducer.turbo);
    const [vehicleId, setVehicleId] = useState<undefined | number>(undefined)
    const { addDocApi, loading } = useAddDocApi();
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const res = await addDocApi(inputParams, vehicleId);
        if (res) {
            dispatch(
                showToast({
                    description: 'Driver added successfully',
                    variant: 'success',
                })
            );
            dispatch(resetResponse());
            dispatch(resetInputParams());
            navigate(`${paths.dashboard.turbo}/${paths.turbo.driverProfiles}`);
        }
    };

    let isLoading = false;
    //    useEffect(() => {
    //         // Update stateKey if the location.state changes
    if (location.state?.key) {
        isLoading = true;
    }
    // }, [location.state]);

    if (verifyResponse && Object.keys(verifyResponse).length !== 0) {
        isLoading = false;
    }

    return (
        <>
            <HeaderBanner verifyResponse={verifyResponse} inputParams={inputParams} />

            {isLoading ? (
                <Skeleton />
            ) : (
                <>
                    {verifyResponse &&
                        verifyResponse.dlNumber &&
                        Object.keys(verifyResponse).length !== 0 && (
                            <Card className="rounded-xl">
                                <Flex justify="space-between"
                                    className="flex-col w-full gap-3 sm:flex-row sm:items-center">
                                    <Typography.Text className="text-xl font-medium">
                                        {verifyResponse.dlNumber}
                                    </Typography.Text>
                                    <Button
                                        className="px-6 w-fit"
                                        type="primary"
                                        onClick={handleSubmit}
                                        danger
                                        loading={loading}
                                    >
                                        Add to Driver Profiles
                                    </Button>
                                </Flex>
                                <DriverCard verifyResponse={verifyResponse} setVehicleId={setVehicleId}/>
                            </Card>
                        )}
                </>
            )}
        </>
    );
};

export default AddDriver;
