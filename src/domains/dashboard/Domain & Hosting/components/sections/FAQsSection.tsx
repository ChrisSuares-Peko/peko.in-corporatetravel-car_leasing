import { Collapse, Typography } from 'antd';

const { Title, Text } = Typography;

interface FAQ {
    question: string;
    answer: string;
}

interface FAQsSectionProps {
    hostingFaqs: FAQ[];
}

export const FAQsSection = ({ hostingFaqs }: FAQsSectionProps) => (
    <div className="mb-12 sm:mb-16 px-4 sm:px-6 py-8 sm:py-10 max-w-7xl mx-auto">
        <Title level={3} className="font-bold">
            Product FAQs
        </Title>
        <div style={{ marginTop: '20px' }} />
        <Collapse
            items={hostingFaqs.map((faq, idx) => ({
                key: idx,
                label: <span style={{ fontWeight: 600 }}>{faq.question}</span>,
                children: <Text className="text-gray-700">{faq.answer}</Text>,
            }))}
        />
    </div>
);
