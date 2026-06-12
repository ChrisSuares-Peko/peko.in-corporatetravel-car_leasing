import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SurchargeResponse } from '@customtypes/general';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { getSurcharge } from '@src/services/surcharge';
import { accessKeys } from '@utils/accessKeys';
import { formatNumberWithLocalString } from '@utils/priceFormat';

import { useSaveAddressApi } from './details/useSaveAddressApi';
import { setPaymentData } from '../../payments/slices/payment';
import { checkAgencyBalance } from '../api';
import {
    updateDestinationAddress,
    updateItems,
    updateOriginAddress,
} from '../slice/logisticsSlice';
import { DeliveryCompanyOption, ShipmentFormValues } from '../types';

export default function usePayment() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { role, id } = useAppSelector(state => state.reducer.auth);

    const [isLoading, setIsLoading] = useState(false);
    const { handleSenderAddress, handleRecieverAddress } = useSaveAddressApi();

    const { shipmentDetails, selectedDeliveryCompany, shipmentType } = useAppSelector(
        state => state.reducer.logisticsV3
    );
    const {
        deliveredTxnId, height, length, weight, width,
        originCity, destinationCity,
        originPostCode, destinationPostCode, isReturn,
    } = shipmentDetails;
    const isInternational = shipmentType === 'international';

    const handleLogisticsSubmission = useCallback(
        async (values?: ShipmentFormValues, company?: DeliveryCompanyOption) => {
            setIsLoading(true);

            const recieverSaveAddress = values?.recieverSaveAddress ?? false;
            const receiverAddressId = values?.receiverAddressId ?? null;
            const senderSaveAddress = values?.senderSaveAddress ?? false;
            const senderAddressId = values?.senderAddressId ?? null;

            if (values) {
                dispatch(
                    updateOriginAddress({
                        senderName: values.senderName,
                        senderAddressLine: values.senderAddressLine,
                        senderZipCode: values.senderZipCode,
                        senderPhone: values.senderPhone,
                        senderAddressId,
                    })
                );
                dispatch(
                    updateDestinationAddress({
                        receiverName: values.receiverName,
                        receiverPhone: values.receiverPhone,
                        receiverAddressLine: values.receiverAddressLine,
                        receiverZipCode: values.receiverZipCode,
                        receiverPhoneCode: values.receiverPhoneCode,
                        receiverAddressId,
                    })
                );
            }
            if (values?.items) {
                dispatch(updateItems({ items: values.items }));
            }
            // Save sender address if requested (skip if city is unknown — India uses pincodes)
            if (senderSaveAddress && values && originCity?.city) {
                await handleSenderAddress(
                    {
                        name: values.senderName,
                        addressLine: values.senderAddressLine,
                        mobile: values.senderPhone,
                        postCode: values.senderZipCode,
                        phoneCode: '+91',
                        city: originCity.city,
                        country: originCity?.countryName ?? 'India',
                        countryCode: originCity?.countryCode ?? 'IN',
                    },
                    senderAddressId
                );
            }
            // Save receiver address if requested (skip if city is unknown — India uses pincodes)
            if (recieverSaveAddress && values && destinationCity?.city) {
                await handleRecieverAddress(
                    {
                        name: values.receiverName,
                        addressLine: values.receiverAddressLine,
                        mobile: values.receiverPhone,
                        postCode: values.receiverZipCode,
                        phoneCode: values.receiverPhoneCode?.toString() ?? undefined,
                        city: destinationCity.city,
                        country: destinationCity?.countryName ?? 'India',
                        countryCode: destinationCity?.countryCode ?? 'IN',
                    },
                    receiverAddressId
                );
            }

            const selectedCompanyData = selectedDeliveryCompany || company;
            const hasValidDestination = isInternational
                ? !!(destinationCity?.countryCode || destinationCity?.countryName)
                : !!destinationPostCode;
            const hasValidOrigin = isInternational
                ? !!(originCity?.countryCode || originCity?.countryName)
                : !!originPostCode;
            if (!selectedCompanyData || !hasValidDestination || !hasValidOrigin) {
                setIsLoading(false);
                return;
            }

            const totalAmount = selectedCompanyData.price;
            const isBalanceAvailable = await checkAgencyBalance({
                userId: id,
                userType: role,
                amount: Number(totalAmount),
            });

            if (!isBalanceAvailable) {
                setIsLoading(false);
                return;
            }

            const data: SurchargeResponse | false = await getSurcharge({
                userId: id,
                userType: role,
                amount: Number(totalAmount),
                accessKey: accessKeys.shipmentServices,
            });

            if (!data) {
                setIsLoading(false);
                return;
            }

            const total =
                (totalAmount ? Number(totalAmount) : 0) +
                (data?.surcharge ? parseFloat(data.surcharge) : 0);

            const billSummary = [
                { key: 'Service name', value: 'Logistics' },
                { key: 'Origin PIN Code', value: shipmentDetails.originPostCode || '' },
                { key: 'Destination PIN Code', value: shipmentDetails.destinationPostCode || '' },
                { key: 'Amount', value: `${formatNumberWithLocalString(totalAmount)}` },
            ];

            const paymentSummary = [
                { key: 'Subtotal', value: `₹${formatNumberWithLocalString(totalAmount)}` },
                { key: 'Platform fee', value: `₹${formatNumberWithLocalString(data.surcharge ?? 0)}` },
            ];

            let requestBody;
            const deliveryPartnerData = {
                deliveryCompanyId: selectedCompanyData.deliveryCompanyId,
                courierName: selectedCompanyData.courierName,
                logo: selectedCompanyData.logo || null,
                serviceType: selectedCompanyData?.serviceType || null,
                deliveryType: selectedCompanyData?.deliveryType || null,
                avgDeliveryTime: selectedCompanyData?.avgDeliveryTime || null,
            };
            if (isReturn) {
                requestBody = {
                    deliveryPartnerData,
                    deliveredTxnId,
                    accessKey: accessKeys.shipmentServices,
                    currentUrl: window.location.href,
                    isReturn,
                    amount: totalAmount,
                };
                dispatch(
                    setPaymentData({
                        billSummary,
                        paymentSummary,
                        totalAmount: total,
                        title: 'Bill Summary',
                        payload: requestBody,
                        url: 'travel/logistics_V3/payment',
                        earningCashbackAmount:
                            Number(data?.surcharge && data?.corporateCashback) || 0,
                    })
                );
                navigate(paths.dashboard.payments);
                setIsLoading(false);
                return;
            }
            if (!values) return;

            requestBody = {
                userId: id,
                userType: role,
                amount: totalAmount,
                items: values.items,
                accessKey: accessKeys.shipmentServices,
                isReturn,
                isInternational,
                originAddress: {
                    name: values.senderName,
                    mobile: values.senderPhone,
                    city: originCity?.city || '',
                    state: originCity?.state || '',
                    countryCode: originCity?.countryCode || 'IN',
                    countryName: originCity?.countryName || 'India',
                    addressLine: values.senderAddressLine,
                    postCode: values.senderZipCode,
                },
                destinationAddress: {
                    name: values.receiverName,
                    mobile: values.receiverPhone!,
                    city: destinationCity?.city || '',
                    state: destinationCity?.state || '',
                    countryCode: destinationCity?.countryCode || (isInternational ? '' : 'IN'),
                    countryName: destinationCity?.countryName || (isInternational ? '' : 'India'),
                    addressLine: values.receiverAddressLine,
                    postCode: values.receiverZipCode,
                },
                deliveryPartnerData,
                shipmentDetails: {
                    weight,
                    width,
                    height,
                    length,
                },
                currentUrl: window.location.href,
            };

            dispatch(
                setPaymentData({
                    billSummary,
                    paymentSummary,
                    totalAmount: total,
                    title: 'Bill Summary',
                    payload: requestBody,
                    url: 'travel/logistics_V3/payment',
                    earningCashbackAmount: Number(data?.surcharge && data?.corporateCashback) || 0,
                })
            );
            navigate(paths.dashboard.payments);
            setIsLoading(false);
        },
        [
            selectedDeliveryCompany,
            id,
            role,
            originPostCode,
            destinationPostCode,
            originCity,
            destinationCity,
            isReturn,
            isInternational,
            shipmentDetails,
            dispatch,
            navigate,
            handleRecieverAddress,
            handleSenderAddress,
            deliveredTxnId,
            weight,
            width,
            height,
            length,
        ]
    );

    return { isLoading, handleLogisticsSubmission };
}
