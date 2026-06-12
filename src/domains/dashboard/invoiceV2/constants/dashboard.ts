import bankAccountImg from '../assets/icons/dashboard/bank_account.svg';
import createInvoiceImg from '../assets/icons/dashboard/create_invoice.svg';
import customersImg from '../assets/icons/dashboard/customers.svg';
import eInvoiceImg from '../assets/icons/dashboard/e-Invoice.svg';
import paymentImg from '../assets/icons/dashboard/payment.svg';
import emptyWalletImg from '../assets/icons/empty-wallet.svg';
import statusUpImg from '../assets/icons/status-up.svg';

export const STAT_CARDS_CONFIG = [
    { id: 'total-invoice', label: 'Total Invoice Amount', bgColor: '#FDF6F0', icon: statusUpImg },
    { id: 'pending-payments', label: 'Pending Payments', bgColor: '#ECF0FC', icon: emptyWalletImg },
] as const;

export const QUICK_ACCESS_CONFIG = [
    { id: 'create-invoice', label: 'Create Invoice', icon: createInvoiceImg },
    { id: 'e-invoice', label: 'E-Invoice', icon: eInvoiceImg },
    { id: 'customers', label: 'Customers', icon: customersImg },
    { id: 'bank-account', label: 'Manage Bank Account', icon: bankAccountImg },
    { id: 'collect-payment', label: 'Collect Payment Against Invoice', icon: paymentImg },
] as const;
