import { useMemo, useRef, useState } from 'react';

import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

import ConfirmationModal from '@src/components/molecular/modals/ConfirmationModal';
import { paths } from '@src/routes/paths';

import { BenefitsSection } from '../components/sections/BenefitsSection';
import { FAQsSection } from '../components/sections/FAQsSection';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { HeroSection } from '../components/sections/HeroSection';
import { PlansSection } from '../components/sections/PlansSection';
import { ProductInfoSection } from '../components/sections/ProductInfoSection';
import { SpecificationsSection } from '../components/sections/SpecificationsSection';
import { TechSpecsModal } from '../components/sections/TechSpecsModal';
import useHostingPlans, { HostingPlan } from '../hooks/useHostingPlans';
import useServiceCart from '../hooks/useServiceCart';
import {
    linuxHostingBenefits,
    linuxHostingFaqs,
    linuxHostingFeatures,
    linuxHostingSpecs,
    windowsHostingBenefits,
    windowsHostingFaqs,
    windowsHostingFeatures,
    windowsHostingSpecs,
} from '../utils/data';

type OsType = 'linux' | 'windows';
type LocationType = 'in' | 'us';

const getPlanOs = (productId: string): OsType =>
    productId.toLowerCase().includes('windows') ? 'windows' : 'linux';

const getPlanLocation = (plan: HostingPlan): LocationType => {
    if (plan.vendorDetails.hosting_location === 'in') return 'in';
    if (plan.vendorDetails.hosting_location === 'us') return 'us';
    return plan.productId.toLowerCase().endsWith('in') ? 'in' : 'us';
};

const planDescriptions: Record<string, string> = {
    Personal: 'Websites for everyone, at a great price',
    Business: 'Websites for everyone, at a great price',
    Pro: 'Perfect for Medium-sized Organisations',
};

const SharedHostingPage = () => {
    const navigate = useNavigate();
    const plansRef = useRef<HTMLDivElement>(null);
    const [serverLocation, setServerLocation] = useState<LocationType>('in');
    const [os, setOs] = useState<OsType>('linux');
    const [selectedFeature, setSelectedFeature] = useState<number>(0);
    const [techSpecsModalOpen, setTechSpecsModalOpen] = useState(false);
    const { plans, isLoading } = useHostingPlans('shared_hosting');
    const { handleAddToCart, cartConflictModalProps } = useServiceCart();

    const filteredPlans = useMemo(
        () =>
            plans.filter(
                p => getPlanOs(p.productId) === os && getPlanLocation(p) === serverLocation
            ),
        [plans, os, serverLocation]
    );

    const cheapestPlan = useMemo(() => {
        if (filteredPlans.length === 0) return null;
        return filteredPlans.reduce((min, plan) => {
            const minPrice = Object.values(min.pricingDetails?.add ?? {}).sort(
                (a, b) => a - b
            )[0];
            const planPrice = Object.values(plan.pricingDetails?.add ?? {}).sort(
                (a, b) => a - b
            )[0];
            return (planPrice ?? 999) < (minPrice ?? 999) ? plan : min;
        });
    }, [filteredPlans]);

    const cheapestPrice = useMemo(() => {
        if (!cheapestPlan) return null;
        const prices = Object.values(cheapestPlan.pricingDetails?.add ?? {}).sort(
            (a, b) => a - b
        );
        return prices[0];
    }, [cheapestPlan]);

    const osTitle = os === 'linux' ? 'Linux Shared Hosting' : 'Windows Hosting';
    const featureTitleos = os === 'linux' ? 'Linux Web Hosting' : 'Windows Web Hosting';
    const heroBannerTitle = os === 'linux' ? 'Linux Shared Hosting' : 'Shared Windows Hosting';
    const hostingBenefits = os === 'linux' ? linuxHostingBenefits : windowsHostingBenefits;
    const hostingFeatures = os === 'linux' ? linuxHostingFeatures : windowsHostingFeatures;
    const hostingSpecs = os === 'linux' ? linuxHostingSpecs : windowsHostingSpecs;
    const hostingFaqs = os === 'linux' ? linuxHostingFaqs : windowsHostingFaqs;

    const onPurchase = async (
        productId: string,
        planId: string,
        planName: string,
        billingCycle: number
    ) => {
        const result = await handleAddToCart({
            itemType: 'shared_hosting',
            productId,
            planId,
            productName: planName,
            serverLocation,
            billingCycle,
        });
        if (result) navigate(`${paths.dashboard.domainHosting}/${paths.domainHosting.cart}`);
    };

    return (
        <Content className="bg-white min-h-screen">
            <HeroSection
                heroBannerTitle={heroBannerTitle}
                cheapestPrice={cheapestPrice ?? undefined}
                os={os}
                serverLocation={serverLocation}
                onOsChange={setOs}
                onLocationChange={setServerLocation}
            />

            <PlansSection
                filteredPlans={filteredPlans}
                isLoading={isLoading}
                planDescriptions={planDescriptions}
                onPurchase={onPurchase}
                plansRef={plansRef}
            />

            <BenefitsSection osTitle={osTitle} hostingBenefits={hostingBenefits} />

            <SpecificationsSection
                osTitle={osTitle}
                hostingSpecs={hostingSpecs}
                onViewAllSpecs={() => setTechSpecsModalOpen(true)}
            />

            <FeaturesSection
                featureTitleOs={featureTitleos}
                hostingFeatures={hostingFeatures}
                selectedFeature={selectedFeature}
                onSelectFeature={setSelectedFeature}
                os={os}
            />

            <FAQsSection hostingFaqs={hostingFaqs} />

            <ProductInfoSection
                osTitle={osTitle}
                os={os}
                onBuyNow={() => plansRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />

            <TechSpecsModal
                open={techSpecsModalOpen}
                onClose={() => setTechSpecsModalOpen(false)}
                os={os}
            />

            <ConfirmationModal {...cartConflictModalProps} />
        </Content>
    );
};

export default SharedHostingPage;
