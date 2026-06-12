import React from 'react';

import { Button, Card, Flex, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import { Proposal, ProposalStatus } from '../../utils/data';

const { Text } = Typography;

const statusCfg: Record<ProposalStatus, { label: string; color: string; bg: string; text: string }> = {
    Accepted:     { label: 'Accepted',     color: '#ff4f4f', bg: '#ECFDF5', text: '#43B75D' },
    Rejected:     { label: 'Rejected',     color: '#ff4f4f', bg: '#fff1f0', text: '#ff4f4f' },
    'Under review': { label: 'Under review', color: '#ff4f4f', bg: '#fff7e6', text: '#ff4f4f' },
    Shortlisted:  { label: 'Shortlisted',  color: '#ff4f4f', bg: '#fffBEB', text: '#D97706' },
};

const ProposalCard: React.FC<{ proposal: Proposal }> = ({ proposal }) => {
    const navigate = useNavigate();
    const cfg = statusCfg[proposal.status];

    const btn: React.CSSProperties = { borderRadius: 6 };

    const handleCreatePO = () => {
        navigate(`${paths.dashboard.procure}/${paths.procure.purchaseOrders.index}/${paths.procure.purchaseOrders.create}`);
    };

    const viewBtn = <Button size="small" danger variant="outlined" style={btn}>View Proposal</Button>;

    const renderActions = () => {
        switch (proposal.status) {
            case 'Accepted':
                return <>{viewBtn}<Button size="small" type="primary" style={btn} onClick={handleCreatePO}>Create PO</Button></>;
            case 'Rejected':
                return <>{viewBtn}<Button size="small" danger variant="outlined" style={btn}>Undo reject</Button></>;
            case 'Under review':
                return (
                    <>
                        {viewBtn}
                        <Button size="small" type="primary" danger style={btn}>Accept</Button>
                        <Button size="small" variant="outlined" style={btn} disabled>Reject</Button>
                    </>
                );
            case 'Shortlisted':
                return (
                    <>
                        {viewBtn}
                        <Button size="small" type="primary" danger style={btn}>Accept</Button>
                        <Button size="small" variant="outlined" style={btn} disabled>Reject</Button>
                    </>
                );
            default:
                return viewBtn;
        }
    };

    return (
        <Card className="rounded-xl border border-[#f0f0f0] [&_.ant-card-body]:px-[18px] [&_.ant-card-body]:py-[14px]">
            <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
                <Text strong style={{ fontSize: 14, color: '#262626' }}>{proposal.vendorName}</Text>
                <Flex align="center" gap={10}>
                    <Tag style={{ color: cfg.text, background: cfg.bg, border: 'none', borderRadius: 6, fontWeight: 500, margin: 0 }}>
                        {cfg.label}
                    </Tag>
                    <Text strong style={{ color: '#FF4F4F', fontSize: 14 }}>{proposal.amount}</Text>
                </Flex>
            </Flex>

            <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block', marginBottom: 10 }}>
                Submitted {proposal.submittedDate} · {proposal.channel}
            </Text>

            <Flex gap={8} align="center"className='mt-5'>
                {renderActions()}
            </Flex>
        </Card>
    );
};

interface Props {
    proposals: Proposal[];
}

const ProposalTab: React.FC<Props> = ({ proposals }) => {
    if (!proposals?.length) {
        return <Text className="text-sm text-gray-400">No proposals submitted yet.</Text>;
    }

    return (
        <Flex vertical gap={10}>
            {proposals.map(p => (
                <ProposalCard key={p.id} proposal={p} />
            ))}

            <Button
                block
                size="large"
                style={{ marginTop: 8, color: '#ff4d4f', borderColor: '#ff4d4f', }}
            >
                Side-by-Side comparison
            </Button>
        </Flex>
    );
};

export default ProposalTab;
