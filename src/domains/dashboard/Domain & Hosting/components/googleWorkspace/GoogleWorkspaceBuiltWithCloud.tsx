import { useState } from 'react';

import { Flex, Image, Typography } from 'antd';

import google_sym from '../../assets/svg/google_sym.svg';
import googleworkspaceIcon from '../../assets/svg/googleworkspaceIcon.svg';
import noAdvatisement from '../../assets/svg/noAdvatisement.svg';
import realtimeIcon from '../../assets/svg/realtimeIcon.svg';
import securedByGoogle from '../../assets/svg/securedByGoogle.svg';
import support_24_7 from '../../assets/svg/support.svg';
import workFromAnywhere from '../../assets/svg/workFromAnywhere.svg';

const { Text } = Typography;

const TABS = [
    {
        icon: <Image src={googleworkspaceIcon} alt="5TB Cloud Storage" width={34} height={34} preview={false} />,
        label: 'Google workspace with\n5TB storage',
        detail: {
            title: 'Google Workspace with 5TB Storage',
            desc: "Powered by Google's Cloud platform, get 5TB storage across all your Google Workspace apps is an integral part of how Google enables collaboration. You can stop worrying about running out of space and enjoy unfettered access to all your work from the Cloud. Available only with the Enterprise plans.",
        },
    },
    {
        icon: <Image src={realtimeIcon} alt="real-time collaboration" width={34} height={34} preview={false} />,
        label: 'Real-time\nCollaboration',
        detail: {
            title: 'Real-time Collaboration',
            desc: 'Work together in real time with your team on documents, spreadsheets, and presentations. Everyone can make changes and see them instantly, no matter where they are.',
        },
    },
    {
        icon: <Image src={workFromAnywhere} alt="work from anywhere" width={34} height={34} preview={false} />,
        label: 'Work from\nanywhere',
        detail: {
            title: 'Work from Anywhere',
            desc: 'Access your work from any device, anywhere in the world. Google Workspace apps work seamlessly on desktop, tablet, and mobile so you can stay productive on the go.',
        },
    },
    {
        icon: <Image src={securedByGoogle} alt="security" width={34} height={34} preview={false} />,
        label: 'Secured by\nGoogle',
        detail: {
            title: 'Secured by Google',
            desc: "Google's best-in-class security protects your data with industry-leading encryption, two-step verification, and advanced admin controls to keep your business safe.",
        },
    },
    {
        icon: <Image src={support_24_7} alt="24X7 support" width={34} height={34} preview={false} />,
        label: '24X7 Support',
        detail: {
            title: '24X7 Support',
            desc: 'Get round-the-clock support from Google Workspace experts. Our dedicated support team is available 24 hours a day, 7 days a week to help you resolve any issues.',
        },
    },
    {
        icon: <Image src={noAdvatisement} alt="no advertisement" width={34} height={34} preview={false} />,
        label: 'No advertisement',
        detail: {
            title: 'No Advertisement',
            desc: 'Google Workspace is completely ad-free. Your data is never used for advertising purposes, ensuring a clean, professional experience for you and your team.',
        },
    },
];

const GoogleWorkspaceBuiltWithCloud = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="mt-[50px]">
            <Typography.Title className="!mb-5 !mt-0 !text-[28px] !font-semibold !leading-[38px] !text-[#1e293b]">
                Google Workspace Built with Google Cloud
            </Typography.Title>
            <Flex vertical gap={12}>
                <Flex gap={0} className="overflow-x-auto">
                    {TABS.map((tab, i) => (
                        <Flex
                            key={i}
                            vertical
                            align="center"
                            flex={1}
                            className={`cursor-pointer px-2 pb-[10px] pt-[10px] text-center ${activeTab === i ? 'border-b-2 border-[#ff4f4f]' : ''}`}
                            gap={6}
                            onClick={() => setActiveTab(i)}
                        >
                            <span>{tab.icon}</span>
                            <Text className="whitespace-pre-line text-[11px] leading-4 text-[#1e293b] lg:text-[14px] lg:leading-[26px]">
                                {tab.label}
                            </Text>
                        </Flex>
                    ))}
                </Flex>

                <Flex
                    justify="space-between"
                    align="center"
                    gap={16}
                    className="rounded-[28px] bg-white px-6 py-8 shadow-[0px_2px_20px_0px_rgba(0,0,0,0.06)] lg:px-[50px] lg:py-[60px]"
                >
                    <Flex vertical gap={10} style={{ flex: 1 }}>
                        <Text className="text-[18px] font-medium leading-[38px] text-[#1E293B] lg:text-[24px]">
                            {TABS[activeTab].detail.title}
                        </Text>
                        <Text className="text-[13px] leading-[28px] text-[#6f6c8f] lg:text-[18px]">
                            {TABS[activeTab].detail.desc}
                        </Text>
                    </Flex>
                    {activeTab === 0 && (
                        <Image src={google_sym} alt="5TB Cloud Storage" width={148} height={148} preview={false} />
                    )}
                </Flex>
            </Flex>
        </div>
    );
};

export default GoogleWorkspaceBuiltWithCloud;
