import React from 'react';

import { Result, Button, Flex, Skeleton } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import Pending from '../assets/svg/clock.svg';

const PaymentPending = () => {
    const location = useLocation();
    const state = location.state || {};

    const isLoading = false;
    return (
        <Flex vertical justify="center" align="center" gap={20} className="pgsuccess md:pt-12">
            <Result
                className="w-full max-w-lg md:max-w-sm p-0 text-center"
                icon={<ReactSVG src={Pending} className="flex justify-center items-center" />}
                title="Awaiting payment confirmation"
                subTitle={
                    isLoading ? (
                        <Skeleton
                            style={{ minWidth: 400, height: 10 }}
                            paragraph={{ rows: 2 }}
                            active
                        />
                    ) : (
                        state.message ||
                        'Your order is being processed. You will receive a confirmation email once your payment has been verified.'
                    )
                }
                extra={[
                    isLoading ? (
                        <Skeleton.Button
                            key="skeleton"
                            style={{ minWidth: 400, height: 30 }}
                            active
                        />
                    ) : (
                        <Flex
                            justify="center"
                            className="flex flex-col sm:flex-row gap-4"
                            key="btn"
                        >
                            <Link to={state.firstBtnLink || '/bill-payments'}>
                                <Button type="primary" danger>
                                    {state.firstBtnText || 'Go to bill payments'}
                                </Button>
                            </Link>
                            <Link to="/reports">
                                <Button>View Transaction </Button>
                            </Link>
                        </Flex>
                    ),
                ]}
            />
        </Flex>
    );
};
export default PaymentPending;
