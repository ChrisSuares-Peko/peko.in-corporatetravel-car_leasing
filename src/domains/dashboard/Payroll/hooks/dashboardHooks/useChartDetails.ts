import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '@src/hooks/store';

import { chartDetails } from '../../api/dashBoardIndex';
import { chartData, chartResponse } from '../../types/dashboardTypes';

// Per-year cache — switching years still fetches fresh data; same year is instant on return
const chartDataCache: Record<string, chartData[]> = {};

export function useChartDetailsApi() {
    const currentDate = new Date();
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [year, setYear] = useState<string>(currentDate.getFullYear().toString());
    const [details, setDetails] = useState<chartData[]>(chartDataCache[year] ?? []);
    const [isLoading, setIsLoading] = useState(!chartDataCache[year]);

    const handleYearChange = (value: string) => {
        setYear(value);
    };

    const getChartData = useCallback(async () => {
        if (chartDataCache[year]) {
            setDetails(chartDataCache[year]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const data: chartResponse | false = await chartDetails({
            userId: id,
            userType: role,
            year,
        });
        if (data) {
            chartDataCache[year] = data.chartData;
            setDetails(data.chartData);
        }
        setIsLoading(false);
    }, [id, role, year]);

    useEffect(() => {
        getChartData();
    }, [getChartData]);

    return { isLoading, data: details, handleYearChange, year };
}
