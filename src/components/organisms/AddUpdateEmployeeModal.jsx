import React, { useState, useEffect } from 'react';
import { InputWrapper } from '../molecules/InputWrapper';
import { ButtonBase } from '../atoms/ButtonBase';
import { CloseButton } from '../atoms/CloseButton';
import '../../styles/organisms/AddUpdateEmployeeModal.css';

export default function AddUpdateEmployeeModal({ onClose, initialData, mode = 'add', onSubmit }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        position: '',
        department: ''
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

    const handleChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="add-update-container">
                <div className="add-update-form">
                    <div className="add-update-top-content">
                        <h2>{mode === 'edit' ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</h2>
                        <CloseButton onClick={onClose} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="add-update-inputs">
                            <InputWrapper 
                                label="Имя"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange('firstName')}
                                required
                            />
                            <InputWrapper 
                                label="Фамилия"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange('lastName')}
                                required
                            />
                            <InputWrapper 
                                label="Отчество"
                                id="middleName"
                                value={formData.middleName}
                                onChange={handleChange('middleName')}
                            />
                            <InputWrapper 
                                label="Должность"
                                id="position"
                                value={formData.position}
                                onChange={handleChange('position')}
                                required
                            />
                            <InputWrapper 
                                label="Отдел"
                                id="department"
                                value={formData.department}
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