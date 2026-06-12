import type { FC } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Image, InputNumber, List, Row, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/store';
import useScreenSize from '@src/hooks/useScreenSize';
import { paths } from '@src/routes/paths';

import { useCartApi } from '../../hooks/useCartApi';
import { CartItem } from '../../types/cartTypes';

const { officeSupplies } = paths;

interface CartItemsProps {}

const CartItems: FC<CartItemsProps> = () => {
    const screens = useScreenSize();
    const cartDetails = useAppSelector(state => state.reducer.cart);
    const { isLoading, selectedProductId, deleteItemFromCart, updateCart } = useCartApi();

    const handleUpdateQuantity = (
        productId: number,
        newQuantity: number | null,
        oldQty: number
    ) => {
        const quantity = newQuantity !== null ? newQuantity : 1;
        let operation;
        if (quantity > oldQty) {
            operation = 'increase';
            updateCart(productId, operation);
        } else if (quantity < oldQty) {
            operation = 'decrease';
            updateCart(productId, operation);
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: '15%',
            render: (text: string, record: CartItem) => (
                <Image
                    width={120}
                    height={80}
                    src={record.productImage}
                    alt={record.name}
                    className="object-contain"
                    preview={false}
                />
            ),
        },
        {
            title: 'Products',
            dataIndex: 'image',
            key: 'image',
            width: '35%',
            render: (text: string, record: CartItem) => (
                <Flex className="w-full" align="center" gap={10}>
                    <Link
                        to={`/${officeSupplies.index}/${officeSupplies.productDetails}/${record.id}`}
                    >
                        <Typography.Text className="w-3/5 font-roboto text-gray-900">
                            {record.name}
                        </Typography.Text>
                    </Link>
                </Flex>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: '15%',
            render: (text: string, record: CartItem) => (
                <Typography.Text>
                    ₹ {new Intl.NumberFormat('en-IN').format(Number(record.price) ?? 0) ?? 0}
                </Typography.Text>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '15%',
            render: (text: string, record: CartItem) => (
                <InputNumber
                    min={1}
                    max={record.productQuantityInDB || 10}
                    className="border rounded-sm"
                    defaultValue={record.productQuantity}
                    value={record.productQuantity}
                    disabled={selectedProductId === record.id && isLoading}
                    onChange={value =>
                        handleUpdateQuantity(record.id, value, record.productQuantity)
                    }
                />
            ),
        },
        {
            title: 'Total',
            dataIndex: 'subtotal',
            key: 'subtotal',
            width: '15%',
            render: (text: string, record: CartItem) => (
                <Typography.Text>
                    ₹ {new Intl.NumberFormat('en-IN').format(Number(record.totalPrice) ?? 0) ?? 0}
                </Typography.Text>
            ),
        },
        {
            title: 'Action',
            key: 'Action',
            width: '5%',
            render: (text: string, record: CartItem) => (
                <Button
                    style={{ border: 'none', boxShadow: 'none' }}
                    loading={selectedProductId === record.id && isLoading}
                    onClick={() => deleteItemFromCart(record.id)}
                    icon={<DeleteOutlined />}
                />
            ),
        },
    ];

    return (
        <>
            {screens.md ? (
                <Table
                    dataSource={cartDetails?.items?.map(item => ({
                        ...item,
                        key: item.id.toString(),
                    }))}
                    className="border border-b-0 border-t-0"
                    columns={columns}
                    showHeader
                    pagination={false}
                    summary={pageData => ''}
                />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={cartDetails.items}
                    renderItem={(item: CartItem) => (
                        <List.Item
                            style={{ display: 'flex', flexDirection: 'column' }}
                            className="justify-start px-2 gap-1"
                        >
                            <Row justify="space-between" align="top" className="px-2 w-full">
                                <Col span={6}>
                                    <Image
                                        width={70}
                                        height={70}
                                        src={item.productImage}
                                        alt={item.name}
                                        className="object-contain"
                                        preview={false}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Link
                                        to={`/${officeSupplies.index}/${officeSupplies.productDetails}/${item.id}`}
                                    >
                                        <Typography.Text className="text-gray-900 line-clamp-3 ms-1">
                                            {item.name}
                                        </Typography.Text>
                                    </Link>
                                </Col>
                            </Row>
                            <Row
                                style={{ display: 'flex', width: '100%', gap: '50px' }}
                                className="items-center mt-2 px-2"
                            >
                                <Col>
                                    <InputNumber
                                        min={1}
                                        max={item.productQuantityInDB || 10}
                                        defaultValue={item.productQuantity}
                                        value={item.productQuantity}
                                        disabled={selectedProductId === item.id && isLoading}
                                        onChange={value =>
                                            handleUpdateQuantity(
                                                item.id,
                                                value,
                                                item.productQuantity
                                            )
                                        }
                                    />
                                </Col>
                                <Col>
                                    <Typography.Text>{item?.totalPrice.toFixed(2)}</Typography.Text>
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

export default CartItems;
