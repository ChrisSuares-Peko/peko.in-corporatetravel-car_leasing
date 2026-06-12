import React from 'react';

import { Divider, Flex, Typography } from 'antd';

interface SummaryRowProps {
    label: string;
    amount?: string;
    children?: React.ReactNode;
}

const SummaryRow = ({ label, amount, children }: SummaryRowProps) => (
    <>
        <Flex
            justify="space-between"
            align="center"
            className="h-[60px] px-[18px] py-[14px] w-full"
        >
            <Typography.Text className="whitespace-nowrap font-normal text-base text-[#1e293b]">
                {label}
            </Typography.Text>
            {amount && (
                <Typography.Text className="font-normal text-base text-[#1e293b]">
                    ₹ {amount}
                </Typography.Text>
            )}
            {children}
        </Flex>
        <Divider className="m-0" />
    </>
);

export default SummaryRow;
