import { Button, Card, Divider, Flex, Typography } from 'antd';

const { Text, Title } = Typography;

interface OrderSummaryProps {
    countries?: string[];
    quantities?: Record<string, number>;
    selectedPlans?: Record<string, any>;
    onBuyNow?: () => void;
    disabled?: boolean;
}

const OrderSummaryCard = ({
    countries = [],
    quantities = {},
    selectedPlans = {},
    onBuyNow,
    disabled,
}: OrderSummaryProps) => {
    const primaryCountry = countries[0];
    const primaryPlan = primaryCountry ? selectedPlans[primaryCountry] : null;
    const emptyValue = 'N/A';
    const destinationText = countries.length > 0 ? countries.join(', ') : emptyValue;
    const planText =
        countries
            .map(country => {
                const plan = selectedPlans[country];

                if (!plan) return null;
                return `${country}: ${plan.dataGB} GB - ${plan.validityDays} Days`;
            })
            .filter(Boolean)
            .join(', ') || emptyValue;
    const totalQuantity = countries.reduce((sum, country) => sum + (quantities[country] ?? 1), 0);

    const networkSpeeds = Array.from(
        new Set(
            countries.flatMap(country => {
                const plan = selectedPlans[country];
                return parseNetworks(plan?.networks).flatMap(
                    (network: any) => network.supportedRats || []
                );
            })
        )
    );

    const grandTotal = countries.reduce((sum, country) => {
        const plan = selectedPlans[country];
        const qty = quantities[country] ?? 1;

        if (!plan?.price) return sum;
        return sum + plan.price * qty;
    }, 0);
    const currency = primaryPlan?.currency || '₹';

    return (
        <Card className="esim-order-summary-card rounded-[22px]">
            <Title level={4} className="!mb-5 !text-[18px] !font-semibold">
                Order Summary
            </Title>

            <Flex vertical gap={14}>
                <SummaryRow label="Destination" value={destinationText} />
                <SummaryRow label="Plan" value={planText} />
                <SummaryRow
                    label="Network Speed"
                    value={networkSpeeds.length > 0 ? networkSpeeds.join(', ') : emptyValue}
                />
                <SummaryRow
                    label="Quantity"
                    value={totalQuantity > 0 ? String(totalQuantity) : emptyValue}
                />
            </Flex>

            <Divider className="!my-5" />

            <Flex justify="space-between" align="center" className="mb-5">
                <Text strong className="text-[16px] text-[#171717]">
                    Total
                </Text>
                <Title level={3} className="!mb-0 !text-[18px] !font-semibold text-[#171717]">
                    {countries.length > 0 ? `${currency} ${grandTotal.toFixed(2)}` : emptyValue}
                </Title>
            </Flex>

            <Button
                type="primary"
                danger
                block
                size="large"
                disabled={disabled}
                onClick={onBuyNow}
                className="esim-buy-btn"
            >
                Buy Now
            </Button>
        </Card>
    );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
    <Flex justify="space-between" align="start" gap={12}>
        <Text type="secondary" className="text-[14px]">
            {label}
        </Text>
        <Text strong className="max-w-[180px] text-right text-[14px] text-[#171717]">
            {value}
        </Text>
    </Flex>
);

const parseNetworks = (networks?: string | any[]): any[] => {
    if (Array.isArray(networks)) return networks;
    if (typeof networks === 'string') {
        try {
            const parsed = JSON.parse(networks);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return [];
};

export default OrderSummaryCard;
