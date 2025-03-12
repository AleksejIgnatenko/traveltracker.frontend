import React, { useState, useEffect } from 'react';
import { ButtonBase } from '../components/atoms/ButtonBase';
import '../styles/pages/TripExpenses.css';
import Toolbar from '../components/organisms/Toolbar';
import Table from '../components/organisms/Table';
import FilterModal from '../components/organisms/FilterModal';
import Loader from '../components/organisms/Loader';
import AddUpdateTripExpenseModal from '../components/organisms/AddUpdateTripExpenseModal';
import { useParams } from 'react-router-dom';

import CreateTripExpenseFetchAsync from '../api/tripExpenseController/CreateTripExpenseFetchAsync';
import GetAllTripExpenseFetchAsync from '../api/tripExpenseController/GetAllTripExpensesFetchAsync';
import GetTripExpenseByAdvanceReportIdFetchAsync from '../api/tripExpenseController/GetTripExpenseByAdvanceReportIdFetchAsync';
import GetTripExpenseByTripExpenseTypeIdFetchAsync from '../api/tripExpenseController/GetTripExpenseByTripExpenseTypeIdFetchAsync';
import UpdateTripExpenseFetchAsync from '../api/tripExpenseController/UpdateTripExpenseFetchAsync';
import DeleteTripExpenseFetchAsync from '../api/tripExpenseController/DeleteTripExpenseFetchAsync';
import ExportTripExpensesToExcelFetchAsync from '../api/tripExpenseController/ExportTripExpensesToExcelFetchAsync';

export default function TripExpenses() {
    const { type, id } = useParams();

    const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedTripExpense, setSelectedTripExpense] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [tripExpenses, setTripExpenses] = useState([]);
    const [filteredTripExpenses, setFilteredTripExpenses] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const filterFields = [
        { field: 'date', label: 'Дата' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // const items = [
                //     // Временные данные для примера
                //     {
                //         id: 1,
                //         advanceReportId: 1,
                //         tripExpenseTypeId: 1,
                //         tripExpenseTypeName: "Проживание",
                //         amount: 1000,
                //         date: "2024-01-01",
                //         description: "Описание расхода",
                //     },
                //     {
                //         id: 1,
                //         advanceReportId: 2,
                //         tripExpenseTypeId: 2,
                //         tripExpenseTypeName: "Еда",
                //         amount: 500,
                //         date: "2024-01-01",
                //         description: "Описание расхода",
                //     },
                
                // ]

                if (type === 'advance-report') {
                    await fetchTripExpenses('advanceReportId', id);
                } else if (type === 'trip-expense-type') {
                    await fetchTripExpenses('tripExpenseTypeId', id);
                } else {
                    await fetchTripExpenses();
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error services:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredTripExpenses = searchTerm
            ? tripExpenses.filter(tripExpense =>
                tripExpense.tripExpenseTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tripExpense.amount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                tripExpense.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tripExpense.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : tripExpenses;

            const formattedItems = filteredTripExpenses.map(({ id, tripExpenseTypeName, amount, date, description }) => ({
                id,
                tripExpenseTypeName,
                amount,
                date,
                description,
            }));
    
        setFilteredTripExpenses(formattedItems);
    }, [tripExpenses, searchTerm]);

    const fetchTripExpenses = async (type, id) => {
        let items;
        if (type === 'advanceReportId') {
            items = await GetTripExpenseByAdvanceReportIdFetchAsync(id);
        } else if (type === 'tripExpenseTypeId') {
            items = await GetTripExpenseByTripExpenseTypeIdFetchAsync(id);
        } else {
            items = await GetAllTripExpenseFetchAsync();
        }
    
        const formattedItems = items.map(({ id, tripExpenseTypeName, amount, date, description }) => ({
            id,
            tripExpenseTypeName,
            amount,
            date,
            description,
        }));
    
        setTripExpenses(items);
        setFilteredTripExpenses(formattedItems);
    };

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedTripExpense(null);
        setIsAddUpdateModalOpen(true);
    };

    const handleOpenEditModal = (tripExpense) => {
        setModalMode('edit');
        setSelectedTripExpense(tripExpenses.find(item => item.id === tripExpense.id));
        setIsAddUpdateModalOpen(true);
    };

    const handleAddUpdateCloseModal = () => {
        setIsAddUpdateModalOpen(false);
        setSelectedTripExpense(null);
    };

    const handleAddTripExpense = async (newTripExpense) => {
        await CreateTripExpenseFetchAsync(newTripExpense);
        await fetchTripExpenses();
    };

    const handleUpdateTripExpense = async (updatedTripExpense) => {
        await UpdateTripExpenseFetchAsync(updatedTripExpense);
        await fetchTripExpenses();
    };

    const handleDeleteTripExpense = async (tripExpenseId) => {
        await DeleteTripExpenseFetchAsync(tripExpenseId);
        await fetchTripExpenses();
    };
    
    const handleFilterOpenCloseModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleApplyFilter = (filteredItems, appliedFilters) => {
        const formattedItems = filteredItems.map(({ id, tripExpenseTypeName, amount, date, description }) => ({
            id,
            tripExpenseTypeName,
            amount,
            date,
            description,
        }));
        
        setFilteredTripExpenses(formattedItems);
        setActiveFilters(appliedFilters);
    };

    const handleExportExcel = async () => {
        await ExportTripExpensesToExcelFetchAsync();
    };

    return (
        <>
            <Toolbar
                pageTitle="Расходы по командировкам"
                setSearchTerm={setSearchTerm}
                showAddIcon={true}
                toggleCreateModalClick={handleOpenAddModal}
                showFilterIcon={true}
                toggleFilterModalClick={handleFilterOpenCloseModal}
                showExcelIcon={true}
                toggleExcelClick={handleExportExcel}
            />
            {isLoading && <Loader />}
            {!isLoading && (
            <div className="cities-page">    

            {tripExpenses.length === 0 ? (
            <p className="no-items">Расходы по командировкам не найдены.</p>
            ) : (
            <>
                {filteredTripExpenses.length === 0 && (
                    <p className="no-items">Ничего не найдено.</p>
                )}
                {filteredTripExpenses.length > 0 && (
                    <div className="trip-expense-types-table">
                        <Table 
                            items={filteredTripExpenses.map(item => ({
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
                                            onClick={() => handleDeleteTripExpense(item.id)}
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
                    <AddUpdateTripExpenseModal 
                        onClose={handleAddUpdateCloseModal}
                        mode={modalMode}
                        initialData={selectedTripExpense}
                        onSubmit={modalMode === 'add' ? handleAddTripExpense : handleUpdateTripExpense}
                    />
                )}

                {isFilterModalOpen && (
                    <FilterModal
                        onClose={() => setIsFilterModalOpen(false)}
                        items={tripExpenses}
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