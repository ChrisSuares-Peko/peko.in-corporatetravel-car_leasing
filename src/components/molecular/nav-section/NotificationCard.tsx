import { Flex, Typography, theme } from 'antd';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);

interface NotificationCardProps {
    notificationTitle: string;
    notification: string;
    date: string;
}

const { Text } = Typography;

const NotificationCard = ({ notificationTitle, notification, date }: NotificationCardProps) => {
    const {
        token: { colorTextTertiary },
    } = theme.useToken();
    const formattedDate = dayjs(date);

    const parseNotification = (text: string) => {
        // Replace "INR " (with space) or "INR" (without space) with "₹"

        // Regex to match "₹<amount>" (e.g., ₹100.00 or ₹100)
        const regex = /₹\s?\d[\d,]*(?:\.\d{2})?/g;
        const txnIdRegex = /(transaction ID[:\s]*)(\d+)/gi;
        text = text.replace(txnIdRegex, (_, label, number) => `${label}<strong>${number}</strong>`);

        const parts = text.split(regex);
        const matches = text.match(regex) || [];

        return parts.reduce(
            (acc, part, index) => {
                // eslint-disable-next-line react/no-danger
                acc.push(<span key={`part-${index}`} dangerouslySetInnerHTML={{ __html: part }} />);
                if (matches[index]) {
                    acc.push(<strong key={index}>{matches[index]}</strong>);
                }
                return acc;
            },
            [] as (string | JSX.Element)[]
        );
    };

    return (
        <Flex className="px-4 py-4 border-b">
            <Flex vertical gap={10}>
                <Text className="max-w-[24rem] text-base font-medium text-black">
                    {notificationTitle}
                </Text>
                <Text className="max-w-[24rem] text-sm text-gray-700">
                    {parseNotification(notification)}
                </Text>
                <Text style={{ color: colorTextTertiary }} className="text-xs">
                    {formattedDate.calendar(null, {
                        sameDay: '[Today at] h:mm A', // Today at 10:30 AM
                        nextDay: '[Tomorrow at] h:mm A', // Tomorrow at 10:30 AM
                        nextWeek: 'dddd [at] h:mm A', // Next Tuesday at 10:30 AM
                        lastDay: '[Yesterday at] h:mm A', // Yesterday at 10:30 AM
                        lastWeek: '[Last] dddd [at] h:mm A', // Last Monday at 10:30 AM
                        sameElse: 'DD MMM [at] h:mm A', // Everything else ( 07/10/2011 )
                    })}
                </Text>
            </Flex>
        </Flex>
    );
};

export default NotificationCard;
