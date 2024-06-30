'use client'
// import React, { useEffect } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Scheduler = () => {
//     useEffect(() => {
//         console.log('Scheduler component mounted.');

//         const checkAndExecuteTasks = () => {
//             console.log('Running checkAndExecuteTasks...');
//             const now = Date.now();
//             let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//             console.log(tasks)

//             console.log('Retrieved tasks:', tasks);

//             tasks = tasks.filter(task => {
//                 const taskTime = new Date(task.date).getTime();
//                 const timeDiff = taskTime - now;

//                 console.log(`Task: ${task.note}, Time Diff: ${timeDiff}`);

//                 if (timeDiff > 0 && timeDiff <= 10000) {
//                     console.log(`Executing task: ${task.note}`);
//                     toast.info(`Reminder: ${task.note} is due at ${new Date(taskTime).toLocaleTimeString()}`);
//                     return false; // Remove executed one-time tasks
//                 }
//                 return true;
//             });

//             localStorage.setItem('tasks', JSON.stringify(tasks));

//             console.log('Updated tasks:', tasks);
//         };

//         // Run the scheduler every second
//         const interval = setInterval(checkAndExecuteTasks, 1000);

//         // Cleanup function to clear interval on component unmount
//         return () => {
//             console.log('Clearing interval...');
//             clearInterval(interval);
//         };
//     }, []); // Empty dependency array ensures it runs only once on mount

//     return null; // Scheduler component doesn't render anything
// };

// export default Scheduler;


'use client'
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Scheduler = () => {
    useEffect(() => {
        console.log('Scheduler component mounted.');

        const checkAndExecuteTasks = () => {
            console.log('Running checkAndExecuteTasks...');
            const now = Date.now();
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            console.log('Retrieved tasks:', tasks);

            tasks = tasks.filter(task => {
                const taskTime = new Date(task.date).getTime();
                const timeDiff = taskTime - now;

                console.log(`Task: ${task.note}, Time Diff: ${timeDiff}`);

                if (timeDiff > 0 && timeDiff <= 10000) {
                    console.log(`Executing task: ${task.note}`);
                    toast.info(`Reminder: ${task.note} is due at ${new Date(taskTime).toLocaleTimeString()}`);
                    return false; // Remove executed one-time tasks
                }
                return true;
            });

            localStorage.setItem('tasks', JSON.stringify(tasks));
            console.log('Updated tasks:', tasks);
        };

        // Run the scheduler every second
        const interval = setInterval(checkAndExecuteTasks, 1000);

        // Cleanup function to clear interval on component unmount
        return () => {
            console.log('Clearing interval...');
            clearInterval(interval);
        };
    }, []); // Empty dependency array ensures it runs only once on mount

    return null; // Scheduler component doesn't render anything
};

export default Scheduler;
