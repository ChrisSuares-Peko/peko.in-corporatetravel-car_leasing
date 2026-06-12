import { TableProps, Typography } from 'antd';

import { formattedDateTime } from '@utils/dateFormat';

import { convertMBtoGB } from './helperFunction';

export const topUpHistoryColumns: TableProps<any>['columns'] = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date: string) => formattedDateTime(new Date(date)),
    },
    {
        title: 'Plan',
        dataIndex: 'plan',
        key: 'plan',
        render: (text: string) => (
            <Typography.Text>{text ? `${convertMBtoGB(text)} GB` : 'N/A'}</Typography.Text>
        ),
    },
    {
        title: 'Validity',
        dataIndex: 'validity',
        key: 'validity',
        render: (text: string) => <Typography.Text>{text || 'N/A'}</Typography.Text>,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (amt: string) => <Typography.Text>₹ {Number(amt).toFixed(2)}</Typography.Text>,
    },
    {
        title: 'Payment Method',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
        render: (text: string) => <Typography.Text className="capitalize">{text}</Typography.Text>,
    },
];
