import React from 'react';

import { Button, Card, Flex, Tag, Typography } from 'antd';

import DomainCartControl from './DomainCartControl';
import DomainResultRow from './DomainResultRow';
import { DomainResult } from '../../types/index';

const { Title, Text } = Typography;

interface Props {
    exactMatch: DomainResult | null;
    isDomainAvailable: boolean;
    suggestions: DomainResult[];
    otherDomains: DomainResult[];
    addingId: string | null;
    updatingId: string | null;
    getCartQty: (classkey: string) => number;
    onAdd: (domain: DomainResult) => void;
    onIncrease: (domain: DomainResult) => void;
    onDecrease: (domain: DomainResult) => void;
    onProceedToCart: () => void;
}

const DomainSearchResults: React.FC<Props> = ({
    exactMatch,
    isDomainAvailable,
    suggestions,
    otherDomains,
    addingId,
    updatingId,
    getCartQty,
    onAdd,
    onIncrease,
    onDecrease,
    onProceedToCart,
}) => (
    <>
        {exactMatch && (
            isDomainAvailable ? (
                <Card className="mb-4 border-green-400 bg-green-50 rounded-lg">
                    <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
                        <Flex align="center" gap={8}>
                            <Text strong className="text-base text-green-700">
                                {exactMatch.displayDomain || exactMatch.domain} is available
                            </Text>
                            {exactMatch.isPremium && <Tag color="gold">Premium</Tag>}
                        </Flex>
                        <Flex align="center" gap={16} wrap="wrap">
                            <Text className="text-gray-500 text-sm">
                                {exactMatch.price ? `₹ ${exactMatch.price.toFixed(2)}/y` : 'Price on request'}
                            </Text>
                            <DomainCartControl
                                classkey={exactMatch.classkey}
                                qty={getCartQty(exactMatch.classkey)}
                                addingId={addingId}
                                updatingId={updatingId}
                                onAdd={() => onAdd(exactMatch)}
                                onIncrease={() => onIncrease(exactMatch)}
                                onDecrease={() => onDecrease(exactMatch)}
                                primary
                            />
                        </Flex>
                    </Flex>
                </Card>
            ) : (
                <div className="mb-4 border border-red-200 bg-red-50 rounded-lg py-3 px-4">
                    <Text className="text-red-400 text-sm">{exactMatch.displayDomain || exactMatch.domain} is not available</Text>
                </div>
            )
        )}

        {suggestions.length > 0 && (
            <div className="mb-8">
                <div style={{ paddingTop: 16, paddingBottom: 12 }}>
                    <Title level={5} style={{ margin: 0 }}>
                        {isDomainAvailable ? 'Popular Choices' : 'Suggestion'}
                    </Title>
                </div>
                <Flex vertical gap={8}>
                    {suggestions.map(domain => (
                        <DomainResultRow
                            key={domain.domain}
                            domain={domain}
                            qty={getCartQty(domain.classkey)}
                            addingId={addingId}
                            updatingId={updatingId}
                            onAdd={onAdd}
                            onIncrease={onIncrease}
                            onDecrease={onDecrease}
                        />
                    ))}
                </Flex>
            </div>
        )}

        {otherDomains.length > 0 && (
            <div className="mb-6">
                <div style={{ paddingTop: 16, paddingBottom: 12 }}>
                    <Title level={5} style={{ margin: 0 }}>Other Available Domains</Title>
                </div>
                <Flex vertical gap={8}>
                    {otherDomains.map(domain => (
                        <DomainResultRow
                            key={domain.domain}
                            domain={domain}
                            qty={getCartQty(domain.classkey)}
                            addingId={addingId}
                            updatingId={updatingId}
                            onAdd={onAdd}
                            onIncrease={onIncrease}
                            onDecrease={onDecrease}
                        />
                    ))}
                </Flex>
            </div>
        )}

        <Flex justify="end" className="mt-8 mb-4">
            <Button
                type="primary"
                size="large"
                className="bg-[#F0655B] border-[#F0655B] px-12"
                onClick={onProceedToCart}
            >
                Proceed to Cart
            </Button>
        </Flex>
    </>
);

export default DomainSearchResults;
