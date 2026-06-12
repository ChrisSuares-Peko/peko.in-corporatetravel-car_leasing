import { Flex } from 'antd';
import { useFormikContext } from 'formik';

import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';

import SummaryRow from './SummaryRow';
import { PAYMENT_METHODS } from '../../constants';
import { CreateInvoiceFormValues } from '../../types/createInvoice';
import {
    calcAmountDue,
    calcDiscount,
    calcSubtotal,
    calcTax,
    calcTotal,
} from '../../utils/invoiceCalculations';

const SummarySection = () => {
    const { values } = useFormikContext<CreateInvoiceFormValues>();

    const subtotal = calcSubtotal(values.items);
    const tax = calcTax(values.items);
    const discount = calcDiscount(values.items);
    const total = calcTotal(values.items, values.additional.shippingCost);
    const amountDue = calcAmountDue(total, values.additional.amountPaid);

    return (
        <Flex vertical className="w-full px-3 bg-white">
            <SummaryRow label="Subtotal" amount={subtotal} />
            <SummaryRow label="Tax" amount={tax} />
            <SummaryRow label="Discount" amount={discount} />

            <SummaryRow label="Shipping Cost">
                <TextInput
                    name="additional.shippingCost"
                    placeholder="Enter Amount"
                    type="text"
                    size="middle"
                    formItemClass="m-0"
                    allowNumbersOnly
                />
            </SummaryRow>

            <SummaryRow label="Total Amount" amount={total} />

            <SummaryRow label="Amount Paid">
                <TextInput
                    name="additional.amountPaid"
                    placeholder="Enter Amount"
                    type="text"
                    formItemClass="m-0"
                    allowTwoDecimalsOnly
                />
            </SummaryRow>

            <SummaryRow label="Amount Due" amount={amountDue} />

            <SummaryRow label="Payment Mode">
                <Flex className="min-w-[175px] [&_.ant-form-item]:mb-0 [&_.ant-form-item]:w-full [&_.ant-form-item-explain]:whitespace-nowrap">
                    <SelectInput
                        name="additional.paymentMode"
                        placeholder="Payment Mode"
                        options={PAYMENT_METHODS}
                        isRequired
                    />
                </Flex>
            </SummaryRow>
        </Flex>
    );
};

export default SummarySection;
