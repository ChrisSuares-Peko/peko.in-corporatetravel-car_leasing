/* eslint-disable no-plusplus */
import React, { useState } from 'react';

import { ExclamationCircleFilled, FileImageOutlined } from '@ant-design/icons';
import { Flex, Form, Typography, Upload } from 'antd';
import dayjs from 'dayjs';
import { Field } from 'formik';
import { useDispatch } from 'react-redux';

import DatePickerInput from '@components/atomic/inputs/DatePickerInput';
import SelectInput from '@components/atomic/inputs/SelectInput';
import CustomModalWithForm from '@components/molecular/modals/CustomModalWithForm';
import OtpModal from '@components/molecular/modals/OtpModal';
import { useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';
import { setUserInfo } from '@src/slices/userSlice';

import SuccessModal from './SuccessModal';
import { AdharOcr, verifyAdhar } from '../api';
import useVerifyApi from '../hooks/useVerify';
import { generateYupSchema } from '../schema';
import VerificationInput from './VerificationInput';

interface AddressModalProps {
    open: boolean;
    handleCancel: () => void;
    inputComponents: any;
    title: string;
    accessKeys: string;
    serviceName: string;
    price: number;
    serviceValue?: string;
}

const PanVerifyModal = ({
    open,
    handleCancel,
    inputComponents,
    title,
    accessKeys,
    serviceName,
    price,
    serviceValue,
}: AddressModalProps) => {
    const { verifyBank, verifyAdharOtp, isLoading } = useVerifyApi(accessKeys);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { id, role } = useAppSelector(state => state.reducer.auth);
    const { user } = useAppSelector(state => state.reducer.user);
    const [isOtpSending, setIsOtpSending] = useState(false);
    const [ismodalOpen, setIsmodalOpen] = useState(false);
    const [formValues, setFormValues] = useState<any>();
    const [refId, setRefId] = useState<any>();
    const [resp, setResp] = useState<any>(null);
    const dispatch = useDispatch();

    const generateInitialValues = (inputs: any) => {
        const initialValues: any = {};
        inputs.forEach((input: any) => {
            initialValues[input.name] = '';
        });
        return initialValues;
    };

    const initialValues = generateInitialValues(inputComponents);
    const minAgeDate = dayjs().subtract(18, 'years');
    const cancelModal = () => {
        setIsOpen(false);
        handleCancel();
    };
    const handleImageUpload = async (file: any) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Assuming you have an API function like verifyAdhar that can handle the FormData
            const response = await AdharOcr({
                userId: id,
                userType: role,
                image: formData, // Sending the image as FormData
            });
            dispatch(setUserInfo({ user: { ...user!, balance: response.corporateFinalBalance } }));
            return response;
        } catch (error) {
            console.error('Error uploading image:', error);
            return false;
        }
    };
    const getYearOptions = (start = 2010, end = 2024) => {
        const options = [];
        for (let y = end; y >= start; y--) {
            options.push({ label: `${y}`, value: y });
        }
        return options;
    };

    return (
        <>
            <CustomModalWithForm
                modalTitle={title}
                open={open}
                handleCancel={handleCancel}
                firstBtnTxt="Verify"
                isLoading={isLoading}
                reinitialise
                handleFormSubmit={async value => {
                    const values = { ...value, title };
                    setFormValues(value);
                    if (accessKeys === 'aadhar_verify') {
                        setFormValues(value);
                        const res = await verifyAdhar({
                            userId: id,
                            userType: role,
                            aadhaar_number: value.aadhaar_number,
                        });
                        if (res.ref_id) {
                            setRefId(res.ref_id);
                            setIsmodalOpen(true);
                        }

                        return;
                    }
                    if (accessKeys === 'aadhar_ocr_verify') {
                        setFormValues(value);
                        const file = value.image; // Assuming the image field is 'aadhaar_image'

                        if (file) {
                            const res = await handleImageUpload(file); // Upload the image as FormData
                            if (res) {
                                setResp({ ...res, accessKey: accessKeys, serviceName });
                                setIsOpen(true);
                            }
                        }
                        return;
                    }

                    const data = await verifyBank(values);

                    if (Object.keys(data).length > 0) {
                        setResp({ ...data, accessKey: accessKeys, serviceName });
                        setIsOpen(true);
                    }
                }}
                initialValues={initialValues}
                validationSchema={generateYupSchema(inputComponents)}
            >
                <Flex vertical className="w-full mt-2">
                    <Form layout="vertical">
                        {inputComponents.map((input: any) => {
                            if (input.type === 'input') {
                                return (
                                    <VerificationInput
                                        key={input.name}
                                        name={input.name}
                                        label={input.label}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        classes="rounded-md h-9"
                                        maxLength={input.max}
                                        minLength={input.min}
                                        allowAlphabetsAndSpaceOnly={
                                            input.allowAlphabetsAndSpaceOnly
                                        }
                                        allowAlphabetsAndNumbersOnly={
                                            input.allowAlphabetsAndNumbersOnly
                                        }
                                        isRequired={input.required}
                                        allowNumbersOnly={input.allowNumbersOnly}
                                        allowUpperCaseOnly={input.allowUpperCaseOnly}
                                    />
                                );
                            }

                            if (input.type === 'date') {
                                return (
                                    <DatePickerInput
                                        key={input.name}
                                        name={input.name}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        classes="rounded-md w-full"
                                        isRequired={input.required}
                                        // maxDate={dayjs()}
                                        maxDate={minAgeDate}
                                        needConfirm={false}
                                        inputReadOnly
                                    />
                                );
                            }
                            if (input.type === 'dropdown') {
                                return (
                                    <Field name={input.name} key={input.name}>
                                        {({ form, meta }: any) => {
                                            const startYear = form.values[`${input.name}_start`];
                                            const currentYear = new Date().getFullYear();
                                            const allYears = getYearOptions(currentYear-15, currentYear-1);
                                            const endYear = startYear ? startYear + 1 : '';

                                            return (
                                                <Form.Item
                                                    label={input.label}
                                                    required={input.required}
                                                    className="w-full"
                                                >
                                                    <Flex vertical>
                                                        <Flex gap={10}>
                                                            <SelectInput
                                                                name={`${input.name}_start`}
                                                                placeholder="Start Year"
                                                                options={allYears}
                                                                handleChange={(value: any) => {
                                                                    const nextYear = value + 1;
                                                                    form.setFieldValue(
                                                                        `${input.name}_start`,
                                                                        value
                                                                    );
                                                                    form.setFieldValue(
                                                                        `${input.name}_end`,
                                                                        nextYear
                                                                    );
                                                                    form.setFieldValue(
                                                                        input.name,
                                                                        `${value}-${String(nextYear).slice(2)}`
                                                                    );
                                                                }}
                                                                classes="w-full"
                                                                isRequired={input.required}
                                                            />
                                                            <SelectInput
                                                                name={`${input.name}_end`}
                                                                placeholder="End Year"
                                                                options={
                                                                    startYear
                                                                        ? [
                                                                              {
                                                                                  label: `${endYear}`,
                                                                                  value: endYear,
                                                                              },
                                                                          ]
                                                                        : []
                                                                }
                                                                // isDisabled
                                                                classes="w-full"
                                                                isRequired={input.required}
                                                            />
                                                        </Flex>

                                                        {meta.touched && meta.error && (
                                                            <Typography.Text
                                                                type="danger"
                                                                className="block -mt-5"
                                                            >
                                                                {meta.error}
                                                            </Typography.Text>
                                                        )}
                                                    </Flex>
                                                </Form.Item>
                                            );
                                        }}
                                    </Field>
                                );
                            }

                            if (input.type === 'fileUpload') {
                                return (
                                    <Form.Item
                                        key={input.name}
                                        label={input.label}
                                        className="w-full"
                                        required
                                    >
                                        <Field name={input.name} className="w-full">
                                            {({ field, form, meta }: any) => (
                                                <Upload
                                                    listType="picture"
                                                    beforeUpload={file => {
                                                        const isValidFormat = [
                                                            'image/jpeg',
                                                            'image/png',
                                                        ].includes(file.type);
                                                        const isValidSize =
                                                            file.size / 1024 / 1024 <= 5; // 5 MB size limit

                                                        if (!isValidFormat) {
                                                            dispatch(
                                                                showToast({
                                                                    description: `Please upload JPG, JPEG, or PNG file.`,
                                                                    variant: 'error',
                                                                })
                                                            );
                                                            form.setFieldValue(input.name, '');
                                                            return false; // Reject the file
                                                        }

                                                        if (!isValidSize) {
                                                            dispatch(
                                                                showToast({
                                                                    description: `File size must be smaller than 5 MB`,
                                                                    variant: 'error',
                                                                })
                                                            );
                                                            form.setFieldValue(input.name, '');
                                                            return false; // Reject the file
                                                        }
                                                        form.setFieldValue(input.name, file); // Save file to Formik
                                                        return false; // Prevent auto-upload
                                                    }}
                                                    maxCount={1}
                                                    fileList={
                                                        field.value
                                                            ? [
                                                                  {
                                                                      uid: '-1',
                                                                      name: field.value.name,
                                                                      status: 'done',
                                                                  },
                                                              ]
                                                            : []
                                                    }
                                                    onRemove={() =>
                                                        form.setFieldValue(input.name, '')
                                                    }
                                                    accept=".jpg,.jpeg,.png"
                                                >
                                                    <div className="w-full p-4 text-center border border-dashed rounded-md cursor-pointer">
                                                        <FileImageOutlined className="text-2xl text-gray-500" />
                                                        <Typography.Text className="block mt-2 text-gray-500">
                                                            Click or drag file to this area to
                                                            upload
                                                        </Typography.Text>
                                                    </div>
                                                    {meta.touched && meta.error && (
                                                        <Typography.Text
                                                            type="danger"
                                                            className="block mt-1"
                                                        >
                                                            {meta.error}
                                                        </Typography.Text>
                                                    )}
                                                </Upload>
                                            )}
                                        </Field>

                                        <Typography.Text
                                            type="secondary"
                                            className="xxl:text-[0.7rem] md:text-[0.5rem] xl:text-[0.67rem] mt-2 "
                                        >
                                            (File Formats Supported: JPG, JPEG, and PNG. Max. size:
                                            5 MB)
                                        </Typography.Text>
                                    </Form.Item>
                                );
                            }

                            return null;
                        })}

                        <div
                            className="flex items-start p-4 mt-5 rounded-lg bg-yellow-50"
                            style={{ background: '#FFFCEC' }}
                        >
                            <ExclamationCircleFilled className="mt-1 mr-2 text-orange-400" />
                            <div>
                                <ul className="text-gray-700 text-md">
                                    <li>
                                        You are about to verify {serviceValue || serviceName} for ₹{' '}
                                        {price}. This amount will be deducted from your wallet.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Form>
                </Flex>

                {isOpen && (
                    <SuccessModal
                        isOpen={isOpen}
                        handleCancel={cancelModal}
                        data={resp}
                        formValues={formValues}
                    />
                )}
            </CustomModalWithForm>

            <OtpModal
                isOpen={ismodalOpen}
                isLoading={isLoading!}
                handleCancel={() => setIsmodalOpen(false)}
                isOtpSending={isOtpSending}
                description="OTP has been sent to your Aadhaar-linked mobile number."
                onResend={async () => {
                    setIsOtpSending(true);
                    const res = await verifyAdhar({
                        userId: id,
                        userType: role,
                        aadhaar_number: formValues.aadhaar_number,
                    });
                     if (res) setIsOtpSending(false);
                    else setIsOtpSending(false);
                }}
                handleSubmit={async otp => {
                    const res = await verifyAdharOtp({
                        otp,
                        ref_id: refId,
                    });
                    if (Object.keys(res).length > 0) {
                        setResp({ ...res, accessKey: accessKeys, serviceName });
                        setIsmodalOpen(false);
                        setIsOpen(true);
                    } else {
                        setIsmodalOpen(false);
                    }
                }}
                title="Confirmation"
            />
        </>
    );
};

export default PanVerifyModal;
