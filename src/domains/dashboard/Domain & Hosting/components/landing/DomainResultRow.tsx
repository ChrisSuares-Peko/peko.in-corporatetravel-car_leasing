import React from 'react';

import { Flex, Typography } from 'antd';

import DomainCartControl from './DomainCartControl';
import { DomainResult } from '../../types/index';

const { Text } = Typography;

interface Props {
    domain: DomainResult;
    qty: number;
    addingId: string | null;
    updatingId: string | null;
    onAdd: (domain: DomainResult) => void;
    onIncrease: (domain: DomainResult) => void;
    onDecrease: (domain: DomainResult) => void;
}

const DomainResultRow: React.FC<Props> = ({
    domain,
    qty,
    addingId,
    updatingId,
    onAdd,
    onIncrease,
    onDecrease,
}) => (
    <div className="border border-gray-200 rounded-lg py-3 px-4 sm:px-6">
        <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
            <Text className="text-base">{domain.displayDomain || domain.domain}</Text>
            <Flex align="center" gap={12}>
                {domain.price != null && (
                    <Text className="text-gray-400 text-sm">₹ {domain.price.toFixed(2)}/y</Text>
                )}
                <DomainCartControl
                    classkey={domain.classkey}
                    qty={qty}
                    addingId={addingId}
                    updatingId={updatingId}
                    onAdd={() => onAdd(domain)}
                    onIncrease={() => onIncrease(domain)}
                    onDecrease={() => onDecrease(domain)}
                />
            </Flex>
        </Flex>
    </div>
);

export default DomainResultRow;
