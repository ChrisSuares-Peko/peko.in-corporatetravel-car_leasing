import React, { useEffect } from 'react';

import { Form } from 'antd';
import { FormikProps, useFormikContext } from 'formik';

import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';
import SearchSelectInput from '@src/domains/dashboard/billPayments/components/CustomSelectSearch';
import { useAppDispatch } from '@src/hooks/store';

import useServiceProviderApi from '../../hooks/useServiceProviderApi';
import { setFormInitialValues } from '../../slices/beneficiary';
import { BeneficiaryFormProps, UserEnteredFormValues } from '../../types/index';
import { billPayments, financialServices, insurance, otherServices } from '../../utils/data';

const BeneficiaryForm = ({
    service,
    setService,
    accessKeyName,
    selectedBillerData,
    setSelectedBillerData,
    editValues,
}: BeneficiaryFormProps) => {
    const dispatch = useAppDispatch();
    const allPayments = [...billPayments, ...otherServices, ...insurance, ...financialServices];
    const formik = useFormikContext<UserEnteredFormValues>();
    const bbpsServiceCategory = allPayments.find(
        obj => obj.accessKey === service
    )?.BBPSCategoryName;
    const [isServiceChanging, setIsServiceChanging] = React.useState(false);

    const {
        serviceProviderData,
        isLoading,
        isLoadingMore,
        hasMore,
        loadMoreServiceProviders,
        handleServiceProviderSearch,
    } = useServiceProviderApi(bbpsServiceCategory);
    const handleChange = (value: string, labelName: any) => {
        setIsServiceChanging(false);
        const selectedOption =
            serviceProviderData && serviceProviderData.find(opt => opt.value === value);
        setSelectedBillerData(selectedOption?.customerParams!);
        dispatch(
            setFormInitialValues({
                accessKey: formik.values.accessKey,
                name: formik.values.name,
                billerId: value,
                serviceProvider: labelName?.label,
            })
        );
    };

    const beneficiaryOptions = allPayments
        .map(payment => ({
            value: payment.accessKey,
            label: payment.title,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    const formatLabel = (text: string) =>
        text
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
            .replace(/^./, (str: string) => str.toUpperCase()) // Capitalize first letter
            .replace(/\b(id)\b/i, 'ID'); // Make 'id' into 'ID'

    useEffect(() => {
        if (accessKeyName) setService(accessKeyName);
        if (editValues) {
            setService(editValues?.accessKey);
            setIsServiceChanging(false);
        }
        if (editValues && serviceProviderData) {
            const selectedOption = serviceProviderData.find(
                opt => opt.value === editValues.billerId
            );
            setSelectedBillerData(selectedOption?.customerParams!);
        }
    }, [accessKeyName, editValues, serviceProviderData, setSelectedBillerData, setService]);
    const { setFieldValue, validateField }: FormikProps<any> = useFormikContext() ?? {};
    return (
        <Form layout="vertical">
            {!accessKeyName && (
                <SelectInput
                    name="accessKey"
                    label="Select Service"
                    placeholder="Select Service"
                    options={beneficiaryOptions}
                    isRequired
                    showSearch
                    filterOption={(input, option) => {
                        const label = option?.children?.toString().toLowerCase() || '';
                        return label.includes(input.toLowerCase());
                    }}
                    handleChange={e => {
                        setIsServiceChanging(true);
                        setService(e);
                        formik.setFieldValue('accessKey', e);
                        formik.setFieldValue('billerId', '');
                        setFieldValue('accessKey', e);
                        setTimeout(() => {
                            validateField('accessKey');
                        }, 0);
                    }}
                />
            )}
            <TextInput
                name="name"
                label="Beneficiary Name"
                type="text"
                placeholder="Example: Jhoxxx"
                isRequired
                maxLength={50}
            />
            {service && (
                <SearchSelectInput
                    name="billerId"
                    label="Select Service Provider"
                    options={serviceProviderData || []}
                    placeholder="Select Service Provider"
                    handleChange={handleChange}
                    isLoading={isLoading || isLoadingMore}
                    isRequired
                    filterOption={false}
                    onSearch={handleServiceProviderSearch}
                    onPopupScroll={event => {
                        const target = event.target as HTMLDivElement;
                        const reachedBottom =
                            target.scrollTop + target.clientHeight >= target.scrollHeight - 20;
                        if (reachedBottom && hasMore) {
                            loadMoreServiceProviders();
                        }
                    }}
                />
            )}
            {!isServiceChanging &&
                selectedBillerData?.map((input, i) => (
                    <TextInput
                        label={formatLabel(input.paramName)}
                        name={input.paramName}
                        placeholder={`Enter ${formatLabel(input.paramName)}`}
                        type="text"
                        key={i}
                        allowNumbersOnly={input.dataType === 'NUMERIC'}
                        isRequired={input.isOptional === 'false'}
                        maxLength={input.maxLength || 20}
                    />
                ))}
        </Form>
    );
};

export default BeneficiaryForm;
