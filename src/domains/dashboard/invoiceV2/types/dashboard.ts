export type DashboardStats = {
    totalInvoiceAmount: number;
    totalDueAmount: number;
    vsLastMonthPercent: number;
    totalInvoices: number;
    totalPaid: number;
};

export type RecentInvoice = {
    id: number;
    name: string;
    date: string;
    amount: number;
    isCredit: boolean;
};

export type QuickAccessItem = {
    id: string;
    label: string;
    icon: string;
    onClick?: () => void;
    disabled?: boolean;
};
