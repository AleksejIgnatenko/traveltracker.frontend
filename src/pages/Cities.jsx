import React, { useState, useEffect } from 'react';
import { ButtonBase } from '../components/atoms/ButtonBase';
import '../styles/pages/Cities.css';
import Toolbar from '../components/organisms/Toolbar';
import Table from '../components/organisms/Table';
import FilterModal from '../components/organisms/FilterModal';
import AddUpdateCityModal from '../components/organisms/AddUpdateCityModal';
import GetAllCitiesFetchAsync from '../api/cityController/GetAllCitiesFetchAsync';
import CreateCityFetchAsync from '../api/cityController/CreateCityFetchAsync';
import UpdateCityFetchAsync from '../api/cityController/UpdateCityFetchAsync';
import DeleteCityFetchAsync from '../api/cityController/DeleteCityFetchAsync';

export default function Cities() {
    const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});

    const filterFields = [
        { field: 'country', label: 'Страна' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const items = [
                //     // Временные данные для примера
                //     {
                //         id: 1,
                //         country: 'Россия',
                //         name: 'Москва',
                //     },
                //     {
                //         id: 2,
                //         country: 'Белорусь',
                //         name: 'Минск',
                //     }
                // ]

                await fetchCities();
            } catch (error) {
                console.error('Error services:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredCities = searchTerm
            ? cities.filter(city =>
                city.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                city.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : cities;

        const formattedDoctors = filteredCities.map(({id, country, name}) => ({
            id,
            country,
            name,
            linkBusinessTrips: `businessTrips/$cityId=${id}`
        }))
    
        setFilteredCities(formattedDoctors);
    }, [cities, searchTerm]);

    const fetchCities = async () => {
        const items = await GetAllCitiesFetchAsync();
    
        const formattedItems = items.map(({ id, country, name }) => ({
            id,
            country,
            name,
            linkBusinessTrips: `businessTrips/$cityId=${id}`
        }));
    
        setCities(formattedItems);
        setFilteredCities(formattedItems);
    };

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedCity(null);
        setIsAddUpdateModalOpen(true);
    };

    const handleOpenEditModal = (city) => {
        setModalMode('edit');
        setSelectedCity(city);
        setIsAddUpdateModalOpen(true);
    };

    const handleAddUpdateCloseModal = () => {
        setIsAddUpdateModalOpen(false);
        setSelectedCity(null);
    };

    const handleAddCity = async (newCity) => {
        await CreateCityFetchAsync(newCity);
        await fetchCities();
    };

    const handleUpdateCity = async (updatedCity) => {
        await UpdateCityFetchAsync(updatedCity);
        await fetchCities();
    };

    const handleDeleteCity = async (cityId) => {
        await DeleteCityFetchAsync(cityId);
        await fetchCities();
    };
    
    const handleFilterOpenCloseModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleApplyFilter = (filteredItems, appliedFilters) => {
        setFilteredCities(filteredItems);
        setActiveFilters(appliedFilters);
    };

    return (
        <>
            <Toolbar
                pageTitle="Города"
                setSearchTerm={setSearchTerm}
                showAddIcon={true}
                toggleCreateModalClick={handleOpenAddModal}
                showFilterIcon={true}
                toggleFilterModalClick={handleFilterOpenCloseModal}
            />
            <div className="Citys-page">    

            {cities.length === 0 ? (
            <p className="no-items">Города не найдены.</p>
            ) : (
            <>
                {filteredCities.length === 0 && (
                    <p className="no-items">Ничего не найдено.</p>
                )}
                {filteredCities.length > 0 && (
                    <div className="Citys-table">
                        <Table 
                            items={filteredCities.map(emp => ({
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
                                            onClick={() => handleDeleteCity(emp.id)}
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
                    <AddUpdateCityModal 
                        onClose={handleAddUpdateCloseModal}
                        mode={modalMode}
                        initialData={selectedCity}
                        onSubmit={modalMode === 'add' ? handleAddCity : handleUpdateCity}
                    />
                )}

                {isFilterModalOpen && (
                    <FilterModal
                        onClose={() => setIsFilterModalOpen(false)}
                        items={cities}
                        filterFields={filterFields}
                        onApplySort={handleApplyFilter}
                        initialFilters={activeFilters}
                    />
                )}
            </div>
        </>
    );
} 