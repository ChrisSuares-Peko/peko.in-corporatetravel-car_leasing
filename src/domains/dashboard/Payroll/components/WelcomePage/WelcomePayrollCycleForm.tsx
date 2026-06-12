import React from 'react';

import { Button, Flex, Form, Skeleton, Typography } from 'antd';
import { Formik } from 'formik';

import useGetPayrollCycle from '../../hooks/OrganizationSettings/useGetPayrollCycle';
import useOrganizationSettingsApi from '../../hooks/OrganizationSettings/useOrganizationSettingsApi';
import { payrollCycleSchema } from '../../schema/organizationSettings';
import PayrollCycleForm from '../organizationSettings/payrollCycle/PayrollCycleForm';

interface Props {
    setActiveTabKey: (key: any) => void;
}

const WelcomePayrollCycleForm: React.FC<Props> = ({ setActiveTabKey }) => {
    const { updatePayrollSettings } = useOrganizationSettingsApi();
    const { payrollCycleData, isLoading } = useGetPayrollCycle();
    return isLoading ? (
        <Skeleton />
    ) : (
        <Flex className="xl:flex-row xs:flex-col">
            <Formik
                initialValues={{
                    selectWorkingDays: payrollCycleData?.payrollSettings?.selectWorkingDays || [],
                    calculateSalaryBasedOn:
                        payrollCycleData?.payrollSettings?.calculateSalaryBasedOn || 'ACTUALDAYS',
                    payrollFrom: payrollCycleData?.payrollSettings?.payrollFrom || '',
                    payEmployeeOn: payrollCycleData?.payrollSettings?.payEmployeeOn
                        ? Number(payrollCycleData.payrollSettings.payEmployeeOn)
                        : undefined,
                }}
                enableReinitialize
                validationSchema={payrollCycleSchema}
                validateOnChange={false}
                validateOnBlur
                onSubmit={async values => {
                    await updatePayrollSettings(values);
                    setActiveTabKey('2');
                }}
            >
                {({ handleSubmit, isSubmitting, setFieldValue, values, errors }) => (
                    <Form layout="vertical" className="w-full " onFinish={handleSubmit}>
                        <PayrollCycleForm
                            setFieldValue={setFieldValue}
                            values={values}
                            errors={errors}
                        />
                        <Flex
                            justify="space-between"
                            align="center"
                            gap={10}
                            className="w-full mt-6"
                        >
                            <Button onClick={() => setActiveTabKey('0')} className="px-8">
                                <Typography.Text className="text-textRed">Back</Typography.Text>
                            </Button>
                            <Button
                                className="px-12"
                                type="primary"
                                danger
                                htmlType="submit"
                                loading={isSubmitting}
                            >
                                Next
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Flex>
    );
};

export default WelcomePayrollCycleForm;
