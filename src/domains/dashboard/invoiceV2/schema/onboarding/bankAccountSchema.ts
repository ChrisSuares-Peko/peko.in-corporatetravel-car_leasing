import * as Yup from 'yup';

export const bankAccountSchema = Yup.object().shape({
    bankName: Yup.string()
        .required('Please enter the bank name')
        .test(
            'no-edge-spaces',
            'Bank name cannot start or end with a blank space',
            v => !v || !/^\s|\s$/.test(v)
        )
        .test(
            'no-consecutive-spaces',
            'Bank name cannot contain consecutive blank spaces',
            v => !v || !/\s{2,}/.test(v)
        )
        .min(3, 'Bank name must be at least 3 characters')
        .max(100, 'Bank name cannot exceed 100 characters'),
    accountNumber: Yup.string()
        .required('Please enter the account number')
        .matches(/^\d+$/, 'Account number must contain digits only')
        .min(9, 'Account number must be at least 9 digits')
        .max(18, 'Account number cannot exceed 18 digits'),
    ifsc: Yup.string()
        .required('Please enter the IFSC code')
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Enter a valid IFSC code (e.g. SBIN0001234)'),
});
