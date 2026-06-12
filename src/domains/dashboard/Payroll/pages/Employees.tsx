import { useEffect, useState } from 'react';

import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Tabs, TabsProps, Typography, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import useDebounce from '@src/hooks/useDebounce';
import { paths } from '@src/routes/paths';

import DepartmentTab from '../components/Employees/DepartmentTab';
import EmployeesListTab from '../components/Employees/EmployeesListTab';
import BulkUploadModal from '../components/modals/BulkUploadModal';
import DepartmentModal from '../components/modals/DepartmentModal';
import OffBoardEmployeeModal from '../components/modals/OffBoardEmployeeModal';
import SelectEmployeeModal from '../components/modals/SelectEmployeeModal';
import { useGetDepartmentList } from '../hooks/departmentHooks/useGetDepartmentList';
import { useValidateEmployeeSubscriptionLimit } from '../hooks/employeeHooks/useValidateEmployeeSubscriptionLimit';
import { resetEmployeeState } from '../slices/employeeSettings';


function Employees() {
    const {
        token: { colorPrimary },
    } = theme.useToken();
    // const [departmentCount, setDepartmentCount] = useState<number>(0);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const limit = 10;
    const [searchText, setSearchText] = useState<string>('');
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
    const [offboardReload, setOffboardReload] = useState<boolean | number>(false);
    const debouncedSearch = useDebounce(searchText, 500);
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const { validateLimit, isLoading: isValidating } =
    useValidateEmployeeSubscriptionLimit();
    const params = useLocation()
    const queryParams = new URLSearchParams(params.search);
    
  
    const {
        tableData,
        count,
        isLoading,
        departmentCount: dCount,
        setRefresh,
    } = useGetDepartmentList(debouncedSearch, page, limit);

    useEffect(() => {
        // setDepartmentCount(dCount);
        setLoadingInitial(false);
    }, [dCount]);

    const handleNewEmployeeClick = async () => {
        if (loadingInitial || isValidating) {
            return;
        }
        const response = await validateLimit({
            userId: id,
            userType: role,
        });

        if (!response) return;
        dispatch(resetEmployeeState());
        navigate(paths.payroll.addEmployee);
    };

    const [openAddDepartmentModal, setOpenAddDepartmentModal] = useState(false);
    const [openOffBoardEmployeeModal, setOpenOffBoardEmployeeModal] = useState(false);
    const [openSelectEmployeeModal, setOpenSelectEmployeeModal] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <span style={{ color: '#667085' }}>Active Employees</span>,
            children: (
                <EmployeesListTab
                    updateDepartmentCount={()=>{}}
                    employeeStatus="active"
                    offboardReload={offboardReload as boolean}
                    setOffboardReload={setOffboardReload}
                />
            ),
        },
        {
            key: '2',
            label: <span style={{ color: '#667085' }}>Departments</span>,
            children: (
                <DepartmentTab
                    updateDepartmentCount={()=>{}}
                    tableData={tableData}
                    count={count}
                    isLoading={isLoading}
                    page={page}
                    searchText={searchText}
                    setPage={setPage}
                    setRefresh={setRefresh}
                    setSearchText={setSearchText}
                />
            ),
        },
        {
            key: '3',
            label: <span style={{ color: '#667085' }}>Past Employees</span>,
            children: (
                <EmployeesListTab
                    updateDepartmentCount={()=>{}}
                    employeeStatus="past"
                    offboardReload={offboardReload as boolean}
                    setOffboardReload={setOffboardReload}
                />
            ),
        },
    ];

    const navigate = useNavigate();
    const handleEmployeeSelected = (employeeData: any) => {
        setSelectedEmployee(employeeData);
        setOpenSelectEmployeeModal(false);
        setOpenOffBoardEmployeeModal(true);
    };



    const [openBulkUploadModal, setOpenBulkUploadModal] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('1');
    return (
        <Content>
            <Row className="mt-2">
                <Col span={24}>
                    <Flex className="md:justify-between  md:flex-row xs:flex-col">
                        {Number(activeTab) === 1 || Number(activeTab) === 3 ? (
                            <Typography.Paragraph className="text-neutral-700 text-xl font-medium xs:font-normal text-center md:mt-4">
                                Employees
                            </Typography.Paragraph>
                        ) : (
                            <Typography.Paragraph className="text-neutral-700 text-xl font-medium">
                                Departments
                            </Typography.Paragraph>
                        )}

                        <Flex
                            gap={8}
                            className="md:justify-end xs:mt-1 xs:flex-col md:flex-row sm:w-32"
                        >
                            {/* Conditional Buttons based on Tab */}
                            {Number(activeTab) === 1 || Number(activeTab) === 3 ? (
                                <>
                                    <Button
                                        type="primary"
                                        danger
                                        loading={isValidating}
                                        style={{
                                            backgroundColor: colorPrimary,
                                            color: 'white',
                                        }}
                                        onClick={handleNewEmployeeClick}
                                        icon={<PlusCircleOutlined />}
                                        className="md:w-36"
                                    >
                                        New Employee
                                    </Button>
                                    <Button danger onClick={() => setOpenBulkUploadModal(true)}>
                                        Upload Employees
                                    </Button>
                                    <Button danger onClick={() => setOpenSelectEmployeeModal(true)}>
                                        Offboard Employee
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => setOpenAddDepartmentModal(true)}
                                    icon={<PlusCircleOutlined />}
                                >
                                    Add Department
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col xs={24} className="md:mt-10 mt-5">
                    <Tabs defaultActiveKey="1" activeKey={queryParams.get('tab') || '1'} onChange={(e) => {
                        setActiveTab(e)
                        navigate(`/${paths.payroll.index}/${paths.payroll.employees}?tab=${e}`)
                        }} items={items} />
                </Col>
            </Row>
            {openAddDepartmentModal && (
                <DepartmentModal
                    setRefresh={setRefresh}
                    open={openAddDepartmentModal}
                    handleCancel={() => setOpenAddDepartmentModal(false)}
                />
            )}

            {openBulkUploadModal && (
                <BulkUploadModal
                    open={openBulkUploadModal}
                    handleCancel={() => setOpenBulkUploadModal(false)}
                />
            )}

            {openSelectEmployeeModal && (
                <SelectEmployeeModal
                    onEmployeeSelect={handleEmployeeSelected}
                    open={openSelectEmployeeModal}
                    handleCancel={() => setOpenSelectEmployeeModal(false)}
                />
            )}
            {openOffBoardEmployeeModal && (
                <OffBoardEmployeeModal
                    open={openOffBoardEmployeeModal}
                    handleCancel={() => setOpenOffBoardEmployeeModal(false)}
                    employeeData={selectedEmployee}
                    setOffboardReload={setOffboardReload}
                />
            )}
        </Content>
    );
}

export default Employees;
