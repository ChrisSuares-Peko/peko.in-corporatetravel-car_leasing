import { CalendarOutlined, DeleteOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import { Divider, Flex, Tag, Typography } from 'antd';

import { ReminderItem } from '../../types/invoiceDetails';
import { formatDate } from '../../utils/helperFunctions';

const calcReminderDate = (dueDate?: string, intervalDays?: number): string => {
    if (!dueDate || !intervalDays) return '';
    const d = new Date(dueDate);
    d.setDate(d.getDate() + intervalDays);
    return formatDate(d);
};

const ReminderCard = ({
    reminder,
    onDelete,
    dueDate,
    isDeleting,
}: {
    reminder: ReminderItem;
    onDelete: () => void;
    dueDate?: string;
    isDeleting?: boolean;
}) => {
    const days = reminder.reminderInterval;
    const desc = days === 1 ? 'Every day after due date' : `Every ${days} days after due date`;
    const subDesc = days === 1 ? '1 day after due date' : `${days} days after due date`;
    const displayDate = calcReminderDate(dueDate, days);

    return (
        <Flex vertical className="rounded-xl border border-[#E4E4E7] bg-white overflow-hidden">
            <Flex justify="space-between" align="center" className="px-4 pt-3 pb-2">
                <Flex align="center" gap={8}>
                    <CalendarOutlined className="text-[#A1A1AA] text-xs" />
                    <Typography.Text className="text-sm text-[#A1A1AA]">
                        {displayDate}
                    </Typography.Text>
                    <Tag color="success" className="m-0 rounded-xl">
                        Scheduled
                    </Tag>
                </Flex>
                <DeleteOutlined
                    className={`text-sm ${isDeleting ? 'text-red-200 cursor-not-allowed' : 'text-red-400 cursor-pointer hover:text-red-600'}`}
                    onClick={e => {
                        e.stopPropagation();
                        if (!isDeleting) onDelete();
                    }}
                />
            </Flex>

            <Typography.Text className="text-lg font-semibold text-[#101828] px-4 pb-3">
                {desc}
            </Typography.Text>

            <Divider className="m-0" />

            <Flex align="center" gap={16} className="px-4 py-2">
                <Typography.Text className="text-xs text-[#A1A1AA]">{subDesc}</Typography.Text>
                {reminder.sendEmail && (
                    <Flex align="center" gap={4}>
                        <MailOutlined className="text-[#A1A1AA] text-xs" />
                        <Typography.Text className="text-xs text-[#A1A1AA]">Email</Typography.Text>
                    </Flex>
                )}
                {reminder.sendSMS && (
                    <Flex align="center" gap={4}>
                        <MessageOutlined className="text-[#A1A1AA] text-xs" />
                        <Typography.Text className="text-xs text-[#A1A1AA]">SMS</Typography.Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default ReminderCard;
