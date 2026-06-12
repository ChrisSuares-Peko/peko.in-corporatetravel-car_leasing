// import AttestationIcon from '../assets/icons/attestaion.svg';
// import { paths } from '@src/routes/paths';

import { paths } from '@src/routes/paths';

// import AttestationIcon from '../assets/icons/attestaion.svg';
import billPaymentIcon from '../assets/icons/bill-payments.svg';
// import BussinessIcon from '../assets/icons/business-docs.svg';
import corporateTravelIcon from '../assets/icons/corporate-travel.svg';
import eSimIcon from '../assets/icons/esim.svg';
import hotelIcon from '../assets/icons/hotels.svg';
// import giftCardsIcon from '../assets/icons/gift-cards.svg';
// import insurenceIcon from '../assets/icons/insurence.svg';
// import logisticsIcon from '../assets/icons/logistics.svg';
import marketPlaceIcon from '../assets/icons/market-place.svg';
import mobileRechargeIcon from '../assets/icons/mobile-recharge.svg';
import MoreIcon from '../assets/icons/more.svg';
import verficationSuiteIcon from '../assets/icons/verificationsuite.svg';
// import officeSuppliesIcon from '../assets/icons/office-supplies.svg';
// import pekoConnectIcon from '../assets/icons/peko-connect.svg';
// import softwaresIcon from '../assets/icons/softwares.svg';
// import worksIcon from '../assets/icons/works.svg';
import { DiscountResult, PackageDetails, PackagePrices, ServicePackage } from '../types';


export function calculateDiscount(
    actualPrice: string | number,
    discountAmount: number
): DiscountResult {
    if (Number(actualPrice) <= 0) {
        return { discountedAmount: 0, discountPercentage: 0 };
    }

    const discountedAmount = Number(actualPrice) - discountAmount;
    const discountPercentage = (discountAmount / Number(actualPrice)) * 100;

    return {
        discountedAmount,
        discountPercentage: parseFloat(discountPercentage.toFixed(2)), // rounding to 2 decimal places
    };
}

export function calculateMaxDiscountPercentages(
    packages: ServicePackage[] | PackageDetails[]
): PackagePrices {
    let maxMonthlyDiscountPercentage: number = 0;
    let maxAnnualDiscountPercentage: number = 0;

    packages.forEach(pkg => {
        const { packagePrices, discount } = pkg;
        const { discountPercentage: monthlyDiscount } = calculateDiscount(
            packagePrices.monthly,
            discount.monthly
        );
        const { discountPercentage: yearlyDiscount } = calculateDiscount(
            packagePrices.annually,
            discount.annually
        );
        if (monthlyDiscount > maxMonthlyDiscountPercentage) {
            maxMonthlyDiscountPercentage = monthlyDiscount;
        }
        if (yearlyDiscount > maxAnnualDiscountPercentage) {
            maxAnnualDiscountPercentage = yearlyDiscount;
        }
    });

    return {
        monthly: maxMonthlyDiscountPercentage.toString(),
        annually: maxAnnualDiscountPercentage.toString(),
    };
}

export const paidServiceList = [
    {
        id: 1,
        icon: billPaymentIcon,
        title: 'Payroll',
        price: 99,
    },
    {
        id: 2,
        icon: billPaymentIcon,
        title: 'Invoicing and Payment Links',
        price: 99,
    },
    {
        id: 3,
        icon: billPaymentIcon,
        title: 'Hub',
        price: 99,
    },
    {
        id: 4,
        icon: billPaymentIcon,
        title: 'eSign',
        price: 99,
    },
];
export const freeServiceList = [
    {
        id: 1,
        bgColor: '#F2FAFC',
        icon: mobileRechargeIcon,
        contentColor: '#6594A0',
        title: 'Mobile Recharge',
    },
    {
        id: 2,
        bgColor: '#FBF6FF',
        icon: billPaymentIcon,
        contentColor: '#A227AC',
        title: 'Bill Payments',
    },
    {
        id: 3,
        bgColor: '#FFF0F4',
        icon: corporateTravelIcon,
        contentColor: '#A227AC',
        title: 'Air Tickets',
    },{
        id: 4,
        bgColor: '#EFFFEF',
        icon: hotelIcon,
        contentColor: '#608460',
        title: 'Hotel Booking',
    },{
        id: 5,
        bgColor: '#FFF4F7',
        icon: eSimIcon,
        contentColor: '#A227AC',
        title: 'eSIM',
    },{
        id: 6,
        bgColor: '#FFF9F1',
        icon: verficationSuiteIcon,
        contentColor: '#E68401',
        title: 'Corporate Travel',
    },
    // {
    //     id: 3,
    //     bgColor: '#EFFFEF',
    //     icon: officeSuppliesIcon,
    //     contentColor: '#608460',
    //     title: 'Office Supplies',
    // },
    // {
    //     id: 4,
    //     bgColor: '#FFF4F7',
    //     icon: giftCardsIcon,
    //     contentColor: '#853249',
    //     title: 'Gift Cards',
    // },
    // {
    //     id: 5,
    //     bgColor: '#E6FDFF',
    //     icon: logisticsIcon,
    //     contentColor: '#3F787D',
    //     title: 'Logistics',
    // },
    // {
    //     id: 6,
    //     bgColor: '#FFF9F1',
    //     icon: softwaresIcon,
    //     contentColor: '#E68401',
    //     title: 'Softwares',
    // },
    {
        id: 7,
        bgColor: '#FFF0F4',
        icon: marketPlaceIcon,
        contentColor: '#D55275',
        title: 'Marketplace',
    },
    // {
    //     id: 8,
    //     bgColor: '#FFF8EE',
    //     icon: BussinessIcon,
    //     contentColor: '#E68401',
    //     title: 'Business Docs',
    // },
    // {
    //     id: 9,
    //     bgColor: '#EFFFEF',
    //     icon: worksIcon,
    //     contentColor: '#5DBC5D',
    //     title: 'Works',
    // },
    // {
    //     id: 10,
    //     bgColor: '#F2FAFC',
    //     icon: AttestationIcon,
    //     contentColor: '#6594A0',
    //     title: 'Document Attestation',
    // },
    // {
    //     id: 11,
    //     bgColor: '#FBF6FF',
    //     icon: insurenceIcon,
    //     contentColor: '#A227AC',
    //     title: 'Insurance',
    // },
    // {
    //     id: 12,
    //     bgColor: '#FFF4F7',
    //     icon: pekoConnectIcon,
    //     contentColor: '#D55275',
    //     title: 'Connect',
    // },
    {
        id: 13,
        bgColor: '#E6FDFF',
        icon: MoreIcon,
        contentColor: '#448186',
        title: 'and more',
    },
];

export const serviceConfigs: {
    [key: string]: {
        title: string;
        label: string;
        path: string;
    };
} = {
    Payroll: {
        title: 'Your payment for Payroll subscription was successful',
        label: 'Payroll',
        path: `${paths.dashboard.payroll}`,
    },
    Cloud: {
        title: 'Your payment for Hub subscription was successful',
        label: 'Hub',
        path: `${paths.dashboard.pekoCloud}`,
    },
    eSign: {
        title: 'Your payment for eSign subscription was successful',
        label: 'eSign',
        path: `/${paths.dashboard.eSign}`,
    },
    Invoicing: {
        title: 'Your payment for Invoicing subscription was successful',
        label: 'Invoicing',
        path: `${paths.dashboard.invoicing}`,
    },
    'WhatsApp For Business': {
        title: 'Your payment for WhatsApp Business subscription was successful',
        label: 'WhatsApp Business',
        path: `${paths.dashboard.whatsappForBusiness}`,
    },
    Turbo: {
        title: 'Your payment for Turbo subscription was successful',
        label: 'Turbo',
        path: `${paths.dashboard.turbo}`,
    },
    default: {
        title: 'Payment Successful',
        label: 'Dashboard',
        path: `${paths.dashboard.home}`,
    },
};
