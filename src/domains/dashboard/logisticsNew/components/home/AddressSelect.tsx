import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Select, Typography } from 'antd';

interface AddressSelectProps {
    label: string;
    options: { label: string; value: string }[];
    value: string | undefined;
    onChange: (val: string) => void;
    onClear: () => void;
    onAddNew: () => void;
    error?: string;
    touched?: boolean;
}

const AddressSelect = ({
    label,
    options,
    value,
    onChange,
    onClear,
    onAddNew,
    error,
    touched,
}: AddressSelectProps) => (
    <Col xs={24} sm={12} xl={4} className="relative pb-[28px]">
        <Form.Item
            label={<span className="text-[11px] text-gray-600 font-medium">{label}<span className="text-red-500 ml-0.5">*</span></span>}
            validateStatus={touched && error ? 'error' : ''}
            help={touched && error ? error : undefined}
            className="mb-0"
        >
            <Select
                showSearch
                placeholder={<span className="text-xs">{`Select ${label}`}</span>}
                value={value || undefined}
                options={options}
                allowClear
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                onChange={onChange}
                onClear={onClear}
                className="w-full"
                optionRender={option => {
                    let address1 = '';
                    try { address1 = JSON.parse(option.value as string)?.address1 ?? ''; } catch { /* empty */ }
                    return (
                        <div>
                            <div className="text-sm font-medium">{option.label}</div>
                            {address1 && (
                                <Typography.Text className="text-xs" type="secondary">{address1}</Typography.Text>
                            )}
                        </div>
                    );
                }}
            />
        </Form.Item>
        <Button
            type="default"
            size="small"
            icon={<PlusOutlined />}
            className="text-xs mt-1.5"
            onClick={onAddNew}
        >
            Add New Address
        </Button>
    </Col>
);

export default AddressSelect;
