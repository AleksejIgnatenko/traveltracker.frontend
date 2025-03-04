import React from 'react';
import '../../styles/atoms/InputBase.css';

export const InputBase = ({
    type = 'text',
    value,
    onBlur,
    onChange,
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
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`input-base ${error ? 'error' : ''}`}
            style={fullWidth ? { width: '100%' } : {}}
        />
    );
};  