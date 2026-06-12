// Procure validation schemas
import * as Yup from 'yup';

export const newPurchaseRequestSchema = Yup.object({
    requestedBy: Yup.string().required('Please select a requester'),
    department: Yup.string().required('Please enter a department'),
    category: Yup.string().required('Please enter a category'),
    description: Yup.string().required('Please enter a description'),
    budget: Yup.string().required('Please enter an estimated budget'),
    needBy: Yup.string().nullable(),
    notes: Yup.string().notRequired(),
});

export const addVendorSchema = Yup.object({
    businessName: Yup.string().required('Please enter the business name'),
    tradeLicense: Yup.string().notRequired(),
    contactPerson: Yup.string().required('Please enter the contact person name'),
    email: Yup.string().email('Please enter a valid email address').required('Please enter an email address'),
    phone: Yup.string().notRequired(),
    currency: Yup.string().required('Please select a currency'),
    paymentTerms: Yup.string().required('Please select payment terms'),
    status: Yup.string().required('Please select a status'),
    bankName: Yup.string().notRequired(),
    accountNumber: Yup.string().notRequired(),
    iban: Yup.string().notRequired(),
});

export const newRFQSchema = Yup.object({
    title: Yup.string().required('Please enter a title'),
    prRef: Yup.string().nullable(),
    deadline: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date')
        .required('Please select a submission deadline'),
    terms: Yup.string().notRequired(),
    notes: Yup.string().notRequired(),
});

export const newPurchaseOrderSchema = Yup.object({
    vendor: Yup.string().required('Please select a vendor'),
    linkedPR: Yup.string().nullable(),
    deliveryDate: Yup.string().nullable(),
    currency: Yup.string().required('Please select a currency'),
    deliveryAddress: Yup.string().required('Please enter a delivery address'),
    paymentTerms: Yup.string().nullable(),
    notes: Yup.string().notRequired(),
    internalNotes: Yup.string().notRequired(),
});
