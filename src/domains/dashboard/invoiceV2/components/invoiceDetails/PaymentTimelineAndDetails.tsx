import { useMemo } from 'react';

import { DownloadOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Steps, Table, Typography } from 'antd';

import { GetInvoiceByIdResponse } from '../../types/invoice';
import { InfoRow } from '../../types/invoiceDetails';
import { formatDate, formatDateAndTime } from '../../utils/helperFunctions';
import { paymentDetailsColumns } from '../../utils/table_column/paymentDetailsColumns';

interface Props {
    invoiceData: GetInvoiceByIdResponse | null;
    downloadPdf: (invoiceId?: string) => Promise<void>;
    isDownloading: boolean;
}

const PaymentTimelineAndDetails = ({ invoiceData, downloadPdf, isDownloading }: Props) => {
    const infoRows = useMemo<InfoRow[]>(
        () => [
            { label: 'Invoice Number', value: invoiceData?.invoiceNumber },
            {
                label: 'Date & Time',
                value: formatDateAndTime(invoiceData?.createdAt ?? invoiceData?.invoiceDate),
            },
            { label: 'Customer Name', value: invoiceData?.name },
            {
                label: 'Amount',
                value: invoiceData?.totalAmount ? `₹ ${invoiceData?.totalAmount}` : undefined,
            },
            { label: 'Mode of Payment', value: invoiceData?.paymentMode },
            { label: 'Invoice Status', value: invoiceData?.status, isBadge: true },
            { label: 'Due Date', value: formatDateAndTime(invoiceData?.dueDate) },
            {
                label: 'Notes',
                value: invoiceData?.notes || 'N/A',
            },
        ],
        [invoiceData]
    );

    const isPaid = invoiceData?.status === 'PAID';

    const currentStep = isPaid ? 2 : 1;

    const timelineSteps = useMemo(
        () => [
            {
                title: 'Invoice Added',
                description: currentStep > 0 ? formatDate(invoiceData?.invoiceDate) : undefined,
            },
            {
                title: 'Payment Pending',
                description: currentStep > 1 ? formatDate(invoiceData?.invoiceDate) : undefined,
            },
            {
                title: isPaid ? 'Paid' : 'Not Paid',
                description: isPaid ? formatDate(invoiceData?.paymentDate) : undefined,
            },
        ],
        [invoiceData, isPaid, currentStep]
    );

    return (
        <Card className="w-full rounded-2xl">
            <Flex vertical gap={12}>
                <Typography.Text className="text-lg font-semibold pb-2">
                    Payment Timeline
                </Typography.Text>
                <Steps
                    current={isPaid ? 2 : 1}
                    size="small"
                    items={timelineSteps}
                    labelPlacement="vertical"
                    className="mb-8"
                />
            </Flex>

            <Table
                dataSource={infoRows}
                rowKey="label"
                showHeader={false}
                pagination={false}
                size="small"
                rowClassName={(_, index) => (index % 2 === 0 ? 'bg-gray-50' : 'bg-white')}
                className="[&_td]:!h-12 [&_td]:!border-b-0 [&_td:first-child]:rounded-l-md [&_td:last-child]:rounded-r-md"
                columns={paymentDetailsColumns}
            />

            <Flex justify="center" className="pt-8">
                {/* <Button block icon={<ShareAltOutlined />} className="h-12">
                    Share Invoice
                </Button> */}
                <Button
                    icon={<DownloadOutlined />}
                    className="h-12 px-40 text-base border-[#FF4F4F] text-[#FF4F4F]"
                    loading={isDownloading}
                    onClick={() => downloadPdf(invoiceData?.id)}
                >
                    Download PDF
                </Button>
            </Flex>
        </Card>
    );
};

export default PaymentTimelineAndDetails;
