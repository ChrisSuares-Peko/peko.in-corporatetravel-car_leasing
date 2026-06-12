import React from 'react';

import { Checkbox, Collapse, Flex, Form, Typography } from 'antd';
import { useFormikContext } from 'formik';

import InputTextArea from '@components/atomic/inputs/InputTextArea';
import SelectInputWithSearch from '@components/atomic/inputs/SelectInputWithSearch';
import TextInput from '@components/atomic/inputs/TextInput';

import FileUploadField from '../components/shared/FileUploadField';
import { STATE_OPTIONS } from '../constants';
import {
    DOCUMENT_TYPE_OPTIONS,
    IMAGE_ACCEPT,
    IMAGE_MIME_TYPES,
    IMAGE_TYPES_LABEL,
} from '../constants/settings';
import { SettingsFormValues } from '../types/settings';

const { Panel } = Collapse;

const IMAGE_UPLOAD_CONFIG = {
    allowedTypes: IMAGE_MIME_TYPES,
    acceptedTypesLabel: IMAGE_TYPES_LABEL,
    accept: IMAGE_ACCEPT,
    maxFileSizeMB: 2,
};

const SettingsForm: React.FC = () => {
    const { values, setFieldValue } = useFormikContext<SettingsFormValues>();

    return (
        <Form layout="vertical">
            <Flex vertical gap={16}>
                {/* Business Details Card */}
                <Flex vertical className="border border-[#E4E4E7] rounded-xl overflow-hidden">
                    <Collapse
                        defaultActiveKey={['business-details']}
                        ghost
                        expandIconPosition="end"
                    >
                        <Panel
                            key="business-details"
                            header={
                                <Typography.Text className="text-sm font-semibold text-[#101828]">
                                    Business Details
                                </Typography.Text>
                            }
                        >
                            <Flex vertical>
                                <TextInput
                                    name="businessName"
                                    label="Business Name"
                                    placeholder="Enter Business Name"
                                    type="text"
                                    isRequired
                                    maxLength={100}
                                />

                                <InputTextArea
                                    name="address"
                                    label="Address"
                                    placeholder="Enter Address"
                                    autoSize={{ minRows: 2, maxRows: 2 }}
                                    isRequired
                                />

                                <Flex gap={12}>
                                    <Flex vertical className="flex-1">
                                        <TextInput
                                            name="city"
                                            label="City"
                                            placeholder="Enter City"
                                            type="text"
                                            isRequired
                                            allowAlphabetsAndSpaceOnly
                                            maxLength={50}
                                        />
                                    </Flex>
                                    <Flex vertical className="flex-1">
                                        <SelectInputWithSearch
                                            name="state"
                                            label="State"
                                            placeholder="Select State"
                                            options={STATE_OPTIONS}
                                            isRequired
                                        />
                                    </Flex>
                                </Flex>

                                <Flex gap={10}>
                                    <Flex vertical className="flex-1">
                                        <TextInput
                                            name="pincode"
                                            label="Pincode"
                                            placeholder="Enter Pincode"
                                            type="text"
                                            allowNumbersOnly
                                            maxLength={6}
                                            isRequired
                                        />
                                    </Flex>
                                    <Flex vertical className="flex-1">
                                        <TextInput
                                            name="phone"
                                            label="Phone Number"
                                            placeholder="Enter Mobile Number"
                                            type="text"
                                            isRequired
                                            allowNumbersOnly
                                            maxLength={10}
                                        />
                                    </Flex>
                                </Flex>

                                <Flex gap={10}>
                                    <Flex vertical className="flex-1">
                                        <TextInput
                                            name="email"
                                            label="Email"
                                            placeholder="Enter Email"
                                            type="email"
                                            isRequired
                                        />
                                    </Flex>
                                    <Flex vertical className="flex-1">
                                        <TextInput
                                            name="gstNo"
                                            label="GST No."
                                            placeholder="Enter GSTIN"
                                            type="text"
                                            convertToUppercase
                                            maxLength={15}
                                        />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Panel>
                    </Collapse>
                </Flex>

                {/* Document Settings Card */}
                <Flex vertical className="border border-[#E4E4E7] rounded-xl overflow-hidden">
                    <Collapse
                        defaultActiveKey={['document-settings']}
                        ghost
                        expandIconPosition="end"
                    >
                        <Panel
                            key="document-settings"
                            header={
                                <Typography.Text className="text-sm font-semibold text-[#101828]">
                                    Document Settings
                                </Typography.Text>
                            }
                        >
                            <Flex vertical>
                                <Form.Item>
                                    <Checkbox
                                        checked={!!values.autoUpdateDocNumber}
                                        onChange={e =>
                                            setFieldValue('autoUpdateDocNumber', e.target.checked)
                                        }
                                    >
                                        <Typography.Text className="text-sm text-[#475569]">
                                            Auto update document number
                                        </Typography.Text>
                                    </Checkbox>
                                </Form.Item>

                                <SelectInputWithSearch
                                    name="selectedDocumentType"
                                    label="Document Type"
                                    placeholder="Select document type"
                                    options={DOCUMENT_TYPE_OPTIONS}
                                />

                                {values.selectedDocumentType && (
                                    <>
                                        <TextInput
                                            name={`documentPrefixes.${values.selectedDocumentType}`}
                                            label="Document Number Prefix"
                                            placeholder="Enter prefix"
                                            type="text"
                                        />
                                        <Typography.Text className="text-xs text-[#6A7282] -mt-4 pb-4 block">
                                            Documents will be numbered as:{' '}
                                            {values.documentPrefixes?.[
                                                values.selectedDocumentType
                                            ] || 'INV-'}
                                            001, etc.
                                        </Typography.Text>
                                    </>
                                )}

                                <InputTextArea
                                    name="termsAndConditions"
                                    label="Terms & Conditions"
                                    placeholder="Enter your terms and conditions..."
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                />

                                <InputTextArea
                                    name="notes"
                                    label="Notes"
                                    placeholder="Enter default notes for documents..."
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                />

                                <FileUploadField
                                    {...IMAGE_UPLOAD_CONFIG}
                                    label="Upload Logo"
                                    fieldName="logo"
                                    uploadLabel="Click to upload logo"
                                    existingUrl={values.logoUrl}
                                    displayName="Logo.png"
                                    removeFieldName="removeLogo"
                                />

                                <FileUploadField
                                    {...IMAGE_UPLOAD_CONFIG}
                                    label="Upload Signature"
                                    fieldName="signature"
                                    uploadLabel="Click to upload signature"
                                    existingUrl={values.signatureUrl}
                                    displayName="Signature.png"
                                    removeFieldName="removeSignature"
                                />
                            </Flex>
                        </Panel>
                    </Collapse>
                </Flex>
            </Flex>
        </Form>
    );
};

export default React.memo(SettingsForm);
