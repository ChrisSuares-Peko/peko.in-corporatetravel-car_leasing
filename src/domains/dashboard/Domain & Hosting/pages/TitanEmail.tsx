import { useRef } from 'react';

import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

import ConfirmationModal from '@src/components/molecular/modals/ConfirmationModal';
import { paths } from '@src/routes/paths';

import TitanEmailEnterprisePlan from '../components/titanEmail/TitanEmailEnterprisePlan';
import TitanEmailHero from '../components/titanEmail/TitanEmailHero';
import TitanEmailPlans from '../components/titanEmail/TitanEmailPlans';
import TitanEmailPowerfulTools from '../components/titanEmail/TitanEmailPowerfulTools';
import TitanEmailProductInfo from '../components/titanEmail/TitanEmailProductInfo';
import TitanEmailWhatYouGet from '../components/titanEmail/TitanEmailWhatYouGet';
import useHostingPlans from '../hooks/useHostingPlans';
import useServiceCart from '../hooks/useServiceCart';

const TitanEmailPage = () => {
    const navigate = useNavigate();
    const plansRef = useRef<HTMLDivElement>(null);
    const { plans, isLoading } = useHostingPlans('titan_email');
    const { handleAddToCart, cartConflictModalProps } = useServiceCart();

    const onAddToCart = async (productId: string, planId: string, planName: string) => {
        const result = await handleAddToCart({
            itemType: 'titan_email',
            productId,
            planId,
            productName: planName,
            accounts: 1,
            billingCycle: 1,
        });
        if (result) navigate(`${paths.dashboard.domainHosting}/${paths.domainHosting.cart}`);
    };

    return (
        <Content className="min-h-screen bg-white px-4 py-6 lg:px-6">
            <TitanEmailHero plansRef={plansRef} />
            <TitanEmailPlans plansRef={plansRef} plans={plans} isLoading={isLoading} onAddToCart={onAddToCart} />
            <TitanEmailWhatYouGet />
            <TitanEmailPowerfulTools />
            <TitanEmailEnterprisePlan />
            <TitanEmailProductInfo plansRef={plansRef} />
            <ConfirmationModal {...cartConflictModalProps} />
        </Content>
    );
};

export default TitanEmailPage;
