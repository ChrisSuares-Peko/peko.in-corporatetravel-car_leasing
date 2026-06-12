/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { Card, Button } from 'antd';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MultiTextInput from '@components/atomic/inputs/MultiTextInput';

import useWalletDenominations from '../hooks/useWalletDenominations';

const DenominationWallet: React.FC = () => {
    const { denomination, updateWalletDenominations } = useWalletDenominations();

    return (
        <Formik
            enableReinitialize
            initialValues={{ denominations: denomination ?? [] }}
            validationSchema={Yup.object().shape({
                denominations: Yup.array()
                    .of(Yup.number())
                    .max(6, 'You can only add up to 6 denominations'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                const parsedValues = values.denominations.map(val => Number(val));
                updateWalletDenominations(parsedValues);
                setSubmitting(false);
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <Card
                    title="Manage Denomination Wallet"
                    style={{ maxWidth: 500, margin: '0 auto' }}
                >
                    <Form onSubmit={handleSubmit}>
                        <div className="ant-form-item">
                            <label className="ant-form-item-label">Denomination</label>
                            <div
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <MultiTextInput
                                    maxItems={6}
                                    allowNumbersOnly
                                    maxLength={6}
                                    name="denominations"
                                    type=""
                                    placeholder="Enter denomination"
                                />
                            </div>
                            {touched.denominations && errors.denominations && (
                                <div
                                    className="ant-form-item-explain-error"
                                    style={{ color: 'red', marginTop: '4px' }}
                                >
                                    {errors.denominations}
                                </div>
                            )}
                        </div>

                        <div className="ant-form-item">
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </div>
                    </Form>
                </Card>
            )}
        </Formik>
    );
};

export default DenominationWallet;
