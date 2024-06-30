'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const ReminderContext = createContext();

// Define getCurrentDate function to get current day and month
const getCurrentDate = () => {
    const currentDate = new Date();
    return {
        dayOfMonth: currentDate.getDate(),
        dayOfWeek: currentDate.getDay(),
    };
};

export const useReminder = () => {
    return useContext(ReminderContext);
};

export const ReminderProvider = ({ children }) => {
    const { dayOfMonth, dayOfWeek } = getCurrentDate();
    const [showModal, setShowModal] = useState(false);
    const [showEventsModal, setShowEventsModal] = useState(false);
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

    const handleShowEvents = () => setShowEventsModal(true);
    const handleCloseEvents = () => setShowEventsModal(false);

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

    return (
        <ReminderContext.Provider value={{ tasks, handleShow, handleClose, handleSave, showModal, note, setNote, date, setDate, time, setTime, editIndex, handleEdit, handleShowEvents, handleCloseEvents, showEventsModal, getCurrentDate, dayOfMonth, dayOfWeek }}>
            {children}
        </ReminderContext.Provider>
    );
};
