import React from 'react';

import { UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Select, Typography,Image } from 'antd';

import newRFQsIcon from '../../../assets/icons/newRFQsIcon.svg';

const { Text } = Typography;

export const vendorsList = [
    { value: 'v1', label: 'Al Futtaim Logistics LLC',  email: 'tariq@alfuttaim-logistics.ae' },
    { value: 'v2', label: 'Al Futtaim Agency 2.0',     email: 'info@alfuttaim-agency.ae'     },
    { value: 'v3', label: 'Al Futtaim Agency 3.0',     email: 'sales@alfuttaim-agency3.ae'   },
    { value: 'v4', label: 'Triton IT Solutions',        email: 'procurement@triton-it.ae'     },
    { value: 'v5', label: 'Emitac Digital Solutions',   email: 'rfq@emitac.ae'                },
];

type Vendor = typeof vendorsList[number];

type Props = {
    selectedVendors: Vendor[];
    setSelectedVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
    setShowAddVendor: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectVendors: React.FC<Props> = ({ selectedVendors, setSelectedVendors, setShowAddVendor }) => {
    const addVendor = (value: string) => {
        const vendor = vendorsList.find(v => v.value === value);
        if (vendor && !selectedVendors.find(v => v.value === value)) {
            setSelectedVendors(prev => [...prev, vendor]);
        }
    };


    return (
        <Card className="rounded-xl mb-4" styles={{ body: { padding: '20px 24px' } }}>
            {/* Header */}
            <Flex gap={10} align="center" className="mb-4">
                <Flex
                    align="center"
                    justify="center"
                    className="shrink-0 text-sm rounded-lg"
                    style={{ width: 28, height: 28, background: '#fff1f0' }}
                >
                     <Image src={newRFQsIcon} alt="New RFQ" width={16} height={16} preview={false} />
                </Flex>
                <Flex vertical>
                    <Text strong className="text-sm">Select Vendors</Text>
                    <Text className="text-xs text-gray-400">Choose which vendors will receive this request</Text>
                </Flex>
            </Flex>

            {/* Invited supplier list box */}
            <Card className="rounded-lg mb-0" styles={{ body: { padding: '12px 16px' } }}>
                <Flex justify="space-between" align="center" className="mb-3">
                    <Flex vertical>
                        <Text strong className="text-sm">Invited supplier list</Text>
                        <Text className="text-xs text-gray-400">
                            Add a vendor without losing your RFQ draft, then return here to include them
                        </Text>
                    </Flex>
                    <Button
                        size="small"
                        danger
                        icon={<UserAddOutlined />}
                        onClick={() => setShowAddVendor(v => !v)}
                        className="rounded-lg flex-shrink-0"
                    >
                        Add Vendor
                    </Button>
                </Flex>

                <Select
                    placeholder="Select suppliers"
                    className="w-full"
                    onChange={(value: string) => { addVendor(value); }}
                    options={vendorsList
                        .filter(v => !selectedVendors.find(s => s.value === v.value))
                        .map(v => ({ value: v.value, label: v.label }))}
                />

              
            </Card>
        </Card>
    );
};

export default SelectVendors;
