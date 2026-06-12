import { RedoOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';

import DatePickerInput from '@components/atomic/inputs/DatePickerInput';
import SelectInputWithSearch from '@components/atomic/inputs/SelectInputWithSearch';
import TextInput from '@components/atomic/inputs/TextInput';

import { CURRENCY_OPTIONS } from '../../constants/createInvoice';
import { CreateInvoiceFormValues } from '../../types/createInvoice';
import { generateInvoiceNumber } from '../../utils/helperFunctions';

const InvoiceDetailsForm = () => {
    const { values, setFieldValue } = useFormikContext<CreateInvoiceFormValues>();
    const isInternational = values.invoice.type === 'INTERNATIONAL';
    const minDueDate = values.invoice.invoiceDate
        ? dayjs(values.invoice.invoiceDate).add(1, 'day')
        : undefined;

    return (
        <Flex vertical gap={14} className="w-full">
            <Typography.Text className="text-xl font-medium">Invoice Details</Typography.Text>

            <Flex gap={8} align="flex-start">
                <TextInput
                    name="invoice.invoicePrefix"
                    placeholder="Prefix"
                    type="text"
                    formItemClass="m-0 w-24"
                />
                <TextInput
                    name="invoice.invoiceNumber"
                    placeholder="Enter Invoice Number"
                    type="text"
                    formItemClass="m-0 flex-1"
                />
                <Tooltip title="Regenerate invoice number">
                    <Button
                        icon={<RedoOutlined />}
                        onClick={() =>
                            setFieldValue('invoice.invoiceNumber', generateInvoiceNumber())
                        }
                        className="mt-[1px]"
                    />
                </Tooltip>
            </Flex>

            {isInternational && (
                <Flex className="w-full [&_.ant-form-item]:mb-0 [&_.ant-form-item]:w-full">
                    <SelectInputWithSearch
                        name="invoice.currency"
                        placeholder="Select Currency"
                        options={CURRENCY_OPTIONS}
                    />
                </Flex>
            )}

            <DatePickerInput
                name="invoice.invoiceDate"
                placeholder="Invoice Date"
                classes="w-full"
                formItemClass="m-0"
                needConfirm={false}
            />

            <DatePickerInput
                name="invoice.dueDate"
                placeholder="Due Date"
                classes="w-full"
                formItemClass="m-0"
                needConfirm={false}
                minDate={minDueDate}
                isRequired
            />
        </Flex>
    );
};

export default InvoiceDetailsForm;
