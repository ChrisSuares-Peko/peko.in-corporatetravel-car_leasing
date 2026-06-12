/* eslint-disable import/no-cycle */
import { useState } from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Image, Radio, Typography, Form, Tooltip, Space } from 'antd';
import { Formik } from 'formik';
import Lottie from 'react-lottie';

import logo from '@assets/mainLogo/Logo.png';
import animation from '@assets/success-animation.json';
import TextInput from '@components/atomic/inputs/TextInput';
import { TAB_ID } from '@src/App';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import useScreenSize from '@src/hooks/useScreenSize';

import VerificationModal from './VerificationModal';
import usePanGstApi from '../../hooks/usePanGst';
import { panGstValidationSchema } from '../../schema';
import { loginSuccess } from '../../slices/loginSlice';
import { nextStep, resetRegisterState } from '../../slices/registerSlice';
import { PanGstPayload } from '../../types';

const { Title, Text } = Typography;
const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

const RegisterStepFive = () => {
    const { xs, md } = useScreenSize();
    const [documentType, setDocumentType] = useState<'pan' | 'gst'>('pan'); // This ensures that `documentType` is either 'pan' or 'gst'
    const [isOpen, setIsOpen] = useState(false);
    const [resp, setResp] = useState<any>(null); // Store API response
    const [formValues, setFormValues] = useState<any>(null); // Store form values
    const { handlePanGst, isLoading } = usePanGstApi();
    const [verifiedDoc, setVerifiedDoc] = useState<{
        type: 'pan' | 'gst' | null;
        number: string;
        verified: boolean;
    }>({ type: null, number: '', verified: false });
    const dispatch = useAppDispatch();
    const { formData, loginData } = useAppSelector(state => state.reducer.registration);
    const authChannel = new BroadcastChannel('authChannel');
    const openModal = (response: any, values: any) => {
        setResp(response);
        setFormValues(values);
        setIsOpen(true);
    };

    const cancelModal = () => {
        setIsOpen(false);
        setResp(null);
        setFormValues(null);
    };
    const handleSubmitForOtp = async (values: any, { setFieldError }: any) => {
        const payload: PanGstPayload = {
            type: documentType,
            value: values.documentName,
            contactPersonName: formData.contactPersonName,
            name: formData.name,
            email: formData.email,
        };

        // Call the handlePanGst function with the new payload
        const response = await handlePanGst(payload);
        if (response.success) {
            if (response.data) {
                if (response.data.status === false && response.data.message) {
                    setFieldError('documentName', response.data.message);
                    return;
                }
                if (response.data.status !== false && response.data?.data) {
                    openModal(response.data.data, values);
                }
            }
        }
    };
    const [documentNumbers, setDocumentNumbers] = useState<{ pan?: string; gst?: string }>({});

    const handleRadioChange = (e: any) => {
        setDocumentType(e.target.value); // Update the state when radio selection changes
    };

    const handleLogin = () => {
        dispatch(loginSuccess({ ...loginData, isAuthenticated: true }));
        authChannel.postMessage({ type: 'login', tabId: TAB_ID });

        dispatch(resetRegisterState());
    };

    const handleVerified = (type: 'pan' | 'gst', number: string) => {
        setVerifiedDoc({ type, number, verified: true });
        setDocumentNumbers(prev => ({
            ...prev,
            [type]: number, // update either 'pan' or 'gst' key
        }));
    };

    const cleanInputString = (input: string) => input.toUpperCase().replace(/[^A-Z0-9]/g, ''); // blocks lowercase and special characters

    return (
        <>
            <Flex className="absolute w-full h-screen">
                {md && (
                    <Image
                        src={logo}
                        alt="Logo"
                        preview={false}
                        className="absolute hidden top-6 left-6 md:block"
                        width={120}
                    />
                )}
                <Flex vertical align="center" justify="center" className="w-full h-full px-4">
                    <Lottie options={defaultOptions} height={100} width={100} />

                    <Title level={3} className="mt-4 text-center">
                        Welcome to Peko!
                    </Title>

                    <Text className="max-w-md px-5 mt-2 text-center w-50">
                        Let’s get your business verified. You can use either your PAN or GST number
                        to continue.
                    </Text>

                    <Radio.Group
                        buttonStyle="outline"
                        size="large"
                        defaultValue="pan"
                        onChange={handleRadioChange}
                        className="my-6"
                    >
                        <Space direction="horizontal" size="middle">
                            <Radio value="pan">Business PAN</Radio>
                            <Radio value="gst">GST Number</Radio>
                        </Space>
                    </Radio.Group>

                    <Formik
                        key={documentType}
                        initialValues={{
                            documentName: documentNumbers[documentType] || '',
                        }}
                        enableReinitialize
                        validationSchema={panGstValidationSchema(documentType)}
                        onSubmit={handleSubmitForOtp}
                    >
                        {({ handleSubmit }) => (
                            <Form
                                onFinish={handleSubmit} // Handle form submission
                                className="w-full max-w-md"
                            >
                                {documentType === 'pan' && (
                                    <TextInput
                                        name="documentName"
                                        type="text"
                                        placeholder="Enter PAN (e.g. ABCDE1234F)"
                                        classes="rounded-sm w-full p-3"
                                        maxLength={10}
                                        restrictPanGstFormat
                                        allowedInputKeys={cleanInputString}
                                        isDisabled={
                                            verifiedDoc.type === 'pan' && verifiedDoc.verified
                                        }
                                    />
                                )}

                                {documentType === 'gst' && (
                                    <TextInput
                                        name="documentName"
                                        type="text"
                                        placeholder="Enter GSTIN (e.g. 22AAAAA0000A1Z5)"
                                        classes="rounded-sm w-full p-3"
                                        maxLength={15}
                                        restrictPanGstFormat
                                        isDisabled={
                                            verifiedDoc.type === 'gst' && verifiedDoc.verified
                                        }
                                        // values={verifiedDoc.type === 'gst' ? verifiedDoc.number : ''}
                                        allowedInputKeys={cleanInputString}
                                    />
                                )}

                                <Button
                                    loading={isLoading}
                                    htmlType="submit"
                                    type="primary"
                                    danger
                                    className="flex items-center justify-center w-full max-w-md p-5 mt-5 text-base text-white"
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    <Space className="mt-3" size="small">
                        <Typography.Link
                            onClick={() => dispatch(nextStep())}
                            className="text-sm "
                            style={{ color: '#E53535' }}
                        >
                            Skip for now
                        </Typography.Link>
                        <Tooltip
                            placement={xs ? 'bottom' : 'right'}
                            title="You can verify later from your profile."
                        >
                            <InfoCircleOutlined
                                className="text-xs text-gray-400 hover:text-gray-600"
                                onClick={e => e.stopPropagation()}
                            />
                        </Tooltip>
                    </Space>
                </Flex>
            </Flex>
            <VerificationModal
                isOpen={isOpen}
                handleCancel={cancelModal}
                data={resp}
                formValues={formValues}
                handleLogin={handleLogin}
                email={formData.email}
                onVerified={handleVerified}
            />
        </>
    );
};

export default RegisterStepFive;
