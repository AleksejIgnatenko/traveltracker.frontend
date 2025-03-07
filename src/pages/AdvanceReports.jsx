import React, { useState, useEffect } from 'react';
import { ButtonBase } from '../components/atoms/ButtonBase';
import '../styles/pages/TripExpenseTypes.css';
import Toolbar from '../components/organisms/Toolbar';
import Table from '../components/organisms/Table';
import FilterModal from '../components/organisms/FilterModal';
import Loader from '../components/organisms/Loader';
import AddUpdateAdvanceReportModal from '../components/organisms/AddUpdateAdvanceReportModal';
import { useParams } from 'react-router-dom';

import CreateAdvanceReportFetchAsync from '../api/advanceReportController/CreateAdvanceReportFetchAsync';
import GetAllAdvanceReportFetchAsync from '../api/advanceReportController/GetAllAdvanceReportsFetchAsync';
import GetAdvanceReportByTripCertificateIdFetchAsync from '../api/advanceReportController/GetAdvanceReportByTripCertificateIdFetchAsync';
import UpdateAdvanceReportFetchAsync from '../api/advanceReportController/UpdateAdvanceReportFetchAsync';
import DeleteAdvanceReportFetchAsync from '../api/advanceReportController/DeleteAdvanceReportFetchAsync';

export default function AdvanceReports() {
    const { type, id } = useParams();

    const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedAdvanceReport, setSelectedAdvanceReport] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [advanceReports, setAdvanceReports] = useState([]);
    const [filteredAdvanceReports, setFilteredAdvanceReports] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const filterFields = [
        { field: 'totalAmount', label: 'Сумма' },
        { field: 'dateOfDelivery', label: 'Дата сдачи' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // const items = [
                //     // Временные данные для примера
                //     {
                //         id: 1,
                //         totalAmount: 1000,
                //         dateOfDelivery: '2024-01-01',
                //     },
                //     {
                //         id: 2,
                //         totalAmount: 2000,
                //         dateOfDelivery: '2024-01-02',
                //     },
                
                // ]

                if (id) {
                    if (type === 'trip-certificate') {
                        await fetchAdvanceReports('tripCertificateId', id);
                    }
                } else {
                    await fetchAdvanceReports();
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error services:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredAdvanceReports = searchTerm
            ? advanceReports.filter(advanceReport =>
                advanceReport.totalAmount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                advanceReport.dateOfDelivery.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : advanceReports;

        const formattedItems = filteredAdvanceReports.map(({ id, totalAmount, dateOfDelivery }) => ({
            id,
            totalAmount: totalAmount.toString(),
            dateOfDelivery,
            linkTripExpense: `/trip-expenses/advance-report/${id}`
        }));
    
        setFilteredAdvanceReports(formattedItems);
    }, [advanceReports, searchTerm]);

    const fetchAdvanceReports = async (type, id) => {
        let items;
        if (type === 'tripCertificateId') {
            items = await GetAdvanceReportByTripCertificateIdFetchAsync(id);
        } else {
            items = await GetAllAdvanceReportFetchAsync();
        }
        
        const formattedItems = items.map(({ id, totalAmount, dateOfDelivery }) => ({
            id,
            totalAmount: totalAmount.toString(),
            dateOfDelivery,
            linkTripExpense: `/trip-expenses/advance-report/${id}`
        }));
        
        setAdvanceReports(items);
        setFilteredAdvanceReports(formattedItems);
    };

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedAdvanceReport(null);
        setIsAddUpdateModalOpen(true);
    };

    const handleOpenEditModal = (advanceReport) => {
        setModalMode('edit');
        setSelectedAdvanceReport(advanceReports.find(item => item.id === advanceReport.id));
        setIsAddUpdateModalOpen(true);
    };

    const handleAddUpdateCloseModal = () => {
        setIsAddUpdateModalOpen(false);
        setSelectedAdvanceReport(null);
    };

    const handleAddAdvanceReport = async (newAdvanceReport) => {
        await CreateAdvanceReportFetchAsync(newAdvanceReport);
        await fetchAdvanceReports();
    };

    const handleUpdateAdvanceReport = async (updatedAdvanceReport) => {
        await UpdateAdvanceReportFetchAsync(updatedAdvanceReport);
        await fetchAdvanceReports();
    };

    const handleDeleteAdvanceReport = async (advanceReportId) => {
        await DeleteAdvanceReportFetchAsync(advanceReportId);
        await fetchAdvanceReports();
    };
    
    const handleFilterOpenCloseModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleApplyFilter = (filteredItems, appliedFilters) => {
        setFilteredAdvanceReports(filteredItems);
        setActiveFilters(appliedFilters);
    };

    return (
        <>
            <Toolbar
                pageTitle="Авансовые отчеты"
                setSearchTerm={setSearchTerm}
                showAddIcon={true}
                toggleCreateModalClick={handleOpenAddModal}
                showFilterIcon={true}
                toggleFilterModalClick={handleFilterOpenCloseModal}
            />
            {isLoading && <Loader />}
            {!isLoading && (
            <div className="cities-page">    

            {advanceReports.length === 0 ? (
            <p className="no-items">Авансовые отчеты не найдены.</p>
            ) : (
            <>
                {filteredAdvanceReports.length === 0 && (
                    <p className="no-items">Ничего не найдено.</p>
                )}
                {filteredAdvanceReports.length > 0 && (
                    <div className="advance-reports-table">
                        <Table 
                            items={filteredAdvanceReports.map(item => ({
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
                                            onClick={() => handleDeleteAdvanceReport(item.id)}
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
                    <AddUpdateAdvanceReportModal 
                        onClose={handleAddUpdateCloseModal}
                        mode={modalMode}
                        initialData={selectedAdvanceReport}
                        onSubmit={modalMode === 'add' ? handleAddAdvanceReport : handleUpdateAdvanceReport}
                    />
                )}

                {isFilterModalOpen && (
                    <FilterModal
                        onClose={() => setIsFilterModalOpen(false)}
                        items={advanceReports}
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