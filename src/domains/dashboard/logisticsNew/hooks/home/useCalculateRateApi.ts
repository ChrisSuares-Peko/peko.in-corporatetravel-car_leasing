import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@src/hooks/store';

import { calculateRate, calculateInternationalRate } from '../../api';
import { updateShipmentDetails } from '../../slice/logisticsSlice';
import { DeliveryCompanyOption, CalculateRateResponse, ShipmentData, InternationalShipmentData } from '../../types';

declare const Moengage: any;

const mapCouriers = (companies: CalculateRateResponse['deliveryCompanies']): DeliveryCompanyOption[] =>
    companies.map(company => ({
        deliveryCompanyId: company.deliveryCompanyId,
        courierName: company.courierName,
        price: Number(company.price),
        serviceType: company.serviceType,
        deliveryType: company.deliveryType,
        avgDeliveryTime: company.avgDeliveryTime,
        logo: company.logo,
        minWeight: company.minWeight,
        maxWeight: company.maxWeight,
    }));

export const useCalculateRateApi = () => {
    const { role, id, username } = useAppSelector(state => state.reducer.auth);
    const { user } = useAppSelector(state => state.reducer.user);
    const [resultData, setResultData] = useState<DeliveryCompanyOption[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInital, setIsInital] = useState(true);
    const [isSubmmited, setIsSubmmited] = useState(false);
    const dispatch = useAppDispatch();

    const handleCalculateRate = async (values: ShipmentData) => {
        dispatch(
            updateShipmentDetails({
                weight: values.weight,
                length: values.length,
                width: values.width,
                height: values.height,
                originPostCode: values.originPostCode,
                destinationPostCode: values.destinationPostCode,
            })
        );
        setIsLoading(true);

        const response: CalculateRateResponse | false = await calculateRate({
            userId: id,
            userType: role,
            ...values,
        });

        if (response && Array.isArray(response.deliveryCompanies)) {
            const result = mapCouriers(response.deliveryCompanies);
            setResultData(result);
            setIsLoading(false);
            setIsInital(false);
            if (typeof Moengage?.track_event === 'function') {
                Moengage.track_event('logistics_price_checked', {
                    originPostCode: values.originPostCode,
                    destinationPostCode: values.destinationPostCode,
                    weight: values.weight,
                    length: values.length,
                    breadth: values.width,
                    height: values.height,
                    id,
                    username,
                    company_name: user?.companyName,
                    email: user?.email,
                    phone_number: user?.mobileNo,
                    name: user?.contactPersonName,
                });
            }
            return result;
        }
        setIsSubmmited(true);
        setIsLoading(false);
        return [];
    };

    const handleCalculateInternationalRate = async (values: InternationalShipmentData) => {
        dispatch(
            updateShipmentDetails({
                weight: values.weight,
                length: values.length,
                width: values.width,
                height: values.height,
                originPostCode: values.originPostCode,
                destinationCity: { countryCode: values.destinationCountryCode },
            })
        );
        setIsLoading(true);

        const response: CalculateRateResponse | false = await calculateInternationalRate({
            userId: id,
            userType: role,
            ...values,
        });

        if (response && Array.isArray(response.deliveryCompanies)) {
            const result = mapCouriers(response.deliveryCompanies);
            setResultData(result);
            setIsLoading(false);
            setIsInital(false);
            return result;
        }
        setIsSubmmited(true);
        setIsLoading(false);
        return [];
    };

    const hideAndResetWhileChange = () => {
        setIsInital(true);
        setResultData([]);
    };

    return {
        data: resultData,
        isLoading,
        handleCalculateRate,
        handleCalculateInternationalRate,
        isInital,
        hideAndResetWhileChange,
        isSubmmited,
    };
};
