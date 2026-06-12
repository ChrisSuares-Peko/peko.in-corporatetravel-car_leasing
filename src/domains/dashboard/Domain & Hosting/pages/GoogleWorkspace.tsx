import { useRef } from 'react';

import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

import ConfirmationModal from '@src/components/molecular/modals/ConfirmationModal';
import { paths } from '@src/routes/paths';

import GoogleWorkspaceBuiltWithCloud from '../components/googleWorkspace/GoogleWorkspaceBuiltWithCloud';
import GoogleWorkspaceHero from '../components/googleWorkspace/GoogleWorkspaceHero';
import GoogleWorkspacePlans from '../components/googleWorkspace/GoogleWorkspacePlans';
import GoogleWorkspaceProductInfo from '../components/googleWorkspace/GoogleWorkspaceProductInfo';
import GoogleWorkspaceWhyChoose from '../components/googleWorkspace/GoogleWorkspaceWhyChoose';
import useHostingPlans from '../hooks/useHostingPlans';
import useServiceCart from '../hooks/useServiceCart';

const GoogleWorkspacePage = () => {
    const navigate = useNavigate();
    const { plans, isLoading } = useHostingPlans('google_workspace');
    const { handleAddToCart, cartConflictModalProps } = useServiceCart();
    const plansRef = useRef<HTMLDivElement>(null);

    const onPurchase = async (
        productId: string,
        planId: string,
        planName: string,
        billingCycle: number
    ) => {
        const result = await handleAddToCart({
            itemType: 'google_workspace',
            productId,
            planId,
            productName: planName,
            seats: 1,
            billingCycle,
        });
        if (result) navigate(`${paths.dashboard.domainHosting}/${paths.domainHosting.cart}`);
    };

    return (
        <Content className="min-h-screen bg-white">
            <GoogleWorkspaceHero plans={plans} />
            <GoogleWorkspacePlans plansRef={plansRef} plans={plans} isLoading={isLoading} onPurchase={onPurchase} />
            <GoogleWorkspaceWhyChoose />
            <GoogleWorkspaceBuiltWithCloud />
            <GoogleWorkspaceProductInfo plansRef={plansRef} />
            <ConfirmationModal {...cartConflictModalProps} />
        </Content>
    );
};

export default GoogleWorkspacePage;
