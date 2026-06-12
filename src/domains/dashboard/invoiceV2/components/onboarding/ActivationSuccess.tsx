import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';

import CenteredHeader from '../shared/CenteredHeader';

type Props = {
    onDone: () => void;
    virtualAccount?: string | null;
};

const ActivationSuccess = ({ onDone, virtualAccount }: Props) => (
    <Flex vertical gap={10} align="center">
        <CenteredHeader
            icon={<CheckOutlined className="text-white text-lg" />}
            outerClass="bg-[#E8FAF0]"
            middleClass="bg-[#D1F4E0]"
            innerClass="bg-[#45D483]"
            title="Payment Collections Activated"
            description="Your virtual account has been created successfully"
        />

        <Flex gap={8} align="center" className='mb-2'>
            <Typography.Text className="text-gray-500 text-sm ">
                Virtual Account:
            </Typography.Text>
            <Typography.Text className="text-base font-semibold">
                {virtualAccount ?? 'PEKO - '}
            </Typography.Text>
        </Flex>

        <Button
            type="primary"
            danger
            className="h-10"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            onClick={onDone}
        >
            Continue to Dashboard
        </Button>
    </Flex>
);

export default ActivationSuccess;
