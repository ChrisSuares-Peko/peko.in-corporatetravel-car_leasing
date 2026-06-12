import { useEffect, useState } from 'react';

import { Col, Row, Skeleton } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

import ConfirmationModal from '@src/components/molecular/modals/ConfirmationModal';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';

import DomainSearchHero from '../components/landing/DomainSearchHero';
import DomainSearchResults from '../components/landing/DomainSearchResults';
import HostingServicesGrid from '../components/landing/HostingServicesGrid';
import LandingPageHeader from '../components/landing/LandingPageHeader';
import useHostingServices from '../hooks/useHostingServices';
import useSearchDomains from '../hooks/useSearchDomains';
import useServiceCart from '../hooks/useServiceCart';
import { DomainResult } from '../types/index';
import { services } from '../utils/data';

const LandingPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [addingId, setAddingId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { handleSearch, handleClear, isLoading } = useSearchDomains();
    const { fetchCart, handleAddToCart, handleUpdateCart, handleRemoveFromCart, cartConflictModalProps } = useServiceCart();
    const { services: liveServices, isLoading: isServicesLoading } = useHostingServices();

    const searchResults = useAppSelector(state => state.reducer.domainHosting.searchResults);
    const cartData = useAppSelector(state => state.reducer.domainHosting.cartData);

    const cartBadgeCount = cartData?.items?.reduce((sum, i) => sum + (i.productQuantity ?? 1), 0) ?? 0;

    const userTypedTld = searchQuery.includes('.');
    const exactMatch = userTypedTld ? (searchResults?.exactMatch?.[0] ?? null) : null;
    const suggestions = searchResults?.suggestions ?? [];
    const otherDomains: DomainResult[] = searchResults?.premium ?? [];
    const isDomainAvailable = !!exactMatch?.available;
    const heroTitle =
        searchResults && !isDomainAvailable ? 'Search for Your Domain Today' : "Let's Get Your Business Online";

    const apiPlanTypes = new Set(liveServices.map(s => s.planType));
    const visibleServices = services.filter(s => apiPlanTypes.has(s.planType));
    const colSpan = visibleServices.length >= 4 ? 6 : 8;
    const startingPriceMap = Object.fromEntries(
        liveServices.filter(s => s.startingPrice != null).map(s => [s.planType, s.startingPrice as number]),
    );

    useEffect(() => {
        fetchCart();
        return () => {
            handleClear();
        };
    }, [fetchCart, handleClear]);

    const onSearch = () => {
        if (!searchQuery.trim()) {
            dispatch(showToast({ variant: 'warning', description: 'Domain name is required' }));
            return;
        }
        handleSearch(searchQuery);
    };

    const onReset = () => {
        setSearchQuery('');
        handleClear();
    };

    const getCartQty = (classkey: string) =>
        cartData?.items?.find(i => i.productId === classkey)?.productQuantity ?? 0;

    const onAdd = async (domain: DomainResult) => {
        setAddingId(domain.classkey);
        const result = await handleAddToCart({ itemType: 'domain', productId: domain.classkey, productName: domain.domain });
        if (result) dispatch(showToast({ variant: 'success', description: `${domain.domain} has been added to your cart!` }));
        setAddingId(null);
    };

    const onIncrease = async (domain: DomainResult) => {
        setUpdatingId(domain.classkey);
        await handleUpdateCart(domain.classkey, 'increase');
        setUpdatingId(null);
    };

    const onDecrease = async (domain: DomainResult) => {
        setUpdatingId(domain.classkey);
        if (getCartQty(domain.classkey) <= 1) {
            await handleRemoveFromCart(domain.classkey);
        } else {
            await handleUpdateCart(domain.classkey, 'decrease');
        }
        setUpdatingId(null);
    };

    return (
        <Content className="px-4 py-4 sm:px-6 sm:py-6 bg-white min-h-screen">
            <LandingPageHeader
                cartBadgeCount={cartBadgeCount}
                onOrderHistory={() => navigate(paths.domainHosting.manageSubscription)}
                onCart={() => navigate(paths.domainHosting.cart)}
            />

            <DomainSearchHero
                searchQuery={searchQuery}
                isLoading={isLoading}
                hasResults={!!searchResults}
                heroTitle={heroTitle}
                onSearchChange={setSearchQuery}
                onSearch={onSearch}
                onReset={onReset}
            />

            {!isLoading && searchResults && (
                <DomainSearchResults
                    exactMatch={exactMatch}
                    isDomainAvailable={isDomainAvailable}
                    suggestions={suggestions}
                    otherDomains={otherDomains}
                    addingId={addingId}
                    updatingId={updatingId}
                    getCartQty={getCartQty}
                    onAdd={onAdd}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onProceedToCart={() => navigate(paths.domainHosting.cart)}
                />
            )}

            {!searchResults && !isLoading && (
                isServicesLoading ? (
                    <Row gutter={[16, 16]} justify="center">
                        {[1, 2, 3, 4].map(i => (
                            <Col xs={24} sm={12} lg={colSpan} key={i}>
                                <Skeleton active />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <HostingServicesGrid
                        visibleServices={visibleServices}
                        startingPriceMap={startingPriceMap}
                        colSpan={colSpan}
                        onNavigate={navigate}
                    />
                )
            )}
            <ConfirmationModal {...cartConflictModalProps} />
        </Content>
    );
};

export default LandingPage;
