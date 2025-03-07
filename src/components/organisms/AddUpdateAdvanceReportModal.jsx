import React, { useState, useEffect } from 'react';
import { InputWrapper } from '../molecules/InputWrapper';
import { SelectWrapper } from '../molecules/SelectWrapper';
import { ButtonBase } from '../atoms/ButtonBase';
import { CloseButton } from '../atoms/CloseButton';
import '../../styles/organisms/AddUpdateCommandModal.css';

import GetAllTripCertificatesFetchAsync from '../../api/tripCertificateController/GetAllTripCertificatesFetchAsync';

export default function AddUpdateCommandModal({ onClose, initialData, mode = 'add', onSubmit }) {
    const [tripCertificates, setTripCertificates] = useState([]);

    const [formData, setFormData] = useState({
        tripCertificateId: '',
        dateOfDelivery: ''
    });

    const [errors, setErrors] = useState({
        tripCertificateId: false,
        dateOfDelivery: false
    });

    useEffect(() => {
        const fetchData = async () => {
            await fetchTripCertificates();
        };
        fetchData();
    }, []);

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

    const fetchTripCertificates = async () => {
        const items = await GetAllTripCertificatesFetchAsync();
        
        const formattedItems = items.map(({ id, name }) => ({
            id,
            value: name,
        }));

        setTripCertificates(formattedItems);
    };

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
                        <h2>{mode === 'edit' ? 'Редактировать авансовый отчет' : 'Добавить авансовый отчет'}</h2>
                        <CloseButton onClick={onClose} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-inputs">
                            <SelectWrapper 
                                value={formData.tripCertificateId}
                                onBlur={handleBlur('tripCertificateId')}
                                onChange={handleChange('tripCertificateId')}
                                label="Командировочное удостоверение"
                                id="tripCertificateId"
                                placeholder={formData.tripCertificateName ? formData.tripCertificateName : 'Выберите командировочное удостоверение'}
                                options={tripCertificates}
                            />
                            <InputWrapper 
                                type="date"
                                label="Дата сдачи"
                                id="dateOfDelivery"
                                value={formData.dateOfDelivery}
                                onBlur={handleBlur('dateOfDelivery')}
                                onChange={handleChange('dateOfDelivery')}
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