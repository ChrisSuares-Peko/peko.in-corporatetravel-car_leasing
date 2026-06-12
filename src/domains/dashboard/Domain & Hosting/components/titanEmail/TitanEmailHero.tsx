import type { RefObject } from 'react';

import { Button, Typography } from 'antd';

const { Text, Title } = Typography;

const FEATURES = [
    'Custom email @yourdomain',
    'Webmail and mobile apps for iOS and Android',
    'Advanced Anti-Spam and Anti-Virus',
    'Advanced features such as Read Receipts, Email Templates, Undo Send, and much more',
    '99.9% guaranteed uptime and email deliverability',
    '24/7 support',
];

interface Props {
    plansRef: RefObject<HTMLDivElement>;
}

const TitanEmailHero = ({ plansRef }: Props) => (
    <div
        className="mb-10 flex flex-col gap-5 rounded-[30px] p-6 lg:p-[60px]"
        style={{ background: 'linear-gradient(264.69deg, rgb(240, 245, 250) 2.04%, rgb(255, 242, 242) 100.06%)' }}
    >
        <Title level={2} className="!mb-0 capitalize !text-[28px] !font-semibold !leading-normal !text-[#1f1f1f] lg:!text-[46px]">
            Titan Email
        </Title>
        <Text className="block text-[16px] font-medium leading-[40px] text-[#1f1f1f] lg:text-[24px]">
            All the essentials for looking professional, building trust, and strengthening your brand.
        </Text>
        <ul className="list-disc">
            {FEATURES.map((item, i) => (
                <li key={i} className="ms-[27px]">
                    <Text className="text-[14px] font-medium leading-[40px] text-[#1f1f1f] lg:text-[18px]">{item}</Text>
                </li>
            ))}
        </ul>
        <Button
            danger
            type="primary"
            className="h-[44px] w-[147px] rounded-[11px] border-[#d2ceff] text-[16px] font-semibold"
            onClick={() => plansRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
            Buy now
        </Button>
    </div>
);

export default TitanEmailHero;
