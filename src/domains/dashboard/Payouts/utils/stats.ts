import moneyIcon from '../assets/icons/moneyIcon.svg';
import payoutStatusIcon from '../assets/icons/payoutStatus.svg';
import walletIcon from '../assets/icons/walletIcon.svg';

export const statusColorMap: Record<string, string> = {
    Completed: 'success',
    COMPLETED: 'success',
    Failed: 'error',
    FAILED: 'error',
    Pending: 'warning',
    PENDING: 'warning',
    Processing: 'processing',
    PROCESSING: 'processing',
};

export const statusOptions = [
    { label: 'All Status', value: '' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Failed', value: 'FAILED' },
    { label: 'Pending', value: 'PENDING' },
];

export const statDefinitions = [
    {
        key: 'total-payout',
        label: 'Total Payouts This Month',
        bgColor: '#FDF6F0',
        value: '₹4,67,33.00',
        icon: payoutStatusIcon,
        prefix: '₹',
        iconColor: '#000000',
    },
    {
        key: 'active-beneficiaries',
        label: 'Active Beneficiaries',
        bgColor: '#ECF0FC',
        value: '23',
        icon: walletIcon,
        iconColor: '#000000',
    },
    {
        key: 'bills-month',
        label: 'Bills This Month',
        bgColor: '#EBF6F1',
        icon: moneyIcon,
        value: '123',
        iconColor: '#000000',
    },
];