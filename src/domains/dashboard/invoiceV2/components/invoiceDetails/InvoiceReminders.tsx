import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Form, Typography } from 'antd';
import { Formik } from 'formik';

import ReminderCard from './ReminderCard';
import InvoiceRemindersForm from '../../forms/invoiceDetails/InvoiceRemindersForm';
import useInvoiceReminders from '../../hooks/invoiceDetails/useInvoiceReminders';
import { invoiceRemindersSchema } from '../../schema/invoiceDetails/invoiceRemindersSchema';
import { ReminderItem } from '../../types/invoiceDetails';

const INITIAL_VALUES = { interval: '', customDays: '', sendSms: false, sendEmail: false };

type Props = {
    invoiceId?: string;
    initialReminders?: ReminderItem[];
    dueDate?: string;
};

const InvoiceReminders = ({ invoiceId, initialReminders = [], dueDate }: Props) => {
    const { reminders, saveReminder, deleteReminder, isSaving, isDeleting } = useInvoiceReminders(
        invoiceId,
        initialReminders
    );
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <Card className="w-full rounded-2xl shadow-md">
            <Flex vertical gap={16}>
                <Flex justify="space-between" align="center">
                    <Typography.Text className="text-lg font-medium">
                        Invoice Reminders
                    </Typography.Text>
                    {!isFormOpen && (
                        <Button
                            type="link"
                            danger
                            icon={<PlusOutlined />}
                            onClick={() => setIsFormOpen(true)}
                        >
                            Add Reminder
                        </Button>
                    )}
                </Flex>

                {isFormOpen && (
                    <Formik
                        initialValues={INITIAL_VALUES}
                        validationSchema={invoiceRemindersSchema}
                        onSubmit={(values, { resetForm }) =>
                            saveReminder(values, () => {
                                resetForm();
                                setIsFormOpen(false);
                            })
                        }
                    >
                        {({ handleSubmit, resetForm }) => (
                            <Form layout="vertical" onFinish={handleSubmit}>
                                <Flex vertical gap={16}>
                                    <InvoiceRemindersForm />
                                    <Flex gap={16}>
                                        <Button
                                            block
                                            className="h-10"
                                            onClick={() => {
                                                resetForm();
                                                setIsFormOpen(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            block
                                            // danger
                                            className="h-10"
                                            loading={isSaving}
                                            onClick={() => handleSubmit()}
                                        >
                                            Save Reminder
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                )}

                {reminders.length > 0 && (
                    <Flex vertical gap={10}>
                        {reminders.map((r, index) => (
                            <ReminderCard
                                key={`${index}-${r.reminderInterval}-${r.createdAt}`}
                                reminder={r}
                                onDelete={() => deleteReminder(index)}
                                dueDate={dueDate}
                                isDeleting={isDeleting}
                            />
                        ))}
                    </Flex>
                )}
            </Flex>
        </Card>
    );
};

export default InvoiceReminders;
