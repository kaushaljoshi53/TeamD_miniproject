import React, { useState, useEffect } from 'react';
import { Accordion, AccordionTab, AccordionTabChangeEvent } from 'primereact/accordion';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../styles/NewEvent.css';
import Form from './Eventform';

interface TableItem {
    id: number;
    name: string;
    email: string;
}

const UserEvent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [selectedName, setSelectedName] = useState('');

    const handleTabChange = (event: AccordionTabChangeEvent) => {
        setActiveIndex(event.index as number);
    };


    const handleFilterClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsAccordionOpen(!isAccordionOpen);
        console.log('Filter button clicked');
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setIsAccordionOpen(true);
    };

    const handleDropdownChange = (option: any) => {
        setSelectedName(option.value);
        setIsAccordionOpen(true);
    };

    const filteredTableData = (data: TableItem[]): TableItem[] => {
        return data.filter(item =>
            (selectedName === '' || item.name.toLowerCase() === selectedName.toLowerCase()) &&
            Object.values(item).some(val =>
                val.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    const renderAccordionTabHeader = () => {
        return (
            <div className="custom-tab-header">
                <p className='header'> Events</p>
                <i className="fa fa-filter" aria-hidden="true" onClick={handleFilterClick}></i>
                <input
                    className='search'
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <Dropdown
                    options={tableData.map(item => item.name)}
                    onChange={handleDropdownChange}
                    value={selectedName}
                    placeholder="Select a Name"
                />
            </div>
        );
    };

    const tableData: TableItem[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com'
        },
    ];

    const filteredData: TableItem[] = filteredTableData(tableData);

    useEffect(() => {
        if (isAccordionOpen) {
            setActiveIndex(0);
        }
    }, [isAccordionOpen]);


    return (
        <div className="container">
            <Accordion activeIndex={activeIndex} onTabChange={handleTabChange}>
                <AccordionTab header={renderAccordionTabHeader()}>
                    <div className="custom-table-container">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item: TableItem) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </AccordionTab>
            </Accordion>

        </div>
    );
};

export default UserEvent;
