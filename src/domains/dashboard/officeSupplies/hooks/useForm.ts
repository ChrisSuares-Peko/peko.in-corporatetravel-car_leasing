import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { accessKeys } from '@utils/accessKeys';
import { formatNumberWithLocalString } from '@utils/priceFormat';

import useBasicInfoApi from './useGetBasicInfo';
import useSurchargeDetails from './useSurchargeApi';
import { setPaymentData } from '../../payments/slices/payment';
import { AddressField } from '../types/address';

export default function useForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data } = useBasicInfoApi();
    const { totalVat, grandTotal, cartId, itemsTotalAmount, shippingCharge } = useAppSelector(
        state => state.reducer.cart
    );

    const { surchargeData } = useSurchargeDetails();
    const amount = grandTotal;
    const total =
        (amount || 0) + (surchargeData?.surcharge ? parseInt(surchargeData.surcharge, 10) : 0);

    const handleSubmission = useCallback(
        async (values: AddressField) => {
            const billSummary = [
                {
                    key: 'Service Name',
                    value: 'Office Supplies',
                },
                {
                    key: 'Company Name',
                    value: data?.name ?? ' ',
                },
                {
                    key: 'Amount',
                    value: `${(amount ?? 0).toFixed(2)}`,
                },
            ];

            const paymentSummary = [
                {
                    key: 'Sub Total',
                    value: `₹ ${(itemsTotalAmount - totalVat).toFixed(2)}`,
                },
                {
                    key: 'GST',
                    value: `₹ ${totalVat.toFixed(2)}`,
                },
                {
                    key: 'Shipping Fees',
                    value: `₹ ${formatNumberWithLocalString(shippingCharge ?? 0)}`,
                },
                {
                    key: 'Platform fee (inclusive of GST)',
                    value: `${formatNumberWithLocalString(surchargeData?.surcharge)}`,
                },
            ];

            const requestBody = {
                cartId,
                amount,
                transactionId: new Date().valueOf(),
                userEmail: data?.email ?? ' ',
                address: values,
                accessKey: accessKeys.officeSupplies,
                currentUrl: window.location.href,
            };

            dispatch(
                setPaymentData({
                    billSummary,
                    paymentSummary,
                    totalAmount: total,
                    title: 'Bill Summary',
                    payload: requestBody,
                    url: 'purchase/ecommerce/payment',
                    earningCashbackAmount:
                        Number(surchargeData && surchargeData?.corporateCashback) || 0,
                })
            );

            navigate(paths.dashboard.payments);
        },
        [
            amount,
            cartId,
            data?.name,
            data?.email,
            dispatch,
            itemsTotalAmount,
            navigate,
            shippingCharge,
            surchargeData,
            total,
            totalVat,
        ]
    );

    return { handleSubmission, data };
}
