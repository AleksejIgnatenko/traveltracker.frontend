import React from 'react';
import '../../styles/atoms/InputBase.css';

export const InputBase = ({
    type = 'text',
    value,
    onChange,
    onBlur,
    id,
    error,
    required,
    placeholder,
    fullWidth
}) => {
    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            className={`input-base ${error ? 'error' : ''}`}
            style={fullWidth ? { width: '100%' } : {}}
        />
    );
};  