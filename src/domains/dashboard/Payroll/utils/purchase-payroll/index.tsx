import { ReactNode } from 'react';

import { CheckOutlined, CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';

import Feature3 from '@domains/dashboard/Payroll/assets/images/automatePayroll.png';
import benefits from '@domains/dashboard/Payroll/assets/images/benefits.png';
import leaveTracking from '@domains/dashboard/Payroll/assets/images/leaveTracking.png';
import Feature1 from '@domains/dashboard/Payroll/assets/images/onboarding.png';
import payslip from '@domains/dashboard/Payroll/assets/images/payslip.png';
import Feature4 from '@domains/dashboard/Payroll/assets/images/paySlipGeneration.png';
import Feature6 from '@domains/dashboard/Payroll/assets/images/reimbursement.png';
import Feature5 from '@domains/dashboard/Payroll/assets/images/ReportsandCompliance.png';
import Feature2 from '@domains/dashboard/Payroll/assets/images/smartLeave.png';

export const features = [
    {
        icon: Feature1,
        iconMob: Feature1,
        title: 'Seamless Onboarding',
        description: 'Effortlessly onboard new hires with a quick, fully digital setup.',
    },
    {
        icon: Feature2,
        iconMob: leaveTracking,
        title: 'Smart Leave Tracking',
        description: 'Track leave requests, approvals, and balances with ease.',
    },
    {
        icon: Feature3,
        iconMob: leaveTracking,
        title: 'Automate Payroll',
        description: 'Run payroll in a few clicks, with automatic calculations.',
    },
    {
        icon: Feature4,
        iconMob: payslip,
        title: 'Instant Payslips',
        description: 'Generate professional, detailed payslips instantly.',
    },
    {
        icon: Feature5,
        iconMob: benefits,
        title: 'Integrated Benefits',
        description: 'Provide competitive benefits with health insurance, rewards, and perks.',
    },

    {
        icon: Feature6,
        iconMob: payslip,
        title: 'Instant Payslips',
        description: 'Generate professional, detailed payslips instantly.',
    },
];
interface TableColumn {
    title: ReactNode;
    dataIndex: string;
    key: string;
    render?: (text: any, record: any, index: number) => ReactNode;
}

export const purchaseDatacolumns: TableColumn[] = [
    {
        title: <Typography.Text className="text-lg font-medium">Services</Typography.Text>,
        dataIndex: 'services',
        key: 'services',
        render: text => text,
    },
    {
        title: <Typography.Text className="text-lg font-medium">Individual Plans</Typography.Text>,
        dataIndex: 'individualPlan',
        key: 'individualPlan',
        render: text => text,
    },
    {
        title: (
            <Flex vertical>
                <Typography.Text className="text-base font-medium">Standard</Typography.Text>
                <Typography.Text className="text-lg font-semibold">AED 299</Typography.Text>
                <Typography.Text className="text-xs font-normal">per month</Typography.Text>
                <Typography.Text className="text-xs font-normal text-green-300">
                    You will save AED 300
                </Typography.Text>
            </Flex>
        ),
        dataIndex: 'basic',
        key: 'basic',
        render: text => text, // Render React elements or components directly
    },
    {
        title: (
            <Flex vertical>
                <Typography.Text className="text-base font-medium text-lightRed">
                    Premium{' '}
                </Typography.Text>
                <Typography.Text className="text-lg font-semibold">AED 899</Typography.Text>
                <Typography.Text className="text-xs font-normal">per month</Typography.Text>
                <Typography.Text className="text-xs font-normal text-green-300">
                    You will save AED 300
                </Typography.Text>
            </Flex>
        ),
        dataIndex: 'premium',
        key: 'premium',
        render: text => text, // Render React elements or components directly
    },
];

export const purchaseData = [
    {
        key: '1',
        services: (
            <Flex justify="space-between">
                <Typography.Text>Basic</Typography.Text>
                <InfoCircleOutlined />
            </Flex>
        ),
        individualPlan: 'Free',
        basic: <CloseOutlined />,
        premium: <CloseOutlined />,
    },
    {
        key: '2',
        services: (
            <Flex justify="space-between">
                <Typography.Text>Payroll</Typography.Text>
                <InfoCircleOutlined />
            </Flex>
        ),
        individualPlan: 'AED 99/month',
        basic: <CheckOutlined />,
        premium: <CheckOutlined />,
    },
    {
        key: '3',
        services: (
            <Flex justify="space-between">
                <Typography.Text className="text-bgOrange2">Peko Cloud</Typography.Text>
                <InfoCircleOutlined />
            </Flex>
        ),
        individualPlan: 'AED 99/month',
        basic: <CheckOutlined />,
        premium: <CheckOutlined />,
    },
    {
        key: '4',
        services: (
            <Flex justify="space-between">
                <Typography.Text className="text-bgOrange2">The Collector</Typography.Text>
                <InfoCircleOutlined />
            </Flex>
        ),
        individualPlan: 'AED 99/month',
        basic: <CheckOutlined />,
        premium: <CheckOutlined />,
    },
    {
        key: '5',
        services: (
            <Flex justify="space-between">
                <Typography.Text className="text-bgOrange2">Peko Club</Typography.Text>
                <InfoCircleOutlined />
            </Flex>
        ),
        individualPlan: 'AED 99/month',
        basic: <CheckOutlined />,
        premium: <CheckOutlined />,
    },
];
export const serviceDetails =
    'Our payroll platform simplifies and streamlines all your HR needs. Start with quick, digital employee onboarding to get new hires ready in no time. Payroll is effortless with automated, accurate salary calculations, covering taxes and deductions. Manage leave requests seamlessly with an intuitive system that tracks balances and approvals. Instantly generate professional payslips for easy employee access and transparency. From onboarding to payroll, leave management, and compliance, our platform brings everything HR into one place. Focus on growing your business while we handle the HR details for you.';
export const subDescription = 'Built to support your team and streamline your operations';
