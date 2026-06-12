import React, { useCallback, useEffect } from 'react';

import { useFormikContext } from 'formik';

import TextInput from '@components/atomic/inputs/TextInput';
import { BBPSCategoryName } from '@customtypes/general';
import SearchSelectInput from '@src/domains/dashboard/billPayments/components/CustomSelectSearch';
import { setFormInitialValues } from '@src/domains/dashboard/billPayments/slices/beneficiary';
import { UserEnteredFormValues } from '@src/domains/dashboard/billPayments/types';
import { useAppDispatch } from '@src/hooks/store';
import { accessKeys } from '@utils/accessKeys';

import useServiceProviderApi from '../../hooks/useServiceProviderApi';
import { Beneficiary, CustomerParam } from '../../types';

interface BeneficiaryFormProps {
    accessKeyName?: string;
    service?: string;
    selectedBillerData: CustomerParam[];
    setSelectedBillerData: React.Dispatch<React.SetStateAction<CustomerParam[]>>;
    editValues?: Beneficiary | null;
}

const BeneficiaryForm = ({
    accessKeyName,
    selectedBillerData,
    setSelectedBillerData,
    editValues,
    service,
}: BeneficiaryFormProps) => {
    const dispatch = useAppDispatch();
    const formik = useFormikContext<UserEnteredFormValues>();
    let categoryName: string | undefined;

    if (service === accessKeys.postpaid) {
        categoryName = BBPSCategoryName.postpaid;
    }

    if (service === accessKeys.test) {
        categoryName = BBPSCategoryName.test;
    }

    const { serviceProviderData, isLoading } = useServiceProviderApi(categoryName ?? '');

    const handleChange = useCallback(
        (value: string, labelName: any) => {
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
        },
        [
            dispatch,
            formik.values.accessKey,
            formik.values.name,
            serviceProviderData,
            setSelectedBillerData,
        ]
    );

    useEffect(() => {
        if (editValues && serviceProviderData) {
            const selectedOption = serviceProviderData.find(
                opt => opt.value === editValues.billerId
            );
            setSelectedBillerData(selectedOption?.customerParams!);
        } else {
            setSelectedBillerData([]);
        }
    }, [accessKeyName, editValues, serviceProviderData, setSelectedBillerData]);
    return (
        <div data-testid="beneficiary-form">
            <SearchSelectInput
                name="billerId"
                label="Select Service Provider"
                options={serviceProviderData || []}
                placeholder="Select Service Provider"
                handleChange={handleChange}
                isLoading={isLoading}
                isRequired
            />

            {selectedBillerData?.map((input, i) => (
                <TextInput
                    label={input.paramName}
                    name={input.paramName}
                    placeholder={`${input.paramName}`}
                    allowNumbersOnly={input.dataType === 'NUMERIC'}
                    isRequired={input.isOptional === 'false'}
                    type="text"
                    key={i}
                    maxLength={input.maxLength || 20}
                />
            ))}
        </div>
    );
};

export default BeneficiaryForm;
