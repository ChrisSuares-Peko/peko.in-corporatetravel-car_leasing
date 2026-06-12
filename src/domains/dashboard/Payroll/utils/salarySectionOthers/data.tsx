import { DownloadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TableProps, Space, Button, Typography, Tag } from 'antd';
import dayjs from 'dayjs';

import { formatNumberWithLocalString } from '@utils/priceFormat';

import { bonusTable } from '../../types/salaryProfileTypes/bonustypes';
import { incentiveTable } from '../../types/salaryProfileTypes/incentiveTypes';
import { overtimeTable } from '../../types/salaryProfileTypes/overtimeTypes';
import { reimbursementTableType } from '../../types/salaryProfileTypes/ReimbursementTypes';

const formatText = (text: string | number) => {
    if (!text) return '';
    const stringText = String(text); // Convert any input to a string
    return stringText.charAt(0).toUpperCase() + stringText.slice(1).toLowerCase();
};
export const incentiveColumn = (
    handleDelete: (record: incentiveTable) => void,
    handleEdit: (record: incentiveTable) => void
): TableProps<incentiveTable>['columns'] => [
    {
        title: <Typography.Text>Date Added</Typography.Text>,
        dataIndex: 'dateAdded',
        key: 'dateAdded',
    },
    {
        title: <Typography.Text>Effective Month</Typography.Text>,
        dataIndex: 'effectiveMonth',
        key: 'effectiveMonth',
        render: effectiveMonth =>
            new Date(effectiveMonth).toLocaleString('en-US', { month: 'long' }),
    },
    {
        title: <Typography.Text>Incentives Amount</Typography.Text>,
        dataIndex: 'incentiveAmount',
        key: 'incentiveAmount',
        render: text =>
            `₹ ${parseFloat(text)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    },

    {
        title: <Typography.Text>Details</Typography.Text>,
        dataIndex: 'details',
        key: 'details',
    },
    {
        title: <Typography.Text>Action</Typography.Text>,
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button className="border-0" onClick={() => handleDelete(record)}>
                    <DeleteOutlined className="text-[#E30000]" />
                </Button>
                <Button className="border-0" onClick={() => handleEdit(record)}>
                    <EditOutlined className="text-[#E30000]" />
                </Button>
            </Space>
        ),
    },
];

export const bonusColumn = (
    handleDelete: (id: bonusTable) => void,
    handleEdit: (id: bonusTable) => void
): TableProps<bonusTable>['columns'] => [
    {
        title: <Typography.Text>Date Added</Typography.Text>,
        dataIndex: 'dateAdded',
        key: 'dateAdded',
    },
{
        title: <Typography.Text>Effective Date</Typography.Text>,
        dataIndex: 'effectiveMonth',
        key: 'effectiveMonth',
        render: bonusDate => dayjs(bonusDate).format('DD-MM-YYYY'),
    },
    {
        title: <Typography.Text>Salary Month</Typography.Text>,
        dataIndex: 'effectiveMonth',
        key: 'effectiveMonth',
        render: bonusDate => new Date(bonusDate).toLocaleString('en-US', { month: 'long' }),
    },

    {
        title: <Typography.Text>Bonus Amount</Typography.Text>,
        dataIndex: 'bonusAmount',
        key: 'bonusAmount',
        render: text =>
            `₹ ${parseFloat(text)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    },
    {
        title: <Typography.Text>Action</Typography.Text>,
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button className="border-0">
                    <DeleteOutlined
                        className="text-[#E30000]"
                        onClick={() => handleDelete(record)}
                    />
                </Button>
                <Button className="border-0">
                    <EditOutlined className="text-[#E30000]" onClick={() => handleEdit(record)} />
                </Button>
            </Space>
        ),
    },
];
export const overtimeColumn = (
    handleDelete: (record: overtimeTable) => void,
    handleEdit: (record: overtimeTable) => void
): TableProps<overtimeTable>['columns'] => [
    {
        title: <Typography.Text>Date Added</Typography.Text>,
        dataIndex: 'dateAdded',
        key: 'dateAdded',
    },
    {
        title: <Typography.Text>Effective Date</Typography.Text>,
        dataIndex: 'effectiveDate',
        key: 'effectiveDate',
    },
    {
        title: <Typography.Text>Salary Month</Typography.Text>,
        dataIndex: 'salaryMonth',
        key: 'salaryMonth',
        render: overTimeDate => new Date(overTimeDate).toLocaleString('en-US', { month: 'long' }),
    },
    {
        title: <Typography.Text>Total Working Hours</Typography.Text>,
        dataIndex: 'totalWorkingHours',
        key: 'totalWorkingHours',
    },
    {
        title: <Typography.Text>Extra Hours</Typography.Text>,
        dataIndex: 'extraHours',
        key: 'extraHours',
    },
    {
        title: <Typography.Text>Over Time Amount</Typography.Text>,
        dataIndex: 'overTimeAmount',
        key: 'overTimeAmount',
        render: text =>
            `₹ ${parseFloat(text)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    },
    {
        title: <Typography.Text>Over Time Rate</Typography.Text>,
        dataIndex: 'overTimeRate',
        key: 'overTimeRate',
    },
    {
        title: <Typography.Text>Action</Typography.Text>,
        dataIndex: 'action',
        key: 'action',
        width: '10%',
        render: (text, record) => (
            <Space size="middle">
                <Button className="border-0" onClick={() => handleDelete(record)}>
                    <DeleteOutlined className="text-[#E30000]" />
                </Button>
                <Button className="border-0" onClick={() => handleEdit(record)}>
                    <EditOutlined className="text-[#E30000]" />
                </Button>
            </Space>
        ),
    },
];
export const reimbursementColumn = (
    handleDelete: (id: reimbursementTableType) => void,
    handleEdit: (id: reimbursementTableType) => void
): TableProps<reimbursementTableType>['columns'] => [
    {
        title: <Typography.Text>Expense Date</Typography.Text>,
        dataIndex: 'expenseDate',
        key: 'expenseDate',
    },
    {
        title: <Typography.Text>Expense Details</Typography.Text>,
        dataIndex: 'expenseDetails',
        key: 'expenseDetails',
    },
    {
        title: <Typography.Text>Amount Paid</Typography.Text>,
        dataIndex: 'amountPaid',
        key: 'amountPaid',
        render: text =>
            `₹ ${parseFloat(text)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    },

    {
        title: <Typography.Text>Status</Typography.Text>,
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        render: text => {
            // Apply formatText function to format the status
            const formattedText = formatText(text);
            return (
                <Tag
                  color={formattedText.toLowerCase() === 'unpaid' ? '#cf1322' : '#237804'}
                    style={{
                        color: formattedText.toLowerCase() === 'unpaid' ? '#cf1322' : '#237804',
                        backgroundColor: formattedText.toLowerCase() === 'unpaid' ? '#fff1f0' : '#f6ffed', // light red / light green
                        border: `1px solid ${
                            formattedText.toLowerCase() === 'unpaid' ? '#ffa39e' : '#b7eb8f'
                        }`,
                        borderRadius: 50,
                        height: '22px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        paddingInline: 10,
                        width: 'fit-content',
                    }}
                >
                    ● {formattedText}
                </Tag>
            );
        },
    },

    {
        title: <Typography.Text>Action</Typography.Text>,
        dataIndex: 'action',
        key: 'action',
        width: '10%',
        render: (text, record) => (
            <Space size="middle">
                {/* Open file in new tab instead of downloading */}
                <a href={record.supportingDocs} target="_blank" rel="noopener noreferrer">
                    <Button className="border-0" disabled={record.invoice === 'NA'}>
                        <span
                            className={`text-[#E30000] ${record.invoice === 'NA' ? 'opacity-50' : ''}`}
                        >
                            View
                        </span>
                    </Button>
                </a>

                <Button className="border-0">
                    <DeleteOutlined
                        className="text-[#E30000]"
                        onClick={() => handleDelete(record)}
                    />
                </Button>
                <Button className="border-0">
                    <EditOutlined className="text-[#E30000]" onClick={() => handleEdit(record)} />
                </Button>
            </Space>
        ),
    },
];

export const AllReimbursementColumn = (
    handleDelete: (id: reimbursementTableType) => void,
    handleEdit: (id: reimbursementTableType) => void
): TableProps<reimbursementTableType>['columns'] => [
    {
        title: <Typography.Text>Employee Name & ID</Typography.Text>,
        dataIndex: 'employeeName',
        key: 'employeeName',
        render: (_: any, record: any) => {
            const formattedName =
                record.employeeName.charAt(0).toUpperCase() + record.employeeName.slice(1);

            return (
                <div>
                    <Typography.Text>{formattedName}</Typography.Text>
                    <br />
                    <Typography.Text type="secondary">{record.employeeCode}</Typography.Text>
                </div>
            );
        },
    },
    {
        title: <Typography.Text>Expense Date</Typography.Text>,
        dataIndex: 'expenseDate',
        key: 'expenseDate',
    },
    {
        title: <Typography.Text>Expense Details</Typography.Text>,
        dataIndex: 'expenseDetails',
        key: 'expenseDetails',
    },
    {
        title: <Typography.Text>Amount Paid</Typography.Text>,
        dataIndex: 'amountPaid',
        key: 'amountPaid',
        render: text => `₹ ${formatNumberWithLocalString(text)}`,
    },
    {
        title: <Typography.Text>Status</Typography.Text>,
        dataIndex: 'paymentStatus',
        key: 'status',
        render: text => {
            const formattedText = formatText(text);
            console.log("teexxt",text)
            const isUnpaid = formattedText.toLowerCase() === 'unpaid';
            return (
                <Tag
                    color={isUnpaid ? '#cf1322' : '#237804'}
                    style={{
                        backgroundColor: isUnpaid ? '#fff1f0' : '#f6ffed', // light red / light green
                        color: isUnpaid ? '#FF3A3A' : '#237804', // dark red / dark green
                        border: `1px solid ${isUnpaid ? '#FF3A3A' : '#b7eb8f'}`,
                        borderRadius: 50,
                        height: '22px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        paddingInline: 10,
                        width: 'fit-content',
                    }}
                >
                    ● {formattedText}
                </Tag>
            );
        },
    },
    {
        title: <Typography.Text>Document</Typography.Text>,
        dataIndex: 'invoice',
        key: 'invoice',
        render: (text: any, record: any) => (
                <a href={record.supportingDocs} target="_blank" rel="noopener noreferrer" download>
                    <Button className="border-0" disabled={record.invoice === 'NA'}>
                        <DownloadOutlined
                            className={`text-green-400 ${record.invoice === 'NA' ? 'opacity-50' : ''}`}
                        />
                    </Button>
                </a>
            ),
    },
    {
        title: <Typography.Text>Action</Typography.Text>,
        dataIndex: 'action',
        key: 'action',
        width: '10%',
        render: (text, record) => (
            <Space size="middle">
                {/* <a href={record.supportingDocs} target="_blank" rel="noopener noreferrer" download>
                    <Button className="border-0" disabled={record.invoice === 'NA'}>
                        <DownloadOutlined
                            className={`text-green-400 ${record.invoice === 'NA' ? 'opacity-50' : ''}`}
                        />
                    </Button>
                </a> */}

                <Button className="border-0"  onClick={() => handleDelete(record)}>
                    <DeleteOutlined
                        className="text-[#E30000]"
                       
                    />
                </Button>
                <Button className="border-0">
                    <EditOutlined className="text-[#E30000]" onClick={() => handleEdit(record)} />
                </Button>
            </Space>
        ),
    },
];
