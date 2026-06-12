import * as Yup from 'yup';

export const invoiceRemindersSchema = Yup.object({
    interval: Yup.string().required('Please select a reminder interval'),
    customDays: Yup.number().when('interval', {
        is: 'custom',
        then: schema =>
            schema
                .typeError('Must be a number')
                .required('Please enter number of days')
                .min(1, 'Must be at least 1 day'),
        otherwise: schema => schema.optional(),
    }),
    sendSms: Yup.boolean().test(
        'at-least-one-action',
        'Please select at least one action (SMS or Email) to proceed.',
        function () {
            return this.parent.sendSms || this.parent.sendEmail;
        }
    ),
    sendEmail: Yup.boolean(),
});
