import React from 'react';

import { Flex, Form, Typography } from 'antd';
import { useFormikContext } from 'formik';

import CheckboxInput from '@components/atomic/inputs/CheckboxInput';
import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';

import { INTERVAL_OPTIONS, INTERVAL_TO_DAYS } from '../../constants/invoiceDetails';
import { InvoiceRemindersFormValues } from '../../types/invoiceDetails';

const getPreviewText = (interval: string, customDays?: string): string => {
    if (!interval) return '';
    const days = interval === 'custom' ? Number(customDays) : INTERVAL_TO_DAYS[interval];
    if (!days) return '';
    return days === 1 ? 'Every day after due date' : `Every ${days} days after due date`;
};

const InvoiceRemindersForm: React.FC = () => {
    const { values, errors, touched } = useFormikContext<InvoiceRemindersFormValues>();
    const isCustom = values.interval === 'custom';
    const preview = getPreviewText(values.interval, values.customDays);

    return (
        <Form layout="vertical">
            <SelectInput
                name="interval"
                label="Reminder Interval"
                placeholder="Select Interval"
                options={INTERVAL_OPTIONS}
                formItemClass="mb-2"
            />

            {isCustom && (
                <TextInput
                    name="customDays"
                    label="Custom Days"
                    placeholder="Enter number of days"
                    type="text"
                    allowNumbersOnly
                    formItemClass="mb-2"
                />
            )}
            {preview && (
                <Flex className="px-3 py-2 bg-blue-50 rounded-md">
                    <Typography.Text className="text-xs text-[#475569]">
                        Reminder will be sent on:{' '}
                        <Typography.Text className="text-xs font-semibold text-[#1D4ED8]">
                            {preview}
                        </Typography.Text>
                    </Typography.Text>
                </Flex>
            )}

            <Flex vertical className="mb-3">
                <Flex
                    gap={16}
                    className="[&_.ant-form-item-explain]:hidden [&_.ant-form-item]:mb-0"
                >
                    <CheckboxInput name="sendSms">Send SMS</CheckboxInput>
                    <CheckboxInput name="sendEmail">Send Email</CheckboxInput>
                </Flex>
                {touched.sendSms && errors.sendSms && (
                    <Typography.Text className="text-xs text-red-500 mt-1">
                        {errors.sendSms}
                    </Typography.Text>
                )}
            </Flex>
        </Form>
    );
};

export default React.memo(InvoiceRemindersForm);
