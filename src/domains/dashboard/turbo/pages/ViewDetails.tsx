import React from 'react';

import { Skeleton } from 'antd';
import { useLocation } from 'react-router-dom';

import VehicleDetails from '../components/addVehicle/VehicleDetails';
import useGetFleetApi from '../hooks/useGetFleetApi';

const ViewDetails = () => {
    const location = useLocation();

    const { details, loading, setRefresh } = useGetFleetApi({ id: location.state.key });

    return (
        <>
            {loading ? (
                <Skeleton />
            ) : (
                <VehicleDetails
                    verifyRcResponse={details}
                    id={location.state.key}
                    setRefresh={setRefresh}
                />
            )}
        </>
    );
};

export default ViewDetails;
