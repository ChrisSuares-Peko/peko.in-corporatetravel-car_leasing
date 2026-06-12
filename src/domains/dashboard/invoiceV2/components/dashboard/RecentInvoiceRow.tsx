import React from 'react';

import { Flex, Typography } from 'antd';

import { formatAmount } from '../../utils/helperFunctions';

interface RecentInvoiceRowProps {
    name: string;
    date: string;
    amount: number;
    isCredit: boolean;
}

const RecentInvoiceRow: React.FC<RecentInvoiceRowProps> = ({ name, date, amount, isCredit }) => (
    <Flex justify="space-between" align="center" className="bg-white rounded-xl px-4 py-3">
        <Flex vertical gap={4}>
            <Typography.Text className="text-[#101828] text-base font-normal leading-6">
                {name}
            </Typography.Text>
            <Typography.Text className="text-[#A1A1AA] text-[11px] font-normal leading-4">
                {date}
            </Typography.Text>
        </Flex>
        <Typography.Text
            className={`text-base font-semibold leading-6 ${isCredit ? 'text-[#E53E3E]' : 'text-[#038E36]'}`}
        >
            {formatAmount(amount)}
        </Typography.Text>
    </Flex>
);

export default React.memo(RecentInvoiceRow);
