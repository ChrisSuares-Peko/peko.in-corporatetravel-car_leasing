import Ads from '@domains/dashboard/MoreServices/assets/icons/Ads-news.svg';
import CarLeasing from '@domains/dashboard/MoreServices/assets/icons/CarLeasing.svg';
import BusinessDocs from '@domains/dashboard/MoreServices/assets/icons/BusinessDocs.svg';
import Capital from '@domains/dashboard/MoreServices/assets/icons/Capital.svg';
import ChequeManagement from '@domains/dashboard/MoreServices/assets/icons/ChequeManagement.svg';
import ZeroCarbon from '@domains/dashboard/MoreServices/assets/icons/Co2.svg';
import CollectPayment from '@domains/dashboard/MoreServices/assets/icons/CollectPayment.svg';
import Community from '@domains/dashboard/MoreServices/assets/icons/Community.svg';
import CompanySetup from '@domains/dashboard/MoreServices/assets/icons/CompanySetup.svg';
import Connect from '@domains/dashboard/MoreServices/assets/icons/Connect.svg';
import CorporateCards from '@domains/dashboard/MoreServices/assets/icons/CorporateCards.svg';
import EmailDomain from '@domains/dashboard/MoreServices/assets/icons/EmailDomain.svg';
import ESign from '@domains/dashboard/MoreServices/assets/icons/ESign.svg';
// import GiftCardsIcon from '@domains/dashboard/MoreServices/assets/icons/GiftCards.svg';
// import Invoicing from '@domains/dashboard/MoreServices/assets/icons/Invoicing.svg';
import LicenceRegistration from '@domains/dashboard/MoreServices/assets/icons/LicenceRegistration.svg';
// import NeedHelp from '@domains/dashboard/MoreServices/assets/icons/NeedHelp.svg';
import OfficeSpace from '@domains/dashboard/MoreServices/assets/icons/OfficeSpace.svg';
import PaymentLinks from '@domains/dashboard/MoreServices/assets/icons/PaymentLinks.svg';
import PaytmBPOS from '@domains/dashboard/MoreServices/assets/icons/PaytmBPOS.svg';
import Pekocloud from '@domains/dashboard/MoreServices/assets/icons/pekocloud.svg';
import PekoClub from '@domains/dashboard/MoreServices/assets/icons/PekoClub.svg';
import Perks from '@domains/dashboard/MoreServices/assets/icons/Perks.svg';
// import Reports from '@domains/dashboard/MoreServices/assets/icons/Reports.svg';
import SoundBox from '@domains/dashboard/MoreServices/assets/icons/SoundBox.svg';
import TurboIcon from '@domains/dashboard/MoreServices/assets/icons/Turbo.svg';
import WhatsAppForBusinessIcon from '@domains/dashboard/MoreServices/assets/icons/WhatsappForBusiness.svg';
import WorkingCapital from '@domains/dashboard/MoreServices/assets/icons/WorkingCapital.svg';
import Works from '@domains/dashboard/MoreServices/assets/icons/Works.svg';
import { paths } from '@src/routes/paths';

export const moreServicess = [
    {
        icon: OfficeSpace,
        title: 'Office Address',
        status: '',
        path: `/${paths.dashboard.officeAddress}`,
    },
    {
        icon: Works,
        title: 'Works',
        status: '',
        path: `/${paths.dashboard.works}`,
    },
    {
        icon: ZeroCarbon,
        title: 'Zero Carbon',
        status: 'New',
        path: `/${paths.dashboard.zeroCarbon}`,
    },
    {
        icon: BusinessDocs,
        title: 'Business Docs',
        status: '',
        path: paths.dashboard.businessDocs,
    },

    {
        icon: ESign,
        title: 'eSign',
        status: '',
        path: `/${paths.dashboard.eSign}`,
    },
    {
        icon: WorkingCapital,
        title: 'Connect',
        status: '',
        path: `${paths.dashboard.pekoConnect}`,
    },
    {
        icon: LicenceRegistration,
        title: 'Hike',
        status: 'New',
        path: `/${paths.dashboard.hike}`,
    },

    {
        icon: EmailDomain,
        title: 'Business Emails',
        status: 'New',
        path: `/${paths.dashboard.emailDomain}`,
    },
    {
        icon: PaymentLinks,
        title: 'Payment Links',
        status: '',
        path: paths.dashboard.paymentLinks,
    },
    // {
    //     icon: VerificationServices,
    //     title: 'Verification Suite',
    //     status: 'New',
    //     path: `/${paths.dashboard.verificationSuite}`,
    // },
];

export const moreServices = [
    {
        icon: CarLeasing,
        title: 'Car Leasing',
        status: 'New',
        path: `/${paths.dashboard.carLeasing}`,
    },
    {
        icon: CarLeasing,
        title: 'Car Rentals',
        status: 'New',
        path: `/${paths.dashboard.carRentals}`,
    },
    {
        icon: Works,
        title: 'Works',
        status: '',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: ESign,
        title: 'eSign',
        status: '',
        path: paths.dashboard.comingSoon,
    },
]


export const ComingSoon = [
    
    {
        icon: SoundBox,
        title: 'Soundbox',
        status: 'New',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: PaytmBPOS,
        title: 'Paytm BPOS',
        status: 'New',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: Perks,
        title: 'Perks',
        status: 'New',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: Community,
        title: 'Community',
        status: 'Free',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: Capital,
        title: 'Capital',
        status: 'Coming soon',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: CollectPayment,
        title: 'Collect Payment',
        status: 'Coming soon',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: PekoClub,
        title: 'Peko Club',
        status: 'Coming soon',
        path: paths.dashboard.comingSoon,
    },
    // {
    //     icon: VerificationServices,
    //     title: 'Verification Services',
    //     status: 'Coming soon',
    //     path: '#',
    // },
    {
        icon: LicenceRegistration,
        title: 'Licence & Registration',
        status: 'Coming soon',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: CorporateCards,
        title: 'Corporate Cards',
        status: 'Coming soon',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: ChequeManagement,
        title: 'Cheque Management',
        status: 'Coming soon',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: Ads,
        title: 'Ads (Newspaper)',
        status: 'Coming soon',
        path: paths.dashboard.comingSoon,
    },

    {
        icon: CompanySetup,
        title: 'Company Setup',
        status: 'Coming soon',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: EmailDomain,
        title: 'Email/Domain',
        status: 'Coming soon',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: OfficeSpace,
        title: 'Office Address',
        status: '',
        path: paths.dashboard.comingSoon,
    },
    
    {
        icon: ZeroCarbon,
        title: 'Zero Carbon',
        status: 'New',
        path: paths.dashboard.comingSoon,
    },
    {
        icon: BusinessDocs,
        title: 'Business Docs',
        status: '',
        path: paths.dashboard.comingSoon,
    },

    // {
    //     icon: ESign,
    //     title: 'eSign',
    //     status: '',
    //     path: '#',

    // },
    {
        icon: WorkingCapital,
        title: 'Connect',
        status: '',
        path: paths.dashboard.comingSoon,

    },
    {
        icon: LicenceRegistration,
        title: 'Hike',
        status: 'New',
        path: paths.dashboard.comingSoon,

    },

    {
        icon: EmailDomain,
        title: 'Business Emails',
        status: 'New',
        path: paths.dashboard.comingSoon,
    },
];

export const extraServicesForMobile = [
    {
        path: paths.dashboard.whatsappForBusiness,
        title: 'WhatsApp for Business',
        status: '',
        icon: WhatsAppForBusinessIcon,
    },
    {
        path: paths.dashboard.turbo,
        title: 'Turbo',
        status: '',
        icon: TurboIcon,
    },
    {
        path: paths.dashboard.connect,
        title: 'Marketplace',
        status: 'New',
        icon: Connect,
    },
    // {
    //     path: paths.dashboard.giftCards,
    //     title: 'Gift Cards',
    //     status: '',
    //     icon: GiftCardsIcon,
    // },
    {
        path: paths.dashboard.pekoCloud,
        title: 'Hub',
        status: '',
        icon: Pekocloud,
    },
    // {
    //     path: paths.dashboard.reports,
    //     title: 'Reports',
    //     status: '',
    //     icon: Reports,
    // },
    // {
    //     path: paths.dashboard.needHelp,
    //     title: 'Need Help',
    //     status: '',
    //     icon: NeedHelp,
    // },
    // {
    //     path: '#',
    //     title: 'Accounting & Tax',
    //     status: 'New',
    //     icon: Accounting,
    // },
    // {
    //     path: paths.dashboard.works,
    //     title: 'Works',
    //     status: 'New',
    //     icon: Works,
    // },
    // {
    //     path: paths.dashboard.invoicing,
    //     title: 'Invoicing',
    //     status: 'Free',
    //     icon: Invoicing,
    // },
    // {
    //     path: paths.dashboard.paytmBpos,
    //     title: 'Paytm BPOS',
    //     status: 'New',
    //     icon: PaytmBPOS,
    // },
    // {
    //     path: '#',
    //     title: 'Insurance',
    //     status: 'New',
    //     icon: Insurance,
    // },
    // {
    //     path: '#',
    //     title: 'Vendor payout',
    //     status: '',
    //     icon: Payout,
    // }
];
