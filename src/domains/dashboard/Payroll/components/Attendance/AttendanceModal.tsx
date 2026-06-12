import React from 'react';

import { Flex } from 'antd';

import CustomModalWithForm from '@components/molecular/modals/CustomModalWithForm';

import AttendanceForm from './AttendanceForm';
import { attendanceSchema } from '../../schema/attendance/attendanceSchema';
import { AttendanceRow } from '../../types/attendance/attendanceTypes';
import { LeaveRequestFormType } from '../../types/leaveSection';

interface AttendanceModalProps {
    open: boolean;
    handleCancel: () => void;
    selectedRecordData?: AttendanceRow | null;
    reloadTable?: React.Dispatch<React.SetStateAction<boolean>>;
    employeeIdFromProfile?: string;
    month?: number;
    year?: number;
}

const AttendanceModal = ({
    open,
    handleCancel,
    selectedRecordData,
    reloadTable,
    employeeIdFromProfile,
    month,
    year,
}: AttendanceModalProps) => (
    <CustomModalWithForm
        modalTitle={selectedRecordData ? 'Edit Attendance' : 'Add Attendance'}
        open={open}
        handleCancel={handleCancel}
        handleFormSubmit={async (values: LeaveRequestFormType) => {
            if (reloadTable) reloadTable(p => !p);
        }}
        initialValues={{
            employeeId: selectedRecordData?.employeeId || employeeIdFromProfile || '',
            totalWorkDays: selectedRecordData?.totalWorkDays || '',
            lossOfPay: selectedRecordData?.lossOfPay || '',
            totalPayDays: selectedRecordData?.totalPayDays || '',
        }}
        validationSchema={attendanceSchema}
    >
        <Flex vertical className=" w-full">
            <AttendanceForm
                selectedRecordData={selectedRecordData}
                employeeIdFromProfile={employeeIdFromProfile}
                month={month}
                year={year}
            />
        </Flex>
    </CustomModalWithForm>
);

export default AttendanceModal;
