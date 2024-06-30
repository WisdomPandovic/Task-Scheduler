# Task Scheduler App

The Task Scheduler App is a simple web application built with React and Next.js, designed to allow users to create, schedule, and manage tasks. It includes features for setting reminders, editing task schedules, and viewing executed tasks in a log.

## Features

- **Task Management:**
  - Create new tasks with a note, date, and time.
  - Edit existing tasks.
  - Delete tasks.
- **Reminder System:**
  - Set reminders for tasks approaching their scheduled time.
  - Display reminders using toast notifications.
- **Calendar Integration:**
  - Visual indication on the calendar for days with scheduled tasks.
- **Logging:**
  - Log executed tasks with timestamps.

## Technologies Used

- **Frontend:** React, Next.js, Bootstrap
- **State Management:** React Context API
- **Styling:** CSS Modules, Bootstrap
- **External Libraries:**
  - react-toastify for toast notifications.
  - react-calendar for date picking.
  - react-data-table-component for displaying tasks in a table format.

## Getting Started

To run the Task Scheduler App locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/WisdomPandovic/Task-Scheduler.git>
   cd task-scheduler
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**

   ```
   http://localhost:3000
   ```

## Folder Structure

The project structure is organized as follows:

```
task-scheduler-app/
├── components/       # React components
├── contexts/         # React Contexts
├── pages/            # Next.js pages
├── public/           # Static assets
├── styles/           # CSS styles
├── utils/            # Utility functions
├── package.json      # npm dependencies and scripts
└── README.md         # Project documentation
```

## Additional Notes

- This application uses localStorage for storing tasks locally within the browser.
- The scheduler runs in the background using setInterval to check and execute tasks.
- For scalability considerations, consider integrating with a backend and database for persistent storage and more robust scheduling capabilities.

## Author

Wisdom Onwuchekwa
