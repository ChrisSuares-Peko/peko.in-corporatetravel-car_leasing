export const IMAGE_MIME_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];
export const IMAGE_ACCEPT = '.png,.jpg,.jpeg,.svg';
export const IMAGE_TYPES_LABEL = 'PNG, JPG or SVG';

export const DOCUMENT_TYPE_OPTIONS = [
    { label: 'Invoice', value: 'Invoice' },
    { label: 'Quotation', value: 'Quotation' },
    { label: 'Sales Order', value: 'Sales Order' },
    { label: 'Agreement', value: 'Agreement' },
];

export const DEFAULT_DOCUMENT_PREFIXES: Record<string, string> = {
    Invoice: 'INV',
    Quotation: 'QO',
    'Sales Order': 'SO',
    Agreement: 'AGR',
};
