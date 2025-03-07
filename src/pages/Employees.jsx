import React, { useState, useMemo, useEffect } from 'react';
import AddUpdateEmployeeModal from '../components/organisms/AddUpdateEmployeeModal';
import { ButtonBase } from '../components/atoms/ButtonBase';
import '../styles/pages/Employees.css';
import Toolbar from '../components/organisms/Toolbar';
import Table from '../components/organisms/Table';
import FilterModal from '../components/organisms/FilterModal';
import Loader from '../components/organisms/Loader';

import GetAllEmployeesFetchAsync from '../api/employeeController/GetAllEmployeesFetchAsync';
import CreateEmployeeControllerFetchAsync from '../api/employeeController/CreateEmployeeControllerFetchAsync';
import UpdateEmployeeFetchAsync from '../api/employeeController/UpdateEmployeeFetchAsync';
import DeleteEmployeeFetchAsync from '../api/employeeController/DeleteEmployeeFetchAsync';

export default function Employees() {
    const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const filterFields = [
        { field: 'position', label: 'Должность' },
        { field: 'department', label: 'Отдел' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // const items = [
                //     // Временные данные для примера
                //     {
                //         id: 1,
                //         firstName: 'Иван',
                //         lastName: 'Иванов',
                //         middleName: 'Иванович',
                //         position: 'Разработчик',
                //         department: 'IT'
                //     },
                //     {
                //         id: 2,
                //         firstName: 'Петр',
                //         lastName: 'Петров',
                //         middleName: 'Петрович',
                //         position: 'Менеджер',
                //         department: 'Продажи'
                //     }
                // ]

                await fetchEmployees();
                setIsLoading(false);
            } catch (error) {
                console.error('Error services:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredEmployees = searchTerm
            ? employees.filter(employee =>
                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.department.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : employees;

            const formattedItems = filteredEmployees.map(({ id, firstName, lastName, middleName, position, department }) => ({
                id,
                firstName,
                lastName,
                middleName,
                position,
                department,
                linkBusinessTrips: `/trip-certificates/employee/${id}`
            }));
    
        setFilteredEmployees(formattedItems);
    }, [employees, searchTerm]);

    const fetchEmployees = async () => {
        const items = await GetAllEmployeesFetchAsync();

        const formattedItems = items.map(({ id, firstName, lastName, middleName, position, department }) => ({
            id,
            firstName,
            lastName,
            middleName,
            position,
            department,
            linkBusinessTrips: `/trip-certificates/employee/${id}`
        }));

        setEmployees(formattedItems);
        setFilteredEmployees(formattedItems);
    };

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedEmployee(null);
        setIsAddUpdateModalOpen(true);
    };

    const handleOpenEditModal = (employee) => {
        setModalMode('edit');
        setSelectedEmployee(employee);
        setIsAddUpdateModalOpen(true);
    };

    const handleAddUpdateCloseModal = () => {
        setIsAddUpdateModalOpen(false);
        setSelectedEmployee(null);
    };

    const handleAddEmployee = async (newEmployee) => {
        await CreateEmployeeControllerFetchAsync(newEmployee);
        await fetchEmployees();
    };

    const handleUpdateEmployee = async (updatedEmployee) => {
        await UpdateEmployeeFetchAsync(updatedEmployee);
        await fetchEmployees();
    };

    const handleDeleteEmployee = async (employeeId) => {
        await DeleteEmployeeFetchAsync(employeeId);
        await fetchEmployees(); 
    };
    
    const handleFilterOpenCloseModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleApplyFilter = (filteredItems, appliedFilters) => {
        const formattedItems = filteredItems.map(({ id, firstName, lastName, middleName, position, department }) => ({
            id,
            firstName,
            lastName,
            middleName,
            position,
            department,
            linkBusinessTrips: `/trip-certificates/employee/${id}`
        }));

        setFilteredEmployees(formattedItems);
        setActiveFilters(appliedFilters);
    };

    return (
        <>
            <Toolbar
                pageTitle="Сотрудники"
                setSearchTerm={setSearchTerm}
                showAddIcon={true}
                toggleCreateModalClick={handleOpenAddModal}
                showFilterIcon={true}
                toggleFilterModalClick={handleFilterOpenCloseModal}
            />
            {isLoading && <Loader />}
            {!isLoading && (
            <div className="employees-page">    

                    {employees.length === 0 ? (
                    <p className="no-items">Сотрудники не найдены.</p>
                    ) : (
                    <>
                        {filteredEmployees.length === 0 && (
                            <p className="no-items">Ничего не найдено.</p>
                        )}
                        {filteredEmployees.length > 0 && (
                            <div className="employees-table">
                                <Table 
                                    items={filteredEmployees.map(item => ({
                                        ...item,
                                        actions: (
                                            <div className="table-actions">
                                                <ButtonBase 
                                                    onClick={() => handleOpenEditModal(item)}
                                                    variant="primary"
                                                >
                                                    Редактировать
                                                </ButtonBase>
                                                <ButtonBase 
                                                    onClick={() => handleDeleteEmployee(item.id)}
                                                    variant="danger"
                                                >
                                                    Удалить
                                                </ButtonBase>
                                            </div>
                                        )
                                    }))}
                                />
                            </div>
                        )}
                    </>
                )}

                {isAddUpdateModalOpen && (
                    <AddUpdateEmployeeModal 
                        onClose={handleAddUpdateCloseModal}
                        mode={modalMode}
                        initialData={selectedEmployee}
                        onSubmit={modalMode === 'add' ? handleAddEmployee : handleUpdateEmployee}
                    />
                )}

                {isFilterModalOpen && (
                    <FilterModal
                        onClose={() => setIsFilterModalOpen(false)}
                        items={employees}
                        filterFields={filterFields}
                        onApplySort={handleApplyFilter}
                        initialFilters={activeFilters}
                    />
                )}
            </div>
            )}
        </>
    );
} 