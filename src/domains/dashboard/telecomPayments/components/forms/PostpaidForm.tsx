import React, { useCallback, useEffect, useMemo } from 'react';

import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';

import TextInput from '@components/atomic/inputs/TextInput';
import { BBPSCategoryName } from '@customtypes/general';
import SearchSelectInput from '@src/domains/dashboard/billPayments/components/CustomSelectSearch';
import { useAppSelector } from '@src/hooks/store';

import usePayment from '../../hooks/usePayment';
import useServiceProviderApi from '../../hooks/useServiceProviderApi';
import { generateDynamicSchema } from '../../schema';
import { CustomerParam } from '../../types';

const PostpaidForm: React.FC = () => {
    const [selectedBillerData, setSelectedBillerData] = React.useState<CustomerParam[]>([]);
    const [selectedBillerId, setSelectedBillerId] = React.useState<string>('');
    const { serviceProviderData } = useServiceProviderApi(BBPSCategoryName.postpaid);
    const { handlePostpaidPay, isLoading } = usePayment();
    const { bills } = useAppSelector(state => state.reducer.billPayments);
    const handleChange = useCallback(
        (value: string) => {
            const selectedOption =
                serviceProviderData && serviceProviderData.find(opt => opt.value === value);
            setSelectedBillerData(selectedOption?.customerParams || []);
            setSelectedBillerId(selectedOption?.value || '');
        },
        [serviceProviderData, setSelectedBillerData, setSelectedBillerId]
    );

    const initialValues = useMemo(() => {
        if (bills && Object.keys(bills).length > 0) {
            return { ...bills };
        }
        const values: any = {};
        values.serviceProvider = selectedBillerId;
        if (selectedBillerData && selectedBillerData.length > 0) {
            selectedBillerData.forEach(input => {
                values[input.paramName] = '';
            });
        }
        return values;
    }, [bills, selectedBillerId, selectedBillerData]);

    useEffect(() => {
        if (bills && Object.keys(bills).length > 0 && serviceProviderData?.length) {
            const matched = serviceProviderData.find(opt => opt.value === bills.serviceProvider);
            if (matched) {
                setSelectedBillerId(matched.value);
                setSelectedBillerData(matched.customerParams || []);
            }
        }
    }, [bills, serviceProviderData]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async values => {
                await handlePostpaidPay(values, serviceProviderData?.[0].label);
            }}
            validationSchema={generateDynamicSchema(selectedBillerData)}
            enableReinitialize
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form layout="vertical" onFinish={handleSubmit} className="w-full">
                    <Row gutter={30} className="flex-col sm:flex-row ">
                        <Col xs={24} sm={12}>
                            <SearchSelectInput
                                name="serviceProvider"
                                label="Select Service Provider"
                                options={serviceProviderData || []}
                                placeholder="Select Service Provider"
                                handleChange={handleChange}
                                // isLoading={isLoading}
                            />
                        </Col>
                        {selectedBillerData.map((input, i) => (
                            <Col xs={24} sm={12} key={i}>
                                <TextInput
                                    label={input.paramName}
                                    name={input.paramName}
                                    placeholder={`${input.paramName}`}
                                    type="text"
                                    key={i}
                                    isRequired={input.isOptional === 'false'}
                                    maxLength={input.maxLength || 30}
                                    allowNumbersOnly={input.dataType === 'NUMERIC'}
                                    allowAlphabetsAndNumbersOnly={input.dataType === 'ALPHANUMERIC'}
                                />
                            </Col>
                        ))}
                    </Row>

                    <Button
                        htmlType="submit"
                        type="primary"
                        danger
                        className="px-10 mt-4"
                        loading={isLoading}
                    >
                        View Bill
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default PostpaidForm;
