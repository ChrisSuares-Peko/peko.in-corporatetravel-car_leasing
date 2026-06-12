import { BulbOutlined, CopyOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Modal, Spin, Typography, message } from 'antd';

import { TRANSFER_METHODS } from '../../constants/invoiceDetails';
import useBankDetails from '../../hooks/invoiceDetails/useBankDetails';
import { copyBankDetails, shareViaWhatsApp } from '../../utils/helperFunctions';
import CopyableRow from '../shared/CopyableRow';
import InfoCard from '../shared/InfoCard';
import LeftHeader from '../shared/LeftHeader';

interface BankTransferModalProps {
    open: boolean;
    onCancel: () => void;
}

const BankTransferModal = ({ open, onCancel }: BankTransferModalProps) => {
    const { details, isFetching } = useBankDetails();

    const rows = [
        { label: 'Account Name', value: details?.name },
        { label: 'Account Number', value: details?.accountNumber },
        { label: 'Bank Name', value: details?.bankName },
        { label: 'IFSC Code', value: details?.ifsc },
    ].filter((r): r is { label: string; value: string } => !!r.value);

    const copyAllDetails = () => {
        copyBankDetails(rows as { label: string; value: string }[]);
        message.success('All details copied to clipboard');
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            width={560}
            closable={false}
            destroyOnHidden
            className="[&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:p-0 [&_.ant-modal-content]:overflow-hidden"
            styles={{ body: { maxHeight: '85vh', overflowY: 'auto' } }}
        >
            <Flex vertical gap={20} className="p-7">
                <LeftHeader
                    title="Bank Transfer Details"
                    description="Share these details with your customer for NEFT, RTGS, or IMPS transfers"
                />

                <Card className="rounded-2xl shadow-sm border-stone-200">
                    <Flex vertical gap={16}>
                        <LeftHeader
                            title="Virtual Account"
                            titleClass="text-base"
                            description="Use for direct bank transfers"
                            descriptionClass="text-xs"
                        />

                        {isFetching ? (
                            <Flex justify="center" className="py-6">
                                <Spin />
                            </Flex>
                        ) : (
                            <Flex vertical gap={8}>
                                {rows.map(row => (
                                    <CopyableRow
                                        key={row.label}
                                        title={row.label}
                                        description={row.value}
                                    />
                                ))}
                            </Flex>
                        )}

                        <Button
                            type="primary"
                            danger
                            block
                            className="h-10"
                            icon={<CopyOutlined />}
                            onClick={copyAllDetails}
                        >
                            Copy all Details
                        </Button>

                        <Flex gap={12}>
                            {/* <Button
                                block
                                className="h-10"
                                icon={<DownloadOutlined />}
                                loading={isLoading}
                                onClick={downloadPdf}
                            >
                                Download PDF
                            </Button> */}
                            <Button
                                block
                                className="h-10"
                                icon={<WhatsAppOutlined />}
                                onClick={() =>
                                    shareViaWhatsApp(
                                        `Bank Transfer Details:\n${rows.map(r => `${r.label}: ${r.value}`).join('\n')}`
                                    )
                                }
                            >
                                Share via WhatsApp
                            </Button>
                        </Flex>
                    </Flex>
                </Card>

                <InfoCard
                    titleIcon={<BulbOutlined className="text-lg" />}
                    title="Supported Transfer Methods"
                    items={TRANSFER_METHODS.map(({ name, description }) => (
                        <>
                            <Typography.Text className="text-sm font-semibold">
                                {name}
                            </Typography.Text>
                            {` - ${description}`}
                        </>
                    ))}
                />
            </Flex>
        </Modal>
    );
};

export default BankTransferModal;
