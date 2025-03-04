import React from 'react';
import '../../styles/molecules/InputWrapper.css';
import { InputBase } from '../atoms/InputBase';
import { LabelBase } from '../atoms/LabelBase';

export const InputWrapper = ({ 
    type = 'text',
    value,
    onBlur, 
    onChange,
    label,
    id,
    error,
    required,
}) => {

    return (
        <div className={`input-wrapper`}>
            <InputBase
                type={type}
                id={id}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder=" "
                required={required}
                error={error}
                fullWidth
            />
            <LabelBase htmlFor={id} error={error}>
                {label}
            </LabelBase>
        </div>
    );
}; 