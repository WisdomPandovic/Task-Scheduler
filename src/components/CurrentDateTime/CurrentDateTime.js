'use client';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';

const CurrentDateTime = () => {
    const { dayOfMonth, dayOfWeek } = getCurrentDate();
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('00:00');
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track the index of the task being edited

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);

        // Check for tasks due for execution every second
        // const interval = setInterval(() => {
        //     checkScheduledTasks(storedTasks);
        // }, 1000);

        // return () => clearInterval(interval);
    }, []);

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setEditIndex(null); // Reset edit index when closing the modal
    };

    const handleSave = () => {
        const [hours, minutes] = time.split(':').map(Number);
        const taskDate = new Date(date);
        taskDate.setHours(hours, minutes, 0, 0);

        const task = {
            note,
            date: taskDate.getTime(),
        };

        let updatedTasks;
        if (editIndex !== null) {
            // Update the existing task
            updatedTasks = tasks.map((t, index) => (index === editIndex ? task : t));
            toast.success('Reminder updated successfully!');
        } else {
            // Add a new task
            updatedTasks = [...tasks, task];
            toast.success('Reminder set successfully!');
        }

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);

        // console.log('Saved task:', task);
        // console.log('All tasks:', updatedTasks);

        handleClose();
    };

    const handleEdit = (index) => {
        const task = tasks[index];
        setNote(task.note);
        setDate(new Date(task.date));
        setTime(new Date(task.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setEditIndex(index);
        handleShow();
    };

    const handleDelete = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        toast.error('Reminder deleted successfully!');
    };

    // const checkScheduledTasks = (tasks) => {
    //     const currentTime = new Date().getTime();

    //     tasks.forEach(task => {
    //         const taskTime = new Date(task.date).getTime();
    //         const timeDiff = taskTime - currentTime;

    //         console.log(`Task: ${task.note}, Time Diff: ${timeDiff}`);

    //         if (timeDiff > 0 && timeDiff <= 10000) {
    //             const reminderTime = new Date(taskTime - 10000);
    //             console.log(`Reminder triggered for: ${task.note} at ${formatTime(reminderTime)}`);
    //             toast.info(`Reminder: ${task.note} is due at ${formatTime(reminderTime)}!`);
    //         }
    //     });
    // };

    const formatTime = (time) => {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const columns = [
        {
            name: 'Note',
            selector: row => row.note,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleString(),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row, index) => (
                <>
                    <FaEdit
                        className="edit-icon"
                        style={{ color: '#FD7F67', cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => handleEdit(index)}
                    />
                    <FaTrash
                        className="delete-icon"
                        style={{ color: '#FD7F67', cursor: 'pointer' }}
                        onClick={() => handleDelete(index)}
                    />
                </>
            ),
        }
    ];

    const tileClassName = ({ date }) => {
        const taskDateStrings = tasks.map(task => new Date(task.date).toDateString());
        if (taskDateStrings.includes(date.toDateString())) {
            return 'react-calendar__tile--hasTask';
        }
        return null;
    };

    return (
        <div className="current-date-time-container text-white d-flex flex-column p-0" style={{ backgroundColor: '#303941', minHeight: '100vh' }}>
            {/* <ToastContainer/> */}
            <div className="d-flex justify-content-between p-3">
                <div>
                    <span style={{ color: '#FD7F67' }}>●</span>
                    <span style={{ color: '#424E59' }}>●</span>
                    <span style={{ color: '#A8C0FF' }}>●</span>
                </div>
                <div className='icon-container d-flex align-items-center'>
                    <FaEdit className="edit-icon" style={{ color: '#FD7F67', cursor: 'pointer' }} />
                    <FaPlus className="add-icon ms-2" style={{ color: '#FD7F67', cursor: 'pointer' }} onClick={handleShow} />
                </div>
            </div>
            <div className='text-center mt-3 mb-3'>
                <h5 className="display-3">{dayOfMonth}</h5>
                <p className="display-6 text-uppercase">{dayOfWeek}</p>
            </div>
            <div className="flex-grow-1">
                <p className='text-uppercase p-3 mb-0' style={{ color: '#424E59' }}>Current Event</p>
                <hr className="my-1" />
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-lg-12 d-flex flex-column align-items-center">
                            <DataTable
                                columns={columns}
                                data={tasks}
                                highlightOnHover
                                theme="dark"
                                noHeader
                                customStyles={{
                                    table: {
                                        style: {
                                            backgroundColor: '#424E59',
                                        },
                                    },
                                    headCells: {
                                        style: {
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            backgroundColor: '#303941',
                                            color: '#FD7F67',
                                        },
                                    },
                                    cells: {
                                        style: {
                                            fontSize: '14px',
                                            backgroundColor: '#424E59',
                                            color: '#FFFFFF',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
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
                            <Calendar value={date} onChange={setDate} tileClassName={tileClassName}/>
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
        </div>
    );
};

const getCurrentDate = () => {
    const date = new Date();
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    return { dayOfMonth, dayOfWeek };
};

export default CurrentDateTime;
