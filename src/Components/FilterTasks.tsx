import '../App.scss';
import { useState, useContext, useEffect } from 'react';
import { TaskContext, TaskContextType, Task } from '../Context/TaskContext';

interface FilterTasksProps {
    setFilteredTasks: (tasks: Task[]) => void;
}

const FilterTasks: React.FC<FilterTasksProps> = ({ setFilteredTasks }) => {
    const { tasks } = useContext(TaskContext) as TaskContextType;
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('No filter selected');

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const clearFilter = () => {
        setSelectedFilter('No filter selected');
        setFilteredTasks(tasks.filter((task) => task.status === 'open'));
        setDropdownVisible(false);
    };

    const handleFilter = (filter: string) => {
        setSelectedFilter(filter);
        setDropdownVisible(false);

        const now = new Date();
        const getStartOfWeek = (date: Date) => {
            const start = new Date(date);
            const day = start.getDay() || 7; 
            start.setHours(0, 0, 0, 0);
            start.setDate(start.getDate() - day + 1); 
            return start;
        };

        const getStartOfMonth = (date: Date) => {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            start.setDate(1); 
            return start;
        };

        const openTasks = tasks.filter((task) => task.status === 'open');

        const filtered = openTasks.filter((task) => {
            if (filter === 'Priority Low') return task.priority === 'low';
            if (filter === 'Priority Medium') return task.priority === 'mid';
            if (filter === 'Priority High') return task.priority === 'high';

            if (filter === 'Deadline today') {
                const deadline = new Date(task.deadline);
                return deadline.toDateString() === now.toDateString();
            }

            if (filter === 'Deadline this week') {
                const deadline = new Date(task.deadline);
                return (
                    deadline >= getStartOfWeek(now) &&
                    deadline <= new Date(getStartOfWeek(now).getTime() + 6 * 24 * 60 * 60 * 1000) 
                );
            }

            if (filter === 'Deadline this month') {
                const deadline = new Date(task.deadline);
                return (
                    deadline >= getStartOfMonth(now) &&
                    deadline.getMonth() === now.getMonth()
                );
            }

            return true;
        });

        setFilteredTasks(filtered);
    };

    useEffect(() => {
        if (selectedFilter === 'No filter selected') {
            setFilteredTasks(tasks.filter((task) => task.status === 'open'));
        } else {
            handleFilter(selectedFilter);
        }
    }, [tasks]);

    return (
        <div className="filter__sort">
            <h3 className="sort__title">Filter tasks by:</h3>
            <div className="sort__dropdown">
                <p className="dropdown__selected">{selectedFilter}</p>
                <img
                    className={`dropdown__arrow ${dropdownVisible ? 'rotated' : ''}`}
                    alt="arrow"
                    src="/Images/arrow-up.svg"
                    onClick={toggleDropdown}
                />
                {dropdownVisible && (
                    <div className="dropdown__options">
                        <p className="option" onClick={clearFilter}>
                            Clear Filter
                        </p>
                        <p
                            className="option"
                            onClick={() => handleFilter('Priority Low')}
                        >
                            Priority Low
                        </p>
                        <p
                            className="option"
                            onClick={() => handleFilter('Priority Medium')}
                        >
                            Priority Medium
                        </p>
                        <p
                            className="option"
                            onClick={() => handleFilter('Priority High')}
                        >
                            Priority High
                        </p>
                        <p
                            className="option"
                            onClick={() => handleFilter('Deadline today')}
                        >
                            Deadline today
                        </p>
                        <p
                            className="option"
                            onClick={() => handleFilter('Deadline this week')}
                        >
                            Deadline this week
                        </p>
                        <p
                            className="option"
                            onClick={() => handleFilter('Deadline this month')}
                        >
                            Deadline this month
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterTasks;
