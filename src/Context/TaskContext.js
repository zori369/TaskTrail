import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (newTask) => {
        setTasks((prevTasks) => {
            
            const updatedTasks = prevTasks.filter((task) => task.taskId !== newTask.taskId);
            return [...updatedTasks, newTask];
        });
    };

    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.taskId !== taskId));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
