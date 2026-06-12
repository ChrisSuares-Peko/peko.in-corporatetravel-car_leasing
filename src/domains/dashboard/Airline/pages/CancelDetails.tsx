import { useState } from 'react';

import { Button, Form, Col, Flex, Row, Skeleton } from 'antd';
import { Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';

import TextAreaInput from '@components/atomic/inputs/TextAreaInput';
import OtpModal from '@components/molecular/modals/OtpModal';
import { Scope } from '@src/enums/enums';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';

import { getotp } from '../api';
import CancellationPolicy from '../components/cancelDetails/CancellationPolicy';
import HeadDetails from '../components/cancelDetails/HeadDetails';
import useCancelTicket from '../hooks/useCancelBooking';
import { cancellationSchema } from '../schema/ReceiverDetailsSchema';

const CancelDetails = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingId } = location.state || {};

    const { id, role } = useAppSelector(state => state.reducer.auth);
    const { HandleCancelTicket, isLoading, cancellationCharges, cancelLoading, chargesError } =
        useCancelTicket(bookingId);
    const orderDetails = useAppSelector(state => state.reducer.airline.orderDetails);
    const [isOpen, setIsOpen] = useState(false);
    const [isOtpSending, setIsOtpSending] = useState(false);
    const [formValues, setFormValues] = useState<any>();

    const handleCancellation = async (otp: string) => {
        const res = await HandleCancelTicket({
            flightBookingId: bookingId,
            reasonForCancellation: formValues.reasonForCancellation,
            otp,
            scope: Scope.EMAIL,
        });
        if (res.status === false) {
            dispatch(showToast({ description: 'Ticket Cancellation Failed', variant: 'error' }));
        } else if (res.status === true) {
            dispatch(
                showToast({ description: 'Ticket Cancelled Successfully', variant: 'success' })
            );
            navigate(
                `${paths.dashboard.corporateTravel}/${paths.airline.index}/${paths.airline.manage}/${paths.airline.bookingDetails}/${paths.airline.cancelSuccess}`
            );
        }
    };

    const handleGetOtp = async (values: any) => {
        if (chargesError) {
            dispatch(
                showToast({
                    description:
                        'Unable to fetch cancellation charges. Please try again later.',
                    variant: 'error',
                })
            );
            return;
        }
        setIsOtpSending(true);
        setFormValues(values);
        const resp = await getotp({
            userId: id,
            userType: role,
            scope: Scope.EMAIL,
            id: orderDetails.id,
        });
        if (resp) {
            setIsOtpSending(false);
            setIsOpen(true);
        } else {
            setIsOtpSending(false);
            // Handle error if OTP request fails
        }
    };
    return (
        <>
            <Row>
                <Col span={24}>
                    <Flex vertical gap={40}>
                        <HeadDetails title="Cancel Booking" />
                        {isLoading ? (
                            <Skeleton />
                        ) : (
                            <>
                                <CancellationPolicy cancellationCharges={cancellationCharges} />
                                <Formik
                                    initialValues={{ reasonForCancellation: '' }}
                                    onSubmit={values => handleGetOtp(values)}
                                    validationSchema={cancellationSchema}
                                >
                                    {({ handleSubmit }) => (
                                        <Form
                                            layout="vertical"
                                            onFinish={handleSubmit}
                                            className="w-full"
                                        >
                                            <TextAreaInput
                                                name="reasonForCancellation"
                                                placeholder="Enter reason for cancellation"
                                                label="Reason for Cancellation"
                                                maxLength={10000}
                                                isRequired
                                            />

                                            <Flex gap={6} justify="end">
                                                <Button
                                                    htmlType="submit"
                                                    type="primary"
                                                    danger
                                                    loading={isOtpSending}
                                                    disabled={chargesError}
                                                    style={
                                                        chargesError
                                                            ? {}
                                                            : {
                                                                  backgroundColor: '#FF4D4F',
                                                                  borderColor: '#FF4D4F',
                                                              }
                                                    }
                                                >
                                                    Confirm Cancellation
                                                </Button>
                                                <Button
                                                    type="default"
                                                    style={{
                                                        borderColor: '#FF4D4F',
                                                        color: '#FF4D4F',
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            `${paths.dashboard.corporateTravel}/${paths.airline.index}/${paths.airline.manage}/${paths.airline.bookingDetails}`
                                                        )
                                                    }
                                                >
                                                    Go Back
                                                </Button>
                                            </Flex>
                                        </Form>
                                    )}
                                </Formik>
                            </>
                        )}
                    </Flex>
                </Col>
            </Row>
            <OtpModal
                isOpen={isOpen}
                isLoading={cancelLoading!}
                handleCancel={() => setIsOpen(false)}
                isOtpSending={isOtpSending}
                onResend={async () => {
                    setIsOtpSending(true);
                    await getotp({
                        userId: id,
                        userType: role,
                        scope: Scope.EMAIL,
                        id: orderDetails.id,
                    });
                    setIsOtpSending(false);
                }}
                handleSubmit={handleCancellation}
                title="Confirmation"
                description="OTP has been sent to your email address provided during booking."
            />
        </>
    );
};

export default CancelDetails;
