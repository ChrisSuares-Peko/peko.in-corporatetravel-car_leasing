import { useEffect, useState } from 'react';

import { Button, Col, Row, Tabs, TabsProps, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';


import { useAppDispatch } from '@src/hooks/store';
import { paths } from '@src/routes/paths';


import EmployeesSalaryListTab from '../components/EmployeeSalary/EmployeesSalaryListTab';
import PayrollHistoryTab from '../components/EmployeeSalary/PayrollHistoryTab';
import DeductionModal from '../components/modals/DeductionModal';
import IncentivesModal from '../components/modals/IncentivesModal';
import OverTimeModal from '../components/modals/OverTimeModal';
import SalaryProcessingModal from '../components/modals/SalaryProcessingModal';
import { resetSalarySlice } from '../slices/payrollSalarySlice';

function EmployeesSalary() {
    const [reloadTable, setReloadTable] = useState(false);
    const initialMonth = new Date().getMonth() + 1;
    const initialYear = new Date().getFullYear();
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [salaryCycle, setSalaryCycle] = useState<any>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [salaryArray, setSalaryArray] = useState([]);

   

    const handleDateChange = (month: any, year: any) => {
        setSelectedMonth(month);
        setSelectedYear(year);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Employees',
            children: (
                <EmployeesSalaryListTab
                    reloadTable={reloadTable}
                    onDateChange={handleDateChange}
                    handleSalaryCycle={setSalaryCycle}
                    setSalaryArray={setSalaryArray}
                />
            ),
        },
        {
            key: '2',
            label: 'Payroll History',
            children: <PayrollHistoryTab />,
            disabled: false,
        },
    ];

    const [openSalaryProcessingModal, setOpenSalaryProcessingModal] = useState(false);
    const [openIncentivesModal, setOpenIncentivesModal] = useState(false);
    const [openOvertimeModal, setOpenOvertimeModal] = useState(false);
    const [openDeductionModal, setOpenDeductionModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const navigate = useNavigate();
    const dipatch = useAppDispatch();

    // const payrollPath = `${paths.payroll.index}/${paths.payroll.employeesSalary}/${paths.payroll.processSalary}`;

    useEffect(() => {
        dipatch(resetSalarySlice());
    }, [dipatch]);

    return (
        <Row>
            <Row justify="space-between" className=" w-full mt-3">
                <Col md={4}>
                    <Typography.Paragraph className=" text-neutral-700 text-xl font-medium">
                        Salary Details
                    </Typography.Paragraph>
                </Col>
                <Col md={3} className="w-full">
                    <Button
                        className=" w-full"
                        danger
                        type="primary"
                        onClick={() =>
                            navigate(paths.payroll.salaryProfile, {
                                state: {
                                    month: Number(selectedMonth),
                                    year: selectedYear,
                                },
                            })
                        }
                    >
                        Run Payroll
                    </Button>
                </Col>
            </Row>

            <Row className="w-full">
                <Col xs={24} className="md:mt-10 mt-5 w-full">
                    <Tabs defaultActiveKey="1" items={items} />
                </Col>
            </Row>
            {openOvertimeModal && (
                <OverTimeModal
                    open={openOvertimeModal}
                    handleCancel={() => setOpenOvertimeModal(false)}
                    reloadTable={setReloadTable}
                    year={selectedYear}
                    month={Number(selectedMonth)}
                />
            )}
            {openIncentivesModal && (
                <IncentivesModal
                    open={openIncentivesModal}
                    handleCancel={() => setOpenIncentivesModal(false)}
                    reloadTable={setReloadTable}
                    year={selectedYear}
                    month={Number(selectedMonth)}
                />
            )}
            {openDeductionModal && (
                <DeductionModal
                    year={selectedYear}
                    month={Number(selectedMonth)}
                    open={openDeductionModal}
                    handleCancel={() => setOpenDeductionModal(false)}
                    reloadTable={setReloadTable}
                />
            )}
            <SalaryProcessingModal
                open={openSalaryProcessingModal}
                handleCancel={() => setOpenSalaryProcessingModal(false)}
            />
        </Row>
    );
}

export default EmployeesSalary;
