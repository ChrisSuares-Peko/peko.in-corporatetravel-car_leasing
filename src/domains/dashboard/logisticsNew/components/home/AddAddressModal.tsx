import { useAppSelector } from '@src/hooks/store';

import AddressFormContent from './AddressFormContent';

interface Props {
    open: boolean;
    isReceiver: boolean;
    onClose: () => void;
    onSaved?: () => void;
}

const AddAddressModal = ({ open, isReceiver, onClose, onSaved }: Props) => {
    const { shipmentType } = useAppSelector(state => state.reducer.logisticsV3);
    const isInternationalReceiver = isReceiver && shipmentType === 'international';

    if (!open) return null;

    return (
        <AddressFormContent
            isReceiver={isReceiver}
            isInternationalReceiver={isInternationalReceiver}
            onClose={onClose}
            onSaved={onSaved}
        />
    );
};

export default AddAddressModal;
