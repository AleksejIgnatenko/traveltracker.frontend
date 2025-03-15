import React, { useState, useEffect } from 'react';
import { InputWrapper } from '../molecules/InputWrapper';
import { ButtonBase } from '../atoms/ButtonBase';
import { CloseButton } from '../atoms/CloseButton';
import '../../styles/organisms/AddUpdateEmployeeModal.css';
import ColumnNamesEnum from '../../enums/ColumnNamesEnum';

export default function AddUpdateEmployeeModal({ onClose, initialData, mode = 'add', onSubmit }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        position: '',
        department: ''
    });

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        middleName: false,
        position: false,
        department: false
    });

    useEffect(() => {
        if (initialData && mode === 'edit') {
            setFormData(initialData);
        }
    }, [initialData, mode]);

    useEffect(() => {
        const handleEscapePress = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapePress);

        return () => {
            document.removeEventListener('keydown', handleEscapePress);
        };
    }, [onClose]);

    const updateInputState = (field, input, label) => {
        if (!input.value.trim()) {
            if (input && label) {
                input.classList.add('error-input');
                label.classList.add('error-label');
                label.textContent = `${ColumnNamesEnum[field]} не может быть пустым.`; 
            }
            setErrors(prev => ({
                ...prev,
                [field]: true
            }));
        } else {
            if (input && label) {
                input.classList.remove('error-input');
                label.classList.remove('error-label');
            }
            setErrors(prev => ({
                ...prev,
                [field]: false
            }));
        }
    };
    
    const handleChange = (field) => (e) => {
        const input = e.target;
        const label = document.querySelector(`label[for="${field}"]`);
    
        setFormData(prev => ({
            ...prev,
            [field]: input.value
        }));
    
        updateInputState(field, input, label);
    };
    
    const handleBlur = (field) => (event) => {
        const input = event.target;
        const label = document.querySelector(`label[for="${field}"]`);
    
        updateInputState(field, input, label);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        // onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <div className="modal-form">
                    <div className="modal-top-content">
                        <h2>{mode === 'edit' ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</h2>
                        <CloseButton onClick={onClose} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-inputs">
                            <InputWrapper 
                                label="Имя"
                                id="firstName"
                                value={formData.firstName}
                                onBlur={handleBlur('firstName')}
                                onChange={handleChange('firstName')}
                                required
                            />
                            <InputWrapper 
                                label="Фамилия"
                                id="lastName"
                                value={formData.lastName}
                                onBlur={handleBlur('lastName')}
                                onChange={handleChange('lastName')}
                                required
                            />
                            <InputWrapper 
                                label="Отчество"
                                id="middleName"
                                value={formData.middleName}
                                onBlur={handleBlur('middleName')}
                                onChange={handleChange('middleName')}
                                required
                            />
                            <InputWrapper 
                                label="Должность"
                                id="position"
                                value={formData.position}
                                onBlur={handleBlur('position')}
                                onChange={handleChange('position')}
                                required
                            />
                            <InputWrapper 
                                label="Отдел"
                                id="department"
                                value={formData.department}
                                onBlur={handleBlur('department')}
                                onChange={handleChange('department')}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <ButtonBase type="submit">
                                {mode === 'edit' ? 'Сохранить изменения' : 'Добавить'}
                            </ButtonBase>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 