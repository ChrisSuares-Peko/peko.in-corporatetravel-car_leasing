import React from 'react';

import { Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import newPurchaseOrder from '../../assets/icons/newPurchaseOrder.svg';
import newPurchaseReq from '../../assets/icons/newPurchaseReq.svg';
import newRFQIcon from '../../assets/icons/newRFQIcon.svg';
import newVendorIcon from '../../assets/icons/newVendorIcon.svg';

const { Title, Text } = Typography;

const CreateSomethingNew: React.FC = () => {
  const navigate = useNavigate();
  const go = (sub: string) => navigate(`${paths.dashboard.procure}/${sub}`);

  const items = [
    { label: 'New Purchase Request', path: `${paths.procure.purchaseRequests.index}/${paths.procure.purchaseRequests.create}`, icon: newPurchaseReq },
    { label: 'New RFQ', path: `${paths.procure.rfq.index}/${paths.procure.rfq.create}`, icon: newRFQIcon },
    { label: 'New Purchase Order', path: `${paths.procure.purchaseOrders.index}/${paths.procure.purchaseOrders.create}`, icon: newPurchaseOrder },
    { label: 'Add Vendor', path: `${paths.procure.vendor.index}/${paths.procure.vendor.create}`, icon: newVendorIcon },
  ];

  return (
    <Space direction="vertical" className="!w-full" size={4}>
      <Title level={5} className="!mb-0">
        Create something new
      </Title>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => go(item.path)}
            className="min-h-[45px] rounded-[10px] border border-[#ff4d4f] bg-white flex items-center justify-start px-2 gap-2 w-full cursor-pointer hover:bg-red-50 transition-colors"
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5 flex-shrink-0" />
            <Text className="!text-black !text-xs text-left leading-tight">{item.label}</Text>
          </button>
        ))}
      </div>
    </Space>
  );
};

export default CreateSomethingNew;
