import * as Yup from 'yup';

import { calcTotal } from '../utils/invoiceCalculations';

export const createInvoiceSchema = Yup.object({
    buyer: Yup.object({
        name: Yup.string()
            .required('Please enter the customer name')
            .matches(/^[a-zA-Z&.\- ]*$/, 'Name can only contain letters, spaces, &, ., and -')
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

        gstNumber: Yup.string().optional(),

        address: Yup.string()
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

        country: Yup.string().optional(),

        pincode: Yup.string().optional(),

        email: Yup.string()
            .required('Please enter the customer email ID')
            .email('Please enter a valid email'),

        phoneNumber: Yup.string()
            .required('Please enter the customer mobile number')
            .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),

        saveCustomer: Yup.boolean(),
    }),

    invoice: Yup.object({
        type: Yup.string().oneOf(['DOMESTIC', 'INTERNATIONAL']).required(),

        invoicePrefix: Yup.string().required('Prefix is required'),

        invoiceNumber: Yup.string()
            .required('Please enter the invoice number')
            .matches(/^[^\s].*$/, 'Invoice number cannot start with whitespace'),

        currency: Yup.string().when('type', {
            is: 'INTERNATIONAL',
            then: schema => schema.required('Please select the Currency'),
            otherwise: schema => schema.optional(),
        }),

        invoiceDate: Yup.string()
            .required('Please select the invoice date')
            .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invoice date must be in YYYY-MM-DD format'),

        dueDate: Yup.string()
            .required('Please select the due date')
            .test(
                'after-invoice-date',
                'Due date must be after invoice date',
                function validateDueDate(dueDate) {
                    const { invoiceDate } = this.parent;
                    if (!invoiceDate || !dueDate) return true;
                    return dueDate > invoiceDate;
                }
            ),
    }),

    items: Yup.array()
        .of(
            Yup.object({
                name: Yup.string()
                    .required('Please enter an item title')
                    .test(
                        'no-leading-trailing-spaces',
                        'Title cannot start or end with blank space.',
                        v => !/^\s|\s$/.test(v ?? '')
                    )
                    .test(
                        'no-consecutive-spaces',
                        'Title cannot contain consecutive blank spaces.',
                        v => !/\s{2,}/.test(v ?? '')
                    )
                    .min(3, 'Title must be at least 3 characters'),

                hsn: Yup.string()
                    .required('Please enter the HSN code')
                    .matches(/^\d+$/, 'HSN code must be numeric only')
                    .matches(/^\S+$/, 'HSN code must not contain spaces')
                    .test('valid-hsn-length', 'HSN code must be 2, 4, 6, or 8 digits', v =>
                        [2, 4, 6, 8].includes((v ?? '').length)
                    ),

                quantity: Yup.number()
                    .typeError('Quantity must be a number')
                    .required('Please enter the quantity')
                    .min(1, 'Quantity must be at least 1'),

                unit: Yup.string().required('Please select the unit'),

                unitPrice: Yup.number()
                    .typeError('Price must be a number')
                    .required('Please enter the price')
                    .min(0, 'Price must be 0 or more'),

                discount: Yup.number()
                    .typeError('Discount must be a number')
                    .required('Discount is required')
                    .min(0, 'Discount must be 0 or more')
                    .max(100, 'Discount must be at most 100'),

                taxRate: Yup.string().required('Please select the GST tax rate'),
            })
        )
        .min(1, 'Please add at least one item'),

    additional: Yup.object({
        termsAndConditions: Yup.string().optional(),
        notes: Yup.string().optional(),

        shippingCost: Yup.number().nullable().optional().min(0, 'Shipping must be 0 or more'),

        amountPaid: Yup.number()
            .typeError('Amount paid must be a number')
            .nullable()
            .optional()
            .min(0, 'Amount paid must be 0 or more'),

        paymentMode: Yup.string().required('Please select a payment mode'),
    }),
}).test('cross-field-validations', '', function validateCrossFields(values) {
    const errors: Yup.ValidationError[] = [];
    const invoiceType = values?.invoice?.type;

    if (invoiceType === 'INTERNATIONAL' && !values?.buyer?.country) {
        errors.push(
            this.createError({ path: 'buyer.country', message: 'Please select the country' })
        );
    }

    if (invoiceType === 'DOMESTIC') {
        if (!values?.buyer?.gstNumber) {
            errors.push(
                this.createError({ path: 'buyer.gstNumber', message: 'Please enter the GSTIN' })
            );
        } else if (values.buyer.gstNumber.length !== 15) {
            errors.push(
                this.createError({
                    path: 'buyer.gstNumber',
                    message: 'GSTIN must be 15 characters',
                })
            );
        } else if (
            !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
                values.buyer.gstNumber
            )
        ) {
            errors.push(
                this.createError({
                    path: 'buyer.gstNumber',
                    message: 'Please enter a valid GST number',
                })
            );
        }

        if (!values?.buyer?.pincode) {
            errors.push(
                this.createError({ path: 'buyer.pincode', message: 'Please enter the PIN code' })
            );
        } else if (!/^[0-9]{6}$/.test(values.buyer.pincode)) {
            errors.push(
                this.createError({
                    path: 'buyer.pincode',
                    message: 'PIN code must be exactly 6 digits',
                })
            );
        }
    }

    const amountPaid = values?.additional?.amountPaid;
    if (amountPaid != null && amountPaid > 0) {
        const total = parseFloat(
            calcTotal((values?.items ?? []) as any, String(values?.additional?.shippingCost ?? ''))
        );
        if (amountPaid > total) {
            errors.push(
                this.createError({
                    path: 'additional.amountPaid',
                    message: 'Amount Paid cannot be greater than the total',
                })
            );
        }
    }

    if (errors.length > 0) {
        throw new Yup.ValidationError(errors);
    }
    return true;
});
