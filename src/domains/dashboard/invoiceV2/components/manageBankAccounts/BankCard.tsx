import React from 'react';

import { Flex, Typography } from 'antd';

interface BankCardField {
    label: string;
    value: string;
}

interface BankCardProps {
    name: string;
    fields: BankCardField[];
    badge?: React.ReactNode;
    actions?: React.ReactNode;
}

const BankCard: React.FC<BankCardProps> = ({ name, fields, badge, actions }) => (
    <Flex vertical gap={12} className="bg-[#F9FAFB] border border-[#E4E4E7] rounded-2xl px-5 py-4">
        <Flex justify="space-between" align="center">
            <Flex align="center" gap={10}>
                <Typography.Text className="text-base font-semibold text-[#101828]">
                    {name}
                </Typography.Text>
                {badge}
            </Flex>
            {actions}
        </Flex>

        <Flex vertical gap={6}>
            {Array.from({ length: Math.ceil(fields.length / 2) }, (_, i) => (
                <Flex key={i} justify="space-between">
                    {fields.slice(i * 2, i * 2 + 2).map(({ label, value }) => (
                        <Typography.Text key={label} className="text-sm text-[#344054] w-1/2">
                            {label}:{' '}
                            <Typography.Text className="text-sm font-normal text-[#101828]">
                                {value}
                            </Typography.Text>
                        </Typography.Text>
                    ))}
                </Flex>
            ))}
        </Flex>
    </Flex>
);

export default React.memo(BankCard);
