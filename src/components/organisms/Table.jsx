import React, { useState } from 'react';
import '../../styles/organisms/Table.css';
import ColumnNamesEnum from '../../enums/ColumnNamesEnum';
import { IconBase } from '../atoms/IconBase';
import { Link } from 'react-router-dom';

const Table = ({ items }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const getUniqueKeys = (items) => {
        const keys = new Set();
        items.forEach(item => {
            Object.keys(item).forEach(key => {
                if (key !== 'id') {
                    keys.add(key);
                }
            });
        });

        return Array.from(keys);
    };

    const uniqueKeys = getUniqueKeys(items);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                    {uniqueKeys.map((key) => (
                        <th key={key} onClick={key === 'actions' ? undefined : () => requestSort(key)}>
                            {ColumnNamesEnum[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                            {sortConfig.key === key && key !== 'actions' ? (
                                sortConfig.direction === 'ascending' ? 
                                    <IconBase name='bx-chevron-up' className='sort-icon' /> : 
                                    <IconBase name='bx-chevron-down' className='sort-icon' />
                            ) : null}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                {sortedItems.map((item) => (
                        <tr key={item.id}>
                            {uniqueKeys.map((key) => (
                                <td key={key} data-label={key}>
                                    {key.startsWith('link') ? (
                                        <Link className='table-link' to={item[key]}>{ColumnNamesEnum[key]}</Link>
                                    ) : (
                                        item[key] || "Не указано"
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;