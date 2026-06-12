import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '@src/hooks/store';

import { getGiftcards } from '../api/index';
import { GiftcardListResponse, GiftcardsTableData } from '../types/types';

export default function useGiftcardApi(
    searchText: string,
    page: number,
    limit: number,

    category: string,
    offset: number
) {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [tableData, setTableData] = useState<GiftcardsTableData>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState<number>(0); // Initialize count as 0

    const getGiftCardList = useCallback(async () => {
        setIsLoading(true); // Set loading state before the API call
        const data: GiftcardListResponse | false = await getGiftcards({
            userId: id,
            userType: role,
            accessKeys: ["xoxoday","gift-card"],
            searchText,
            limit,
            page,
            category,
            offset,
        });

        if (data) {
            const giftCardData = data as GiftcardListResponse;
            const arr = giftCardData?.rows?.map(giftCard => ({
                name: giftCard.product_name ?? '',
                description: giftCard.description ?? '',
                image: giftCard.image ?? '',
                id: giftCard.id ?? '',
                serviceOperator:giftCard?.serviceOperator??''
                
            }));
            setTableData(arr);
            setCount(giftCardData.count); // Set the count based on the array length
        }
        setIsLoading(false); // Reset loading state after processing data
    }, [category, id, limit, offset, page, role, searchText]);

    useEffect(() => {
        getGiftCardList();
    }, [getGiftCardList]);

    return { data: tableData, isLoading, count };
}
