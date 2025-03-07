import React, { useState, useEffect } from 'react';
import { InputWrapper } from '../molecules/InputWrapper';
import { SelectWrapper } from '../molecules/SelectWrapper';
import { ButtonBase } from '../atoms/ButtonBase';
import { CloseButton } from '../atoms/CloseButton';
import '../../styles/organisms/AddUpdateCommandModal.css';

import GetAllAdvanceReportsFetchAsync from '../../api/advanceReportController/GetAllAdvanceReportsFetchAsync';
import GetAllTripExpenseTypesFetchAsync from '../../api/tripExpenseTypeController/GetAllTripExpenseTypesFetchAsync';

export default function AddUpdateTripExpenseModal({ onClose, initialData, mode = 'add', onSubmit }) {    
    const [advanceReports, setAdvanceReports] = useState([]);
    const [tripExpenseTypes, setTripExpenseTypes] = useState([]);

    const [formData, setFormData] = useState({
        advanceReportId: '',
        tripExpenseTypeId: '',
        amount: '',
        date: '',
        description: ''
    });

    const [errors, setErrors] = useState({
        advanceReportId: false,
        tripExpenseTypeId: false,
        amount: false,
        date: false,
        description: false
    });

    useEffect(() => {
        fetchAdvanceReports();
        fetchTripExpenseTypes();
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

    const fetchAdvanceReports = async () => {
        const items = await GetAllAdvanceReportsFetchAsync();

        const formattedItems = items.map(({ id, tripCertificateName }) => ({
            id,
            value: tripCertificateName
        }));
        setAdvanceReports(formattedItems);
    };

    const fetchTripExpenseTypes = async () => {
        const items = await GetAllTripExpenseTypesFetchAsync();

        const formattedItems = items.map(({ id, name }) => ({
            id,
            value: name
        }));
        setTripExpenseTypes(formattedItems);
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
                        <h2>{mode === 'edit' ? 'Редактировать статью расхода' : 'Добавить статью расхода'}</h2>
                        <CloseButton onClick={onClose} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-inputs">
                            <SelectWrapper 
                                label="Авансовый отчет"
                                id="advanceReportId"
                                value={formData.advanceReportId}
                                onBlur={handleBlur('advanceReportId')}
                                onChange={handleChange('advanceReportId')}
                                required
                                placeholder={formData.advanceReportName ? formData.advanceReportName : 'Выберите авансовый отчет'}
                                options={advanceReports}
                            />
                            <SelectWrapper 
                                label="Статья расхода"
                                id="tripExpenseTypeId"
                                value={formData.tripExpenseTypeId}
                                onBlur={handleBlur('tripExpenseTypeId')}
                                onChange={handleChange('tripExpenseTypeId')}
                                required
                                placeholder={formData.tripExpenseTypeName ? formData.tripExpenseTypeName : 'Выберите статью расхода'}
                                options={tripExpenseTypes}
                            />
                            <InputWrapper 
                                label="Сумма"
                                id="amount"
                                value={formData.amount}
                                onBlur={handleBlur('amount')}
                                onChange={handleChange('amount')}
                                required
                            />
                            <InputWrapper 
                                type="date"
                                label="Дата"
                                id="date"
                                value={formData.date}
                                onBlur={handleBlur('date')}
                                onChange={handleChange('date')}
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