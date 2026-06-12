import { useState } from 'react';

import { Form, Button, Flex, Typography } from 'antd';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import IndianFlag from '@assets/svg/indianFlag.svg';
import CheckboxInput from '@components/atomic/inputs/CheckboxInput';
import TextInput from '@components/atomic/inputs/TextInput';
import { useAppSelector } from '@src/hooks/store';

import { ValidateUser } from '../../api/index';
import { registerSteponeSchema } from '../../schema';
import { setPasswordPolicy } from '../../slices/passwordPolicySlice';
import { nextStep, setFormData } from '../../slices/registerSlice';
import { ValidateUserValues } from '../../types/index';

const RegisterStepOneForm = () => {
    const dispatch = useDispatch();
    const { formData } = useAppSelector(state => state.reducer.registration);
    const [isLoading, setIsLoading] = useState(false);
    const handleValidateUser = async (values: ValidateUserValues) => {
        setIsLoading(true);
        const res = await ValidateUser({
            mobileNo: values.phonenumber,
            email: values.email,
            referralCode: values.referralCode,
            name: values.name,
            contactPersonName: values.contactPersonName,
        });

        if (res.status === true) {
            if (!values.referralCode) {
                delete values.referralCode;
            }
            dispatch(setFormData(values));
            dispatch(setPasswordPolicy(res.data));
            dispatch(nextStep());
        }
        setIsLoading(false);
    };
    const [searchParams] = useSearchParams();
    const referralCode = searchParams.get('referralCode');
    return (
        <Formik
            initialValues={{
                name: formData.name,
                contactPersonName: formData.contactPersonName,
                phonenumber: formData.phonenumber,
                email: formData.email,
                referralCode: referralCode || formData.referralCode,
                 privacyPolicyAccepted: formData.privacyPolicyAccepted || false,
                platformAgreementAccepted: formData.platformAgreementAccepted || false,
                marketingConsent: formData.marketingConsent || false,
            }}
            validationSchema={registerSteponeSchema}
            onSubmit={values => {
                handleValidateUser(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form onFinish={handleSubmit} className="w-full mt-5">
                    <TextInput
                        name="contactPersonName"
                        label=""
                        placeholder="Full Name"
                        type="text"
                        size="large"
                        classes="md:h-12"
                        maxLength={50}
                    />
                    <TextInput
                        name="name"
                        label=""
                        placeholder="Company Name"
                        type="text"
                        size="large"
                        classes="md:h-12 mt-2"
                        maxLength={50}
                    />

                    <TextInput
                        name="phonenumber"
                        label=""
                        placeholder="Mobile Number"
                        type="text"
                        size="large"
                        maxLength={10}
                        allowNumbersOnly
                        inputMode='numeric'
                        prefix={
                            <Flex
                                align="center"
                                gap={6}
                                className="h-full p-2 cursor-not-allowed border-e me-2"
                            >
                                <img src={IndianFlag} alt="" />
                                <p>+91</p>
                            </Flex>
                        }
                        classes="md:h-12 p-0 mt-2"
                    />

                    <TextInput
                        name="email"
                        label=""
                        placeholder="Business Email"
                        type="text"
                        size="large"
                        classes="md:h-12 mt-2"
                        maxLength={50}
                    />

                    <TextInput
                        name="referralCode"
                        label=""
                        placeholder="Referral Code (Optional)"
                        type="text"
                        size="large"
                        classes="md:h-12 mt-2"
                        maxLength={50}
                        isDisabled={!!referralCode}
                    />
                    <CheckboxInput name="privacyPolicyAccepted">
                        <Typography.Text className="text-[.85rem]">
                           I have read and agree to the <Typography.Link href="https://peko.one/in/privacy-policy" target="_blank" underline style={{ color: 'black', fontSize: '.85rem', textDecorationColor: 'black' }}>Privacy Policy</Typography.Link> and consent to the collection and processing of my personal data as described therein. I understand that I may withdraw my consent in accordance with the <Typography.Link href="https://peko.one/in/privacy-policy" target="_blank" underline style={{ color: 'black', fontSize: '.85rem', textDecorationColor: 'black' }}>Privacy Policy</Typography.Link>.
                        </Typography.Text>
                    </CheckboxInput>
                    <CheckboxInput name="platformAgreementAccepted">
                        <Typography.Text className="text-[.85rem]">
                            I have read and agree to the <Typography.Link href="https://peko.one/in/platform-agreement" target="_blank" underline style={{ color: 'black', fontSize: '.85rem', textDecorationColor: 'black' }}>Peko Platform Agreement</Typography.Link> and confirm that I am authorised to create an account and accept the Agreement on behalf of the business.
                        </Typography.Text>
                    </CheckboxInput>
                    <CheckboxInput name="marketingConsent">
                        <Typography.Text className="text-[.85rem]">
                            I agree to receive marketing communications from Peko via email, SMS,
                            phone, or WhatsApp. I can opt out at any time.
                        </Typography.Text>
                    </CheckboxInput>
                    <Button
                        htmlType="submit"
                        type="primary"
                        danger
                        className="w-full h-10 font-semibold"
                        loading={isLoading}
                    >
                        Next
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterStepOneForm;
