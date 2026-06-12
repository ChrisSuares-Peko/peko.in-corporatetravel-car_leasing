import React, { useEffect, useRef } from 'react';

import { FormikProps, useFormikContext } from 'formik';

import SelectInput from '@components/atomic/inputs/SelectInput';
import TextInput from '@components/atomic/inputs/TextInput';
import SearchSelectInput from '@src/domains/dashboard/billPayments/components/CustomSelectSearch';
import { accessKeys } from '@utils/accessKeys';

import useGeneralApi from '../../hooks/useGeneralApi';
import useGetNumberDetails from '../../hooks/useGetNumberDetails';
import { prepaidProviders } from '../../utils/data';

interface BeneficiaryFormProps {
    service: string;
}

const AddBeneficiaryPrepaid = ({service}:BeneficiaryFormProps) => {
    const { stateData } = useGeneralApi();
    const { values, setFieldValue, validateField }: FormikProps<any> = useFormikContext(); // Access form values
    const mobileNumber = values.phoneNo;
    const hasEdited = useRef(false);

    const {
        getNumberData,
        numberData,
    } = useGetNumberDetails(mobileNumber);

    useEffect(() => {
        if (hasEdited.current && mobileNumber?.length === 10) {
            getNumberData();
        }
    }, [getNumberData, mobileNumber?.length]);

    useEffect(() => {
        if (numberData) {
            const matchedProvider = prepaidProviders.find(
                opt => opt.label.toLowerCase() === numberData.CurrentOperator?.toLowerCase()
            );
            const matchedCircle = stateData?.find(
                opt => opt.label.toLowerCase() === numberData.CurrentLocation?.toLowerCase()
            );
            setFieldValue('serviceProvider', matchedProvider?.value || numberData.CurrentOperator);
            setTimeout(() => {
                validateField('serviceProvider');
            }, 0);
            setFieldValue('providerCircle', matchedCircle?.value || numberData.CurrentLocation);
            setTimeout(() => {
                validateField('providerCircle');
            }, 0);
            setFieldValue('phoneNo', numberData.MobileNo);
        }else{
            const providerExists = prepaidProviders.find(p => p.value === values.serviceProvider);
        if (!providerExists) {
          setFieldValue('serviceProvider', '');
        }
          setFieldValue('accessKey', accessKeys.prepaid);
        }
    }, [numberData, stateData, setFieldValue, validateField, values.serviceProvider]);
    return (
        <>
            <TextInput
                name="phoneNo"
                label="Mobile Number"
                type="text"
                placeholder="Example: 9896XXXXXX"
                allowNumbersOnly
                maxLength={10}
                isRequired
                handleChange={() => {
                    hasEdited.current = true;
                }}
            />
            <SelectInput
                name="serviceProvider"
                label="Select Service Provider"
                placeholder="Select Service Provider"
                options={prepaidProviders}
                isRequired
            />
            <SearchSelectInput
                name="providerCircle"
                label="Select Circle"
                options={stateData || []}
                placeholder="Select Circle"
                isRequired
            />
        </>
    );
};

export default AddBeneficiaryPrepaid;
