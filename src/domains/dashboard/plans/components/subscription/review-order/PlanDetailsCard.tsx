/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Flex, Typography, Skeleton, Button, Divider, Tooltip } from 'antd';
import { capitalize } from 'lodash';

import cardLogo from '@assets/images/cashfreeLogo.png';
import { FRONTEND_BASE_URL } from '@src/config-global';
import useScreenSize from '@src/hooks/useScreenSize';
import useSubscriptionCodes from '@src/hooks/useSubscriptionVoucherCode';
import { paths } from '@src/routes/paths';
import { formatNumberWithLocalString } from '@utils/priceFormat';

import EnterCouponCode from './EnterCouponCode';
import SubscriptionVoucher from './EnterVoucherCode';
import PaymentMethod from './PaymentMethod';
import ReviewLists from './ReviewLists';
import voucher from '../../../assets/voucher.png';
import useApplyCoupon from '../../../hooks/useApplyCoupon';
import useGetPackageDetails from '../../../hooks/useGetPackageDetails';
import usePaymentRequest from '../../../hooks/usePaymentRequset';
import { SelectedType, SubscriptionPaymentMode } from '../../../types';
import { BoldText, GrayText } from '../../CustomText';

type Props = {
    selectedType: SelectedType;
    planId: number;
};
const { Text } = Typography;

const PlanDetailsCard = ({ planId, selectedType }: Props) => {
    const [totalPackagePrice, setTotalPackagePrice] = useState(0);
    const [finalPayableAmount, setFinalPayableAmount] = useState(0);

    const { data, isLoading } = useGetPackageDetails({
        packageId: planId,
        selectedType,
        setTotalPackagePrice,
    });
    const { xl } = useScreenSize();

    // coupon hook
    const {
        isApplied,
        applyCoupon,
        discountAmount,
        isLoading: couponLoading,
        removeCoupon,
        coupon,
    } = useApplyCoupon(planId);
    
    useEffect(() => {
        if (!data) {
            return;
        }
        const totalPayAmountAfterDiscount = totalPackagePrice - discountAmount;
        setFinalPayableAmount(totalPayAmountAfterDiscount > 0 ? totalPayAmountAfterDiscount : 0);
    }, [totalPackagePrice, discountAmount, data]);
    // voucher code hook
    const subscriptionCodesFn = useSubscriptionCodes(planId);
    const { isValidVoucher, activateSubscriptionCode, setIsValidVoucher, isActivating } =
        subscriptionCodesFn;
    // payment hook
    const {
        handlePaymentRequest,
        isLoading: paymentLoading,
        selectedPaymentMode,
        setselectedPaymentMode,
    } = usePaymentRequest();

    if (isLoading || !data) {
        return <Skeleton active paragraph={{ rows: 5 }} className="py-20" />;
    }

    const services =
        data?.packageDetails?.serviceList?.split('\n').filter(item => item.trim() !== '') || [];

    const feature = data?.packageDetails.description.split('\n') || [];

    const handleSubscribePackage = () => {
        if (selectedPaymentMode === SubscriptionPaymentMode.voucherCode) {
            activateSubscriptionCode();
            return;
        }
        handlePaymentRequest({
            billingType: selectedType.toUpperCase(),
            amount: finalPayableAmount,
            packageId: planId,
            couponCode: isApplied ? coupon : undefined,
            successUrl: `${FRONTEND_BASE_URL}/${paths.plans.index}/${paths.plans.paymentsuccess}`,
            failureUrl: `${FRONTEND_BASE_URL}/${paths.plans.index}/${paths.plans.paymentFailure}`,
            currentUrl: window.location.href,
        });
    };
    const hasAddonPrice = Number(data.annualAddonPrice) > 0 || Number(data.monthlyAddonPrice) > 0;
    return (
        <Flex gap={30} vertical={!xl} className="items-center xl:items-start">
            <Flex
                className="w-full h-full px-5 sm:px-10 py-8 text-xs border border-gray-200 border-solid xl:w-[60%] xxl:w-[65%] rounded-xl"
                justify="space-between"
                align="flex-start"
                vertical
                gap={20}
            >
                <Text className="text-base font-medium sm:text-lg">
                    {data?.packageDetails.packageName} ({capitalize(selectedType)})
                </Text>
                {Array.isArray(services) && services?.length > 0 ? (
                    <ReviewLists
                        items={services}
                        itemsPerColumn={Math.ceil(services.length / 2)}
                        showTicks
                        title="Services"
                    />
                ) : Array.isArray(feature) && feature?.length > 0 ? (
                    <ReviewLists
                        items={feature}
                        itemsPerColumn={Math.ceil(feature.length / 2)}
                        showTicks={false}
                        title="Features"
                    />
                ) : null}
            </Flex>
            <Flex
                className="w-full h-full text-xs md:w-2/3  xl:w-[40%] xxl:w-[35%]"
                justify="space-between"
                align="flex-start"
                vertical
                gap={24}
            >
                <EnterCouponCode
                    applyCoupon={applyCoupon}
                    couponLoading={couponLoading}
                    isApplied={isApplied}
                    removeCoupon={removeCoupon}
                    totalPrice={totalPackagePrice}
                />
                <Flex
                    className="w-full h-full px-5 py-8 text-xs border border-gray-200 border-solid sm:px-6 rounded-xl"
                    justify="space-between"
                    align="flex-start"
                    vertical
                    gap={24}
                >
                    <Typography.Text className="text-lg font-medium">
                        Select Payment Method
                    </Typography.Text>
                    <PaymentMethod
                        icon={cardLogo}
                        label="UPI/Debit/Credit/ATM Cards"
                        checked={selectedPaymentMode === SubscriptionPaymentMode.card}
                        handleClick={() => {
                            setselectedPaymentMode(SubscriptionPaymentMode.card);
                            setIsValidVoucher(false);
                        }}
                    />

                    <PaymentMethod
                        icon={voucher}
                        label="I have a payment voucher"
                        checked={selectedPaymentMode === SubscriptionPaymentMode.voucherCode}
                        handleClick={() => {
                            setselectedPaymentMode(SubscriptionPaymentMode.voucherCode);
                            setIsValidVoucher(false);
                        }}
                    />
                    {selectedPaymentMode === SubscriptionPaymentMode.voucherCode && (
                        <SubscriptionVoucher {...subscriptionCodesFn} />
                    )}
                </Flex>
                <Flex
                    className="w-full h-auto px-5 py-6 text-xs border border-gray-200 border-solid sm:px-8 rounded-xl"
                    justify="space-between"
                    vertical
                    gap={18}
                >
                    <Typography.Text className="text-lg font-medium text-zinc-900">
                        Total Amount
                    </Typography.Text>
                    <Flex justify="space-between">
                        <GrayText text="Base Price" />
                        <BoldText
                            text={`₹ ${formatNumberWithLocalString(data?.packageDetails?.packagePrices[selectedType])}`}
                        />
                    </Flex>
                    {hasAddonPrice && (
                        <Flex justify="space-between">
                            <GrayText text={`Addon Price ( ${capitalize(selectedType)} )`} />
                            <BoldText
                                text={`₹ ${formatNumberWithLocalString(Number(selectedType === 'monthly' ? data.monthlyAddonPrice : data.annualAddonPrice))}`}
                            />
                        </Flex>
                    )}

                    {isValidVoucher ? (
                        <Flex justify="space-between">
                            <GrayText text="Voucher Discount" />
                            <BoldText
                                text={`₹ ${formatNumberWithLocalString(data?.packageDetails?.packagePrices[selectedType])}`}
                            />
                        </Flex>
                    ) : (
                        Number(data?.packageDetails?.discount?.[selectedType]) > 0 && (
                            <Flex justify="space-between">
                                <GrayText text="Discount" />
                                <BoldText
                                    text={`₹ ${formatNumberWithLocalString(data?.packageDetails?.discount[selectedType])}`}
                                />
                            </Flex>
                        )
                    )}
                    {Number(data?.discount?.price) !== 0 && (
                        <>
                            <Flex justify="space-between">
                                <div>
                                    <GrayText text="Remaining Period Credit" />
                                    <Tooltip
                                        autoAdjustOverflow
                                        className="ml-1"
                                        // overlayInnerStyle={{
                                        //     color: '#171717',
                                        //     width: '300px',
                                        // }}
                                        styles={{body:{color: '#171717',
                                            width: '300px',}}}
                                        color="white"
                                        title={
                                            <Typography.Text className="text-xs">
                                                This is the credit from your current plan and
                                                add-ons (if any), calculated based on the unused
                                                portion of your current billing period. It is
                                                applied towards your new plan as your upgrade or
                                                change takes effect immediately.
                                            </Typography.Text>
                                        }
                                    >
                                        <InfoCircleOutlined />
                                    </Tooltip>
                                </div>
                                <BoldText
                                    text={`₹ ${formatNumberWithLocalString(Number(data?.discount?.price))}`}
                                />
                            </Flex>
                            {/* <Typography.Text className="text-xs text-green-500">
                                {data?.discount?.message}
                            </Typography.Text> */}
                        </>
                    )}

                    {isApplied && (
                        <Flex justify="space-between">
                            <GrayText text="Coupon Discount" />
                            <BoldText
                                text={`₹ ${formatNumberWithLocalString(isValidVoucher ? 0 : discountAmount)}`}
                            />
                        </Flex>
                    )}

                    <Divider />
                    <Flex justify="space-between">
                        <BoldText text="Total Amount" />
                        <BoldText
                            text={`₹ ${formatNumberWithLocalString(isValidVoucher ? 0 : finalPayableAmount)}`}
                        />
                    </Flex>

                    <Button
                        loading={paymentLoading || isActivating}
                        onClick={handleSubscribePackage}
                        htmlType="submit"
                        danger
                        type="primary"
                        className="w-full"
                    >
                        Purchase
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default PlanDetailsCard;
