import React, { useRef } from 'react';

import { Flex, Form, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Formik, FormikProps } from 'formik';

import { useAppSelector } from '@src/hooks/store';
import useScreenSize from '@src/hooks/useScreenSize';
import { RootState } from '@store/store';

import DeliveryCard from '../components/details/DeliveryCard';
import DeliveryCardSm from '../components/details/DeliveryCardSm';
import ShipmentFormContent from '../components/details/ShipmentFormContent';
import ShipmentFormContentSm from '../components/details/ShipmentFormContentSm';
import usePayment from '../hooks/usePayment';
import { getShipmentDetailsSchema } from '../schema';

const { Text } = Typography;
const ShipmentDetails = () => {
    const { isLoading, handleLogisticsSubmission } = usePayment();
    const {
        selectedDeliveryCompany: selectedCompany,
        originAddress,
        destinationAddress,
        shipmentType,
    } = useAppSelector((state: RootState) => state.reducer.logisticsV3);
    const isInternational = shipmentType === 'international';
    const { xs } = useScreenSize();
    const formikRef = useRef<FormikProps<any>>(null);
    const { shipmentDetails: details } = useAppSelector(
        (state: RootState) => state.reducer.logisticsV3
    );
    const { height, length, weight, width, destinationCity, originCity } = details;

    return (
        <Content className="px-0 mb-8 w-full xl:w-[80%] xxl:w-[70%]">
            <Flex>
                <Text className="text-xl font-medium">Create Shipment</Text>
            </Flex>
            {selectedCompany && xs ? (
                <DeliveryCardSm company={selectedCompany} />
            ) : (
                selectedCompany && <DeliveryCard company={selectedCompany} />
            )}
            <Formik
                innerRef={formikRef}
                initialValues={{
                    senderAddressId: originAddress.senderAddressId || null,
                    senderName: originAddress.senderName || '',
                    senderPhone: originAddress.senderPhone || '',
                    senderAddressLine: originAddress.senderAddressLine || '',
                    senderZipCode: originAddress.senderZipCode || '',
                    receiverAddressId: destinationAddress.receiverAddressId || null,
                    receiverName: destinationAddress.receiverName || '',
                    receiverPhone: destinationAddress.receiverPhone || '',
                    receiverAddressLine: destinationAddress.receiverAddressLine || '',
                    receiverZipCode: destinationAddress.receiverZipCode || '',
                    receiverPhoneCode: destinationAddress.receiverPhoneCode || '+91',
                    items: [
                        {
                            name: '',
                            price: '',
                            quantity: '',
                            hsn: '',
                        },
                    ],
                    senderSaveAddress: false,
                    recieverSaveAddress: false,
                }}
                enableReinitialize
                onSubmit={values => {
                    const serviceDetails = {
                        vendor_name: selectedCompany?.courierName,
                        origin_city: originCity?.city,
                        destination_city: destinationCity?.city,
                        width,
                        weight,
                        length,
                        height,
                        price: selectedCompany?.price,
                    };
                    sessionStorage.setItem(
                        'service_details',
                        JSON.stringify({
                            serviceDetails,
                        })
                    );
                    handleLogisticsSubmission(values);
                }}
                validationSchema={getShipmentDetailsSchema(isInternational)}
            >
                {({ handleSubmit }) => (
                    <Form layout="vertical" className="w-full" onFinish={handleSubmit}>
                        {xs ? (
                            <ShipmentFormContentSm isLoading={isLoading} />
                        ) : (
                            <ShipmentFormContent isLoading={isLoading} />
                        )}
                    </Form>
                )}
            </Formik>
        </Content>
    );
};

export default ShipmentDetails;
