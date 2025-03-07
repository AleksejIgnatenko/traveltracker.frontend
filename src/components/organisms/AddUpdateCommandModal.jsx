import React, { useState, useEffect } from 'react';
import { InputWrapper } from '../molecules/InputWrapper';
import { ButtonBase } from '../atoms/ButtonBase';
import { CloseButton } from '../atoms/CloseButton';
import '../../styles/organisms/AddUpdateCommandModal.css';

export default function AddUpdateCommandModal({ onClose, initialData, mode = 'add', onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dateIssued: ''
    });

    const [errors, setErrors] = useState({
        title: false,
        description: false,
        dateIssued: false
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
        onClose();
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
                        <h2>{mode === 'edit' ? 'Редактировать приказ' : 'Добавить приказ'}</h2>
                        <CloseButton onClick={onClose} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-inputs">
                            <InputWrapper 
                                label="Название"
                                id="title"
                                value={formData.title}
                                onBlur={handleBlur('title')}
                                onChange={handleChange('title')}
                                required
                            />
                            <InputWrapper 
                                label="Описание"
                                id="description"
                                value={formData.description}
                                onBlur={handleBlur('description')}
                                onChange={handleChange('description')}
                                required
                            />
                            <InputWrapper 
                                type="date"
                                label="Дата выдачи"
                                id="dateIssued"
                                value={formData.dateIssued}
                                onBlur={handleBlur('dateIssued')}
                                onChange={handleChange('dateIssued')}
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