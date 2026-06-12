import React from 'react';

import { Button, Skeleton, Table, Tag, Typography } from 'antd';

import type { HostingPlan } from '../../hooks/useHostingPlans';
import {
    formatMb,
    getDefaultTenure,
    getPriceForTenure,
    getTenureOptions,
} from '../../utils/vpsUtils';
import TenureSelect from '../TenureSelect';

const { Text: TypoText } = Typography;

interface VpsPlanTableProps {
    filteredPlans: HostingPlan[];
    isLoading: boolean;
    tenureMap: Record<string, number>;
    setTenureMap: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    onSelectPlan: (plan: HostingPlan) => void;
}

const VpsPlanTable: React.FC<VpsPlanTableProps> = ({
    filteredPlans,
    isLoading,
    tenureMap,
    setTenureMap,
    onSelectPlan,
}) => {
    const columns = [
        {
            title: 'Plan Name',
            dataIndex: 'planName',
            render: (name: string) => <TypoText strong>{name}</TypoText>,
        },
        {
            title: 'CPU',
            key: 'cpu',
            render: (_: unknown, r: HostingPlan) =>
                r.vendorDetails?.cpu != null ? `${r.vendorDetails.cpu} Cores` : '—',
        },
        {
            title: 'RAM',
            key: 'ram',
            render: (_: unknown, r: HostingPlan) =>
                r.vendorDetails?.ram != null ? formatMb(r.vendorDetails.ram) : '—',
        },
        {
            title: 'Storage',
            key: 'storage',
            render: (_: unknown, r: HostingPlan) => {
                const space =
                    r.vendorDetails?.space != null ? formatMb(r.vendorDetails.space) : null;
                if (!space) return '—';
                return (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {space}
                        {r.vendorDetails?.diskType && (
                            <Tag style={{ margin: 0, borderRadius: 90, fontSize: 10 }}>
                                {r.vendorDetails.diskType}
                            </Tag>
                        )}
                    </span>
                );
            },
        },
        {
            title: 'Bandwidth',
            key: 'bandwidth',
            render: (_: unknown, r: HostingPlan) =>
                r.vendorDetails?.bandwidth != null
                    ? formatMb(Number(r.vendorDetails.bandwidth))
                    : '—',
        },
        {
            title: 'IP(s)',
            key: 'ips',
            render: (_: unknown, r: HostingPlan) =>
                r.vendorDetails?.no_of_ips ?? r.vendorDetails?.ips ?? '1',
        },
        {
            title: 'Tenure',
            key: 'tenure',
            render: (_: unknown, r: HostingPlan) => (
                <TenureSelect
                    options={getTenureOptions(r)}
                    value={tenureMap[r.planId] ?? getDefaultTenure(r)}
                    onChange={val => setTenureMap(prev => ({ ...prev, [r.planId]: val }))}
                />
            ),
        },
        {
            title: 'Price',
            key: 'price',
            render: (_: unknown, r: HostingPlan) => {
                const price = getPriceForTenure(r, tenureMap[r.planId] ?? getDefaultTenure(r));
                return price != null ? (
                    <span>
                        <TypoText strong style={{ fontSize: 15 }}>
                            ₹{price}
                        </TypoText>
                        <TypoText strong style={{ fontSize: 12 }}>
                            /MO
                        </TypoText>
                    </span>
                ) : (
                    '—'
                );
            },
        },
        {
            title: '',
            key: 'action',
            render: (_: unknown, r: HostingPlan) => (
                <Button
                    type="primary"
                    style={{ background: '#F0655B', borderColor: '#F0655B' }}
                    onClick={() => onSelectPlan(r)}
                >
                    Select Plan
                </Button>
            ),
        },
    ];

    if (isLoading) return <Skeleton active />;

    return (
        <Table
            columns={columns}
            dataSource={filteredPlans}
            rowKey="planId"
            pagination={false}
            size="middle"
            scroll={{ x: 'max-content' }}
            style={{ borderRadius: 8, border: '1px solid #F3F4F6' }}
        />
    );
};

export default VpsPlanTable;
