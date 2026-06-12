import { useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';

import { getFareRulesAPI } from '../api';
import { setFares } from '../slices/airlineSlice';
import { AllFareQuote, FareRules, IFareRules } from '../types/fareRules';

export const useGetFareRules = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const { TraceId, selectedAirline, selectedInbountAirline } = useAppSelector(
        state => state.reducer.airline
    );
    const [fareRules, setFareRules] = useState<FareRules[]>([]);
    const [fareQuotes, setFareQuotes] = useState<AllFareQuote>();
    const [isLoading, setIsLoading] = useState(true);
    const lastCalledResultIndex = useRef<string | undefined>(undefined);

    const getFareRulesHandler = useCallback(async () => {
        if (!TraceId || !selectedAirline.ResultIndex || !selectedAirline.price) {
            return;
        }

        let data: IFareRules | false = false;
        data = await getFareRulesAPI({
            userId: id,
            userType: role,
            TraceId,
            ResultIndex: selectedAirline.ResultIndex,
            InbountResultIndex: selectedInbountAirline.ResultIndex,
        });
        
        if (data) {
            setFareRules(data.fareRules);
            setFareQuotes(data.fareQuotes);
            dispatch(
                setFares({
                    outbountFare: data.fareQuotes.outbount.Fare.PublishedFare,
                    inbountFare: data.fareQuotes.inbount?.Fare?.PublishedFare || 0,
                })
            );
            setIsLoading(false);
        } else {
            dispatch(
                showToast({
                    description: 'Failed fetching fare rules, please try again later.',
                    variant: 'error',
                })
            );
            navigate(
                `${paths.dashboard.corporateTravel}/${paths.airline.index}/${paths.airline.results}`
            );
        }
    }, [
        TraceId,
        id,
        role,
        selectedAirline.ResultIndex,
        selectedAirline.price,
        selectedInbountAirline.ResultIndex,
        navigate,
        dispatch,
    ]);

    useEffect(() => {
        if (!selectedAirline.ResultIndex) {
            lastCalledResultIndex.current = undefined;
            return;
        }

        const currentResultIndex = selectedAirline.ResultIndex;
        if (
            TraceId &&
            currentResultIndex &&
            selectedAirline.price &&
            currentResultIndex !== lastCalledResultIndex.current
        ) {
            lastCalledResultIndex.current = currentResultIndex;
            getFareRulesHandler();
        }
    }, [TraceId, selectedAirline.ResultIndex, selectedAirline.price, getFareRulesHandler]);
    return { fareRules, fareQuotes, isLoading };
};
