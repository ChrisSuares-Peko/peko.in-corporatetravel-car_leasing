import { useCallback, useEffect, useState } from 'react';

import { getPackageDetails } from '../api';
import { PackageDetailsResponse, SelectedType } from '../types';

type GetPackageDetailsProps = {
    packageId: number;
    selectedType: SelectedType;
    setTotalPackagePrice: React.Dispatch<React.SetStateAction<number>>;
};
export default function useGetPackageDetails({
    packageId,
    selectedType,
    setTotalPackagePrice,
}: GetPackageDetailsProps) {
    const [tableData, setTableData] = useState<PackageDetailsResponse>();
    const [isLoading, setIsLoading] = useState(true);

    const getPackageDetail = useCallback(async () => {
        setIsLoading(true);
        const data: PackageDetailsResponse | false = await getPackageDetails(packageId);
        if (data) {
            const packagePrice = Number(data?.packageDetails.packagePrices?.[selectedType]) || 0;
            const packageDiscount = Number(data?.packageDetails.discount?.[selectedType]) || 0; // plans predefined discount
            const currentPlanDiscount = Number(data?.discount?.price) || 0; // amount of existing plans discount
            const addonPrice =
                selectedType === 'monthly'
                    ? Number(data.monthlyAddonPrice)
                    : Number(data.annualAddonPrice);
            const totalPrice = packagePrice - packageDiscount - currentPlanDiscount + addonPrice;
            setTotalPackagePrice(totalPrice);

            setTableData(data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [packageId, selectedType, setTotalPackagePrice]);

    useEffect(() => {
        getPackageDetail();
    }, [getPackageDetail]);

    return { data: tableData, isLoading };
}
