import { InvoiceType } from './index';

export type BuyerValues = {
    customerId?: string;
    name: string;
    gstNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    email: string;
    phoneNumber: string;
    saveCustomer: boolean;
};

export type InvoiceValues = {
    type: InvoiceType;
    invoicePrefix: string;
    invoiceNumber: string;
    currency: string;
    invoiceDate: string;
    dueDate: string;
};

export type ItemValues = {
    name: string;
    hsn: string;
    quantity: string;
    unit: string;
    unitPrice: string;
    discount: string;
    taxRate: string;
    netAmount: string;
};

export type AdditionalValues = {
    termsAndConditions: string;
    notes: string;
    shippingCost: string;
    amountPaid: string;
    paymentMode: string;
};

export type CreateInvoiceFormValues = {
    buyer: BuyerValues;
    invoice: InvoiceValues;
    items: ItemValues[];
    additional: AdditionalValues;
};

export type CustomerOption = {
    id: number;
    name: string;
    gstin?: string;
    primaryAddress: string;
    primaryCity: string;
    primaryState: string;
    primaryPincode: string;
    primaryCountry: string;
    email: string;
    phoneNumber: string;
};

export type CreateInvoicePayload = {
    userId: number;
    userType: string;

    // buyer
    customerId?: string;
    name: string;
    gstNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    email: string;
    phoneNumber: string;
    saveCustomer: boolean;

    // invoice
    invoiceType: InvoiceType;
    prefix: string;
    invoiceNumber: string;
    currency: string;
    invoiceDate: string;
    dueDate: string;

    // items
    items: ItemValues[];

    // additional
    termsAndConditions: string;
    notes: string;
    shippingCost: string;
    amountPaid: string;
    paymentMode: string;

    // computed
    subtotal: string;
    discount: string;
    tax: string;
    totalAmount: string;
};