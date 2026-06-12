import React from 'react';

import { Flex, Typography } from 'antd';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const { Text, Title } = Typography;

const spendData = [
  { name: 'IT', value: 35, color: '#ff4d4f' },
  { name: 'Facilities', value: 28, color: '#4096ff' },
  { name: 'Services', value: 20, color: '#722ed1' },
  { name: 'Marketing', value: 10, color: '#ffa940' },
  { name: 'Other', value: 7, color: '#52c41a' },
];

const SpendByCategory: React.FC = () => (
  <div className="rounded-xl p-4 bg-white border border-gray-100 h-full">
    {/* Header */}
    <Title level={5} className="!mb-1">
      Spend by Category
    </Title>
    <Text className="text-xs text-gray-400 block mb-3 mt-1">
      Hover a segment to inspect category share.
    </Text>

    {/* Content */}
    <Flex align="center" gap={24}>
      {/* Chart */}
      <div style={{ position: 'relative', width: 150, height: 150, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spendData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={65}
              dataKey="value"
              strokeWidth={0}
            >
              {spendData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v: any) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 10, color: '#999' }}>Total</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>
            INR 4.8M
          </div>
        </div>
      </div>

      {/* Legend */}
      <Flex vertical gap={14} style={{ flex: 1, minWidth: 0 }}>
        {spendData.map((item) => (
          <Flex
            key={item.name}
            align="center"
            justify="space-between"
            style={{ width: '100%' }}
          >
            {/* Left: dot + label */}
            <Flex align="center" gap={10}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: item.color,
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <Text className="text-xs text-gray-600 whitespace-nowrap">{item.name}</Text>
            </Flex>

            {/* Right: percentage */}
            <Text className="text-xs font-medium text-gray-700 whitespace-nowrap">
              {item.value}%
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </div>
);

export default SpendByCategory;