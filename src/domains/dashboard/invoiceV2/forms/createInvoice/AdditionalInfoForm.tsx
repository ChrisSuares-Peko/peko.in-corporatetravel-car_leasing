import { Flex, Form, Typography } from 'antd';

import InputTextArea from '@components/atomic/inputs/InputTextArea';

const AdditionalInfoForm = () => (
    <Form layout="vertical" className="w-full [&_.ant-form-item]:mb-2">
        <Flex vertical gap={6}>
            <Typography.Text className="text-xl font-medium">
                Additional Information
            </Typography.Text>

            <InputTextArea
                name="additional.termsAndConditions"
                label="Terms & Conditions"
                placeholder="Enter Terms & Conditions"
                autoSize={{ minRows: 3, maxRows: 6 }}
            />

            <InputTextArea
                name="additional.notes"
                label="Notes"
                placeholder="Enter Notes"
                autoSize={{ minRows: 3, maxRows: 6 }}
            />
        </Flex>
    </Form>
);

export default AdditionalInfoForm;
