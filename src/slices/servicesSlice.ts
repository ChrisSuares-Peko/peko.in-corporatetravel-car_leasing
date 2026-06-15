import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ServicesListResponse } from '@customtypes/general';

interface ApiState {
    services: ServicesListResponse | null;
}

const initialState: ApiState = {
    services: {
        data: [
            { label: 'Dashboard',             serviceCategory: 'Dashboard',             hasAccess: true, services: [], subServices: [] },
            { label: 'Mobile Recharge',       serviceCategory: 'Mobile Recharge',       hasAccess: true, services: [], subServices: [] },
            { label: 'Bill Payments',         serviceCategory: 'Bill Payments',         hasAccess: true, services: [], subServices: [] },
            { label: 'Corporate Travel',      serviceCategory: 'Corporate Travel',      hasAccess: true, services: [], subServices: [] },
            { label: 'Payroll',               serviceCategory: 'Payroll',               hasAccess: true, services: [], subServices: [] },
            { label: 'Vendor Payouts',        serviceCategory: 'Vendor Payouts',        hasAccess: true, services: [], subServices: [] },
            { label: 'Payouts',               serviceCategory: 'Payouts',               hasAccess: true, services: [], subServices: [] },
            { label: 'Office Supplies',       serviceCategory: 'Office Supplies',       hasAccess: true, services: [], subServices: [] },
            { label: 'Softwares',             serviceCategory: 'Softwares',             hasAccess: true, services: [], subServices: [] },
            { label: 'Logistics',             serviceCategory: 'Logistics',             hasAccess: true, services: [], subServices: [] },
            { label: 'Gift Cards',            serviceCategory: 'Gift Cards',            hasAccess: true, services: [], subServices: [] },
            { label: 'Marketplace',           serviceCategory: 'Marketplace',           hasAccess: true, services: [], subServices: [] },
            { label: 'Invoicing',             serviceCategory: 'Invoicing',             hasAccess: true, services: [], subServices: [] },
            { label: 'Verification Suite',    serviceCategory: 'Verification Suite',    hasAccess: true, services: [], subServices: [] },
            { label: 'Accounting & Tax',      serviceCategory: 'Accounting & Tax',      hasAccess: true, services: [], subServices: [] },
            { label: 'Insurance',             serviceCategory: 'Insurance',             hasAccess: true, services: [], subServices: [] },
            { label: 'Works',                 serviceCategory: 'Works',                 hasAccess: true, services: [], subServices: [] },
            { label: 'Hub',                   serviceCategory: 'Hub',                   hasAccess: true, services: [], subServices: [] },
            { label: 'WhatsApp for Business', serviceCategory: 'WhatsApp for Business', hasAccess: true, services: [], subServices: [] },
            { label: 'Turbo',                 serviceCategory: 'Turbo',                 hasAccess: true, services: [], subServices: [] },
            { label: 'Corporate Card',        serviceCategory: 'Corporate Card',        hasAccess: true, services: [], subServices: [] },
            { label: 'Domain & Hosting',      serviceCategory: 'Domain & Hosting',      hasAccess: true, services: [], subServices: [] },
            { label: 'Payment Links',         serviceCategory: 'Payment Links',         hasAccess: true, services: [], subServices: [] },
            { label: 'Procure',               serviceCategory: 'Procure',               hasAccess: true, services: [], subServices: [] },
            { label: 'More Services',         serviceCategory: 'More Services',         hasAccess: true, services: [], subServices: [] },
            { label: 'Car Rentals',           serviceCategory: 'Car Rentals',           hasAccess: true, services: [], subServices: [] },
            { label: 'Reports',               serviceCategory: 'Reports',               hasAccess: true, services: [], subServices: [] },
            { label: 'Need Help',             serviceCategory: 'Need Help',             hasAccess: true, services: [], subServices: [] },
            { label: 'Settings',              serviceCategory: 'Settings',              hasAccess: true, services: [], subServices: [] },
        ],
    },
};

export const userSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServices: (state, action: PayloadAction<Partial<ApiState>>) => {
            state = { ...state, ...action.payload };
            return state;
        },
    },
});

export const { setServices } = userSlice.actions;

export default userSlice.reducer;
