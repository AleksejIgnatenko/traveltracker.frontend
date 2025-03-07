import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ButtonBase } from '../components/atoms/ButtonBase';
import '../styles/pages/TripCertificates.css';
import Toolbar from '../components/organisms/Toolbar';
import Table from '../components/organisms/Table';
import FilterModal from '../components/organisms/FilterModal';
import Loader from '../components/organisms/Loader';
import AddUpdateTripCertificateModal from '../components/organisms/AddUpdateTripCertificateModal';

import CreateTripCertificateFetchAsync from '../api/tripCertificateController/CreateTripCertificateFetchAsync';
import GetAllTripCertificatesFetchAsync from '../api/tripCertificateController/GetAllTripCertificatesFetchAsync';
import GetTripCertificateByEmployeeIdFetchAsync from '../api/tripCertificateController/GetTripCertificateByEmployeeIdFetchAsync';
import GetTripCertificateByCityIdFetchAsync from '../api/tripCertificateController/GetTripCertificateByCityIdFetchAsync';
import GetTripCertificateByCommandIdFetchAsync from '../api/tripCertificateController/GetTripCertificateByCommandIdFetchAsync';
import UpdateTripCertificateFetchAsync from '../api/tripCertificateController/UpdateTripCertificateFetchAsync';
import DeleteTripCertificateFetchAsync from '../api/tripCertificateController/DeleteTripCertificateFetchAsync';
export default function TripCertificates() {
    const { type, id } = useParams();

    const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedTripCertificate, setSelectedTripCertificate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [tripCertificates, setTripCertificates] = useState([]);
    const [filteredTripCertificates, setFilteredTripCertificates] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const filterFields = [
        { field: 'employeeFullName', label: 'Сотрудник' },
        { field: 'commandTitle', label: 'Приказ' },
        { field: 'cityName', label: 'Город' },
        { field: 'startDate', label: 'Дата начала' },
        { field: 'endDate', label: 'Дата окончания' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // const items = [
                //     // Временные данные для примера
                //     {
                //         id: 1,
                //         employeeId: 1,
                //         employeeFullName: 'Иванов Иван Иванович',
                //         commandId: 1,
                //         commandTitle: 'Приказ №1',
                //         cityId: 1,
                //         cityName: 'Москва',
                //         startDate: '2024-01-01',
                //         endDate: '2024-01-05',
                //     },
                //     {
                //         id: 2,
                //         employeeId: 2,
                //         employeeFullName: 'Петров Петр Петрович',
                //         commandId: 2,
                //         commandTitle: 'Приказ №2',
                //         cityId: 2,
                //         cityName: 'Санкт-Петербург',
                //         startDate: '2024-01-06',
                //         endDate: '2024-01-10',
                //     }
                
                // ]
                
                if (id) {
                     if (type === 'employee') {
                        await fetchTripCertificates('employeeId', id);
                    } else if (type === 'city') {
                        await fetchTripCertificates('cityId', id);
                    } else if (type === 'command') {
                        await fetchTripCertificates('commandId', id);
                    }
                } else {
                    await fetchTripCertificates();
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error services:', error);
            }
        };

        fetchData();
    },  []);


    useEffect(() => {
        const filteredTripCertificates = searchTerm
            ? tripCertificates.filter(tripCertificate =>
                tripCertificate.employeeFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tripCertificate.commandTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tripCertificate.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tripCertificate.startDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tripCertificate.endDate.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : tripCertificates;

            const formattedItems = filteredTripCertificates.map(({ id, name, employeeFullName, commandTitle, cityName, startDate, endDate }) => ({
                id,
                name,
                employeeFullName,
                commandTitle, 
                cityName,
                startDate,
                endDate,
                linkAdvanceReport: `/advance-reports/trip-certificate/${id}`
            }));
    
        setFilteredTripCertificates(formattedItems);
    }, [tripCertificates, searchTerm]);

    const fetchTripCertificates = async (type, id) => {
        let items;  
        if (type === 'employeeId') {
            items = await GetTripCertificateByEmployeeIdFetchAsync(id);
        } else if (type === 'cityId') {
            items = await GetTripCertificateByCityIdFetchAsync(id);
        } else if (type === 'commandId') {
            items = await GetTripCertificateByCommandIdFetchAsync(id);
        } else {
            items = await GetAllTripCertificatesFetchAsync();
        }
    
        const formattedItems = items.map(({ id, name, employeeFullName, commandTitle, cityName, startDate, endDate }) => ({
            id,
            name,
            employeeFullName,
            commandTitle, 
            cityName,
            startDate,
            endDate,
            linkAdvanceReport: `/advance-reports/trip-certificate/${id}`
        }));
    
        setTripCertificates(items);
        setFilteredTripCertificates(formattedItems);
    };

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedTripCertificate(null);
        setIsAddUpdateModalOpen(true);
    };

    const handleOpenEditModal = (tripCertificate) => {
        setModalMode('edit');
        setSelectedTripCertificate(tripCertificates.find(item => item.id === tripCertificate.id));
        setIsAddUpdateModalOpen(true);
    };

    const handleAddUpdateCloseModal = () => {
        setIsAddUpdateModalOpen(false);
        setSelectedTripCertificate(null);
    };

    const handleAddTripCertificate = async (newTripCertificate) => {
        await CreateTripCertificateFetchAsync(newTripCertificate);
        await fetchTripCertificates();
    };

    const handleUpdateTripCertificate = async (updatedTripCertificate) => {
        await UpdateTripCertificateFetchAsync(updatedTripCertificate);
        await fetchTripCertificates();
    };

    const handleDeleteTripCertificate = async (tripCertificateId) => {
        await DeleteTripCertificateFetchAsync(tripCertificateId);
        await fetchTripCertificates();
    };
    
    const handleFilterOpenCloseModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleApplyFilter = (filteredItems, appliedFilters) => {
        const formattedItems = filteredItems.map(({ id, name, employeeFullName, commandTitle, cityName, startDate, endDate }) => ({
            id,
            name,
            employeeFullName,
            commandTitle,
            cityName,
            startDate,
            endDate,
            linkAdvanceReport: `/advance-reports/trip-certificate/${id}`
        }));

        setFilteredTripCertificates(formattedItems);
        setActiveFilters(appliedFilters);
    };

    return (
        <>
            <Toolbar
                pageTitle="Командировочные удостоверения"
                setSearchTerm={setSearchTerm}
                showAddIcon={true}
                toggleCreateModalClick={handleOpenAddModal}
                showFilterIcon={true}
                toggleFilterModalClick={handleFilterOpenCloseModal}
            />
            {isLoading && <Loader />}
            {!isLoading && (
            <div className="cities-page">    

            {tripCertificates.length === 0 ? (
            <p className="no-items">Командировочные удостоверения не найдены.</p>
            ) : (
            <>
                {filteredTripCertificates.length === 0 && (
                    <p className="no-items">Ничего не найдено.</p>
                )}
                {filteredTripCertificates.length > 0 && (
                    <div className="trip-certificates-table">
                        <Table 
                            items={filteredTripCertificates.map(item => ({
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
                                            onClick={() => handleDeleteTripCertificate(item.id)}
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
                    <AddUpdateTripCertificateModal 
                        onClose={handleAddUpdateCloseModal}
                        mode={modalMode}
                        initialData={selectedTripCertificate}
                        onSubmit={modalMode === 'add' ? handleAddTripCertificate : handleUpdateTripCertificate}
                    />
                )}

                {isFilterModalOpen && (
                    <FilterModal
                        onClose={() => setIsFilterModalOpen(false)}
                        items={tripCertificates}
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