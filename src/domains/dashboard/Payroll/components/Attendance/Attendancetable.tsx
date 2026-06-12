import React, { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Pagination, Row, Select } from 'antd';

import GenericTable from '@components/atomic/GenericTable';
import ConfirmationModal from '@components/molecular/modals/ConfirmationModal';
import useDebounce from '@src/hooks/useDebounce';

// import LeaveModal from './LeaveModal';
import AttendanceModal from './AttendanceModal';
import useLeaveFilter from '../../hooks/dashboardHooks/useLeaveFilter';
import { useDeleteLeaveApi } from '../../hooks/leaveHooks/useLeaveDeleteApi';
import { useListLeave } from '../../hooks/leaveHooks/useLeaveListApi';
import { AttendanceRow } from '../../types/attendance/attendanceTypes';
import { filterStates } from '../../types/types';
import { attendanceTableColumns } from '../../utils/attendance/attendanceTableColumns';
import { monthsArray, yearsArray } from '../../utils/salaryTable/data';

interface AttendanceTableProps {
    reloadTable: boolean;
    setReloadTable: React.Dispatch<React.SetStateAction<boolean>>;
    month: number;
    year: number;
    handleChangeMonths: (value: number) => void;
    handleChangeYears: (value: number) => void;
}

const AttendanceTable = ({
    reloadTable,
    setReloadTable,
    month,
    year,
    handleChangeMonths,
    handleChangeYears,
}: AttendanceTableProps) => {
    const initialMonth = new Date().getMonth() + 1;
    const initialYear = new Date().getFullYear();

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [selectedRecordData, setSelectedRecordData] = useState<AttendanceRow | null>(null);
    const [openAttendanceModal, setOpenAttendanceModal] = useState(false);

    const [filter, setFilter] = useState<filterStates>({
        search: '',
        start: 0,
        length: 10,
        year: initialYear,
        month: initialMonth,
    });
    const { handleSearch, handlePageChange, handleChangeMonth, handleChangeYear } = useLeaveFilter({
        setFilter,
    });
    const debouncedSearch = useDebounce(filter.search, 500);

    const { isLoading, data, count, employeeLeaves } = useListLeave(
        filter.start,
        filter.length,
        // filter.search,
        debouncedSearch,
        filter.year,
        filter.month,
        reloadTable
    );

    const { deleteLeaveData, isLoading: deleteLoader } = useDeleteLeaveApi({
        handleCancel: () => setOpenConfirmationModal(false),
    });

    const handleEdit = async (selectedRowData: AttendanceRow) => {
        setSelectedRecordData(selectedRowData);
        setOpenAttendanceModal(true);
    };

    const handleDelete = (selectedRowData: AttendanceRow) => {
        setSelectedRecordData(selectedRowData);
        setOpenConfirmationModal(true);
    };

    const handleDeleteLeave = async () => {
        const res = await deleteLeaveData(selectedRecordData?.id!);
        if (res) {
            setSelectedRecordData(null);
            employeeLeaves();
        }
    };

    return (
        <Row>
            <Row justify="space-between" gutter={[16, 16]} className="mb-3 w-full">
                <Col md={16} xs={24} sm={24} className="">
                    <Input
                        placeholder="Search by name,leave type"
                        suffix={<SearchOutlined />}
                        allowClear
                        value={filter.search}
                        onChange={e => {
                            const value = e.target.value.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '');
                            handleSearch({ ...e, target: { ...e.target, value } });
                        }}
                    />
                </Col>
                <Col xs={12} md={4}>
                    <Select
                        options={monthsArray}
                        className="w-full"
                        // onChange={handleChangeMonth}
                        onChange={value => {
                            handleChangeMonth(value);
                            const val = Number(value);
                            handleChangeMonths(val);
                        }}
                        defaultValue={initialMonth.toString()}
                    />
                </Col>
                <Col xs={12} md={4}>
                    <Select
                        options={yearsArray}
                        className="w-full"
                        // onChange={handleChangeYear}
                        onChange={value => {
                            handleChangeYear(value);
                            handleChangeYears(value);
                        }}
                        defaultValue={initialYear}
                    />
                </Col>
                
                <Col md={24} xs={24}>
                    <GenericTable
                        columns={attendanceTableColumns(handleEdit, handleDelete)}
                        dataSource={data}
                        loading={isLoading}
                        pagination={false}
                    />
                </Col>
            </Row>

            <Pagination
                current={filter.start}
                onChange={handlePageChange}
                size="default"
                className="text-end pt-7"
                total={count}
            />
            {openAttendanceModal && (
                <AttendanceModal
                    month={month}
                    year={year}
                    open={openAttendanceModal}
                    handleCancel={() => setOpenAttendanceModal(false)}
                    reloadTable={setReloadTable}
                />
            )}
            <ConfirmationModal
                isOpen={openConfirmationModal}
                handleCancel={() => setOpenConfirmationModal(false)}
                title="Are you sure you want to delete this Leave?"
                handleSubmit={handleDeleteLeave}
                isLoading={deleteLoader}
            />
        </Row>
    );
};

export default AttendanceTable;
