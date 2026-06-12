import React, { useState } from 'react';

import { Button, Flex, Image, Tag, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
// import { ReactSVG } from 'react-svg';

import PanVerifyModal from './PanVerifyModal';

type cardProps = {
    title: string;
    desc: string;
    logo: string;
    inputComponents: any;
    price: any;
    accessKeys: string;
    serviceName: string;
    serviceValue?: string;
};

const { Text } = Typography;

const VerificationCard = ({
    title,
    desc,
    logo,
    inputComponents,
    price,
    accessKeys,
    serviceName,
    serviceValue,
}: cardProps) => {
    const [isOpen, setIsOpen] = useState(false);
 

    return (
        <Content className="relative h-full p-6 pt-5 border address-card pb-15 rounded-xl _scale_on_hover hover:scale-105 transition-transform duration-300">
            <Flex justify="space-between" className="h-full" vertical>
                <Flex vertical>
                    <Flex justify="space-between">
                        <Image className="max-w-[60px] max-h-[60px]" preview={false} src={logo} />
                        {price !== '' && price && (
                            <Tag color="#E4ECF7" className="h-5 items-center">
                                <Text className="text-xs font-medium"> ₹ {price}</Text>
                            </Tag>
                        )}
                    </Flex>
                    <Text className="text-xl font-medium mt-5">{title}</Text>
                    <Text className="text-gray-500 mt-2">{desc}</Text>
                </Flex>
                <Button
                    type="default"
                    danger
                    size="middle"
                    className="text-xs md:px-5 md:text-sm mt-4 rounded-lg "
                    onClick={() => setIsOpen(true)}
                >
                    Verify Now
                </Button>
            </Flex>
            {isOpen && (
                <PanVerifyModal
                    open={isOpen}
                    handleCancel={() => setIsOpen(false)}
                    inputComponents={inputComponents}
                    title={title}
                    accessKeys={accessKeys}
                    serviceName={serviceName}
                    price={price}
                    serviceValue={serviceValue}
                />
            )}
        </Content>
    );
};

export default VerificationCard;
