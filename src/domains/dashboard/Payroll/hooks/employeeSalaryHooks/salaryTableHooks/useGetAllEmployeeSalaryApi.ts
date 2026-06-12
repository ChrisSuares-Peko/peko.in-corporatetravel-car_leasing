import { useState, useCallback, useEffect } from 'react';

import { useAppSelector } from '@src/hooks/store';
import { formatNumberWithLocalString } from '@utils/priceFormat';

import { employeeSalaryListing } from '../../../api/employeeSalaryApi/employeeSalary';
import {
    employeeSalaryListingResponse,
    salarytableType,
} from '../../../types/salaryProfileTypes/employeeSalaryTable';

interface SalaryInformation {
    basicPay?: number;
    hraAmount?: number;
    daAmount?: number;
    bonus?: number;
    incentiveAmount?: number;
    increamentAmount?: number;
    overtimeAmount?: number;
    other?: number;
}

const earningKeys: (keyof SalaryInformation)[] = [
    'hraAmount',
    'daAmount',
    'bonus',
    'incentiveAmount',
    'increamentAmount',
    'overtimeAmount',
    'other',
];
export const useGetEmployeeSalaryApi = (
    searchText: string,
    sort: string,
    page: number,
    limit: number,
    filter: string,
    year: number | string,
    month: number | string,
    reloadTable: boolean
) => {
    const { role, id } = useAppSelector(state => state.reducer.auth);
    const [employeeRows, setEmployeeRows] = useState<salarytableType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState<number>();
    const [salaryCycle, setSalaryCycle] = useState<any>(null);
    const [salaryArray, setSalaryArray] = useState<any>(null);

    const getEmployeeSalaryList = useCallback(async () => {
        setIsLoading(true);
        const data: employeeSalaryListingResponse | false = await employeeSalaryListing({
            userId: id,
            userType: role,
            year,
            month,
            searchText,
            sort,
            page,
            limit,
            filter,
        });
        if (data) {
            const arr = data?.rows?.map(item => ({
                id: item.id,
                name: item.employee.personalInformation.fullName ?? '',
                employeeId: item.employee.employeeInformation.employeeId ?? '',
                role: item.employee.employeeInformation.designation ?? '',
                basicSalary: `₹ ${formatNumberWithLocalString(item?.salaryInformation?.basicPay || 0)}`,
                monthlySalary: `₹ ${formatNumberWithLocalString(
                    earningKeys.reduce(
                        (s, k) =>
                            s +
                            Number(
                                (item.salaryInformation as SalaryInformation | undefined)?.[k] ?? 0
                            ),
                        0
                    )
                )}`,
                // monthlySalary: `₹ ${formatNumberWithLocalString(item?.monthlySalary || 0)}`,
                others: `₹ ${formatNumberWithLocalString(item?.others || 0)}`,
                totalPayable: `₹ ${formatNumberWithLocalString(item?.totalPayable || 0)}`,
                totalDeduction: `₹ ${formatNumberWithLocalString(
                    Number(item?.salaryInformation?.deductionAmount || 0) +
                    Number(item?.salaryInformation?.leavesAmount || 0)
                )}`,
                // totalDeduction: `₹   ${formatNumberWithLocalString(item?.salaryInformation.deductionAmount + item?.salaryInformation.leavesAmount || 0)}`,
                status: item.paymentStatus,
                action: '',
                email: item.employee.personalInformation.email ?? '',
                image: item.employee.profileImage,
                department: item.department.departmentName,
                salaryId: item.id,
                eId: item.employee.id,
                employeeStatus: item.employee.employeeInformation.employeeStatus,
                lastWorkingDay: item.employee.offBoardingInformation?.lastWorkingDay,
            }));

            setCount(data.count);
            setEmployeeRows(arr);
            setIsLoading(false);
            setSalaryCycle(data.salaryCycle ?? null);

            const salary = data?.rows?.map(item => ({
                id: item.id,
                name: item.employee.personalInformation?.fullName ?? '',
                employeeId: item.employee.employeeInformation.employeeId ?? '',
                role: item.employee.employeeInformation.designation ?? '',
                totalBonus: item.totalBonus ?? '',
                totalDeduction: Number(
                    Number(item?.salaryInformation?.deductionAmount || 0) +
                    Number(item?.salaryInformation?.leavesAmount || 0)).toFixed(2),
                // totalDeduction:Number(
                //     Number(item.totalDeduction ?? 0).toFixed(2)
                // ),
                    // parseFloat((item.totalDeduction).toFixed(2)) ?? 0,
                totalIncentive: item.totalIncentive ?? '',
                totalOvertime: item.totalOvertime ?? '',
                totalPayable: item.totalPayable ?? '',
                monthlySalary: Number(item.monthlySalary) ?? 0,
                totalSalary: `₹ ${item?.totalPayable || 0}`,
            }));
            setSalaryArray(salary);
        } else {
            setEmployeeRows([]);
            setCount(0);
            setIsLoading(false);
            setSalaryCycle(null);
            setSalaryArray(null);
        }
    }, [id, role, year, month, searchText, sort, page, limit, filter]);

    useEffect(() => {
        getEmployeeSalaryList();
    }, [getEmployeeSalaryList]);

    return {
        tableDatas: employeeRows,
        orderCount: count,
        tableLoading: isLoading,
        salaryCycle,
        salaryArray,
    };
};
