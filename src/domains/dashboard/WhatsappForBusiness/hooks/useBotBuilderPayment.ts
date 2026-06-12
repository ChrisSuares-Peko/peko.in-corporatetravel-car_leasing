import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { accessKeys } from '@utils/accessKeys';

import GetSurcharge from './useSurchargeApi';
import { setPaymentData } from '../../payments/slices/payment';
import { resetWhatsappBusinessState } from '../slices/paymentSlice';

export default function useBotBuilderPayment() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { getSurchargeData } = GetSurcharge();

    const handleSubmission = useCallback(
        async (amount: string, projectId: string) => {
            const surchargeData = await getSurchargeData(amount);

            const total =
                (amount ? parseFloat(amount) : 0) +
                (surchargeData?.surcharge ? parseFloat(surchargeData.surcharge) : 0);

            const billSummary = [
                {
                    key: 'Service name',
                    value: 'WhatsApp for Business',
                },
                {
                    key: 'Add-on',
                    value: 'Bot Builder',
                },
                {
                    key: 'Amount',
                    value: new Intl.NumberFormat('en-IN').format(Number(amount)) ?? 0,
                },
            ];

            const paymentSummary = [
                {
                    key: 'Platform fee (inclusive of VAT)',
                    value:
                        new Intl.NumberFormat('en-IN').format(
                            Number(surchargeData?.surcharge) ?? 0
                        ) ?? 0,
                },
            ];

            const requestBody = {
                amount,
                project_id: projectId,
                isAddOns: true,
                accessKey: accessKeys.whatsappBasic,
                successUrl: `${paths.dashboard.whatsappForBusiness}/${paths.whatsappForBusiness.successPage}`,
                currentUrl: window.location.href,
            };

            dispatch(
                setPaymentData({
                    billSummary,
                    paymentSummary,
                    totalAmount: total,
                    title: 'Bill Summary',
                    payload: requestBody,
                    url: '',
                    earningCashbackAmount: Number(surchargeData?.corporateCashback) || 0,
                })
            );

            navigate(paths.dashboard.payments);
            dispatch(resetWhatsappBusinessState());
        },
        [dispatch, navigate, getSurchargeData]
    );

    return { handleSubmission };
}
