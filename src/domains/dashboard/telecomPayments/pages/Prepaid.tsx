import { Col, Flex, Row, Typography } from 'antd';

import { accessKeys } from '@utils/accessKeys';

import BeneficiariesList from '../components/BeneficiariesList';
import PrepaidForm from '../components/forms/PrepaidForm';

const { Text } = Typography;

const Prepaid: React.FC = () => {
    const accessKey = accessKeys.prepaid;
    return (
        <Row>
            <Col xl={13} className="w-full xl:sticky xl:top-0 h-fit">
                <Flex vertical gap={30}>
                    <Text className="text-lg font-medium">Mobile Prepaid</Text>
                    <PrepaidForm />
                </Flex>
            </Col>
            <Col
                xl={{ span: 9, offset: 2 }}
                className="w-full sm:bg-gray-50 rounded-3xl sm:p-6 mt-10 sm:mt-5 xl:mt-0"
            >
                <BeneficiariesList accessKeyName={accessKey} />
            </Col>
        </Row>
    );
};

export default Prepaid;
