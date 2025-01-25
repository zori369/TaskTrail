import React, { createContext, useState, ReactNode } from 'react';

interface Task {
    taskId: string;
    taskName: string;
    status: 'open' | 'in-progress' | 'done';
    priority: string;
    deadline: string;
    description: string;
    dateAdded: string;
}

interface TaskContextType {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    deleteTask: (taskId: string) => void;
    updateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (newTask: Task) => {
        setTasks((prevTasks) =>
            [...prevTasks.filter((task) => task.taskId !== newTask.taskId), newTask]
        );
    };

    const deleteTask = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    };

    const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.taskId === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    return (
        <TaskContext.Provider value= {{ tasks, addTask, deleteTask, updateTaskStatus }
}>
    { children }
    < /TaskContext.Provider>
  );
};
