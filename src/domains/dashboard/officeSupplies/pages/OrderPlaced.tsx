import React from 'react';

import { Result, Button, Typography, Image, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

import verified from '@assets/icons/Verified.svg';
import { paths } from '@src/routes/paths';

const { Title, Text } = Typography;

const OrderPlaced: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Result
            icon={<Image src={verified} alt="Verified" className="object-cover mx-auto" />}
            title={
                <Title level={4} className="font-medium font-roboto text-text-gray-900">
                    Voila! Your order has been successfully placed
                </Title>
            }
            subTitle={
                <Flex className="w-full mx-auto md:w-1/2">
                    <Text className="text-sm text-gray-500 font-roboto">
                        Your top-up for +91 589126729 is successful. You will receive a confirmation
                        email once the process is completed. Thank you for using Peko.
                    </Text>
                </Flex>
            }
            extra={[
                <Button
                    key="goToOfficeSupplies"
                    className="text-xs rounded-sm bg-bgOrange md:text-base "
                    type="primary"
                    onClick={() => navigate(`/${paths.officeSupplies.index}`)}
                >
                    Go to Office Supplies
                </Button>,
                <Button
                    key="trackShipment"
                    className="text-xs rounded-sm md:text-base"
                    onClick={() => navigate(`/${paths.officeSupplies.index}`)}
                >
                    Track your shipment
                </Button>,
            ]}
        />
    );
};

export default OrderPlaced;
