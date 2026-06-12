import React from 'react';

import { Button } from 'antd';

interface Props {
    classkey: string;
    qty: number;
    addingId: string | null;
    updatingId: string | null;
    onAdd: () => void;
    onIncrease: () => void;
    onDecrease: () => void;
    primary?: boolean;
}

const DomainCartControl: React.FC<Props> = ({
    classkey,
    qty,
    addingId,
    updatingId,
    onAdd,
    onIncrease,
    onDecrease,
    primary = false,
}) => primary ? (
        <Button
            type="primary"
            className="bg-[#F0655B] border-[#F0655B]"
            loading={addingId === classkey}
            onClick={onAdd}
        >
            Add to cart
        </Button>
    ) : (
        <Button
            size="small"
            className="border-red-400 text-red-400 w-24"
            loading={addingId === classkey}
            onClick={onAdd}
        >
            Add to cart
        </Button>
    );

export default DomainCartControl;
