import { useEffect } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useFormikContext } from 'formik';

import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';

import { GST_OPTIONS, UNIT_OPTIONS } from '../../constants/createInvoice';
import { CreateInvoiceFormValues, ItemValues } from '../../types/createInvoice';
import { computeNetAmount } from '../invoiceCalculations';

const NetAmountCell = ({ index }: { index: number }) => {
    const { values, setFieldValue } = useFormikContext<CreateInvoiceFormValues>();
    const item = values.items[index];
    const net = computeNetAmount(item);
    const netStr = net > 0 ? net.toFixed(2) : '';

    useEffect(() => {
        setFieldValue(`items[${index}].netAmount`, netStr);
    }, [item.quantity, item.unitPrice, item.discount, item.taxRate, setFieldValue, index, netStr]);

    return (
        <TextInput name={`items[${index}].netAmount`} placeholder="0.00" type="text" isDisabled />
    );
};

const topCell = () => ({ style: { verticalAlign: 'top' as const } });

export const getItemsTableColumns = (
    remove: (index: number) => void,
    rowCount: number
): ColumnsType<ItemValues & { key: number }> => [
    {
        title: 'Title',
        width: 200,
        onCell: topCell,
        render: (_, __, index) => (
            <TextInput name={`items[${index}].name`} placeholder="Title" type="text" />
        ),
    },
    {
        title: 'HSN',
        onCell: topCell,
        render: (_, __, index) => (
            <TextInput
                name={`items[${index}].hsn`}
                placeholder="HSN"
                type="text"
                allowNumbersOnly
            />
        ),
    },
    {
        title: 'Quantity',
        onCell: topCell,
        render: (_, __, index) => (
            <TextInput
                name={`items[${index}].quantity`}
                placeholder="Quantity"
                type="text"
                allowNumbersOnly
            />
        ),
    },
    {
        title: 'Unit',
        onCell: topCell,
        render: (_, __, index) => (
            <SelectInput name={`items[${index}].unit`} placeholder="Unit" options={UNIT_OPTIONS} />
        ),
    },
    {
        title: 'Unit Price (₹)',
        onCell: topCell,
        render: (_, __, index) => (
            <TextInput
                name={`items[${index}].unitPrice`}
                placeholder="Price"
                type="text"
                allowTwoDecimalsOnly
            />
        ),
    },
    {
        title: 'Discount (%)',
        onCell: topCell,
        render: (_, __, index) => (
            <TextInput
                name={`items[${index}].discount`}
                placeholder="0"
                type="text"
                allowNumbersOnly
            />
        ),
    },
    {
        title: 'Tax Rate (%)',
        onCell: topCell,
        render: (_, __, index) => (
            <SelectInput name={`items[${index}].taxRate`} placeholder="GST" options={GST_OPTIONS} />
        ),
    },
    {
        title: 'Net Amount (₹)',
        align: 'center',
        onCell: topCell,
        render: (_, __, index) => <NetAmountCell index={index} />,
    },
    {
        title: '',
        width: 40,
        onCell: topCell,
        render: (_, __, index) => (
            <DeleteOutlined
                onClick={rowCount > 1 ? () => remove(index) : undefined}
                className={
                    rowCount > 1
                        ? 'text-red-500 cursor-pointer text-sm'
                        : 'text-gray-300 cursor-not-allowed text-sm'
                }
            />
        ),
    },
];
