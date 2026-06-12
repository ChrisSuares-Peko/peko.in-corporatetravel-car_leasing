import React, { useState } from 'react';

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Spin, Tag, Typography } from 'antd';

import ConfirmationModal from '@components/molecular/modals/ConfirmationModal';

import AddDomesticAccount from './AddDomesticAccount';
import BankCard from './BankCard';
import EmptyAccounts from './EmptyAccounts';
import useDomesticAccounts from '../../hooks/manageBankAccounts/useDomesticAccounts';
import { DomesticAccount } from '../../types/ManageBankAccounts';

const DomesticAccounts: React.FC = () => {
    const {
        accounts,
        isLoading,
        addDomesticAccount,
        editDomesticAccount,
        deleteDomesticAccount,
        setAsPrimary,
    } = useDomesticAccounts();
    const [isAdding, setIsAdding] = useState(false);
    const [editingAccount, setEditingAccount] = useState<DomesticAccount | null>(null);
    const [deletingAccount, setDeletingAccount] = useState<DomesticAccount | null>(null);

    if (isAdding) {
        return (
            <AddDomesticAccount
                onCancel={() => setIsAdding(false)}
                onSubmit={values => {
                    addDomesticAccount(values, () => setIsAdding(false));
                }}
                isLoading={isLoading}
            />
        );
    }

    if (editingAccount) {
        return (
            <AddDomesticAccount
                onCancel={() => setEditingAccount(null)}
                onSubmit={values => {
                    editDomesticAccount(editingAccount.id, values);
                    setEditingAccount(null);
                }}
                isLoading={isLoading}
                defaultValues={editingAccount}
            />
        );
    }

    return (
        <>
            <Flex vertical gap={16}>
                <Flex justify="space-between" align="center">
                    <Typography.Text className="text-sm text-[#6A7282]">
                        Manage your domestic bank accounts for INR transactions
                    </Typography.Text>
                    <Button
                        type="primary"
                        danger
                        icon={<PlusOutlined />}
                        className="h-9 px-4 text-sm font-medium rounded-lg"
                        onClick={() => setIsAdding(true)}
                    >
                        Add Domestic Account
                    </Button>
                </Flex>

                {isLoading && (
                    <Flex justify="center" className="py-10">
                        <Spin />
                    </Flex>
                )}
                {!isLoading && accounts.length === 0 && <EmptyAccounts />}
                {!isLoading && accounts.length > 0 && (
                    <Flex vertical gap={12}>
                        {accounts.map(account => (
                            <BankCard
                                key={account.id}
                                name={account.accountHolderName}
                                badge={
                                    account.isPrimary ? (
                                        <Tag
                                            color="success"
                                            bordered={false}
                                            className="rounded-full text-xs font-medium px-3"
                                        >
                                            Primary
                                        </Tag>
                                    ) : undefined
                                }
                                actions={
                                    account.isPrimary ? (
                                        <Button
                                            type="link"
                                            danger
                                            icon={<EditOutlined />}
                                            className="p-0 h-auto text-sm font-medium"
                                            onClick={() => setEditingAccount(account)}
                                        />
                                    ) : (
                                        <Flex align="center" gap={12}>
                                            <Button
                                                className="h-8 px-4 text-sm border-[#E4E4E7] text-[#344054] rounded-lg"
                                                onClick={() => setAsPrimary(account.id)}
                                            >
                                                Set as Primary
                                            </Button>
                                            <EditOutlined
                                                className="text-[#FF4F4F] cursor-pointer hover:text-red-500 text-base"
                                                onClick={() => setEditingAccount(account)}
                                            />
                                            <DeleteOutlined
                                                className="text-[#FF4F4F] cursor-pointer hover:text-red-500 text-base"
                                                onClick={() => setDeletingAccount(account)}
                                            />
                                        </Flex>
                                    )
                                }
                                fields={[
                                    { label: 'Bank Name', value: account.bankName },
                                    { label: 'Account Number', value: account.accountNumber },
                                    { label: 'IFSC Code', value: account.ifscCode },
                                    { label: 'Currency', value: account.currency },
                                ]}
                            />
                        ))}
                    </Flex>
                )}
            </Flex>

            <ConfirmationModal
                isOpen={!!deletingAccount}
                handleCancel={() => setDeletingAccount(null)}
                handleSubmit={() => {
                    if (deletingAccount) deleteDomesticAccount(deletingAccount.id);
                    setDeletingAccount(null);
                }}
                title={`Delete ${deletingAccount?.accountHolderName ?? 'this account'}?`}
                description="This action cannot be undone."
                isLoading={false}
            />
        </>
    );
};

export default React.memo(DomesticAccounts);
