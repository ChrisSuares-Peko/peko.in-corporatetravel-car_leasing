import { Form, Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Field, FieldProps } from 'formik';

import useScreenSize from '@src/hooks/useScreenSize';

interface TextAreaProps {
    name: string;
    label?: string;
    placeholder: string;
    size?: SizeType;
    isDisabled?: boolean;
    isRequired?: boolean;
    maxLength?: number;
    minLength?: number;
    minRows?: number;
    showCount?: boolean;
}

const TextAreaInput: React.FC<TextAreaProps> = ({
    name,
    label,
    placeholder,
    size,
    isDisabled,
    isRequired,
    maxLength,
    minLength,
    minRows = 2,
    showCount = false,
}) => 
    {
    const { sm } = useScreenSize();
        return(
    <Field name={name}>
        {({ field, form: { touched, errors } }: FieldProps) => (
            <Form.Item
                label={label}
                required={isRequired}
                validateStatus={touched[name] && errors[name] ? 'error' : ''}
                help={touched[name] && errors[name] ? (errors[name] as React.ReactNode) : undefined}
            >
                <Input.TextArea
                    {...field}
                    id={name}
                    size={size ?? 'middle'}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    maxLength={maxLength}
                    minLength={minLength}
                    autoSize={{ minRows }}
                    showCount={sm && showCount}
                />
            </Form.Item>
        )}
    </Field>
)};

export default TextAreaInput;
