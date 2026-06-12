import { useEffect, useState } from 'react';

import { useAppSelector } from '@src/hooks/store';

const useDomesticRoundTrip = () => {
    const { searchData: airlineSearchData } = useAppSelector(state => state.reducer.airline);

    const [isDomesticRoundTrip, setIsDomesticRoundTrip] = useState(false);

    useEffect(() => {
        if (airlineSearchData.destinationCountryCode && airlineSearchData.originCountryCode) {
            const isDRT =
                airlineSearchData.destinationCountryCode === airlineSearchData.originCountryCode &&
                airlineSearchData.originCountryCode === 'IN' &&
                airlineSearchData.tripType === 2;
            setIsDomesticRoundTrip(isDRT);
        }
    }, [airlineSearchData]);

    return { isDomesticRoundTrip };
};

export default useDomesticRoundTrip;
