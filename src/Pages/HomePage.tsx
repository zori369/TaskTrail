import React, { useState } from 'react';
import '../App.scss';
import TaskList from '../Components/TaskList';
import SortTasks from '../Components/SortTasks';
import FilterTasks from '../Components/FilterTasks';
import AddNewTask from '../Components/AddNewTask';
import { Task } from '../Context/TaskContext';

interface HomePageProps {
    filteredTasks: Task[] | null;
    setFilteredTasks: (tasks: Task[] | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({ filteredTasks, setFilteredTasks }) => {
    const [isAddNewTaskOpen, setIsAddNewTaskOpen] = useState(false);

    const toggleAddNewTask = () => {
        setIsAddNewTaskOpen((prevState) => !prevState);
    };

    return (
        <div className="home__page">
            <div className="page__header">
                <h1 className="header__title">Your Tasks</h1>
                <button className="button--generic" onClick={toggleAddNewTask}>
                    Add Task
                </button>
            </div>
            <div className="page__filters">
                <FilterTasks setFilteredTasks={setFilteredTasks} />
                <SortTasks />
            </div>
            <div className="page__content">
                <TaskList status="open" filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} />
                <TaskList status="in-progress" />
                <TaskList status="done" />
            </div>
            {isAddNewTaskOpen && <AddNewTask toggleModal={toggleAddNewTask} />}
        </div>
    );
};

export default HomePage;
