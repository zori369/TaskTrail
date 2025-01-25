import React, { useState } from 'react';
import './App.scss';

import { TaskProvider } from './Context/TaskContext';
import HomePage from './Pages/HomePage';

interface Task {
    taskId: number;
    taskName: string;
    description: string;
    priority: string;
    deadline: string;
    status: string;
    dateAdded: string;
}

function App() {
    const [filteredTasks, setFilteredTasks] = useState<Task[] | null>(null);

    return (
        <div className="App">
            <TaskProvider>
                <HomePage
                    filteredTasks={filteredTasks}
                    setFilteredTasks={setFilteredTasks}
                />
            </TaskProvider>
        </div>
    );
}

export default App;
