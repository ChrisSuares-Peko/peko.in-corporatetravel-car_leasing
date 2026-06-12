import { useCallback, useEffect, useState } from 'react';

import { Button, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';

import { useAppSelector } from '@src/hooks/store';

import { deletePlan, downloadOrderInvoice, generateSsoLogin, getOrderHistory } from '../api/index';
import SubscriptionHistoryTable from '../components/manage-subscription/SubscriptionHistoryTable';
import TransactionHistoryTable from '../components/manage-subscription/TransactionHistoryTable';
import useHostingPlans from '../hooks/useHostingPlans';
import { type Order, type ProvisionResult } from '../types/index';
import { formatControlPanel } from '../utils/vpsUtils';

const { Title } = Typography;

type SubRow = {
    key: string;
    corporateTxnId: string;
    itemType: string;
    productName: string;
    billingCycle?: number;
    price: number;
    unitPrice?: number;
    os?: string;
    addons?: string[];
    controlPanel?: string;
    provision?: ProvisionResult;
    transactionDate: string;
    orderStatus: string;
    productId: string;
};

const ManageSubscriptions = () => {
    const { id, role } = useAppSelector(s => s.reducer.auth);
    const { plans: vpsPlans } = useHostingPlans('vps_server');

    const [orders, setOrders] = useState<Order[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [subSearch, setSubSearch] = useState('');
    const [txnSearch, setTxnSearch] = useState('');
    const [filterMonth, setFilterMonth] = useState<number | null>(dayjs().month() + 1);
    const [filterYear, setFilterYear] = useState<number | null>(dayjs().year());
    const [loading, setLoading] = useState(false);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [ssoLoading, setSsoLoading] = useState(false);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            let from: string | undefined;
            let to: string | undefined;
            if (filterMonth || filterYear) {
                const year = filterYear ?? dayjs().year();
                if (filterMonth) {
                    const start = dayjs()
                        .year(year)
                        .month(filterMonth - 1)
                        .startOf('month');
                    from = start.toISOString();
                    to = start.endOf('month').toISOString();
                } else {
                    from = dayjs().year(year).startOf('year').toISOString();
                    to = dayjs().year(year).endOf('year').toISOString();
                }
            }
            const res = await getOrderHistory({
                userId: id,
                userType: role,
                page,
                itemsPerPage: 10,
                searchText: txnSearch || undefined,
                from,
                to,
            });
            if (res) {
                setOrders(res.orders ?? []);
                setTotalRecords(res.totalRecords ?? 0);
            }
        } finally {
            setLoading(false);
        }
    }, [id, role, page, txnSearch, filterMonth, filterYear]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleDownload = async (corporateTxnId: string) => {
        setDownloadingId(corporateTxnId);
        const res = await downloadOrderInvoice({ userId: id, userType: role, corporateTxnId });
        if (res) {
            const uint8Array = new Uint8Array(
                (res.pdfBuffer as unknown as { type: string; data: number[] }).data
            );
            saveAs(
                new Blob([uint8Array], { type: 'application/pdf' }),
                res.filename || `invoice-${corporateTxnId}.pdf`
            );
        }
        setDownloadingId(null);
    };

    const handleSsoLogin = useCallback(async () => {
        setSsoLoading(true);
        const res = await generateSsoLogin({ userId: id, userType: role });
        if (res && res.redirectUrl) window.open(res.redirectUrl, '_blank');
        setSsoLoading(false);
    }, [id, role]);

    const handleCancelPlan = async (provision: ProvisionResult, corporateTxnId: string, productId: string) => {
        const orderId = provision.result?.entityid ?? provision.result?.orderid;
        if (!orderId) return;
        const key = String(orderId);
        setCancellingId(key);
        await deletePlan({
            userId: id,
            userType: role,
            orderId,
            itemType: provision.itemType,
            corporateTxnId,
            productId,
        });
        setCancellingId(null);
        fetchOrders();
    };

    const osDisplayMap = Object.fromEntries(
        vpsPlans.flatMap(p =>
            (p.vendorDetails?.supported_os ?? []).map(o => [o.os_name, o.os_display_name])
        )
    );

    const subscriptionRows: SubRow[] = orders.flatMap(order =>
        (order.items ?? [])
            .filter(item => {
                if (!subSearch) return true;
                const s = subSearch.toLowerCase();
                return (
                    item.productName.toLowerCase().includes(s) ||
                    item.itemType.toLowerCase().includes(s)
                );
            })
            .map(item => ({
                key: `${order.corporateTxnId}-${item.productId}`,
                corporateTxnId: order.corporateTxnId,
                itemType: item.itemType,
                productName: item.productName,
                billingCycle: item.billingCycle,
                price: parseFloat((item.totalPrice * 1.18).toFixed(2)),
                unitPrice: item.unitPrice,
                os: item.os ? (osDisplayMap[item.os] ?? item.os) : undefined,
                addons: item.addons,
                controlPanel: item.controlPanel ? formatControlPanel(item.controlPanel) : undefined,
                transactionDate: order.transactionDate,
                orderStatus: order.status,
                productId: item.productId,
                provision: (order.provisionResults ?? []).find(p => {
                if (p.itemType !== item.itemType) return false;
                if (item.itemType === 'domain') return p.domainName === item.productName;
                return true;
            }),
            }))
    );

    const filteredOrders = orders.filter(order => {
        const date = dayjs(order.transactionDate);
        if (filterMonth && date.month() + 1 !== filterMonth) return false;
        if (filterYear && date.year() !== filterYear) return false;
        return true;
    });

    const availableYears = [...new Set([dayjs().year(), ...orders.map(o => dayjs(o.transactionDate).year())])]
        .filter(Boolean)
        .sort((a, b) => b - a);

    return (
        <Content className="bg-white min-h-screen px-4 sm:px-6 py-6">
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <Title level={3} style={{ margin: 0 }}>
                        Manage Subscriptions
                    </Title>
                    <Button type="primary" loading={ssoLoading} onClick={handleSsoLogin}>
                        Manage Panel
                    </Button>
                </div>

                <SubscriptionHistoryTable
                    loading={loading}
                    rows={subscriptionRows}
                    subSearch={subSearch}
                    onSubSearch={setSubSearch}
                    cancellingId={cancellingId}

                    onCancel={handleCancelPlan}
                />

                <TransactionHistoryTable
                    loading={loading}
                    filteredOrders={filteredOrders}
                    totalRecords={totalRecords}
                    page={page}
                    onPageChange={setPage}
                    txnSearch={txnSearch}
                    onTxnSearch={v => {
                        setTxnSearch(v);
                        setPage(1);
                    }}
                    filterMonth={filterMonth}
                    filterYear={filterYear}
                    onMonthChange={setFilterMonth}
                    onYearChange={setFilterYear}
                    availableYears={availableYears}
                    downloadingId={downloadingId}
                    onDownload={handleDownload}
                />
            </div>
        </Content>
    );
};

export default ManageSubscriptions;
