import { useState } from 'react';

import { Button, Card, Col, Form, Row, Typography } from 'antd';
import { Formik } from 'formik';

import NumberWithUnit from '@components/atomic/inputs/NumberWIthUnit';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { showToast } from '@src/slices/apiSlice';
import { RootState } from '@store/store';

import AddAddressModal from './AddAddressModal';
import AddressSelect from './AddressSelect';
import { lookupInternationalPostcodeApi, lookupPostcodeApi } from '../../api';
import { useSavedAddresses } from '../../hooks/home/useSavedAddresses';
import { calculateInternationalShipmentSchema, calculateShipmentSchema } from '../../schema';
import { setShipmentType, updateDestinationAddress, updateOriginAddress, updateShipmentDetails } from '../../slice/logisticsSlice';
import { DeliveryCompanyOption, InternationalShipmentData, ShipmentData } from '../../types';

const { Text } = Typography;

interface Props {
    handleCalculateRate: (shipmentDetails: ShipmentData) => Promise<DeliveryCompanyOption[]>;
    handleCalculateInternationalRate: (shipmentDetails: InternationalShipmentData) => Promise<DeliveryCompanyOption[]>;
    isLoading: boolean;
    hideAndResetWhileChange: () => void;
}

const CalculateCost = ({
    handleCalculateRate,
    handleCalculateInternationalRate,
    isLoading,
    hideAndResetWhileChange,
}: Props) => {
    const { shipmentType } = useAppSelector(
        (state: RootState) => state.reducer.logisticsV3
    );
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const dispatch = useAppDispatch();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalIsReceiver, setModalIsReceiver] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const { options: senderOptions, parseAddress: parseSender } = useSavedAddresses(false, refreshKey);
    const { options: receiverOptions, parseAddress: parseReceiver } = useSavedAddresses(true, refreshKey);

    const openModal = (isReceiver: boolean) => {
        setModalIsReceiver(isReceiver);
        setModalOpen(true);
    };


    const handleTabChange = (value: 'domestic' | 'international') => {
        if (value === 'international') {
            dispatch(showToast({ description: 'Coming Soon', variant: 'info' }));
            return;
        }
        dispatch(setShipmentType(value));
        hideAndResetWhileChange();
    };

    const sharedDimensions = (onChange: () => void) => (
        <Col xs={24} xl={10} className="pb-5 xl:mt-[-30px]">
            <Form.Item label={<span className="text-xs text-gray-700 font-medium">Package Dimensions</span>} className="mb-0">
            <div className="border border-gray-200 rounded-[10px] px-3 py-5 bg-white shadow-sm">
                <Row gutter={8} className="w-full">
                    {(['length', 'width', 'height'] as const).map(dim => (
                        <Col xs={8} key={dim}>
                            <NumberWithUnit
                                name={dim}
                                label={<span className="text-xs text-gray-700 font-medium">{dim.charAt(0).toUpperCase() + dim.slice(1)}<span className="text-red-500 ml-0.5">*</span></span>}
                                unit="Cm"
                                size="large"
                                min={0}
                                step={0.1}
                                precision={2}
                                placeholder="X"
                                max={9999.99}
                                onChange={onChange}
                                formItemClass="mb-0 [&_.ant-input-number-group-addon]:bg-transparent [&_.ant-input-number-group-addon]:border-l-0 [&_.ant-input-number-group-addon]:text-xs [&_.ant-input-number-group-addon]:font-semibold [&_.ant-input-number]:w-full"
                            />
                        </Col>
                    ))}
                </Row>
            </div>
            </Form.Item>
        </Col>
    );

    return (
        <div className="mt-6">
            {/* International shipment tab hidden until ready
            <div className="flex justify-center mb-4">
                <Radio.Group value={shipmentType} onChange={e => handleTabChange(e.target.value)} className="flex gap-8">
                    <Radio value="domestic">Domestic Shipment</Radio>
                    <Radio value="international">International Shipment</Radio>
                </Radio.Group>
            </div>
            */}

            <Card className="rounded-2xl shadow-sm p-4 sm:p-6" styles={{ body: { padding: 0 } }}>
                <Text className="font-medium text-base block mb-8">Calculate your shipping cost</Text>

                {/* ── Domestic ── */}
                {shipmentType === 'domestic' && (
                    <Formik
                        initialValues={{
                            originPostCode: '',
                            originAddressKey: '',
                            destinationPostCode: '',
                            destinationAddressKey: '',
                            weight: 0,
                            length: 0,
                            width: 0,
                            height: 0,
                            isReturn: false,
                        }}
                        onSubmit={({ originPostCode, destinationPostCode, weight, length, width, height, isReturn }) =>
                            handleCalculateRate({ originPostCode, destinationPostCode, weight, length, width, height, isReturn })}
                        validationSchema={calculateShipmentSchema}
                    >
                        {({ handleSubmit, setFieldValue, values, errors, touched, setFieldTouched }) => (
                            <Form layout="vertical" className="w-full" onFinish={handleSubmit}>
                                <Row gutter={[16, 0]} align="top" className="mt-6">
                                    <AddressSelect
                                        label="Origin Address"
                                        options={senderOptions}
                                        value={values.originAddressKey || undefined}
                                        onChange={async val => {
                                            const addr = parseSender(val);
                                            if (!addr) return;
                                            setFieldValue('originAddressKey', val);
                                            setFieldValue('originPostCode', addr.zipCode);
                                            dispatch(updateOriginAddress({
                                                senderName: addr.name,
                                                senderPhone: addr.phoneNumber,
                                                senderAddressLine: addr.address1,
                                                senderZipCode: addr.zipCode,
                                                senderAddressId: addr.id ?? null,
                                            }));
                                            const lookup = await lookupPostcodeApi({ userType: role, userId: id, postcode: addr.zipCode });
                                            dispatch(updateShipmentDetails({
                                                originPostCode: addr.zipCode,
                                                originCity: { city: lookup ? lookup.city : addr.city, state: lookup ? lookup.state : '', countryCode: addr.countryCode || 'IN', countryName: addr.country || 'India' },
                                            }));
                                            hideAndResetWhileChange();
                                        }}
                                        onClear={() => {
                                            setFieldValue('originAddressKey', '');
                                            setFieldValue('originPostCode', '');
                                            dispatch(updateShipmentDetails({ originPostCode: '', originCity: { city: '', state: '' } }));
                                            dispatch(updateOriginAddress({ senderName: '', senderPhone: '', senderAddressLine: '', senderZipCode: '', senderAddressId: null }));
                                            hideAndResetWhileChange();
                                        }}
                                        onAddNew={() => openModal(false)}
                                        error={errors.originAddressKey}
                                        touched={!!touched.originAddressKey}
                                    />

                                    <AddressSelect
                                        label="Destination Address"
                                        options={receiverOptions}
                                        value={values.destinationAddressKey || undefined}
                                        onChange={async val => {
                                            const addr = parseReceiver(val);
                                            if (!addr) return;
                                            setFieldValue('destinationAddressKey', val);
                                            setFieldValue('destinationPostCode', addr.zipCode);
                                            dispatch(updateDestinationAddress({
                                                receiverName: addr.name,
                                                receiverPhone: addr.phoneNumber,
                                                receiverAddressLine: addr.address1,
                                                receiverZipCode: addr.zipCode,
                                                receiverPhoneCode: addr.phoneCode || '+91',
                                                receiverAddressId: addr.id ?? null,
                                            }));
                                            const lookup = await lookupPostcodeApi({ userType: role, userId: id, postcode: addr.zipCode });
                                            dispatch(updateShipmentDetails({
                                                destinationPostCode: addr.zipCode,
                                                destinationCity: { city: lookup ? lookup.city : addr.city, state: lookup ? lookup.state : '', countryCode: addr.countryCode || 'IN', countryName: addr.country || 'India' },
                                            }));
                                            hideAndResetWhileChange();
                                        }}
                                        onClear={() => {
                                            setFieldValue('destinationAddressKey', '');
                                            setFieldValue('destinationPostCode', '');
                                            dispatch(updateShipmentDetails({ destinationPostCode: '', destinationCity: { city: '', state: '' } }));
                                            dispatch(updateDestinationAddress({ receiverName: '', receiverPhone: '', receiverAddressLine: '', receiverZipCode: '', receiverPhoneCode: '+91', receiverAddressId: null }));
                                            hideAndResetWhileChange();
                                        }}
                                        onAddNew={() => openModal(true)}
                                        error={errors.destinationAddressKey}
                                        touched={!!touched.destinationAddressKey}
                                    />

                                    <Col xs={24} sm={8} xl={3} className="pb-[28px]">
                                        <NumberWithUnit
                                            name="weight"
                                            label={<span className="text-xs text-gray-700 font-medium flex items-center">Total Weight<span className="text-red-500 ml-1">*</span></span>}
                                            unit="Kg"
                                            min={0}
                                            size="large"
                                            step={0.1}
                                            precision={2}
                                            placeholder="0"
                                            max={9999.99}
                                            onChange={hideAndResetWhileChange}
                                            formItemClass="mb-0 [&_.ant-input-number-group-addon]:bg-transparent [&_.ant-input-number-group-addon]:border-l-0 [&_.ant-input-number-group-addon]:text-xs [&_.ant-input-number-group-addon]:font-semibold [&_.ant-input-number]:w-full"
                                        />
                                    </Col>

                                    {sharedDimensions(hideAndResetWhileChange)}

                                    <Col xs={24} xl={3} className='xl:mt-[-15px]' style={{ alignSelf: 'center' }}>
                                        <Button danger type="primary" htmlType="submit" size='large' block loading={isLoading}>
                                            Check Price
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                )}

                {/* ── International (hidden until ready) ── */}
                {false && shipmentType === 'international' && (
                    <Formik
                        initialValues={{
                            originPostCode: '',
                            originAddressKey: '',
                            destinationAddressKey: '',
                            destinationCountryCode: '',
                            weight: 0,
                            length: 0,
                            width: 0,
                            height: 0,
                        }}
                        onSubmit={({ originPostCode, destinationCountryCode, weight, length, width, height }) =>
                            handleCalculateInternationalRate({ originPostCode, destinationCountryCode, weight, length, width, height })}
                        validationSchema={calculateInternationalShipmentSchema}
                    >
                        {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                            <Form layout="vertical" className="w-full" onFinish={handleSubmit}>
                                <Row gutter={[16, 0]} align="top" className="mt-6">
                                    <AddressSelect
                                        label="Origin Address"
                                        options={senderOptions}
                                        value={values.originAddressKey || undefined}
                                        onChange={async val => {
                                            const addr = parseSender(val);
                                            if (!addr) return;
                                            setFieldValue('originAddressKey', val);
                                            setFieldValue('originPostCode', addr.zipCode);
                                            dispatch(updateOriginAddress({
                                                senderName: addr.name,
                                                senderPhone: addr.phoneNumber,
                                                senderAddressLine: addr.address1,
                                                senderZipCode: addr.zipCode,
                                                senderAddressId: addr.id ?? null,
                                            }));
                                            const lookup = await lookupPostcodeApi({ userType: role, userId: id, postcode: addr.zipCode });
                                            dispatch(updateShipmentDetails({
                                                originPostCode: addr.zipCode,
                                                originCity: { city: lookup ? lookup.city : addr.city, state: lookup ? lookup.state : '', countryCode: 'IN', countryName: 'India' },
                                            }));
                                            hideAndResetWhileChange();
                                        }}
                                        onClear={() => {
                                            setFieldValue('originAddressKey', '');
                                            setFieldValue('originPostCode', '');
                                            dispatch(updateShipmentDetails({ originPostCode: '', originCity: { city: '', state: '' } }));
                                            dispatch(updateOriginAddress({ senderName: '', senderPhone: '', senderAddressLine: '', senderZipCode: '', senderAddressId: null }));
                                            hideAndResetWhileChange();
                                        }}
                                        onAddNew={() => openModal(false)}
                                        error={errors.originAddressKey}
                                        touched={!!touched.originAddressKey}
                                    />

                                    <AddressSelect
                                        label="Destination Address"
                                        options={receiverOptions}
                                        value={values.destinationAddressKey || undefined}
                                        onChange={async val => {
                                            const addr = parseReceiver(val);
                                            if (!addr) return;
                                            setFieldValue('destinationAddressKey', val);
                                            // Use countryCode if present, fall back to country name — both uniquely identify the destination
                                            setFieldValue('destinationCountryCode', addr.countryCode || addr.country || '');
                                            dispatch(updateDestinationAddress({
                                                receiverName: addr.name,
                                                receiverPhone: addr.phoneNumber,
                                                receiverAddressLine: addr.address1,
                                                receiverZipCode: addr.zipCode,
                                                receiverPhoneCode: addr.phoneCode || '+91',
                                                receiverAddressId: addr.id ?? null,
                                            }));
                                            const intlLookup = addr.zipCode && addr.countryCode
                                                ? await lookupInternationalPostcodeApi({ userType: role, userId: id, postcode: addr.zipCode, countryCode: addr.countryCode })
                                                : false;
                                            dispatch(updateShipmentDetails({
                                                destinationPostCode: addr.zipCode,
                                                destinationCity: { city: intlLookup ? intlLookup.city : addr.city, state: intlLookup ? intlLookup.state : addr.state || '', countryCode: addr.countryCode, countryName: addr.country },
                                            }));
                                            hideAndResetWhileChange();
                                        }}
                                        onClear={() => {
                                            setFieldValue('destinationAddressKey', '');
                                            setFieldValue('destinationCountryCode', '');
                                            dispatch(updateShipmentDetails({ destinationPostCode: '', destinationCity: { city: '', state: '', countryCode: '', countryName: '' } }));
                                            dispatch(updateDestinationAddress({ receiverName: '', receiverPhone: '', receiverAddressLine: '', receiverZipCode: '', receiverPhoneCode: '+91', receiverAddressId: null }));
                                            hideAndResetWhileChange();
                                        }}
                                        onAddNew={() => openModal(true)}
                                        error={errors.destinationAddressKey}
                                        touched={!!touched.destinationAddressKey}
                                    />

                                    <Col xs={24} sm={8} xl={3} className="pb-[28px]">
                                        <NumberWithUnit
                                            name="weight"
                                            label={<span className="text-xs text-gray-700 font-medium flex items-center">Total Weight<span className="text-red-500 ml-1">*</span></span>}
                                            unit="Kg"
                                            min={0}
                                            size="large"
                                            step={0.1}
                                            precision={2}
                                            placeholder="0"
                                            max={9999.99}
                                            onChange={hideAndResetWhileChange}
                                            formItemClass="mb-0 [&_.ant-input-number-group-addon]:bg-transparent [&_.ant-input-number-group-addon]:border-l-0 [&_.ant-input-number-group-addon]:text-xs [&_.ant-input-number-group-addon]:font-semibold [&_.ant-input-number]:w-full"
                                        />
                                    </Col>

                                    {sharedDimensions(hideAndResetWhileChange)}

                                    <Col xs={24} xl={3} style={{ alignSelf: 'center' }}>
                                        <Button danger type="primary" htmlType="submit" size='large' block loading={isLoading}>
                                            Check Price
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                )}
            </Card>

            <AddAddressModal
                open={modalOpen}
                isReceiver={modalIsReceiver}
                onClose={() => setModalOpen(false)}
                onSaved={() => setRefreshKey(k => k + 1)}
            />
        </div>
    );
};

export default CalculateCost;
