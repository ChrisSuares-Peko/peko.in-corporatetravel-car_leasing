import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PlanDetails from '../../../components/settings/PlanDetails';

const mockPurchaseData = {
    billingType: 'monthly',
    subscriptionAmountPaid: 500,
    maxLimit: 100,
    status: 'active',
    subscriptionStartDate: '2023-01-01',
    subscriptionEndDate: '2023-12-31',
    package: {
        packageName: 'Basic Plan',
    },
    isCustom: 0,
};

describe('PlanDetails Component', () => {
    it('renders the component correctly', () => {
        render(<PlanDetails purchaseData={mockPurchaseData} />);

        // Check if the plan name is rendered
        expect(screen.getByText('Basic Plan - Monthly')).toBeInTheDocument();

        // Check if total amount is displayed
        expect(screen.getByText(/AED 500/i)).toBeInTheDocument();

        // Check if total eSign is displayed
        expect(screen.getByText('100')).toBeInTheDocument();

        // Check if status is displayed
        expect(screen.getByText('Active')).toBeInTheDocument();

        // Check if billing cycle is displayed
        expect(screen.getByText('Monthly')).toBeInTheDocument();
    });

    it('renders add-on package correctly', () => {
        const customData = { ...mockPurchaseData, isCustom: 1 };
        render(<PlanDetails purchaseData={customData} />);

        expect(screen.getByText('Basic Plan - Add on')).toBeInTheDocument();
    });

    it('renders group subscription correctly', () => {
        render(<PlanDetails purchaseData={mockPurchaseData} isGroupSubscription />);

        expect(screen.getByText('eSign (Basic Plan)')).toBeInTheDocument();
    });
});
