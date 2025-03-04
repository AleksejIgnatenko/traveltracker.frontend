import React, { useState, useMemo, useEffect } from 'react';
import { ButtonBase } from '../components/atoms/ButtonBase';
import '../styles/pages/Cities.css';
import Toolbar from '../components/organisms/Toolbar';
import Table from '../components/organisms/Table';
// import FilterModal from '../components/organisms/FilterModal';
import AddUpdateTravelExpenseTypyModal from '../components/organisms/AddUpdateTravelExpenseTypyModal';

export default function TravelExpenseTypes() {
    const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
    // const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedTravelExpenseType, setSelectedTravelExpenseType] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [travelExpenseTypes, setTravelExpenseTypes] = useState([]);
    const [filteredTravelExpenseTypes, setFilteredTravelExpenseTypes] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});

    // const filterFields = [
    //     { field: 'name', label: 'Название' },
    // ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = [
                    // Временные данные для примера
                    {
                        id: 1,
                        name: 'Еда',
                    },
                    {
                        id: 2,
                        name: 'Проезд',
                    }
                ]

                setTravelExpenseTypes(items);
            } catch (error) {
                console.error('Error services:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredTravelExpenseTypes = searchTerm
            ? travelExpenseTypes.filter(travelExpenseType =>
                travelExpenseType.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : travelExpenseTypes;
    
        setFilteredTravelExpenseTypes(filteredTravelExpenseTypes);
    }, [travelExpenseTypes, searchTerm]);

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedTravelExpenseType(null);
        setIsAddUpdateModalOpen(true);
    };

    const handleOpenEditModal = (TravelExpenseType) => {
        setModalMode('edit');
        setSelectedTravelExpenseType(TravelExpenseType);
        setIsAddUpdateModalOpen(true);
    };

    const handleAddUpdateCloseModal = () => {
        setIsAddUpdateModalOpen(false);
        setSelectedTravelExpenseType(null);
    };

    const handleAddTravelExpenseType = (newTravelExpenseType) => {
        setTravelExpenseTypes(prev => [...prev, { ...newTravelExpenseType, id: Date.now() }]);
    };

    const handleUpdateTravelExpenseType = (updatedTravelExpenseType) => {
        setTravelExpenseTypes(prev => 
            prev.map(emp => emp.id === updatedTravelExpenseType.id ? updatedTravelExpenseType : emp)
        );
    };

    const handleDeleteTravelExpenseType = (travelExpenseTypeId) => {
        setTravelExpenseTypes(prev => prev.filter(emp => emp.id !== travelExpenseTypeId));
    };
    
    // const handleFilterOpenCloseModal = () => {
    //     setIsFilterModalOpen(!isFilterModalOpen);
    // };

    const handleApplyFilter = (filteredItems, appliedFilters) => {
        setFilteredTravelExpenseTypes(filteredItems);
        setActiveFilters(appliedFilters);
    };

    return (
        <>
            <Toolbar
                pageTitle="Статьи расходов"
                setSearchTerm={setSearchTerm}
                showAddIcon={true}
                toggleCreateModalClick={handleOpenAddModal}
                // showFilterIcon={true}
                // toggleFilterModalClick={handleFilterOpenCloseModal}
            />
            <div className="Citys-page">    

            {travelExpenseTypes.length === 0 ? (
            <p className="no-items">Статьи расходов не найдены.</p>
            ) : (
            <>
                {filteredTravelExpenseTypes.length === 0 && (
                    <p className="no-items">Ничего не найдено.</p>
                )}
                {filteredTravelExpenseTypes.length > 0 && (
                    <div className="TravelExpenseTypes-table">
                        <Table 
                            items={filteredTravelExpenseTypes.map(emp => ({
                                ...emp,
                                actions: (
                                    <div className="table-actions">
                                        <ButtonBase 
                                            onClick={() => handleOpenEditModal(emp)}
                                            variant="primary"
                                        >
                                            Редактировать
                                        </ButtonBase>
                                        <ButtonBase 
                                            onClick={() => handleDeleteTravelExpenseType(emp.id)}
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
                    <AddUpdateTravelExpenseTypyModal 
                        onClose={handleAddUpdateCloseModal}
                        mode={modalMode}
                        initialData={selectedTravelExpenseType}
                        onSubmit={modalMode === 'add' ? handleAddTravelExpenseType : handleUpdateTravelExpenseType}
                    />
                )}

                {/* {isFilterModalOpen && (
                    <FilterModal
                        onClose={() => setIsFilterModalOpen(false)}
                        items={travelExpenseTypes}
                        filterFields={filterFields}
                        onApplySort={handleApplyFilter}
                        initialFilters={activeFilters}
                    />
                )} */}
            </div>
        </>
    );
} 