import { Button, Flex, Typography } from 'antd';

interface HeaderProps {
    activeTab: string;
    onAddLeave: () => void;
    onAddAttendance: () => void;
}

const LeavesAttendanceHeader = ({ activeTab, onAddLeave, onAddAttendance }: HeaderProps) => {
    const isLeaveTab = activeTab === '1';

    return (
        <Flex className="justify-between md:flex-row" align="center">
            <Typography.Paragraph className="text-neutral-700 text-xl font-medium">
                {isLeaveTab ? 'Leaves' : 'Attendance'}
            </Typography.Paragraph>

            <Flex gap={10} className="justify-end">
                <Button danger type="primary" onClick={isLeaveTab ? onAddLeave : onAddAttendance}>
                    {isLeaveTab ? 'Add Leave' : 'Add Attendance'}
                </Button>
            </Flex>
        </Flex>
    );
};

export default LeavesAttendanceHeader;
