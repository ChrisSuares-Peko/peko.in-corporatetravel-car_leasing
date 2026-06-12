import React from 'react';

import { Button, Card, Form, Input, Typography } from 'antd';

import { useAppSelector } from '@src/hooks/store';
import { RootState } from '@store/store';

import PackageDetails from './PackageDetails';

const { Text } = Typography;

const AddressField = ({ label, value }: { label: string; value?: string }) => (
    <Form.Item label={<span className="text-xs text-gray-500">{label}</span>} className="mb-3">
        <Input value={value || ''} disabled />
    </Form.Item>
);

type Props = {
    isLoading: boolean;
};

const ShipmentFormContentSm = ({ isLoading }: Props) => {
    const { originAddress, destinationAddress, shipmentDetails } = useAppSelector(
        (state: RootState) => state.reducer.logisticsV3
    );
    const { originCity, destinationCity } = shipmentDetails;

    return (
        <>
            <Card
                title={<Text className="font-semibold text-base">Origin Address</Text>}
                className="rounded-2xl shadow-sm mt-4"
                styles={{ body: { padding: '16px 20px' } }}
            >
                <Form layout="vertical">
                    <AddressField label="Full Name*" value={originAddress.senderName} />
                    <AddressField label="Mobile Number" value={originAddress.senderPhone} />
                    <AddressField label="PIN Code" value={originAddress.senderZipCode} />
                    <AddressField label="State" value={originCity?.state} />
                    <AddressField label="City" value={originCity?.city} />
                    <AddressField label="Address Line 1" value={originAddress.senderAddressLine} />
                </Form>
            </Card>

            <Card
                title={<Text className="font-semibold text-base">Destination Address</Text>}
                className="rounded-2xl shadow-sm mt-4"
                styles={{ body: { padding: '16px 20px' } }}
            >
                <Form layout="vertical">
                    <AddressField label="Full Name*" value={destinationAddress.receiverName} />
                    <AddressField label="Mobile Number" value={destinationAddress.receiverPhone} />
                    <AddressField label="PIN Code" value={destinationAddress.receiverZipCode} />
                    <AddressField label="State" value={destinationCity?.state} />
                    <AddressField label="City" value={destinationCity?.city} />
                    <AddressField label="Address Line 1" value={destinationAddress.receiverAddressLine} />
                </Form>
            </Card>

            <hr className="mt-6 mb-0" />

            <PackageDetails />

            <Button danger type="primary" htmlType="submit" loading={isLoading} className="w-full mt-4">
                Pay Now
            </Button>
        </>
    );
};

export default ShipmentFormContentSm;
