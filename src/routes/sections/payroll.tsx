import { lazy } from 'react';

import { Outlet } from 'react-router-dom';

import { paths } from '../paths';

const ActivityCalendarPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/ActivityCalendar')
);
const OrganizationSettingsPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/OrganizationSettings')
);
const ComplianceSettingsPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/complianceSettings')
);

const HomePage = lazy(() => import('@src/domains/dashboard/Payroll/pages/HomePage'));
const EmployeeOnboardPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/EmployeeOnboardPage')
);
const EmployeesPage = lazy(() => import('@src/domains/dashboard/Payroll/pages/Employees'));
const EmployeeSalaryPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/EmployeeSalary')
);

const AnnouncementsPage = lazy(() => import('@src/domains/dashboard/Payroll/pages/Announcements'));
const EmployeeLeavePage = lazy(() => import('@src/domains/dashboard/Payroll/pages/EmployeeLeave'));
const EmployeeBulkUpload = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/EmployeeBulkUpload')
);
const EmployeeSuccessPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/EmployeeSuccess')
);
const EmployeeOnboardSuccessPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/EmployeeOnboardSuccessPage')
);

const WpsRegistration = lazy(() => import('@src/domains/dashboard/Payroll/pages/WpsRegistration'));
const EmployeeDetails = lazy(() => import('@src/domains/dashboard/Payroll/pages/EmployeeDetails'));
const EmployeeReimbursementPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/EmployeeReimbursement')
);
const ReportsPage = lazy(() => import('@src/domains/dashboard/Payroll/pages/Reports'));
const CompanyDocumentsPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/CompanyDocuments')
);
const LeaveSummaryPage = lazy(() => import('@src/domains/dashboard/Payroll/pages/LeaveSummary'));
const EmployeeSalaryDetails = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/SalaryProfileNew')
);
const PayrollRecordSuccessPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/PayrollRecordSuccess')
);
const DocumentsCategoryPage = lazy(
    () => import('@src/domains/dashboard/Payroll/pages/DocumentsCategory')
);
const EmployeeSalaryProfilePage = lazy(
    () => import('@src/domains/dashboard/Payroll/components/EmployeeSalary/EmployeeSalaryProfile')
);

// -----------------------------------------------------------------------

export const payrollRoutes = [
    {
        path: '',
        element: (
            //  currently disabled payroll guard
            // <PayrollAuthGuard>
            <Outlet />
            // </PayrollAuthGuard>
        ),
        children: [
            {
                element: <EmployeeSalaryDetails />,
                path: `${paths.payroll.employeesSalary}/${paths.payroll.salaryProfile}`,
            },
            {
                element: <PayrollRecordSuccessPage />,
                path: `${paths.payroll.employeesSalary}/${paths.payroll.payrollRecordSuccess}`,
            },
            { element: <EmployeeSalaryPage />, path: paths.payroll.employeesSalary },
            { element: <EmployeeSalaryProfilePage />, path: `${paths.payroll.employeesSalary}/${paths.payroll.employeeSalaryProfile}` },
            {
                element: <AnnouncementsPage />,
                path: `${paths.payroll.announcements}`,
            },
        ],
    },
    { element: <HomePage />, index: true },
    { element: <ActivityCalendarPage />, path: paths.payroll.activityCalendar },
    { element: <OrganizationSettingsPage />, path: paths.payroll.payrollSettings },
    { element: <ComplianceSettingsPage />, path: paths.payroll.complianceSettings },
    { element: <EmployeeLeavePage />, path: paths.payroll.employeeLeave },
    { element: <ReportsPage />, path: paths.payroll.reports },

    {
        element: <EmployeeOnboardPage />,
        path: `${paths.payroll.employees}/${paths.payroll.addEmployee}`,
    },
    { element: <EmployeesPage />, path: paths.payroll.employees },
    {
        element: <EmployeeBulkUpload />,
        path: `${paths.payroll.employees}/${paths.payroll.bulkUpload}`,
    },
    {
        element: <EmployeeSuccessPage />,
        path: `${paths.payroll.employees}/${paths.payroll.employeeSuccess}`,
    },
    {
        element: <EmployeeOnboardSuccessPage />,
        path: `${paths.payroll.employees}/${paths.payroll.employeeAdded}`,
    },
    { element: <WpsRegistration />, path: paths.payroll.wpsRegistration },

    {
        element: <EmployeeDetails />,
        path: `${paths.payroll.employees}/${paths.payroll.employeeProfile}`,
    },
    { element: <EmployeeReimbursementPage />, path: paths.payroll.employeeReimbursement },
    {
        path: paths.payroll.allDocuments,
        children: [
            { element: <CompanyDocumentsPage />, index: true },
            { element: <DocumentsCategoryPage />, path: paths.payroll.documentsDetails }, // for admin
        ],
    },

    {
        element: <EmployeeDetails />,
        path: `${paths.payroll.employeesSalary}/${paths.payroll.employeeProfile}`,
    },
    {
        element: <LeaveSummaryPage />,
        path: `${paths.payroll.employeeLeave}/${paths.payroll.leaveSummary}`,
    },
];
