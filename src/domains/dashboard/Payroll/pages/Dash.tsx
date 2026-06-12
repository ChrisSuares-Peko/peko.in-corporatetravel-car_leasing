/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from 'react';

import {
    Button,
    Col,
    Divider,
    Flex,
    Grid,
    List,
    Progress,
    Row,
    Skeleton,
    Tour,
    Typography,
    theme,
} from 'antd';
import { TourProps } from 'antd/lib';
import { Link, useNavigate } from 'react-router-dom';

import announcementIcon from '@domains/dashboard/Payroll/assets/icons/AnnouncementsNew.svg';
import companyDocumentIcon from '@domains/dashboard/Payroll/assets/icons/CompanyDocumentsNew.svg';
import dollarIcon from '@domains/dashboard/Payroll/assets/icons/dollar-circle.svg';
import payslipIcon from '@domains/dashboard/Payroll/assets/icons/DownloadPayslipNew.svg';
import employeeDoc from '@domains/dashboard/Payroll/assets/icons/employeeDoc.svg';
import employee from '@domains/dashboard/Payroll/assets/icons/Employees_Departments.svg';
import googleCalendarIcon from '@domains/dashboard/Payroll/assets/icons/googlecalendar.svg';
import leaveIcon from '@domains/dashboard/Payroll/assets/icons/Leaves_AttendanceNew.svg';
import reimbursementIcon from '@domains/dashboard/Payroll/assets/icons/ReimbursementsNew.svg';
import reportsIcon from '@domains/dashboard/Payroll/assets/icons/Reports_FormsNew.svg';
import salaryIcon from '@domains/dashboard/Payroll/assets/icons/SalaryNew.svg';
import DashboardHeader from '@domains/dashboard/Payroll/components/Dashboard/DashboardHeader';
import InfoCard from '@domains/dashboard/Payroll/components/Dashboard/InfoCard';
import NavigationCards from '@domains/dashboard/Payroll/components/Dashboard/NavigationCards';
import UpcomingActivityCard from '@domains/dashboard/Payroll/components/Dashboard/UpcomingActivityCard';
import { useAppSelector } from '@src/hooks/store';
import useScreenSize from '@src/hooks/useScreenSize';
import { useScrollToTop } from '@src/hooks/useScrollToTop';
import useGetAddonDetails from '@src/hooks/useSubscriptionAddons';
import { paths } from '@src/routes/paths';
import { accessKeys } from '@utils/accessKeys';
import { calculatePercentage } from '@utils/calculatePercentage';
import { formattedDateOnly } from '@utils/dateFormat';
import { packageAccessKeys } from '@utils/packageAccessKeys';

import useEnableProductTour from '../../Home/hooks/useEnableProductTour';
import Chart from '../components/Dashboard/Chart';
import DashboardBanner from '../components/Dashboard/DashboardBanner';
import DownloadPaySlipModal from '../components/modals/DownloadPaySlipModal';
import { useDashboardActivities } from '../hooks/dashboardHooks/useDashboardActivities';
import useGetEmployeeCount from '../hooks/dashboardHooks/useGetEmployeeCount';
import { useSummaryStats } from '../hooks/dashboardHooks/useSummaryStats';

const Dash = () => {
    const {
        token: { colorPrimary },
    } = theme.useToken();
    const screens = Grid.useBreakpoint();
    const navigate = useNavigate();
    useScrollToTop();

    const activeEmployessRef = useRef(null);
    const totalSalaryRef = useRef(null);
    const nextMonthSpendsRef = useRef(null);
    const employeesRef = useRef(null);
    const salaryRef = useRef(null);
    const leavesRef = useRef(null);
    const reportsRef = useRef(null);
    const announcementsRef = useRef(null);
    const reimbursementRef = useRef(null);
    const documentRef = useRef(null);
    const processSalaryRef = useRef(null);
    const addEmployeeRef = useRef(null);
    const addLeaveRef = useRef(null);
    const chartRef = useRef(null);
    const hrSettingsRef = useRef(null);
    const viewCalendarRef = useRef(null);

    const { handleUpdateTour } = useEnableProductTour();
    const { user } = useAppSelector(state => state.reducer.user);
    const [open, setOpen] = useState<boolean>(true);
    const { progress } = useAppSelector(state => state.reducer.payrollAuth);
    const { addonData } = useGetAddonDetails(accessKeys.payroll, packageAccessKeys.Payroll, false);
    const [openPayslipModal, setOpenPayslipModal] = useState(false);
    const { md } = useScreenSize();

    // Per-section data hooks — all share a single API call via module-level cache
    const { isLoading: summaryLoading, totalSalary, activeEmployees, nextMonthSalary } =
        useSummaryStats();
    const { isLoading: activitiesLoading, activities } = useDashboardActivities();
    const { count, date, isLoading: countLoading } = useGetEmployeeCount(true);

    const steps: TourProps['steps'] = [
        {
            title: "Welcome to Peko\u2019s Payroll",
            placement: 'center',
            description: (
                <Typography.Text className="font-thin text-white">
                    Manage your employee's personal and salary details.
                </Typography.Text>
            ),
        },
        {
            title: 'Active Employees',
            description: (
                <Typography.Text className="font-thin text-white">
                    Get a quick snapshot of your employees.
                </Typography.Text>
            ),
            target: () => activeEmployessRef.current,
        },
        {
            title: 'Total Salary',
            description: (
                <Typography.Text className="font-thin text-white">
                    Gain insight into your organization's salary expenditures.
                </Typography.Text>
            ),
            target: () => totalSalaryRef.current,
        },
        {
            title: 'Next Month Salary',
            description: (
                <Typography.Text className="font-thin text-white">
                    Plan for upcoming payments.
                </Typography.Text>
            ),
            target: () => nextMonthSpendsRef.current,
        },
        {
            title: 'Employees',
            description: (
                <Typography.Text className="font-thin text-white">
                    Dive into detailed employee information.
                </Typography.Text>
            ),
            target: () => employeesRef.current,
        },
        {
            title: 'Salary',
            description: (
                <Typography.Text className="font-thin text-white">
                    View individual salary details.
                </Typography.Text>
            ),
            target: () => salaryRef.current,
        },
        {
            title: 'Leaves',
            description: (
                <Typography.Text className="font-thin text-white">
                    Manage and track employee leave requests.
                </Typography.Text>
            ),
            target: () => leavesRef.current,
        },
        {
            title: 'Reimbursement',
            description: (
                <Typography.Text className="font-thin text-white">
                    Track employee reimbursement requests.
                </Typography.Text>
            ),
            target: () => reimbursementRef.current,
        },
        {
            title: 'Reports & Forms',
            description: (
                <Typography.Text className="font-thin text-white">
                    Access payroll reports, summaries, and statutory forms here.
                </Typography.Text>
            ),
            target: () => reportsRef.current,
        },
        {
            title: 'Announcements',
            description: (
                <Typography.Text className="font-thin text-white">
                    Create new announcements and send it to your employees.
                </Typography.Text>
            ),
            target: () => announcementsRef.current,
        },
        {
            title: 'Download Payslip',
            description: (
                <Typography.Text className="font-thin text-white">
                    Download employee payslips for a selected month and year.
                </Typography.Text>
            ),
            target: () => documentRef.current,
        },
        {
            title: 'Process Salary',
            description: (
                <Typography.Text className="font-thin text-white">
                    Streamline your payroll process.
                </Typography.Text>
            ),
            target: () => processSalaryRef.current,
            placement: 'top',
        },
        {
            title: 'Add Employee',
            description: (
                <Typography.Text className="font-thin text-white">
                    Easily onboard new team members.
                </Typography.Text>
            ),
            target: () => addEmployeeRef.current,
            placement: 'top',
        },
        {
            title: 'Payroll Settings',
            description: (
                <Typography.Text className="font-thin text-white">
                    Manage your Payroll and Organisation Settings here.
                </Typography.Text>
            ),
            target: () => hrSettingsRef.current,
            placement: 'top',
        },
        {
            title: 'View Calendar',
            description: (
                <Typography.Text className="font-thin text-white">
                    Stay organized with holidays and events.
                </Typography.Text>
            ),
            placement: 'top',
            target: () => viewCalendarRef.current,
        },
        {
            title: 'Payroll Graph',
            description: (
                <Typography.Text className="font-thin text-white">
                    View your monthly salary expenditures here.
                </Typography.Text>
            ),
            target: () => chartRef.current,
            placement: 'top',
        },
    ];

    const navMenuDetails = [
        {
            icon: employee,
            title: 'Employees & Departments',
            isActive: true,
            link: `/${paths.payroll.index}/${paths.payroll.employees}`,
            ref: employeesRef,
        },
        {
            icon: salaryIcon,
            title: 'Salary',
            isActive: true,
            link: `/${paths.payroll.index}/${paths.payroll.employeesSalary}`,
            ref: salaryRef,
        },
        {
            icon: leaveIcon,
            title: 'Leaves & Attendance',
            isActive: true,
            link: `/${paths.payroll.index}/${paths.payroll.employeeLeave}`,
            ref: leavesRef,
        },
        {
            icon: reimbursementIcon,
            title: 'Reimbursements',
            isActive: true,
            link: `/${paths.payroll.index}/${paths.payroll.employeeReimbursement}`,
            ref: reimbursementRef,
        },
        {
            icon: companyDocumentIcon,
            title: 'Company Documents',
            isActive: true,
            link: `/${paths.payroll.index}/${paths.payroll.allDocuments}`,
            ref: documentRef,
        },
        {
            icon: reportsIcon,
            title: 'Reports & Forms',
            isActive: true,
            link: `/${paths.payroll.index}/${paths.payroll.reports}`,
            ref: reportsRef,
        },
        {
            icon: announcementIcon,
            title: 'Announcements ',
            isActive: true,
            link: `/${paths.payroll.index}/${paths.payroll.announcements}`,
            ref: announcementsRef,
        },
        {
            icon: payslipIcon,
            title: 'Download Payslip & Record',
            isActive: true,
            link: ``,
            onClick: () => setOpenPayslipModal(true),
            ref: documentRef,
        },
    ];

    const dashboardDetails = [
        {
            title: 'Active Employees',
            value: activeEmployees,
            isCurrency: false,
            icon: employeeDoc,
            bgColor: 'bg-[#FCF9FF]',
            ref: activeEmployessRef,
        },
        {
            title: 'Net Processed Salary',
            value: totalSalary,
            isCurrency: true,
            icon: dollarIcon,
            bgColor: 'bg-[#F1FFF6]',
            ref: totalSalaryRef,
        },
        {
            title: 'Next Month Salary',
            value: nextMonthSalary,
            isCurrency: true,
            icon: googleCalendarIcon,
            bgColor: 'bg-[#F2F7FB]',
            ref: nextMonthSpendsRef,
        },
    ];

    return (
        <>
            {progress !== '100%' && <DashboardBanner />}
            <DashboardHeader
                addEmployee={addEmployeeRef}
                addLeave={addLeaveRef}
                hrSettings={hrSettingsRef}
                processSalary={processSalaryRef}
            />
            <Divider
                className="p-0 m-0 -ml-10 "
                style={{ width: screens.xxl ? '105.8%' : '106.6%' }}
            />

            <Row>
                <Col xl={18} className="py-10">
                    <Row gutter={[10, 40]} className="md:pr-8">
                        {/* Info cards — each shows its own skeleton while summaryLoading */}
                        {dashboardDetails.map((item, i) => (
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={12}
                                xl={8}
                                xxl={8}
                                key={i}
                                className="flex justify-center min-h-16"
                            >
                                {summaryLoading ? (
                                    <Skeleton.Button
                                        active
                                        style={{ width: '100%', height: 120, borderRadius: 16 }}
                                    />
                                ) : (
                                    <InfoCard
                                        title={item.title}
                                        value={item.value}
                                        icon={item.icon}
                                        isCurrency={item.isCurrency}
                                        bgColor={item.bgColor}
                                        reference={item.ref}
                                    />
                                )}
                            </Col>
                        ))}

                        {md ? (
                            <Row className="w-full md:justify-between" justify="center">
                                {navMenuDetails.map((item, i) => (
                                    <Col key={i} className="flex justify-center p-1 lg:p-1">
                                        <NavigationCards
                                            icon={item.icon}
                                            title={item.title}
                                            isActive={item.isActive}
                                            link={item.link}
                                            reference={item.ref}
                                            onClick={item.onClick}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Flex justify="center">
                                <Row gutter={[0, 15]} justify="start">
                                    {navMenuDetails.map((item, index) => (
                                        <Col xs={6} key={index}>
                                            <NavigationCards
                                                icon={item.icon}
                                                title={item.title}
                                                isActive={item.isActive}
                                                link={item.link}
                                                onClick={item.onClick}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Flex>
                        )}

                        {/* Employee count / progress section — skeleton while loading */}
                        {(summaryLoading || countLoading) && (
                            <Col span={24}>
                                <Skeleton active paragraph={{ rows: 2 }} />
                            </Col>
                        )}
                        {!summaryLoading && !countLoading && activeEmployees !== undefined && (
                            <>
                                <Col span={24}>
                                    <Flex vertical className="w-full">
                                        <Typography.Text
                                            className="font-medium "
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            Number of added employees: {count} Employee
                                            {count > 1 ? 's' : ''}
                                        </Typography.Text>

                                        <Flex
                                            align={md ? 'center' : 'self-start'}
                                            gap={10}
                                            className="flex-col w-full mt-2 align-middle items-center md:flex-row"
                                        >
                                            <Progress
                                                className="w-full mt-2 md:w-7/12 "
                                                percent={calculatePercentage(
                                                    count,
                                                    addonData?.maxLimit
                                                )}
                                                strokeColor="#05BE63"
                                            />
                                            <Typography.Text className="flex-wrap text-xs  sm:text-base xl:whitespace-nowrap ">
                                                {Number(addonData?.maxLimit) - Number(count)} Left
                                                of {addonData?.maxLimit} Employees
                                            </Typography.Text>

                                            {user?.roleName !== 'corporate sub user' && (
                                                <Button
                                                    danger
                                                    type="default"
                                                    className="px-4 ml-auto text-xs font-medium w-fit"
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(
                                                            `${paths.payroll.payrollSettings}?activeTab=8`
                                                        )
                                                    }
                                                >
                                                    Upgrade
                                                </Button>
                                            )}
                                        </Flex>
                                        {date && (
                                            <Typography.Text
                                                className="font-medium text-gray-400"
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                Last employee added on{' '}
                                                {formattedDateOnly(new Date(date!))}
                                            </Typography.Text>
                                        )}
                                    </Flex>
                                </Col>
                                <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                                    <Chart reference={chartRef} />
                                </Col>
                            </>
                        )}
                    </Row>
                </Col>

                {/* Activities panel (desktop) — its own skeleton tied to activitiesLoading */}
                <Col className="border-1 min-h-40" xl={6} xs={0} md={0}>
                    {activitiesLoading ? (
                        <>
                            {Array.from({ length: activities.length || 5 }, (_, i) => (
                                <div key={i}>
                                    <Skeleton.Input
                                        style={{ width: 200, marginBottom: 8, marginTop: 4 }}
                                        active
                                        size="small"
                                    />
                                    <Skeleton
                                        style={{ width: 700, marginBottom: 8, marginTop: 4 }}
                                        active
                                        title={false}
                                        paragraph={{ rows: 1, width: ['50%', '100%'] }}
                                    />
                                    <Skeleton
                                        style={{ width: 700, marginBottom: 8, marginTop: 4 }}
                                        active
                                        title={false}
                                        paragraph={{ rows: 1, width: ['50%', '100%'] }}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <List
                            className="md:border-l md:border-b mt-6 "
                            style={{ minHeight: 'calc(100% - 3.5rem)' }}
                            bordered={false}
                            dataSource={activities}
                            header={
                                <Flex
                                    className="pl-6 mt-4 mb-2"
                                    justify="space-between"
                                    style={{ borderBottom: 'none' }}
                                >
                                    <Typography.Text className="text-xl font-medium">
                                        Activities
                                    </Typography.Text>
                                    <Link
                                        to={`/${paths.payroll.index}/${paths.payroll.activityCalendar}`}
                                    >
                                        <Typography.Text
                                            ref={viewCalendarRef}
                                            className="text-base"
                                            style={{ color: colorPrimary }}
                                        >
                                            View Calendar
                                        </Typography.Text>
                                    </Link>
                                </Flex>
                            }
                            renderItem={(item, i) => (
                                <List.Item key={i}>
                                    <Flex className="pl-8 mt-2" vertical gap="small">
                                        <Typography.Text className="text-base font-medium">
                                            {item.title}
                                        </Typography.Text>
                                        <Typography.Paragraph>{item.body}</Typography.Paragraph>
                                        <Typography.Text className="text-end text-textGreen">
                                            {item.start.substring(0, 10)}
                                        </Typography.Text>
                                    </Flex>
                                </List.Item>
                            )}
                        />
                    )}
                </Col>

                {/* Activities panel (mobile) */}
                <Flex className="xs:block md:hidden" vertical>
                    <Typography.Title className="ml-3" level={5}>
                        Activities
                    </Typography.Title>
                    <Row gutter={[40, 40]} className="mt-5">
                        {activitiesLoading ? (
                            <Skeleton.Input
                                style={{ width: 200, marginBottom: 8, marginTop: 4 }}
                                active
                                size="small"
                            />
                        ) : (
                            activities.map((item, i) => (
                                <Col xs={24} sm={12} md={8} lg={8} xl={8} key={i}>
                                    <UpcomingActivityCard
                                        isLoading={activitiesLoading}
                                        date={item.start}
                                        title={item.title}
                                        description={item.body}
                                        type={item.type}
                                    />
                                </Col>
                            ))
                        )}
                    </Row>
                </Flex>

                {user && md && (
                    <Tour
                        open={user.productTour.payroll && open}
                        disabledInteraction
                        onFinish={() => handleUpdateTour('payroll')}
                        onClose={() => {
                            setOpen(false);
                            handleUpdateTour('payroll');
                        }}
                        steps={steps}
                        arrow
                        animated
                        type="primary"
                        placement="bottom"
                        scrollIntoViewOptions
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                        indicatorsRender={(current, total) => <></>}
                    />
                )}
                {openPayslipModal && (
                    <DownloadPaySlipModal
                        open={openPayslipModal}
                        handleCancel={() => setOpenPayslipModal(false)}
                        setRefresh={() => {}}
                    />
                )}
            </Row>
        </>
    );
};

export default Dash;
