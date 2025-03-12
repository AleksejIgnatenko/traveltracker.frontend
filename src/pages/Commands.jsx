import React, { useState, useEffect } from 'react';
import { ButtonBase } from '../components/atoms/ButtonBase';
import '../styles/pages/Commands.css';
import Toolbar from '../components/organisms/Toolbar';
import Table from '../components/organisms/Table';
import FilterModal from '../components/organisms/FilterModal';
import Loader from '../components/organisms/Loader';

import AddUpdateCommandModal from '../components/organisms/AddUpdateCommandModal';
import GetAllCommandsFetchAsync from '../api/commandController/GetAllCommandsFetchAsync';
import CreateCommandFetchAsync from '../api/commandController/CreateCommandFetchAsync';
import UpdateCommandFetchAsync from '../api/commandController/UpdateCommandFetchAsync';
import DeleteCommandFetchAsync from '../api/commandController/DeleteCommandFetchAsync';
import ExportCommandsToExcelFetchAsync from '../api/commandController/ExportCommandsToExcelFetchAsync';
import ExportDateQuantityChartToExcelFetchAsync from '../api/commandController/ExportDateQuantityChartToExcelFetchAsync';

export default function Commands() {
    const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [commands, setCommands] = useState([]);
    const [filteredCommands, setFilteredCommands] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const filterFields = [
        { field: 'dateIssued', label: 'Дата создания' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // const items = [
                //     // Временные данные для примера
                //     {
                //         id: 1,
                //         title: 'title',
                //         description: 'description',
                //         dateIssued: '2024-01-01',
                //     },
                //     {
                //         id: 2,
                //         title: 'title',
                //         description: 'description',
                //         dateIssued: '2024-01-02',
                //     }
                // ]

                await fetchCommands();
                setIsLoading(false);
            } catch (error) {
                console.error('Error services:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredCommands = searchTerm
            ? commands.filter(command =>
                command.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                command.dateIssued.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : commands;

            const formattedItems = filteredCommands.map(({ id, title, description, dateIssued }) => ({
                id,
                title,
                description,
                dateIssued,
                linkBusinessTrips: `/trip-certificates/command/${id}`
            }));
    
        setFilteredCommands(formattedItems);
    }, [commands, searchTerm]);

    const fetchCommands = async () => {
        const items = await GetAllCommandsFetchAsync();
    
        const formattedItems = items.map(({ id, title, description, dateIssued }) => ({
            id,
            title,
            description,
            dateIssued,
            linkBusinessTrips: `/trip-certificates/command/${id}`
        }));
    
        setCommands(formattedItems);
        setFilteredCommands(formattedItems);
    };

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedCommand(null);
        setIsAddUpdateModalOpen(true);
    };

    const handleOpenEditModal = (command) => {
        setModalMode('edit');
        setSelectedCommand(command);
        setIsAddUpdateModalOpen(true);
    };

    const handleAddUpdateCloseModal = () => {
        setIsAddUpdateModalOpen(false);
        setSelectedCommand(null);
    };

    const handleAddCommand = async (newCommand) => {
        await CreateCommandFetchAsync(newCommand);
        await fetchCommands();
    };

    const handleUpdateCommand = async (updatedCommand) => {
        await UpdateCommandFetchAsync(updatedCommand);
        await fetchCommands();
    };

    const handleDeleteCommand = async (commandId) => {
        await DeleteCommandFetchAsync(commandId);
        await fetchCommands();
    };
    
    const handleFilterOpenCloseModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleApplyFilter = (filteredItems, appliedFilters) => {
        const formattedItems = filteredItems.map(({ id, title, description, dateIssued }) => ({
            id,
            title,
            description,
            dateIssued,
            linkBusinessTrips: `/trip-certificates/command/${id}`
        }));
        
        setFilteredCommands(formattedItems);
        setActiveFilters(appliedFilters);
    };

    const handleExportExcel = async () => {
        await ExportCommandsToExcelFetchAsync();
    };

    const handleExportGraphic = async () => {
        await ExportDateQuantityChartToExcelFetchAsync();
    };

    return (
        <>
            <Toolbar
                pageTitle="Приказы"
                setSearchTerm={setSearchTerm}
                showAddIcon={true}
                toggleCreateModalClick={handleOpenAddModal}
                showFilterIcon={true}
                toggleFilterModalClick={handleFilterOpenCloseModal}
                showExcelIcon={true}
                toggleExcelClick={handleExportExcel}
                showGraphicIcon={true}
                toggleGraphicClick={handleExportGraphic}
            />
            {isLoading && <Loader />}
            {!isLoading && (
            <div className="commands-page">    

            {commands.length === 0 ? (
            <p className="no-items">Приказы не найдены.</p>
            ) : (
            <>
                {filteredCommands.length === 0 && (
                    <p className="no-items">Ничего не найдено.</p>
                )}
                {filteredCommands.length > 0 && (
                    <div className="commands-table">
                        <Table 
                            items={filteredCommands.map(item => ({
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
                                            onClick={() => handleDeleteCommand(item.id)}
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
                    <AddUpdateCommandModal 
                        onClose={handleAddUpdateCloseModal}
                        mode={modalMode}
                        initialData={selectedCommand}
                        onSubmit={modalMode === 'add' ? handleAddCommand : handleUpdateCommand}
                    />
                )}

                {isFilterModalOpen && (
                    <FilterModal
                        onClose={() => setIsFilterModalOpen(false)}
                        items={commands}
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