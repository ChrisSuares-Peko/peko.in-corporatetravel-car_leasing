import { Button, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

const ComingSoon = () => {
    const navigate = useNavigate();

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            gap={16}
            className="text-center px-5 md:px-0 font-roboto"
        >
            <Typography.Title level={2} className="!mb-0">
                Coming Soon
            </Typography.Title>
            <Typography.Text className="text-sm md:text-base text-textGreyLight">
                We're working hard to bring this service to you.
            </Typography.Text>
            <Typography.Text className="text-sm text-textGreyLight">
                Stay tuned for updates.
            </Typography.Text>
            <Button
                type="default"
                danger
                className="mt-2"
                onClick={() => navigate(paths.dashboard.moreServices)}
            >
                Back to More Services
            </Button>
        </Flex>
    );
};

export default ComingSoon;
