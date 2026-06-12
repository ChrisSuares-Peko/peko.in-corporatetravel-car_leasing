import * as Yup from 'yup';

export const bankVerificationSchema = Yup.object().shape({
    accountNumber: Yup.string()
        .trim()
        .required('Please enter the account number')
        .matches(/^\d+$/, 'Account number must contain digits only')
        .min(9, 'Account number must be at least 9 digits')
        .max(18, 'Account number cannot exceed 18 digits'),
    ifsc: Yup.string()
        .trim()
        .required('Please enter the IFSC code')
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Enter a valid IFSC code (e.g. SBIN0001234)'),
    name: Yup.string()
        .trim()
        .required('Please enter the account holder name')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),
    phone: Yup.string()
        .trim()
        .required('Please enter the phone number')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
});
