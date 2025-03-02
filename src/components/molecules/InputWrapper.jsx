import React from 'react';
import '../../styles/molecules/InputWrapper.css';
import { InputBase } from '../atoms/InputBase';
import { LabelBase } from '../atoms/LabelBase';

export const InputWrapper = ({ 
    type = 'text',
    value,
    onChange,
    label,
    id,
    error,
    required,
    onBlur 
}) => {
    const handleBlur = (e) => {
        if (onBlur) {
            onBlur(e);
        }
    };

    return (
        <div className={`input-wrapper`}>
            <InputBase
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
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