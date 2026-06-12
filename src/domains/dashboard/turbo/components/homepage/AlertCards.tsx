import React from 'react';

import { Badge, Card, Button, Typography, Flex, Empty } from 'antd';
import { ReactSVG } from 'react-svg';

import { formattedTimetoText } from '@utils/dateFormat';
import { formatNumberWithLocalString } from '@utils/priceFormat';

type CardComponentProps = {
    title: string;
    data: any[];
    icon: string;
    type: 'expiry' | 'tasks' | 'fastag'; // Type to differentiate card styles
};
const statusStyles = {
    Expired: {
        text: '#d97b7b',
        background: '#ffc2c2',
    },
    INVALID: {
        text: '#B78512',
        background: '#FDFDEC',
    },
};
function findColorByStatus(status: string) {
    let value = statusStyles.INVALID;
    if (status === 'Expired') {
        value = statusStyles[status];
    }
    return value;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, data, type, icon }) => (
    <Card className="rounded-2xl min-h-64 ">
        <Flex gap={10}>
            <ReactSVG src={icon} />
            <Typography.Title level={4} className="font-medium mt-3 ">
                {title}
            </Typography.Title>
        </Flex>
        {data && data.length > 0 ? (
            <>
                {data.map((item, index) => (
                    <Flex justify="space-between" key={index} className="mt-4">
                        {type === 'expiry' && (
                            <>
                                <Typography.Text className="text-gray-500">
                                    {item.type} Document
                                </Typography.Text>
                                <Badge
                                    status={item.status === 'Expired' ? 'error' : 'warning'}
                                    text={
                                        item.status
                                            ? item.status.charAt(0) +
                                              item.status.slice(1).toLowerCase()
                                            : ''
                                    }
                                    className="px-2 rounded-2xl"
                                    style={{
                                        color: findColorByStatus(item.status).text,
                                        backgroundColor: findColorByStatus(item.status).background,
                                        padding: '1px 9px',
                                        border: '1px ',
                                        borderRadius: '15px',
                                    }}
                                />
                            </>
                        )}

                        {type === 'tasks' && (
                            <>
                                <Typography.Text className="text-gray-500">
                                    {item.count} {item.task}
                                </Typography.Text>
                                <Button
                                    type="default"
                                    danger
                                    size="middle"
                                    className="text-xs md:px-5 md:text-sm w-16 h-7 "
                                    //  onClick={() => navigate(paths.hike.historyPage)}
                                >
                                    {item.action}
                                </Button>
                            </>
                        )}

                        {type === 'fastag' && (
                            <div style={{ width: '100%' }}>
                                <Flex align="center" justify="space-between" gap={24} style={{ width: '100%' }}>
                                    <Flex vertical>
                                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                            Account No
                                        </Typography.Text>
                                        <Typography.Text style={{ fontWeight: 600, fontSize: 15 }}>
                                            {item?.order?.accountNo || '-'}
                                        </Typography.Text>
                                    </Flex>
                                    <Flex vertical  align='end'>
                                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                            Amount
                                        </Typography.Text>
                                        <Typography.Text style={{ fontWeight: 700, color: '#16a34a', fontSize: 16 }}>
                                            ₹ {item?.order?.amountInINR ? formatNumberWithLocalString(item.order.amountInINR) : '-'}
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
                                <Typography.Text style={{ fontSize: 11, color: '#888', marginTop: 3, display: 'block', textAlign: 'right' }}>
                                    {item?.createdAt ? formattedTimetoText(item.createdAt) : '-'}
                                </Typography.Text>
                            </div>
                        )}
                    </Flex>
                ))}
            </>
        ) : (
            <Empty className="mt-4" />
        )}
    </Card>
);

export default CardComponent;
