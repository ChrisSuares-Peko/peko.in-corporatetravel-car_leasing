import React from 'react';

import { Button, Flex, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useFormikContext } from 'formik';

import { formatNumberWithoutCommas } from '@utils/priceFormat';

const { Text } = Typography;

interface PlanCardType {
    validity: string;
    amount: number;
    description: string;
    handleClose: () => void;
}
const extractDataUsage = (description: string): string | null => {
    const match = description.match(/(\d+(\.\d+)?\s?(GB|MB)(\/day)?)/i);
    return match ? match[0] : null;
};

const formatDescription = (description: string): string =>
    description.replace(/(\d+(?:\.\d+)?)\s*rs\b/gi, (match, amount) =>
        `₹ ${formatNumberWithoutCommas(parseFloat(amount), 2, 2)}`
    );

const PlanCard = ({ amount, validity, description, handleClose }: PlanCardType) => {
    const formik = useFormikContext();
    const dataUsage = extractDataUsage(description);

    const handleButtonClick = () => {
        formik.setFieldValue('amount', amount);
        handleClose();
    };

    return (
        <Content className="px-3 py-5 rounded-md bg-[#F9F9F9] gap-10 mb-2 ">
            <Flex justify="space-between" className="mb-2">
                {validity && (
                    <Flex vertical>
                        <Text className="font-semibold text-base">Validity</Text>
                        <Text className="text-textLightGray">{validity}</Text>
                    </Flex>
                )}
                {dataUsage && (
                    <Flex vertical className="text-center">
                        <Text className="font-semibold text-base">Data</Text>
                        <Text className="text-base">{dataUsage}</Text>
                    </Flex>
                )}
                <Button
                    danger
                    className="h-full text-xs font-medium sm:text-base sm:px-5"
                    onClick={handleButtonClick}
                >
                    ₹ {amount}
                </Button>
            </Flex>
            <Space direction="vertical" size="small">
                <Text className="font-semibold text-base">Description</Text>
                <Text className="font-normal text-base">{formatDescription(description)}</Text>
            </Space>
        </Content>
    );
};

export default React.memo(PlanCard);
