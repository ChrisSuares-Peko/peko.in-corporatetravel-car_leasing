import { Button, Card, Col, Row, Typography } from 'antd';

import { useAppSelector } from '@src/hooks/store';
import { RootState } from '@store/store';

import PackageDetails from './PackageDetails';

const { Text } = Typography;

const AddressRow = ({ label, value, odd }: { label: string; value?: string; odd: boolean }) => (
    <div className={`flex items-center px-4 py-3 ${odd ? 'bg-gray-50' : 'bg-white'}`}>
        <span className="w-2/5 text-sm text-gray-500 shrink-0">{label}</span>
        <span className="w-3/5 text-sm text-gray-800 font-medium">{value || '—'}</span>
    </div>
);

const AddressCard = ({ title, rows }: { title: string; rows: { label: string; value?: string }[] }) => (
    <Card
        title={<Text className="font-semibold text-base">{title}</Text>}
        className="rounded-2xl shadow-sm overflow-hidden"
    >
        <div className="divide-y divide-gray-100">
            {rows.map((row, i) => (
                <AddressRow key={row.label} label={row.label} value={row.value} odd={i % 2 === 0} />
            ))}
        </div>
    </Card>
);

type Props = {
    isLoading: boolean;
};

const ShipmentFormContent = ({ isLoading }: Props) => {
    const { originAddress, destinationAddress, shipmentDetails } = useAppSelector(
        (state: RootState) => state.reducer.logisticsV3
    );
    const { originCity, destinationCity } = shipmentDetails;

    return (
        <>
            <Row gutter={[40, 24]} className="mt-4">
                <Col xs={24} md={12}>
                    <AddressCard
                        title="Origin Address"
                        rows={[
                            { label: 'Full Name', value: originAddress.senderName },
                            { label: 'Mobile Number', value: originAddress.senderPhone },
                            { label: 'PIN Code', value: originAddress.senderZipCode },
                            { label: 'State', value: originCity?.state },
                            { label: 'City', value: originCity?.city },
                            { label: 'Address Line 1', value: originAddress.senderAddressLine },
                        ]}
                    />
                </Col>

                <Col xs={24} md={12}>
                    <AddressCard
                        title="Destination Address"
                        rows={[
                            { label: 'Full Name', value: destinationAddress.receiverName },
                            { label: 'Mobile Number', value: destinationAddress.receiverPhone },
                            { label: 'PIN Code', value: destinationAddress.receiverZipCode },
                            { label: 'State', value: destinationCity?.state },
                            { label: 'City', value: destinationCity?.city },
                            { label: 'Address Line 1', value: destinationAddress.receiverAddressLine },
                        ]}
                    />
                </Col>
            </Row>

            <hr className="mt-6 mb-0" />

            <PackageDetails />

            <Button danger type="primary" htmlType="submit" loading={isLoading}>
                Pay Now
            </Button>
        </>
    );
};

export default ShipmentFormContent;
