import React from 'react';

import { Col, Flex, Grid, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import BbpsIconCard from '../components/BbpsIconCard';
import IconCardMobile from '../components/IconCardMobile';
import { insurance } from '../utils/data';

const { Text } = Typography;
interface TelecomItem {
    icon: string;
    title: string;
    url: string;
}

const InsuranceList = () => {
    const navigate = useNavigate();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const handleClick = (item: TelecomItem) => () => {
        navigate(item.url, { state: { item } });
    };
    return (
        <Flex vertical gap={40} className="mt-10">
            <Text className="font-medium text-lg sm:text-xl">Insurance</Text>
            <Row gutter={[20, 30]}>
                {insurance.map((item: TelecomItem, index) =>
                    screens.xs ? (
                        <IconCardMobile
                            icon={item.icon}
                            title={item.title}
                            onClick={handleClick(item)}
                            key={item.title}
                        />
                    ) : (
                        <React.Fragment key={index}>
                            <Col sm={6} md={4} xl={4} className="lg:mx-2">
                                <BbpsIconCard
                                    icon={item.icon}
                                    title={item.title}
                                    onClick={handleClick(item)}
                                />
                            </Col>
                        </React.Fragment>
                    )
                )}
            </Row>
        </Flex>
    );
};

export default InsuranceList;
