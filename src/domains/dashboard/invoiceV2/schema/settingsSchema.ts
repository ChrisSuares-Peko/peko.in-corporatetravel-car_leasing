import * as Yup from 'yup';

export const settingsSchema = Yup.object().shape({
    businessName: Yup.string()
        .required('Please enter the business name')
        .test(
            'no-leading-trailing-spaces',
            'Business name cannot start or end with blank space',
            v => !/^\s|\s$/.test(v ?? '')
        )
        .test(
            'no-consecutive-spaces',
            'Business name cannot contain consecutive blank spaces',
            v => !/\s{2,}/.test(v ?? '')
        )
        .min(3, 'Business name must be at least 3 characters')
        .max(100, 'Business name cannot exceed 100 characters'),

    address: Yup.string()
        .required('Please enter the address')
        .test(
            'no-leading-trailing-spaces',
            'Address cannot start or end with blank space',
            v => !/^\s|\s$/.test(v ?? '')
        )
        .test(
            'no-consecutive-spaces',
            'Address cannot contain consecutive blank spaces',
            v => !/\s{2,}/.test(v ?? '')
        )
        .min(3, 'Address must be at least 3 characters')
        .max(100, 'Address cannot exceed 100 characters'),

    city: Yup.string()
        .required('Please enter the city name')
        .test(
            'no-leading-space',
            'City name cannot start with whitespace',
            v => !/^\s/.test(v ?? '')
        )
        .test(
            'no-consecutive-spaces',
            'City name cannot contain consecutive whitespaces',
            v => !/\s{2,}/.test(v ?? '')
        )
        .min(3, 'City name must be at least 3 characters')
        .max(50, 'City name cannot exceed 50 characters'),

    state: Yup.string()
        .required('Please enter the state')
        .max(50, 'State cannot exceed 50 characters'),

    pincode: Yup.string()
        .required('Please enter the PIN code')
        .matches(/^[0-9]{6}$/, 'PIN code must be exactly 6 digits'),

    phone: Yup.string()
        .required('Please enter the mobile number')
        .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),

    email: Yup.string().required('Please enter the email ID').email('Please enter a valid email'),

    gstNo: Yup.string()
        .optional()
        .test('valid-gstin', 'Please enter a valid GST number', v => {
            if (!v) return true;
            if (v.length !== 15) return false;
            return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);
        }),
    autoUpdateDocNumber: Yup.boolean(),
    documentPrefixes: Yup.object().test(
        'valid-prefixes',
        'Prefixes must be strings',
        val => !val || Object.values(val).every(v => typeof v === 'string')
    ),
    termsAndConditions: Yup.string().trim(),
    notes: Yup.string().trim(),
});
