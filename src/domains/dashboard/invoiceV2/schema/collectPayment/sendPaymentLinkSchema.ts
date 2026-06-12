import * as Yup from 'yup';

export const sendPaymentLinkSchema = Yup.object().shape({
    amount: Yup.string().trim().required('Amount is required'),
    customerName: Yup.string().trim(),
    customerPhone: Yup.string().trim(),
    linkExpiry: Yup.string()
        .nullable()
        .oneOf(['5m', '10m', '1h', '6h', '12h', '24h', null], 'Invalid expiry duration'),
});
