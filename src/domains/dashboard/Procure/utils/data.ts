import { paths } from '@src/routes/paths';

import activePurchaseOrders from '../assets/icons/activePurchaseOrder.svg';
import invoicing from '../assets/icons/invoicing.svg';
import openRFQs from '../assets/icons/openRFQs.svg';
import proposals from '../assets/icons/proposals.svg';
import purchaseOrders from '../assets/icons/purchaseOrders.svg';
import purchaseRequest from '../assets/icons/purchaseRequest.svg';
import recentActivityIcon from '../assets/icons/recentActivityIcon.svg';
import recentActivitySendTo  from '../assets/icons/recentActivitySendTo.svg';
import requestForQuoteIcon from '../assets/icons/requestForQuoteIcon.svg';
import unpaidInvoice from '../assets/icons/unpaidInvoice.svg';
import vendor from '../assets/icons/vendor.svg';

export const recentActivityItems = [
    { id: 1, text: 'Invoice EMT-INR-2603-014 received for PO-2026-002 and queued for review', date: '6 Mar 2026', color: '#ff7a45', icon: recentActivityIcon },
    { id: 2, text: 'PO-2026-002 sent to Emitac Digital Solutions for signing', date: '5 Mar 2026', color: '#52c41a', icon: recentActivitySendTo },
    { id: 3, text: 'New proposal received from Triton IT for Network Infrastructure RFQ', date: '6 Mar 2026', color: '#722ed1', icon: recentActivitySendTo },
    { id: 4, text: 'Draft PO-2026-006 created for Triton IT – Cybersecurity Audit', date: '6 Mar 2026', color: '#ffa940', icon: recentActivityIcon },
    { id: 5, text: 'New proposal received from Emitac for Network Infrastructure RFQ', date: '6 Mar 2026', color: '#ff7a45', icon: recentActivityIcon },
    { id: 6, text: 'New proposal received from Emitac for Network Infrastructure RFQ', date: '6 Mar 2026', color: '#52c41a', icon: recentActivityIcon },
    { id: 7, text: 'New proposal received from Emitac for Network Infrastructure RFQ', date: '6 Mar 2026', color: '#ffa940', icon: recentActivityIcon },
];

const base = paths.dashboard.procure;

export const browseItems = [
    { label: 'Purchase Requests', path: `${base}/${paths.procure.purchaseRequests.index}`, icon: purchaseRequest },
    { label: 'Requests for Quote', path: `${base}/${paths.procure.rfq.index}`, icon: requestForQuoteIcon },
    { label: 'Proposals', path: `${base}/${paths.procure.proposals.index}`, icon: proposals },
    { label: 'Purchase Orders', path: `${base}/${paths.procure.purchaseOrders.index}`, icon: purchaseOrders },
    { label: 'Invoicing', path: `${base}/${paths.procure.invoicing.index}`, icon: invoicing },
    { label: 'Vendor Directory', path: `${base}/${paths.procure.vendor.index}`, icon: vendor },
];

export type PurchaseRequestStatus = 'Converted to RFQ' | 'Converted to PO' | 'Open';

export const purchaseRequestsData = [
    { id: 1, date: 'Jan 9, 2026',  ref: 'PR-2026-001', requestedBy: 'Ahmed Al Mansouri', initials: 'AA', department: 'IT',         category: 'IT',        budget: '₹ 185,000', needBy: '31 Mar 2026', status: 'Converted to RFQ' as PurchaseRequestStatus, description: 'Network infrastructure upgrade for floors 11–13 including switches, routers, and cabling.', notes: 'Must follow updated brand guidelines v3.1.' },
    { id: 2, date: 'Jan 9, 2026',  ref: 'PR-2026-002', requestedBy: 'Noura Al Ketbi',    initials: 'NK', department: 'Marketing',  category: 'Marketing', budget: '₹ 185,000', needBy: '31 Mar 2026', status: 'Converted to PO'  as PurchaseRequestStatus, description: 'Marketing collateral for Q1 campaign including banners, brochures, and digital assets.', notes: '' },
    { id: 3, date: 'Jan 9, 2026',  ref: 'PR-2026-003', requestedBy: 'Priya Nair',        initials: 'PN', department: 'Finance',    category: 'Finance',   budget: '₹ 185,000', needBy: '31 Mar 2026', status: 'Open'             as PurchaseRequestStatus, description: 'Financial software license renewal for 25 users for the upcoming fiscal year.', notes: '' },
   
];

export type RFQType = 'RFQ' | 'RFI' | 'RFP';
export type RFQStatus = 'Active' | 'Open' | 'Closed';
export type ProposalStatus = 'Accepted' | 'Rejected' | 'Under review' | 'Shortlisted';

export interface Proposal {
    id: string;
    vendorName: string;
    submittedDate: string;
    channel: string;
    amount: string;
    status: ProposalStatus;
}

export const rfqData = [
    {
        id: 1, date: 'Jan 9, 2026', ref: 'RFQ-2026-001', title: 'Annual Software License Renewal 2026',
        type: 'RFQ' as RFQType, vendors: 1, deadline: '31 Mar 2026', proposalCount: 0, status: 'Active' as RFQStatus,
        type_label: 'RFP', created: '28 Feb 2026', requestedBy: 'Omar Al Hashimi',
        notes: 'Certified Adobe and Microsoft partner in UAE. 2-year support agreement included.',
        termsAndConditions: 'Vendor must hold SIRA license in Dubai. All guards must have valid UAE security license. Monthly invoicing.',
        attachments: [{ name: 'Tax Residency Certificate', url: '#' }],
        lineItems: [
            { key: '1', description: 'Security guard (24/7, 2 guards per shift)', qty: 6, unit: 'Guard/month', unitCost: '₹17,280', total: '₹17,280' },
            { key: '2', description: 'Security guard (24/7, 2 guards per shift)', qty: 6, unit: 'Guard/month', unitCost: '₹17,280', total: '₹17,280' },
        ],
        invitedVendors: [
            { name: 'Emitac Digital Solutions', email: 'rami.khalil@emitac.ae', status: 'Submitted' },
            { name: 'Arabian Computer Maintenance', email: 'faris@acm-uae.ae', status: 'Pending' },
        ],
        proposals: [
            { id: 'p1', vendorName: 'Emitac Digital Solutions', submittedDate: '6 Mar 2026', channel: 'Online', amount: '₹17,200', status: 'Accepted'     as ProposalStatus },
            { id: 'p2', vendorName: 'Emitac Digital Solutions', submittedDate: '6 Mar 2026', channel: 'Online', amount: '₹17,200', status: 'Rejected'     as ProposalStatus },
            { id: 'p3', vendorName: 'Emitac Digital Solutions', submittedDate: '6 Mar 2026', channel: 'Online', amount: '₹17,200', status: 'Under review'  as ProposalStatus },
            { id: 'p4', vendorName: 'Emitac Digital Solutions', submittedDate: '6 Mar 2026', channel: 'Online', amount: '₹17,200', status: 'Shortlisted'  as ProposalStatus },
        ],
    },
    {
        id: 2, date: 'Jan 9, 2026', ref: 'RFQ-2026-002', title: 'Annual Software License Renewal 2026',
        type: 'RFI' as RFQType, vendors: 3, deadline: '9d left', proposalCount: 4, status: 'Active' as RFQStatus,
        type_label: 'RFI', created: '10 Jan 2026', requestedBy: 'Noura Al Ketbi',
        notes: 'Certified Adobe and Microsoft partner in UAE. 2-year support agreement included.', termsAndConditions: 'Standard procurement terms apply.',
        attachments: [],
        lineItems: [
            { key: '1', description: 'Software license (25 users)', qty: 25, unit: 'License/year', unitCost: '₹ 500', total: '₹ 12,500' },
        ],
        invitedVendors: [
            { name: 'Triton IT Solutions', email: 'procurement@triton-it.ae', status: 'Submitted' },
            { name: 'Emitac Digital Solutions', email: 'rfq@emitac.ae', status: 'Pending' },
            { name: 'Al Futtaim Logistics LLC', email: 'tariq@alfuttaim-logistics.ae', status: 'Pending' },
        ],
        proposals: [
            { id: 'p1', vendorName: 'Triton IT Solutions', submittedDate: '5 Mar 2026', channel: 'Online', amount: '₹12,500', status: 'Under review' as ProposalStatus },
            { id: 'p2', vendorName: 'Emitac Digital Solutions', submittedDate: '6 Mar 2026', channel: 'Online', amount: '₹11,200', status: 'Shortlisted' as ProposalStatus },
        ],
    },
    {
        id: 3, date: 'Jan 9, 2026', ref: 'RFQ-2026-003', title: 'Annual Software License Renewal 2026',
        type: 'RFP' as RFQType, vendors: 2, deadline: '9d left', proposalCount: 3, status: 'Open' as RFQStatus,
        type_label: 'RFP', created: '15 Jan 2026', requestedBy: 'Priya Nair',
        notes: '', termsAndConditions: 'Vendor must be ISO 27001 certified.',
        attachments: [],
        lineItems: [
            { key: '1', description: 'Cybersecurity audit', qty: 1, unit: 'Service', unitCost: '₹ 22,000', total: '₹ 22,000' },
        ],
        invitedVendors: [
            { name: 'Triton IT Solutions', email: 'procurement@triton-it.ae', status: 'Submitted' },
            { name: 'Arabian Computer Maintenance', email: 'faris@acm-uae.ae', status: 'Pending' },
        ],
        proposals: [
            { id: 'p1', vendorName: 'Triton IT Solutions', submittedDate: '4 Mar 2026', channel: 'Online', amount: '₹22,000', status: 'Accepted' as ProposalStatus },
            { id: 'p2', vendorName: 'Arabian Computer Maintenance', submittedDate: '5 Mar 2026', channel: 'Online', amount: '₹19,500', status: 'Rejected' as ProposalStatus },
        ],
    },
];

export type POStatus = 'Acknowledged & Signed' | 'Sent' | 'In Progress' | 'Draft' | 'Delivered';
export type ESignStatus = 'Completed' | 'Partially Signed' | 'Pending' | 'Not Required';

export const purchaseOrdersData = [
    { id: 1, ref: 'PO-2026-001', vendor: 'Emitac Digital Solutions', total: '₹17,200', created: '30 Apr 2026', status: 'Acknowledged & Signed' as POStatus, eSign: 'Completed' as ESignStatus },
    { id: 2, ref: 'PO-2026-001', vendor: 'Emitac Digital Solutions', total: '₹17,200', created: '30 Apr 2026', status: 'Sent'                   as POStatus, eSign: 'Partially Signed'  as ESignStatus },
    { id: 3, ref: 'PO-2026-001', vendor: 'Emitac Digital Solutions', total: '₹17,200', created: '30 Apr 2026', status: 'In Progress'             as POStatus, eSign: 'Completed'         as ESignStatus },
];

export type InvoiceStatus  = 'Paid' | 'Pending' | 'Overdue' | 'Disputed';
export type PaymentStatus  = 'Completed' | 'Pending' | 'Failed' | 'Partially Paid';

export const invoicingData = [
    { id: 1, invoiceRef: '2026-001', vendor: 'Emitac Digital Solutions', poRef: 'PO-2026-001', invoiceDate: '30 Apr 2026', amount: '₹17,200', invoiceStatus: 'Paid'    as InvoiceStatus, paymentStatus: 'Completed'     as PaymentStatus },
    { id: 2, invoiceRef: '2026-001', vendor: 'Emitac Digital Solutions', poRef: 'PO-2026-001', invoiceDate: '30 Apr 2026', amount: '₹17,200', invoiceStatus: 'Pending' as InvoiceStatus, paymentStatus: 'Pending'        as PaymentStatus },
    { id: 3, invoiceRef: '2026-001', vendor: 'Emitac Digital Solutions', poRef: 'PO-2026-001', invoiceDate: '30 Apr 2026', amount: '₹17,200', invoiceStatus: 'Overdue' as InvoiceStatus, paymentStatus: 'Partially Paid' as PaymentStatus },
];

export type VendorStatus = 'Active' | 'Inactive' | 'Blacklisted';

export const vendorData = [
    { id: 1, vendor: 'Emitac Digital Solutions', code: 'TL-DXB-2019-004224', status: 'Active' as VendorStatus, categories: ['Logistics', 'Facilities'], totalSpends: '₹17,200', pos: 17, lastActivity: '24 March 2025' },
    { id: 2, vendor: 'Emitac Digital Solutions', code: 'TL-DXB-2019-004224', status: 'Active' as VendorStatus, categories: ['Logistics', 'Facilities'], totalSpends: '₹17,200', pos: 19, lastActivity: '24 March 2025' },
    { id: 3, vendor: 'Emitac Digital Solutions', code: 'TL-DXB-2019-004224', status: 'Active' as VendorStatus, categories: ['Logistics', 'Facilities'], totalSpends: '₹17,200', pos: 15, lastActivity: '24 March 2025' },
];

export const UNIT_OPTIONS = [
    { value: 'Each', label: 'Each' },
    { value: 'Box', label: 'Box' },
    { value: 'Kg', label: 'Kg' },
    { value: 'L', label: 'L' },
    { value: 'Hour', label: 'Hour' },
];

export const PAYMENT_TERMS = [
    { value: 'net30', label: 'Net 30' },
    { value: 'net60', label: 'Net 60' },
    { value: 'net90', label: 'Net 90' },
    { value: 'immediate', label: 'Immediate' },
];

export const CURRENCY_OPTIONS = [
    { value: 'INR', label: 'INR' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
];

export const PO_TIPS = [
    'Link to a Purchase Request for a complete audit trail.',
    "eSign can be added after the PO is saved — it's optional.",
    'Bank details from the vendor directory will be used for payout.',
];

export const PO_STEPS = [
    'PO is saved as Draft — review before sending.',
    'DRAFT is visible via email.',
    'Vendor acknowledges by signing — triggers payout workflow.',
];

export const statCards = [
    { label: 'Active Purchase Orders', value: 12, trend: '↑ 2 vs last month', bg: '#FDF6F0', trendColor: '#05be63', icon: activePurchaseOrders },
    { label: 'Unpaid Invoices', value: 12, trend: '₹ 41K Unpaid', bg: '#ECF0FC', trendColor: '#05be63', icon: unpaidInvoice },
    { label: 'Open RFQs', value: 12, trend: '↑ 2 vs last month', bg: '#F6EBEF', trendColor: '#05be63', icon: openRFQs },
    { label: 'Committed Spend', value: '₹17,200', trend: '↑ 2 vs last month', bg: '#EBF6F1', trendColor: '#05be63', icon: openRFQs },
];
