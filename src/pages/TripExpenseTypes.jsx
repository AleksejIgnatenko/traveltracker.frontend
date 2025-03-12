import React, { useState, useEffect } from 'react';
import { ButtonBase } from '../components/atoms/ButtonBase';
import '../styles/pages/TripExpenseTypes.css';
import Toolbar from '../components/organisms/Toolbar';
import Table from '../components/organisms/Table';
import FilterModal from '../components/organisms/FilterModal';
import Loader from '../components/organisms/Loader';
import AddUpdateTripExpenseTypeModal from '../components/organisms/AddUpdateTripExpenseTypeModal';

import CreateTripExpenseTypeFetchAsync from '../api/tripExpenseTypeController/CreateTripExpenseTypeFetchAsync';
import GetAllTripExpenseTypeFetchAsync from '../api/tripExpenseTypeController/GetAllTripExpenseTypesFetchAsync';
import UpdateTripExpenseTypeFetchAsync from '../api/tripExpenseTypeController/UpdateTripExpenseTypeFetchAsync';
import DeleteTripExpenseTypeFetchAsync from '../api/tripExpenseTypeController/DeleteTripExpenseTypeFetchAsync';
import ExportTripExpenseTypesToExcelFetchAsync from '../api/tripExpenseTypeController/ExportTripExpenseTypesToExcelFetchAsync';
export default function TripExpenseTypes() {
    const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedTripExpenseType, setSelectedTripExpenseType] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [tripExpenseTypes, setTripExpenseTypes] = useState([]);
    const [filteredTripExpenseTypes, setFilteredTripExpenseTypes] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const filterFields = [
        { field: 'standard', label: 'Норма' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // const items = [
                //     // Временные данные для примера
                //     {
                //         id: 1,
                //         name: "Проживание",
                //         standard: 1000,
                //     },
                //     {
                //         id: 2,
                //         name: "Еда",
                //         standard: 500,
                //     },
                
                // ]

                await fetchTripExpenseTypes();
                setIsLoading(false);
            } catch (error) {
                console.error('Error services:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredTripExpenseTypes = searchTerm
            ? tripExpenseTypes.filter(tripExpenseType =>
                tripExpenseType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tripExpenseType.standard.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
            : tripExpenseTypes;

            const formattedItems = filteredTripExpenseTypes.map(({ id, name, standard }) => ({
                id,
                name,
                standard,
                linkTripExpense: `/trip-expenses/trip-expense-type/${id}`
            }));
    
        setFilteredTripExpenseTypes(formattedItems);
    }, [tripExpenseTypes, searchTerm]);

    const fetchTripExpenseTypes = async () => {
        const items = await GetAllTripExpenseTypeFetchAsync();
    
        const formattedItems = items.map(({ id, name, standard }) => ({
            id,
            name,
            standard,
            linkTripExpense: `/trip-expenses/trip-expense-type/${id}`
        }));
    
        setTripExpenseTypes(items);
        setFilteredTripExpenseTypes(formattedItems);
    };

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedTripExpenseType(null);
        setIsAddUpdateModalOpen(true);
    };

    const handleOpenEditModal = (tripExpenseType) => {
        setModalMode('edit');
        setSelectedTripExpenseType(tripExpenseTypes.find(item => item.id === tripExpenseType.id));
        setIsAddUpdateModalOpen(true);
    };

    const handleAddUpdateCloseModal = () => {
        setIsAddUpdateModalOpen(false);
        setSelectedTripExpenseType(null);
    };

    const handleAddTripExpenseType = async (newTripExpenseType) => {
        await CreateTripExpenseTypeFetchAsync(newTripExpenseType);
        await fetchTripExpenseTypes();
    };

    const handleUpdateTripExpenseType = async (updatedTripExpenseType) => {
        await UpdateTripExpenseTypeFetchAsync(updatedTripExpenseType);
        await fetchTripExpenseTypes();
    };

    const handleDeleteTripExpenseType = async (tripExpenseTypeId) => {
        await DeleteTripExpenseTypeFetchAsync(tripExpenseTypeId);
        await fetchTripExpenseTypes();
    };
    
    const handleFilterOpenCloseModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleApplyFilter = (filteredItems, appliedFilters) => {
        const formattedItems = filteredItems.map(({ id, name, standard }) => ({
            id,
            name,
            standard,
            linkTripExpense: `/trip-expenses/trip-expense-type/${id}`
        }));
        setFilteredTripExpenseTypes(formattedItems);
        setActiveFilters(appliedFilters);
    };

    const handleExportExcel = async () => {
        await ExportTripExpenseTypesToExcelFetchAsync();
    };

    return (
        <>
            <Toolbar
                pageTitle="Статьи расходов"
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

            {tripExpenseTypes.length === 0 ? (
            <p className="no-items">Статьи расходов не найдены.</p>
            ) : (
            <>
                {filteredTripExpenseTypes.length === 0 && (
                    <p className="no-items">Ничего не найдено.</p>
                )}
                {filteredTripExpenseTypes.length > 0 && (
                    <div className="trip-expense-types-table">
                        <Table 
                            items={filteredTripExpenseTypes.map(item => ({
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
                                            onClick={() => handleDeleteTripExpenseType(item.id)}
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
                    <AddUpdateTripExpenseTypeModal 
                        onClose={handleAddUpdateCloseModal}
                        mode={modalMode}
                        initialData={selectedTripExpenseType}
                        onSubmit={modalMode === 'add' ? handleAddTripExpenseType : handleUpdateTripExpenseType}
                    />
                )}

                {isFilterModalOpen && (
                    <FilterModal
                        onClose={() => setIsFilterModalOpen(false)}
                        items={tripExpenseTypes}
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