import React, { useState, useEffect } from 'react';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Flex, Row, Skeleton, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { PlanType } from '@src/domains/dashboard/plans/types';
import { calculateDiscount } from '@src/domains/dashboard/plans/utils';
import { paths } from '@src/routes/paths';
import { packageAccessKeys } from '@utils/packageAccessKeys';

import AboutModal from '../components/billingHistory/AboutModal';
import PlanCard from '../components/pricingPlan/PlanCard';
import SwitchPlan from '../components/subscription/SwitchPlan';
import { useBotBuilderAmount } from '../hooks/useBotBuilderAmount';
import { useGetActiveBotBuilder } from '../hooks/useGetActiveBotBuilder';
import { useGetActiveSubscription } from '../hooks/useGetActiveSubscription';
import { useGetDetailsSubscription } from '../hooks/useGetDetailsSubscription';
import useWhatsAppSubscriptionPayment from '../hooks/useSubscriptionPayment';
import { PlanMode } from '../types';
import { FirstPlanFeatures, SecondPlanFeatures } from '../utils';

const PlanDetails = () => {
    const serviceKey = packageAccessKeys['Whatsapp for Business'];
    const { packages, deduction, isLoading } = useGetDetailsSubscription({ accessKey: serviceKey });
    const [open, setOpen] = useState<boolean>(false);

    const initialPackage = packages?.[0];
    const initialPlanId = initialPackage?.id || 15;
    const initialPrice = initialPackage?.packagePrices?.monthly || 49;
    const initialDiscount = initialPackage?.discount?.monthly || 39;

    const { discountedAmount: initialAmount } = calculateDiscount(initialPrice, initialDiscount);

    const [selectedType, setSelectedType] = useState(PlanMode.Basic);
    const [seletedDuration, setSeletedDuration] = useState(PlanType.Monthly);

    const [botBuilderValue, setBotBuilderValue] = useState<number>(0);
    const [buttonLoading, setButtonLoading] = useState(false);
    const { handleSubmission } = useWhatsAppSubscriptionPayment();
    const { data, isLoading: activesubLoading } = useGetActiveSubscription(true);
    const {
        data: botData,
        isLoading: activeBotLoading,
    } = useGetActiveBotBuilder(true);
    const { data: botBuilderData, isLoading: Loading } = useBotBuilderAmount();

    const isMonthlyPro =
        data?.activeSubscriptions?.package?.packageName === 'WhatsApp Pro' &&
        data?.activeSubscriptions?.billingType === 'MONTHLY' &&
        seletedDuration === 'monthly';

    const initialSelectedPlan = React.useMemo(
        () => ({
            planMode: PlanMode.Basic,
            planId: initialPlanId,
            price: initialPrice,
            discountedAmount: initialAmount,
        }),
        [initialPlanId, initialPrice, initialAmount]
    );

    useEffect(() => {
        setSelectedPlan(initialSelectedPlan);
        if (isMonthlyPro) {
            setSeletedDuration(PlanType.Annually);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialSelectedPlan]);

    useEffect(() => {
        if (botBuilderData && !botData?.activeSubscriptions) {
            setBotBuilderValue(botBuilderData.amount);
        }
    }, [botBuilderData, botData]);

    useEffect(() => {
        if (packages && packages.length > 0) {
            const validPlans = packages.filter(plan => {
                const activePackage = data?.activeSubscriptions?.package;
                const activeBillingType = data?.activeSubscriptions?.billingType;

                return !(
                    (activePackage?.priorityLevel === 1 &&
                        activeBillingType === 'MONTHLY' &&
                        plan.packageName === 'WhatsApp Basic' &&
                        seletedDuration === 'monthly') ||
                    (activePackage?.priorityLevel === 2 &&
                        activeBillingType === 'MONTHLY' &&
                        plan.packageName === 'WhatsApp Pro' &&
                        seletedDuration === 'monthly') ||
                    (activePackage?.priorityLevel === 1 &&
                        activeBillingType === 'ANNUALLY' &&
                        plan.packageName === 'WhatsApp Basic' &&
                        seletedDuration === 'annually') ||
                    (activePackage?.priorityLevel === 2 &&
                        activeBillingType === 'ANNUALLY' &&
                        plan.packageName === 'WhatsApp Pro' &&
                        seletedDuration === 'annually')
                );
            });

            if (validPlans.length > 0) {
                const firstValidPlan = validPlans[0];
                const newPrice =
                    seletedDuration === PlanType.Monthly
                        ? firstValidPlan?.packagePrices?.monthly
                        : firstValidPlan?.packagePrices?.annually;
                const newDiscount =
                    seletedDuration === PlanType.Monthly
                        ? firstValidPlan?.discount?.monthly
                        : firstValidPlan?.discount?.annually;
                const { discountedAmount: newAmount } = calculateDiscount(
                    newPrice || 0,
                    newDiscount || 0
                );

                setSelectedType(firstValidPlan.packageName as PlanMode);
                setSelectedPlan({
                    planMode: firstValidPlan.packageName as PlanMode,
                    planId: firstValidPlan.id,
                    price: newPrice || 0,
                    discountedAmount: newAmount,
                });
            }
        }
    }, [packages, seletedDuration, data, isMonthlyPro]);

    const [selectedPlan, setSelectedPlan] = useState(initialSelectedPlan);

    const handleSelectPlan = (
        planMode: PlanMode,
        selectedPlanId: number,
        selectedPrice: number,
        selectedDiscountedAmount: number
    ) => {
        setSelectedType(planMode);
        setSelectedPlan({
            planMode,
            planId: selectedPlanId,
            price: selectedPrice,
            discountedAmount: selectedDiscountedAmount,
        });
    };

    const isAnnually =
        data?.activeSubscriptions?.billingType === 'ANNUALLY' && seletedDuration === 'monthly';

    const handleSelectDuration = (duration: PlanType) => {
        setSeletedDuration(duration);
        const selectedPackage = packages?.find(p => p.id === selectedPlan.planId);
        const newPrice =
            duration === PlanType.Monthly
                ? selectedPackage?.packagePrices?.monthly
                : selectedPackage?.packagePrices?.annually;
        const newDiscount =
            duration === PlanType.Monthly
                ? selectedPackage?.discount?.monthly
                : selectedPackage?.discount?.annually;
        const { discountedAmount: newAmount } = calculateDiscount(newPrice || 0, newDiscount || 0);
        setSelectedPlan({
            ...selectedPlan,
            price: newPrice || 0,
            discountedAmount: newAmount,
        });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleBotBuilderChange = (e: CheckboxChangeEvent) => {
        const value = e.target.checked ? parseInt(e.target.value, 10) : 0;
        setBotBuilderValue(value);
    };

    const handlePurchasePlan = async () => {
        setButtonLoading(true);
        const details = {
            url: `${paths.dashboard.moreServices}/${paths.whatsappForBusiness.index}`,
            service: 'WhatsApp For Business',
        };
        sessionStorage.setItem('PurchaseUrl', JSON.stringify(details));

        const { planMode, planId, discountedAmount } = selectedPlan;
        let updatedBotBuilderValue = botBuilderValue;

        if (botBuilderValue === 0 && botData?.activeSubscriptions && botBuilderData) {
            if (seletedDuration === 'annually') {
                updatedBotBuilderValue = botBuilderData.yearlyAmount;
            } else {
                updatedBotBuilderValue = botBuilderData.amount;
            }
            setBotBuilderValue(updatedBotBuilderValue);
        }
        await handleSubmission(
            planMode,
            seletedDuration,
            planId,
            discountedAmount,
            updatedBotBuilderValue,
            data?.activeSubscriptions,
            deduction ?? null
        );

        setButtonLoading(false);
    };

    if (isLoading || activesubLoading || Loading || activeBotLoading) {
        return <Skeleton />;
    }

    return (
        <Col>
            <Flex justify="center" align="center" className="mb-5 ">
                <Typography.Text className="font-semibold text-[#383838] text-center sm:w-2/3 text-xl md:text-3xl">
                    Choose the perfect plan for your business and start transforming customer
                    engagement today!
                </Typography.Text>
            </Flex>

            <Flex vertical className="w-full">
                <Flex vertical gap={10} justify="center" align="center">
                    <SwitchPlan
                        selectedType={seletedDuration}
                        handleChange={handleSelectDuration}
                    />
                    <Typography.Text className="text-lg text-[#7B7B7B] mt-7 text-center ">
                        Select a plan
                    </Typography.Text>
                </Flex>

                <Row justify="center" className="flex gap-8 md:mt-6 mt-3">
                    {Array.isArray(packages) && packages.length > 0
                        ? packages.map((plan, index) => {
                              const features = index === 0 ? FirstPlanFeatures : SecondPlanFeatures;
                              const activePackage = data?.activeSubscriptions?.package;
                              const activeBillingType = data?.activeSubscriptions?.billingType;

                              const shouldSkip =
                                  (activePackage?.priorityLevel === 2 &&
                                      plan.packageName === 'WhatsApp Basic' &&
                                      activeBillingType === 'MONTHLY' &&
                                      seletedDuration === 'monthly') ||
                                  (activePackage?.priorityLevel === 2 &&
                                      plan.packageName === 'WhatsApp Basic' &&
                                      activeBillingType === 'ANNUALLY' &&
                                      seletedDuration === 'annually') ||
                                  (activePackage?.priorityLevel === 1 &&
                                      plan.packageName === 'WhatsApp Basic' &&
                                      activeBillingType === seletedDuration.toUpperCase()) ||
                                  (activePackage?.priorityLevel === 2 &&
                                      plan.packageName === 'WhatsApp Pro' &&
                                      activeBillingType === seletedDuration.toUpperCase()) ||
                                  (activeBillingType === 'ANNUALLY' &&
                                      seletedDuration === 'monthly');

                              return (
                                  <PlanCard
                                      shouldSkip={!!shouldSkip}
                                      key={plan.id}
                                      planId={plan.id}
                                      planName={plan.packageName as PlanMode}
                                      price={
                                          seletedDuration === PlanType.Monthly
                                              ? plan?.packagePrices?.monthly
                                              : plan?.packagePrices?.annually
                                      }
                                      discount={
                                          seletedDuration === PlanType.Monthly
                                              ? plan?.discount?.monthly
                                              : plan?.discount?.annually
                                      }
                                      selectedType={selectedType}
                                      seletedDuration={seletedDuration}
                                      feature={features!}
                                      onSelectPlan={handleSelectPlan}
                                  />
                              );
                          })
                        : ''}
                </Row>

                <Flex vertical align="center" gap={20} justify="center" className="md:mt-6 mt-3">
                    {(() => {
                        if (!isMonthlyPro) {
                            if (botBuilderData && !botData?.activeSubscriptions) {
                                return seletedDuration === 'monthly' ? (
                                    <>
                                        <Typography.Text className="text-xs text-[#7B7B7B] text-center ">
                                            Choose Add-on:
                                        </Typography.Text>
                                        <Flex>
                                            <Checkbox
                                                value={botBuilderData?.amount || 0}
                                                onChange={handleBotBuilderChange}
                                                checked={botBuilderValue === botBuilderData.amount}
                                            >
                                                <Typography.Text className="text-xs text-center ">
                                                    {`Bot Builder (Additional ₹ ${botBuilderData?.amount || 0}/month)`}
                                                </Typography.Text>
                                            </Checkbox>
                                            <Flex
                                                // align="center"
                                                className="cursor-pointer"
                                                onClick={handleOpen}
                                            >
                                                <QuestionCircleOutlined />
                                                <Typography.Text className="text-textLightRed ml-1 text-nowrap">
                                                    What is it
                                                </Typography.Text>
                                            </Flex>
                                        </Flex>
                                    </>
                                ) : (
                                    <>
                                        <Typography.Text className="text-xs text-[#7B7B7B] text-center ">
                                            Choose Add-on:
                                        </Typography.Text>
                                        <Flex>
                                            <Checkbox
                                                value={botBuilderData?.yearlyAmount || 0}
                                                onChange={handleBotBuilderChange}
                                                checked={
                                                    botBuilderValue === botBuilderData.yearlyAmount
                                                }
                                            >
                                                <Typography.Text className="text-xs text-center ">
                                                    {`Bot Builder (Additional ₹ ${botBuilderData?.yearlyAmount || 0}/year)`}
                                                </Typography.Text>
                                            </Checkbox>
                                            <Flex
                                                // align="center"
                                                className=" cursor-pointer"
                                                onClick={handleOpen}
                                            >
                                                <QuestionCircleOutlined />
                                                <Typography.Text className="text-textLightRed ml-1 text-nowrap">
                                                    What is it
                                                </Typography.Text>
                                            </Flex>
                                        </Flex>
                                    </>
                                );
                            }
                            return null;
                        }
                        return null;
                    })()}

                    {!isMonthlyPro && !isAnnually ? (
                        <Button
                            key="submit"
                            type="primary"
                            danger
                            className="h-8 md:px-4 text-xs"
                            size="small"
                            loading={buttonLoading}
                            onClick={handlePurchasePlan}
                        >
                            Purchase Now
                        </Button>
                    ) : (
                        <Typography.Text className="text-xs text-center">
                            Downgrade option is not available.
                        </Typography.Text>
                    )}
                </Flex>
            </Flex>
            {open && <AboutModal handleCancel={() => setOpen(false)} open={open} />}
        </Col>
    );
};

export default PlanDetails;
