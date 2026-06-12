import { Flex, Typography } from 'antd';

import type { HostingPlan } from '../../hooks/useHostingPlans';

const { Text } = Typography;

interface Props {
    plans: HostingPlan[];
}

const GoogleWorkspaceHero = ({ plans }: Props) => (
    <div
        className="w-full rounded-[30px] p-6 lg:p-[60px]"
        style={{ background: 'linear-gradient(260.95deg, #F0F5FA 2.04%, #FFF2F2 100.06%)' }}
    >
        <Flex vertical gap={20}>
            <Flex vertical gap={16}>
                <Typography.Title className="!mb-0 !mt-0 capitalize !text-[28px] !font-semibold !leading-normal !text-[#1f1f1f] lg:!text-[46px]">
                    Google Workspace
                </Typography.Title>
                <Text className="block text-[16px] font-medium leading-[40px] text-[#1f1f1f] lg:text-[24px]">
                    Unleash the power of AI
                </Text>
            </Flex>
            <Flex vertical gap={0}>
                <Text className="text-[14px] text-[#1f1f1f] lg:text-[20px]">As low as</Text>
                <Flex align="baseline" gap={2}>
                    <Text className="text-[22px] font-semibold text-[#1f1f1f] lg:text-[32px]">
                        {plans.length && plans[0].price != null ? `₹${plans[0].price}` : ''}
                    </Text>
                    <Text className="text-[14px] font-medium text-[#1f1f1f] lg:text-[20px]">/mo</Text>
                </Flex>
            </Flex>
        </Flex>
    </div>
);

export default GoogleWorkspaceHero;
