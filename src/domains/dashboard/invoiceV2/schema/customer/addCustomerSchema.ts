import * as Yup from 'yup';

export const addCustomerSchema = Yup.object().shape({
    name: Yup.string()
        .required('Please enter the customer name')
        .test(
            'no-leading-trailing-spaces',
            'Customer name cannot start or end with blank space',
            v => !/^\s|\s$/.test(v ?? '')
        )
        .test(
            'no-consecutive-spaces',
            'Customer name cannot contain consecutive blank spaces',
            v => !/\s{2,}/.test(v ?? '')
        )
        .min(3, 'Customer name must be at least 3 characters')
        .max(50, 'Customer name cannot exceed 50 characters'),

    gstin: Yup.string()
        .optional()
        .test('valid-gstin', 'Please enter a valid GST number', v => {
            if (!v) return true;
            if (v.length !== 15) return false;
            return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);
        }),

    phoneNumber: Yup.string()
        .required('Please enter the customer mobile number')
        .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),

    email: Yup.string()
        .required('Please enter the customer email ID')
        .email('Please enter a valid email'),

    upiId: Yup.string().trim(),

    primaryAddress: Yup.string()
        .required('Please enter the customer address')
        .test(
            'no-leading-trailing-spaces',
            'Customer address cannot start or end with blank space',
            v => !/^\s|\s$/.test(v ?? '')
        )
        .test(
            'no-consecutive-spaces',
            'Customer address cannot contain consecutive blank spaces',
            v => !/\s{2,}/.test(v ?? '')
        )
        .min(3, 'Customer address must be at least 3 characters')
        .max(100, 'Customer address cannot exceed 100 characters'),

    primaryCity: Yup.string()
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

    primaryState: Yup.string()
        .required('Please select the state')
        .max(50, 'State cannot exceed 50 characters'),

    primaryPincode: Yup.string()
        .required('Please enter the PIN code')
        .matches(/^[0-9]{6}$/, 'PIN code must be exactly 6 digits'),

    primaryCountry: Yup.string().required('Country is required'),

    shippingSameAsPrimary: Yup.boolean(),

    shippingAddress: Yup.string().when('shippingSameAsPrimary', {
        is: false,
        then: schema =>
            schema
                .required('Please enter the customer address')
                .test(
                    'no-leading-trailing-spaces',
                    'Customer address cannot start or end with blank space',
                    v => !/^\s|\s$/.test(v ?? '')
                )
                .test(
                    'no-consecutive-spaces',
                    'Customer address cannot contain consecutive blank spaces',
                    v => !/\s{2,}/.test(v ?? '')
                )
                .min(3, 'Customer address must be at least 3 characters')
                .max(100, 'Customer address cannot exceed 100 characters'),
        otherwise: schema => schema,
    }),

    shippingCity: Yup.string().when('shippingSameAsPrimary', {
        is: false,
        then: schema =>
            schema
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
        otherwise: schema => schema,
    }),

    shippingState: Yup.string().when('shippingSameAsPrimary', {
        is: false,
        then: schema =>
            schema.required('Please select the state').max(50, 'State cannot exceed 50 characters'),
        otherwise: schema => schema,
    }),

    shippingPincode: Yup.string().when('shippingSameAsPrimary', {
        is: false,
        then: schema =>
            schema
                .required('Please enter the PIN code')
                .matches(/^[0-9]{6}$/, 'PIN code must be exactly 6 digits'),
        otherwise: schema =>
            schema.matches(/^[0-9]{6}$/, {
                message: 'PIN code must be exactly 6 digits',
                excludeEmptyString: true,
            }),
    }),
});
