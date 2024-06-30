'use client';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaCog, FaPlus, FaSearch } from 'react-icons/fa';
import { useReminder } from '../../contexts/ReminderContext';
import DataTable from 'react-data-table-component';

const CalendarAndButtons = () => {
    const { handleShow, handleShowEvents, handleClose, handleSave, showModal, note, setNote, date, setDate, time, setTime, editIndex, tasks, showEventsModal, handleCloseEvents } = useReminder();

    const handleSetReminder = () => {
        handleShow();
    };

    const handleSeePlannedEvents = () => {
        handleShowEvents();
    };

    const columns = [
        {
            name: 'Note',
            selector: row => row.note,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Time',
            selector: row => new Date(row.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sortable: true,
        },
    ];

    return (
        <div className="calendar-and-buttons-container" style={{ backgroundColor: '', minHeight: '100vh' }}>
            <div className='d-flex justify-content-between p-3'>
                <h3>Task Scheduler</h3>
                <FaCog className="me-1" style={{ color: '#FD7F67' }} />
            </div>
            <div className="calendar-container">
                <Calendar />
            </div>
            <div className="buttons-container d-flex flex-wrap mt-3 p-3">
                <Button
                    variant="dark"
                    style={{
                        backgroundColor: '#000',
                        borderColor: '#000',
                        color: '#FD7F67',
                        minWidth: '200px',
                        padding: '10px 20px',
                        margin:'10px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    onClick={handleSetReminder}
                >
                    Set Reminder <FaPlus className="edit-icon" style={{ marginLeft: '5px', color: '#FD7F67' }} />
                </Button>
                <Button
                    variant="dark"
                    style={{
                        backgroundColor: '#000',
                        borderColor: '#000',
                        color: '#FD7F67',
                        minWidth: '200px',
                        padding: '10px 20px',
                        margin:'10px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    className="ms-2"
                    onClick={handleSeePlannedEvents}
                >
                    See Planned Events <FaSearch className="me-2" style={{ marginLeft: '5px', color: '#FD7F67' }} />
                </Button>
            </div>

            {/* Modal for setting/updating reminder */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? 'Edit Reminder' : 'Set Reminder'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNote">
                            <Form.Label>Note</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate" className="mt-3">
                            <Form.Label>Date</Form.Label>
                            <Calendar value={date} onChange={setDate} />
                        </Form.Group>
                        <Form.Group controlId="formTime" className="mt-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="custom-save-button" onClick={handleClose}>Close</Button>
                    <Button variant="primary" className="custom-save-button" onClick={handleSave}>{editIndex !== null ? 'Update Reminder' : 'Save Reminder'}</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for viewing planned events */}
            <Modal show={showEventsModal} onHide={handleCloseEvents}>
                <Modal.Header closeButton>
                    <Modal.Title>Planned Events</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DataTable
                        columns={columns}
                        data={tasks}
                        pagination
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="custom-save-button" onClick={handleCloseEvents}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CalendarAndButtons;
