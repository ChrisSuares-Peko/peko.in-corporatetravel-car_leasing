import { ItemValues } from '../types/createInvoice';

export const computeNetAmount = (item: ItemValues): number => {
    const qty = parseFloat(item.quantity) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    const discount = parseFloat(item.discount) || 0;
    const taxRate = parseFloat(item.taxRate) || 0;
    const sub = qty * unitPrice;
    const discAmt = sub * (discount / 100);
    const taxAmt = (sub - discAmt) * (taxRate / 100);
    return sub - discAmt + taxAmt;
};

export const calcSubtotal = (items: ItemValues[]): string =>
    items
        .reduce((acc, item) => acc + (parseFloat(item.unitPrice) * parseFloat(item.quantity) || 0), 0)
        .toFixed(2);

export const calcTax = (items: ItemValues[]): string =>
    items
        .reduce((acc, item) => {
            const sub = (parseFloat(item.unitPrice) || 0) * (parseFloat(item.quantity) || 0);
            return acc + sub * ((parseFloat(item.taxRate) || 0) / 100);
        }, 0)
        .toFixed(2);

export const calcDiscount = (items: ItemValues[]): string =>
    items
        .reduce((acc, item) => {
            const sub = (parseFloat(item.unitPrice) || 0) * (parseFloat(item.quantity) || 0);
            return acc + sub * ((parseFloat(item.discount) || 0) / 100);
        }, 0)
        .toFixed(2);

export const calcTotal = (items: ItemValues[], shipping: string): string =>
    (items.reduce((acc, item) => acc + computeNetAmount(item), 0) + Number(shipping || 0)).toFixed(
        2
    );

export const calcAmountDue = (total: string, paid: string): string =>
    (parseFloat(total) - Number(paid || 0)).toFixed(2);
