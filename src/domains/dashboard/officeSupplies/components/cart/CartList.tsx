import React, { useEffect, useRef, useState } from 'react';

import { Button, Typography, Flex, Col, Skeleton, Image } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';

import CartItems from './CartItems';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';
import EmptyCartIMG from '../../assets/icons/emptyCart.png';
import { useCartDetailsApi } from '../../hooks/useCartDetailsApi';
import { AddressField } from '../../types/address';

const CartList: React.FC = () => {
    const { getCartDetails, isLoading } = useCartDetailsApi();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [address, setAddress] = useState<AddressField>();
    const cartDetails = useAppSelector((state: { reducer: { cart: any } }) => state.reducer.cart);
    const freeShipping = cartDetails.freeDelivery;
    const eligibleFreeShipping = (
        cartDetails.eligibleFreeShipping - cartDetails.itemsTotalAmount
    ).toFixed(2);

    useEffect(() => {
        getCartDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formRef = useRef<any>(null);
    const navigate = useNavigate();

    return (
        <Flex gap={4} className="flex-col xl:flex-row" justify="space-between">
            {cartDetails.items.length === 0 ? (
                <Flex
                    gap={20}
                    vertical
                    className="w-full h-96 mt-16"
                    justify="center"
                    align="center"
                >
                    <Image src={EmptyCartIMG} preview={false} width={130} />
                    <Typography.Text className="text-center text-gray-300 ms-2 text-base">
                        No items found in the cart.
                    </Typography.Text>
                </Flex>
            ) : (
                <>
                    <Col sm={24} xl={16} className="pe-4">
                        <Flex className="p-4 rounded-t-lg md:border border-b-0">
                            <Typography.Text className="font-roboto text-gray-900 font-medium">
                                Shopping Cart
                            </Typography.Text>
                        </Flex>
                        {isLoading ? (
                            <Skeleton paragraph={{ rows: 5 }} className="p-4 border rounded-b-sm" />
                        ) : (
                            <CartItems />
                        )}

                        <Flex
                            className="md:border border-t-0 p-2 md:p-4 rounded-b-lg"
                            justify="space-between"
                        >
                            <Button
                                className="text-bgOrange2 w-full md:w-1/4 flex justify-center items-center rounded-md"
                                onClick={() => navigate(`/${paths.officeSupplies.index}`)}
                            >
                                Continue Shopping
                            </Button>
                            {freeShipping === true ? (
                                <Flex vertical className="mt-3 hidden md:flex">
                                    <Typography.Text className="text-textLime font-roboto">
                                        Eligible for free shipping
                                    </Typography.Text>
                                </Flex>
                            ) : (
                                <Flex vertical className="mt-3 hidden md:flex">
                                    <Typography.Text className="text-textLime font-roboto">
                                        Get free shipping when you spend an extra ₹
                                        {eligibleFreeShipping}
                                    </Typography.Text>
                                </Flex>
                            )}
                        </Flex>
                        <DeliveryDetails setAddress={setAddress} formRef={formRef} />
                    </Col>
                    <Col sm={24} xl={8} className="sm:px-4 flex flex-col">
                        <Flex vertical className="sticky top-0">
                            <Flex
                                vertical
                                className="py-6 md:p-4 md:border md:text-center rounded-lg"
                            >
                                <Typography.Text className="font-roboto text-gray-900 font-medium px-2 md:px-0 text-sm">
                                    {cartDetails.count < 1
                                        ? 'Your cart is currently empty. Start adding items now!'
                                        : ' The item(s) will be delivered within 2 to 4 working days'}
                                </Typography.Text>
                            </Flex>
                            {isLoading ? (
                                <Skeleton
                                    paragraph={{ rows: 6 }}
                                    className="p-4 border rounded-b-sm"
                                />
                            ) : (
                                <OrderSummary formRef={formRef} />
                            )}
                        </Flex>
                    </Col>
                </>
            )}
        </Flex>
    );
};

export default CartList;
