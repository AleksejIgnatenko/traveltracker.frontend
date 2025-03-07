import React, { useState, useEffect } from 'react';
import { InputWrapper } from '../molecules/InputWrapper';
import { SelectWrapper } from '../molecules/SelectWrapper';
import { ButtonBase } from '../atoms/ButtonBase';
import { CloseButton } from '../atoms/CloseButton';
import '../../styles/organisms/AddUpdateCommandModal.css';

import GetAllCitiesFetchAsync from '../../api/cityController/GetAllCitiesFetchAsync';
import GetAllCommandsFetchAsync from '../../api/commandController/GetAllCommandsFetchAsync';
import GetAllEmployeesFetchAsync from '../../api/employeeController/GetAllEmployeesFetchAsync';

export default function AddUpdateTripCertificateModal({ onClose, initialData, mode = 'add', onSubmit }) {
    const [employees, setEmployees] = useState([]);
    const [commands, setCommands] = useState([]);
    const [cities, setCities] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
        commandId: '',
        cityId: '',
        startDate: '',
        endDate: ''
    });

    const [errors, setErrors] = useState({
        name: false,
        employeeId: false,
        commandId: false,
        cityId: false,
        startDate: false,
        endDate: false
    });

    useEffect(() => {
        const fetchData = async () => {
            await fetchEmployees();
            await fetchCommands();
            await fetchCities();
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

    const fetchCities = async () => {
        const items = await GetAllCitiesFetchAsync();
        const formattedItems = items.map(({ id, country, name }) => ({
            id,
            value: `${country} - ${name}`
        }));
        setCities(formattedItems);
    };

    const fetchCommands = async () => {
        const items = await GetAllCommandsFetchAsync();
        const formattedItems = items.map(({ id, title }) => ({
            id,
            value: title
        }));
        setCommands(formattedItems);
    };
    
    const fetchEmployees = async () => {
        const items = await GetAllEmployeesFetchAsync();
        const formattedItems = items.map(({ id, firstName, lastName, middleName }) => ({
            id,
            value: `${lastName} ${firstName} ${middleName}`
        }));
        setEmployees(formattedItems);
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
                        <h2>{mode === 'edit' ? 'Редактировать командировочное удостоверение' : 'Добавить командировочное удостоверение'}</h2>
                        <CloseButton onClick={onClose} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-inputs">
                            <InputWrapper 
                                label="Название"
                                id="name"
                                value={formData.name}
                                onBlur={handleBlur('name')}
                                onChange={handleChange('name')}
                                required
                            />
                            <SelectWrapper 
                                label="Сотрудник"
                                id="employeeId"
                                value={formData.employeeId}
                                onBlur={handleBlur('employeeId')}
                                onChange={handleChange('employeeId')}
                                options={employees}
                                placeholder={formData.employeeFullName ? formData.employeeFullName : 'Выберите сотрудника'}
                                required={formData.employeeFullName ? false : true}
                            />
                            <SelectWrapper 
                                label="Приказ"
                                id="commandId"
                                value={formData.commandId}
                                onBlur={handleBlur('commandId')}
                                onChange={handleChange('commandId')}
                                options={commands}
                                placeholder={formData.commandTitle ? formData.commandTitle : 'Выберите приказ'}
                                required={formData.commandTitle ? false : true}
                            />
                            <SelectWrapper 
                                label="Город"
                                id="cityId"
                                value={formData.cityId}
                                onBlur={handleBlur('cityId')}
                                onChange={handleChange('cityId')}
                                options={cities}
                                placeholder={formData.cityName ? formData.cityName : 'Выберите город'}
                                required={formData.cityName ? false : true}
                            />
                            <InputWrapper 
                                type="date"
                                label="Дата начала"
                                id="startDate"
                                value={formData.startDate}
                                onBlur={handleBlur('startDate')}
                                onChange={handleChange('startDate')}
                                required
                            />
                            <InputWrapper 
                                type="date"
                                label="Дата окончания"
                                id="endDate"
                                value={formData.endDate}
                                onBlur={handleBlur('endDate')}
                                onChange={handleChange('endDate')}
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