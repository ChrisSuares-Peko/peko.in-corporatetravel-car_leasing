export interface ProcureStats {
    activePurchaseOrders: number;
    unpaidInvoices: number;
    openRFQs: number;
    committedSpend: number;
}

export interface PurchaseRequest {
    id: number;
    title: string;
    requestedBy: string;
    date: string;
    amount: number;
    status: string;
}

export interface RFQ {
    id: number;
    title: string;
    closingDate: string;
    vendorsInvited: number;
    status: string;
}

export interface Proposal {
    id: number;
    rfqTitle: string;
    vendor: string;
    submittedDate: string;
    amount: number;
    status: string;
}

export interface PurchaseOrder {
    id: number;
    poNumber: string;
    vendor: string;
    date: string;
    amount: number;
    status: string;
}

export interface ProcureInvoice {
    id: number;
    invoiceNumber: string;
    vendor: string;
    dueDate: string;
    amount: number;
    status: string;
}

export interface Vendor {
    id: number;
    name: string;
    category: string;
    contact: string;
    email: string;
    status: string;
}
