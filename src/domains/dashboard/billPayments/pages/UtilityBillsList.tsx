import React from 'react';

import { Col, Flex, Grid, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/store';
import { checkSubServiceAccessCorporate } from '@utils/checkAccess';

import BbpsIconCard from '../components/BbpsIconCard';
import IconCardMobile from '../components/IconCardMobile';
import { billPayments } from '../utils/data';

const { Text } = Typography;
interface TelecomItem {
    icon: string;
    title: string;
    url: string;
}

const UtilityBillsList = () => {
    const navigate = useNavigate();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const handleClick = (item: TelecomItem) => () => {
        navigate(item.url, { state: { item } });
    };
    const { services } = useAppSelector(state => state.reducer.subscriptions);
    const identityServices = services?.userAccessibleServices || [];
    const filteredItems = billPayments.filter(item => {
        const serviceName = item.title;
        return checkSubServiceAccessCorporate('Bill Payments', serviceName as string);
    });
    const filteredbillPayments = filteredItems.filter(item =>
        identityServices.includes(item.accessKey)
    );

    return (
        <Flex vertical gap={40}>
            {filteredbillPayments.length > 0 && (
                <Text className="font-medium text-lg sm:text-xl">Utility Bills</Text>
            )}
            <Row gutter={[20, 30]}>
                {filteredbillPayments.map((item: TelecomItem, index) =>
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

export default UtilityBillsList;
