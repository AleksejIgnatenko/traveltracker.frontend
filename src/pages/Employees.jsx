import React, { useState, useMemo } from 'react';
import AddUpdateEmployeeModal from '../components/organisms/AddUpdateEmployeeModal';
import { ButtonBase } from '../components/atoms/ButtonBase';
import '../styles/pages/Employees.css';
import Toolbar from '../components/organisms/Toolbar';

export default function Employees() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([
        // Временные данные для примера
        {
            id: 1,
            firstName: 'Иван',
            lastName: 'Иванов',
            middleName: 'Иванович',
            position: 'Разработчик',
            department: 'IT'
        },
        {
            id: 2,
            firstName: 'Петр',
            lastName: 'Петров',
            middleName: 'Петрович',
            position: 'Менеджер',
            department: 'Продажи'
        }
    ]);

    const filteredEmployees = useMemo(() => {
        if (!searchTerm) return employees;
        
        const searchTermLower = searchTerm.toLowerCase();
        return employees.filter(employee => 
            employee.firstName.toLowerCase().includes(searchTermLower) ||
            employee.lastName.toLowerCase().includes(searchTermLower) ||
            employee.middleName.toLowerCase().includes(searchTermLower) ||
            employee.position.toLowerCase().includes(searchTermLower) ||
            employee.department.toLowerCase().includes(searchTermLower)
        );
    }, [employees, searchTerm]);

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedEmployee(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (employee) => {
        setModalMode('edit');
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    const handleAddEmployee = (newEmployee) => {
        setEmployees(prev => [...prev, { ...newEmployee, id: Date.now() }]);
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        setEmployees(prev => 
            prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
        );
    };

    const handleDeleteEmployee = (employeeId) => {
        setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    };

    return (
        <>
            <Toolbar
                pageTitle={"Employees"}
                setSearchTerm={setSearchTerm}
                showAddIcon={true}
                toggleCreateModalClick={handleOpenAddModal}
            />
            <div className="employees-page">
                <div className="employees-header">
                    <h1>Сотрудники</h1>
                </div>

                {employees.length === 0 ? (
                    <p className="no-items">Nothing could be found.</p>
                ) : (
                    <>
                        {filteredEmployees.length === 0 && searchTerm && (
                            <p className="no-results">По вашему запросу ничего не найдено</p>
                        )}
                        <div className="employees-list">
                            {filteredEmployees.map(employee => (
                                <div key={employee.id} className="employee-card">
                                    <div className="employee-info">
                                        <h3>{`${employee.lastName} ${employee.firstName} ${employee.middleName}`}</h3>
                                        <p>Должность: {employee.position}</p>
                                        <p>Отдел: {employee.department}</p>
                                    </div>
                                    <div className="employee-actions">
                                        <ButtonBase 
                                            onClick={() => handleOpenEditModal(employee)}
                                            variant="secondary"
                                        >
                                            Редактировать
                                        </ButtonBase>
                                        <ButtonBase 
                                            onClick={() => handleDeleteEmployee(employee.id)}
                                            variant="danger"
                                        >
                                            Удалить
                                        </ButtonBase>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {isModalOpen && (
                    <AddUpdateEmployeeModal 
                        onClose={handleCloseModal}
                        mode={modalMode}
                        initialData={selectedEmployee}
                        onSubmit={modalMode === 'add' ? handleAddEmployee : handleUpdateEmployee}
                    />
                )}
            </div>
        </>
    );
} 