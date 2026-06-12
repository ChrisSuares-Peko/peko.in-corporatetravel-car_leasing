import React, { lazy, useEffect, useRef, useState } from 'react';

import '../../assets/style.css';
import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';
import SearchSelectInput from '@src/domains/dashboard/billPayments/components/CustomSelectSearch';
import { useAppSelector } from '@src/hooks/store';

import useGeneralApi from '../../hooks/useGeneralApi';
import useGetNumberDetails from '../../hooks/useGetNumberDetails';
import usePayment from '../../hooks/usePayment';
import usePrepaidPlans from '../../hooks/usePrepaidPlans';
import useValidateRecharge from '../../hooks/useValidateRecharge';
import { prepaidSchema } from '../../schema';
import { clearPrepaidBeneficiary } from '../../slice/beneficiarySlice';
import { Beneficiary, OptionsType } from '../../types';
import { prepaidProviders } from '../../utils/data';

const PlanDrawer = lazy(() => import('../PlanDrawer'));

type PaymentDetailsFormProps = {
    serviceProviderData?: OptionsType[];
};

const PrepaidForm: React.FC<PaymentDetailsFormProps> = ({ serviceProviderData }) => {
    const [isPlanModalOpen, setPlanModalOpen] = useState<boolean>(false);
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const { prepaidBeneficiary } = useAppSelector(state => state.reducer.benficiaryPrepaid);
    const { prepaid } = useAppSelector(state => state.reducer.Prepaid);
    const { getPlans, plansData, planCategories, isLoading } = usePrepaidPlans(setPlanModalOpen);
    const { handlePrepaidPay } = usePayment();
    const { validateRecharge } = useValidateRecharge();
    const { stateData } = useGeneralApi();
    const { state } = useLocation();
    const dispatch = useDispatch();
    const hasEdited = useRef(false);
    const [isServiceProviderOpen, setIsServiceProviderOpen] = useState(false);
    const [isCircleOpen, setIsCircleOpen] = useState(false);
    const beneficiaryData: Beneficiary = state || prepaidBeneficiary || null;

    const [prefilledValues, setPrefilledValues] = useState({
        serviceProvider: beneficiaryData?.serviceProvider || '',
        circle: beneficiaryData?.providerCircle || '',
        mobileNumber: beneficiaryData?.phoneNo || '',
    });
    
    const [beneficiarySelectionCounter, setBeneficiarySelectionCounter] = useState<number>(0);
    const previousBeneficiaryRef = useRef<string>('');
    
    useEffect(() => {
        let currentBeneficiary = null;
        let isFromRedux = false;
        
        if (prepaidBeneficiary?.serviceProvider || prepaidBeneficiary?.providerCircle || prepaidBeneficiary?.phoneNo) {
            currentBeneficiary = prepaidBeneficiary;
            isFromRedux = true;
        } else if (state && (state.serviceProvider || state.providerCircle || state.circle || state.phoneNo || state.mobileNumber)) {
            currentBeneficiary = state;
        }

        if (!currentBeneficiary) {
            return;
        }

        const beneficiaryId = (currentBeneficiary as any).id || '';
        const serviceProvider = currentBeneficiary.serviceProvider || '';
        const circle = currentBeneficiary.providerCircle || (currentBeneficiary as any).circle || '';
        const phoneNo = currentBeneficiary.phoneNo || (currentBeneficiary as any).mobileNumber || '';
        const beneficiaryKey = beneficiaryId 
            ? `${beneficiaryId}-${serviceProvider}-${circle}-${phoneNo}`
            : `${serviceProvider}-${circle}-${phoneNo}`;

        const newValues = {
            serviceProvider,
            circle,
            mobileNumber: phoneNo,
        };

        setPrefilledValues(newValues);
        
        const hasChanged = previousBeneficiaryRef.current !== beneficiaryKey;
        if (hasChanged || isFromRedux) {
            setBeneficiarySelectionCounter(prev => prev + 1);
            previousBeneficiaryRef.current = beneficiaryKey;
        }
    }, [prepaidBeneficiary, state]);

    const [mobileNumber, setMobileNumber] = useState(beneficiaryData?.phoneNo || '');
    const {
        getNumberData,
        numberData,
    } = useGetNumberDetails(mobileNumber);
    
    useEffect(() => {
        const newMobileNumber = prefilledValues.mobileNumber || '';
        if (newMobileNumber && newMobileNumber !== mobileNumber) {
            setMobileNumber(newMobileNumber);
            hasEdited.current = false;
        }
    }, [prefilledValues.mobileNumber, mobileNumber]);

    useEffect(() => {
        if (hasEdited.current && mobileNumber?.length === 10) {
            getNumberData();
        }
    }, [getNumberData, mobileNumber]);

    useEffect(() => {
        if (numberData?.CurrentOperator && numberData?.CurrentLocation) {
            const matchedProvider = prepaidProviders.find(
                opt => opt.label.toLowerCase() === numberData.CurrentOperator.toLowerCase()
            );
            const matchedCircle = stateData?.find(
                opt => opt.label.toLowerCase() === numberData.CurrentLocation.toLowerCase()
            );
            setPrefilledValues({
                serviceProvider: matchedProvider?.value || numberData.CurrentOperator,
                circle: matchedCircle?.value || numberData.CurrentLocation,
                mobileNumber: numberData.MobileNo,
            });
        }
    }, [numberData, stateData]);
    useEffect(
        () => () => {
            dispatch(clearPrepaidBeneficiary());
        },
        [dispatch]
    );
    return (
        <Formik
            key={`prepaid-form-${beneficiarySelectionCounter}-${prefilledValues.mobileNumber || ''}-${prefilledValues.serviceProvider || ''}`}
            initialValues={{
                serviceProvider: prefilledValues.serviceProvider || prepaid.serviceProvider || '',
                circle: prefilledValues.circle || prepaid.circle || '',
                mobileNumber: prefilledValues.mobileNumber || prepaid.mobileNumber || '',
                amount: '', // Reset amount when beneficiary changes (plans are different for each beneficiary)
            }}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                setSubmitting(true);
                try {
                    const validationResponse = await validateRecharge({
                        serviceProvider: values.serviceProvider,
                        mobileNo: values.mobileNumber,
                        amount: values.amount,
                        userType: role,
                        userId: id,
                    });

                    if (!validationResponse || validationResponse?.StatusCode !== '0') {
                        setSubmitting(false);
                        setFieldError(
                            'amount',
                            validationResponse?.Status || 'Recharge validation failed. Please try again.'
                        );
                        return;
                    }
                    
                    await handlePrepaidPay(values);
                } catch (error) {
                    setSubmitting(false);
                    setFieldError(
                        'amount',
                        error instanceof Error ? error.message : 'Validation failed. Please try again.'
                    );
                }
            }}
            validationSchema={prepaidSchema}
            enableReinitialize
        >
            {({ handleSubmit, values, isSubmitting, setFieldValue, validateField }) => (
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={[30, 0]} className="flex-col sm:flex-row">
                        <Col xs={24} sm={12}>
                            <TextInput
                                label="Mobile Number"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                isRequired
                                type="text"
                                allowNumbersOnly
                                maxLength={10}
                                handleChange={value => {
                                    setFieldValue('mobileNumber', value);
                                    setMobileNumber(value);
                                    hasEdited.current = true;
                                    if (!value) {
                                        setFieldValue('serviceProvider', '');
                                        setFieldValue('circle', '');
                                    }
                                }}
                            />
                        </Col>
                        <>
                            <Col xs={24} sm={12}>
                                <SelectInput
                                    isRequired
                                    name="serviceProvider"
                                    label="Select Service Provider"
                                    placeholder="Select Service Provider"
                                    options={prepaidProviders}
                                    allowClear
                                    handleChange={value => {
                                        const serviceprovider = value !== undefined ? value : '';
                                        setTimeout(() => {
                                            validateField('serviceProvider');
                                        }, 0);
                                        setFieldValue('serviceProvider', serviceprovider);
                                        setIsServiceProviderOpen(false);
                                        if (!value) {
                                            setFieldValue('circle', '');
                                            setIsCircleOpen(false);
                                            return;
                                        }
                                        if (values.circle) return;
                                        if (value) setTimeout(() => setIsCircleOpen(true), 100);
                                    }}
                                    open={isServiceProviderOpen}
                                    onDropdownVisibleChange={open => setIsServiceProviderOpen(open)}
                                />
                            </Col>
                            <Col xs={24} sm={12}>
                                <SearchSelectInput
                                    isRequired
                                    name="circle"
                                    label="Select Circle"
                                    allowClear
                                    options={stateData || []}
                                    placeholder="Select Circle"
                                    handleChange={value => {
                                        const circ = value !== undefined ? value : '';
                                        setFieldValue('circle', circ);
                                    }}
                                    open={isCircleOpen}
                                    onDropdownVisibleChange={open => setIsCircleOpen(open)}
                                />
                            </Col>
                            <Col xs={24} sm={12}>
                                <TextInput
                                    classes="custom-input"
                                    isRequired
                                    label="Enter Amount"
                                    name="amount"
                                    placeholder="Example: 100"
                                    type="text"
                                    allowNumbersOnly
                                    maxLength={5}
                                    readOnly
                                    addonAfter={
                                        <Button
                                            className="cursor-pointer text-bgOrange2 custom-btn"
                                            onClick={() => {
                                                if (!values.serviceProvider) {
                                                    setIsServiceProviderOpen(true);
                                                    return;
                                                }
                                                if (!values.circle) {
                                                    setTimeout(() => setIsCircleOpen(true), 100);
                                                    return;
                                                }
                                                getPlans({
                                                    userType: role,
                                                    userId: id,
                                                    serviceProvider: values.serviceProvider,
                                                    location: values.circle,
                                                });
                                            }}
                                        >
                                            Browse Plans
                                        </Button>
                                    }
                                />
                            </Col>
                        </>
                    </Row>
                    <PlanDrawer
                        isOpen={isPlanModalOpen}
                        handleClose={() => setPlanModalOpen(!isPlanModalOpen)}
                        plansData={plansData}
                        planCategories={planCategories}
                        serviceProvider={values.serviceProvider}
                        isLoading={isLoading}
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        danger
                        className="px-10 mt-4"
                        loading={isSubmitting}
                    >
                        Proceed to Recharge
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default PrepaidForm;
