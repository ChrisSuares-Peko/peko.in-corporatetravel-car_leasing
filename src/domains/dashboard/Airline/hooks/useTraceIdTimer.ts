import { useEffect, useState, useCallback, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';

import {
    setTraceId,
    setBookingCompletedAt,
    resetSelectedAirlines,
    resetBookingData,
    resetpriceRange,
    setfilghtResponse,
    setInbountFlightResponse,
    setPaymentDetails,
} from '../slices/airlineSlice';

const EXPIRATION_TIME_MS = 15 * 60 * 1000; // 15 minutes in milliseconds

interface TimerState {
    timeRemaining: number; // in seconds
    isExpired: boolean;
    isPaymentExpired: boolean;
}

/**
 * Hook to track traceId expiration times
 * - For LCC: Payment must be done within 15 minutes from search initiation
 * - For non-LCC: Booking must be done within 15 minutes from search initiation, 
 *   then payment must be done within 15 minutes from booking completion
 */
export default function useTraceIdTimer(isLcc: boolean,
  enabled: boolean) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { searchInitiatedAt, bookingCompletedAt } = useAppSelector(
        state => state.reducer.airline
    );

    const [timerState, setTimerState] = useState<TimerState>({
        timeRemaining: 0,
        isExpired: false,
        isPaymentExpired: false,
    });

    // Track if we've already shown expiration toasts and redirected to prevent duplicates
    const hasShownBookingExpiredToast = useRef(false);
    const hasShownPaymentExpiredToast = useRef(false);
    const hasRedirectedOnExpiration = useRef(false);
    const lastWarningMinute = useRef<number | null>(null);

    const calculateTimeRemaining = useCallback(() => {
        if (!enabled) {
            return {
                timeRemaining: 0,
                isExpired: false,
                isPaymentExpired: false,
            };
        }
        if (!searchInitiatedAt) {
            return {
                timeRemaining: 0,
                isExpired: true,
                isPaymentExpired: true,
            };
        }

        const now = new Date().getTime();
        const searchTime = new Date(searchInitiatedAt).getTime();
        const elapsed = now - searchTime;

        if (isLcc) {
            // For LCC: Payment must be done within 15 minutes from search
            const remaining = Math.max(0, EXPIRATION_TIME_MS - elapsed);
            const isExpired = remaining === 0;

            return {
                timeRemaining: Math.floor(remaining / 1000),
                isExpired,
                isPaymentExpired: isExpired,
            };
        }
        // For non-LCC: 
        // - Booking must be done within 15 minutes from search
        // - Payment must be done within 15 minutes from booking completion
        const bookingTimeRemaining = Math.max(0, EXPIRATION_TIME_MS - elapsed);
        const isBookingExpired = bookingTimeRemaining === 0;

        if (!bookingCompletedAt) {
            // Booking not completed yet
            return {
                timeRemaining: Math.floor(bookingTimeRemaining / 1000),
                isExpired: isBookingExpired,
                isPaymentExpired: false, // Payment timer starts after booking
            };
        }
        // Booking completed, now track payment timer
        const bookingTime = new Date(bookingCompletedAt).getTime();
        const paymentElapsed = now - bookingTime;
        const paymentTimeRemaining = Math.max(0, EXPIRATION_TIME_MS - paymentElapsed);
        const isPaymentExpired = paymentTimeRemaining === 0;

        return {
            timeRemaining: Math.floor(paymentTimeRemaining / 1000),
            isExpired: isBookingExpired, // Booking expiration status
            isPaymentExpired,
        };
    }, [enabled,searchInitiatedAt, bookingCompletedAt, isLcc]);

    useEffect(() => {
        // Reset toast flags when search is initiated or booking is completed
        if (searchInitiatedAt) {
            hasShownBookingExpiredToast.current = false;
            hasRedirectedOnExpiration.current = false;
        }
        if (bookingCompletedAt) {
            hasShownPaymentExpiredToast.current = false;
            hasRedirectedOnExpiration.current = false;
            lastWarningMinute.current = null;
        }
    }, [searchInitiatedAt, bookingCompletedAt]);

    useEffect(() => {
        if (!enabled) return undefined;
        const updateTimer = () => {
            const state = calculateTimeRemaining();
            setTimerState(state);

            // Show warning toast when 2 minutes remaining (only once per minute)
            if (state.timeRemaining > 0 && state.timeRemaining <= 120) {
                const currentMinute = Math.floor(state.timeRemaining / 60);
                if (currentMinute !== lastWarningMinute.current && state.timeRemaining % 60 === 0) {
                    lastWarningMinute.current = currentMinute;
                    let action = 'complete booking';
                    if (isLcc) {
                        action = 'complete payment';
                    } else if (bookingCompletedAt) {
                        action = 'complete payment';
                    }
                    dispatch(
                        showToast({
                            description: `Hurry! Only ${currentMinute} minute(s) left to ${action}.`,
                            variant: 'warning',
                        })
                    );
                }
            }

            // Handle expiration: show toast and redirect
            // Only reset booking-related state, preserve search form data (from, to, date, class, passengers)
            if (state.isExpired && !isLcc && !bookingCompletedAt && !hasShownBookingExpiredToast.current) {
                hasShownBookingExpiredToast.current = true;
                hasRedirectedOnExpiration.current = true;
                dispatch(
                    showToast({
                        description: 'Booking time has expired. Please search again.',
                        variant: 'error',
                    })
                );
                // Reset only booking-related state, keep form data
                dispatch(setTraceId(''));
                dispatch(setBookingCompletedAt(null));
                dispatch(resetSelectedAirlines({}));
                dispatch(setPaymentDetails(null));
                dispatch(resetBookingData({}));
                dispatch(resetpriceRange());
                dispatch(setfilghtResponse([]));
                dispatch(setInbountFlightResponse([]));
                navigate(`${paths.dashboard.corporateTravel}/${paths.airline.index}/${paths.airline.results}`, {
                    state: { flightkey: 'searchFlights' },
                });
            } else if (state.isPaymentExpired && !hasShownPaymentExpiredToast.current) {
                hasShownPaymentExpiredToast.current = true;
                hasRedirectedOnExpiration.current = true;
                dispatch(
                    showToast({
                        description: 'Payment time has expired. Please search again.',
                        variant: 'error',
                    })
                );
                // Reset only booking-related state, keep form data
                dispatch(setTraceId(''));
                dispatch(setBookingCompletedAt(null));
                dispatch(resetSelectedAirlines({}));
                dispatch(setPaymentDetails(null));
                dispatch(resetBookingData({}));
                dispatch(resetpriceRange());
                dispatch(setfilghtResponse([]));
                dispatch(setInbountFlightResponse([]));
                // Navigate with state to trigger automatic search
                navigate(`${paths.dashboard.corporateTravel}/${paths.airline.index}/${paths.airline.results}`, {
                    state: { flightkey: 'searchFlights' },
                });
            }
        };

        // Update immediately
        updateTimer();

        // Update every second
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [enabled,calculateTimeRemaining, isLcc, bookingCompletedAt, dispatch, navigate]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `00:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return {
        ...timerState,
        formatTime,
        searchInitiatedAt,
        bookingCompletedAt,
    };
}
