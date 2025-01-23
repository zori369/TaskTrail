import React, { useState } from 'react';
import './App.scss';

import { TaskProvider } from './Context/TaskContext';
import HomePage from './Pages/HomePage.js';

function App() {
    const [filteredTasks, setFilteredTasks] = useState(null); 

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
