import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Table, Typography } from 'antd';
import { FieldArray, useFormikContext } from 'formik';

import { CreateInvoiceFormValues, ItemValues } from '../../types/createInvoice';
import { getItemsTableColumns } from '../../utils/table_column/itemsTableColumns';

const INITIAL_ITEM: ItemValues = {
    name: '',
    hsn: '',
    quantity: '',
    unit: '',
    unitPrice: '',
    discount: '0',
    taxRate: '',
    netAmount: '',
};

const ItemsTable = () => {
    const { values } = useFormikContext<CreateInvoiceFormValues>();

    return (
        <FieldArray name="items">
            {({ push, remove }) => (
                <Flex vertical gap={20}>
                    <Flex justify="space-between" align="center">
                        <Typography.Text className="text-xl font-medium">Items</Typography.Text>
                        <Button
                            onClick={() => push({ ...INITIAL_ITEM })}
                            className="h-9 px-4 rounded-lg border border-[#cbd5e1] text-[#475569] font-medium"
                            icon={<PlusOutlined />}
                        >
                            Add Item
                        </Button>
                    </Flex>

                    <Flex className="items-table-scroll overflow-hidden rounded-2xl border border-[#cbd5e1] shadow-sm">
                        <Table
                            dataSource={values.items.map((item, index) => ({
                                ...item,
                                key: index,
                            }))}
                            columns={getItemsTableColumns(remove, values.items.length)}
                            pagination={false}
                            size="small"
                            scroll={{ x: 'max-content' }}
                            className="w-full [&_.ant-form-item]:mb-0 [&_.ant-table-cell]:py-3 [&_.ant-table-thead_th:before]:!hidden"
                            components={{
                                header: {
                                    cell: ({
                                        className,
                                        ...props
                                    }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
                                        <th
                                            {...props}
                                            className={`${className ?? ''} !bg-black !text-white font-semibold text-sm !py-5 !ps-5 !border-r-0`}
                                        />
                                    ),
                                },
                            }}
                        />
                    </Flex>
                </Flex>
            )}
        </FieldArray>
    );
};

export default ItemsTable;
