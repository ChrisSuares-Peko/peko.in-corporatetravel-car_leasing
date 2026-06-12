import { InvoiceType } from './index';
import { ReminderItem } from './invoiceDetails';

export interface InvoiceRow {
    id: string;
    prefix: string;
    invoiceNumber: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
    totalAmount: string;
    invoiceType: string;
    status: 'Paid' | 'Pending' | 'Overdue';
    invoiceDate: string;
    dueDate: string;
    amountDue: string;
}

export type InvoiceStats = {
    totalInvoices: string;
    totalPaid: string;
    totalDue: string;
};

export type GetAllInvoicesResponse = {
    invoiceData: InvoiceRow[];
    recordsTotal: number;
};

export interface GetInvoiceByIdResponse {
    id: string;
    invoiceType: InvoiceType;
    prefix: string;
    invoiceNumber: string;
    currency: string;
    invoiceDate: string;
    dueDate: string;
    createdAt?: string;
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
    // items
    items: {
        name: string;
        hsn: string;
        quantity: string;
        unit: string;
        unitPrice: string;
        discount: string;
        taxRate: string;
        netAmount: string;
    }[];
    // additional
    termsAndConditions: string;
    notes: string;
    shippingCost: string;
    amountPaid: string;
    paymentMode: string;

    subtotal: string;
    discount: string;
    tax: string;
    totalAmount: string;
    amountDue: string;
    status: 'PAID' | 'PENDING' | 'OVERDUE' | 'CANCELLED';
    paymentDate?: string;
    reminderSettings: ReminderItem[];
}

export interface GetAllInvoicesPayload {
    sort?: 'ASC' | 'DESC';
    sortField?: string;
    page?: number;
    itemsPerPage?: number;
    searchText?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
}
