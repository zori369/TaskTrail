import '../App.scss';
import { useState } from 'react';
import { Task } from '../Context/TaskContext';

interface SortTasksProps {
    tasks: Task[]; 
    setSortedTasks: (tasks: Task[]) => void;
}

const SortTasks: React.FC<SortTasksProps> = ({ tasks, setSortedTasks }) => {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [selectedSortOption, setSelectedSortOption] = useState<string>('Choose sorting option');

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleSort = (sortOption: string) => {
        const sortedTasks = [...tasks];

        switch (sortOption) {
            case 'Priority (High to Low)':
                sortedTasks.sort((a, b) => (b.priority > a.priority ? 1 : -1));
                break;

            case 'Priority (Low to High)':
                sortedTasks.sort((a, b) => (a.priority > b.priority ? 1 : -1));
                break;

            case 'Recently added':
                sortedTasks.sort((a, b) => b.taskId - a.taskId);
                break;

            case 'Oldest added':
                sortedTasks.sort((a, b) => a.taskId - b.taskId);
                break;

            case 'Deadline (Soonest first)':
                sortedTasks.sort((a, b) =>
                    new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
                );
                break;

            case 'Deadline (Latest first)':
                sortedTasks.sort((a, b) =>
                    new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
                );
                break;

            case 'Name (A - Z)':
                sortedTasks.sort((a, b) => a.taskName.localeCompare(b.taskName));
                break;

            case 'Name (Z - A)':
                sortedTasks.sort((a, b) => b.taskName.localeCompare(a.taskName));
                break;

            default:
                break;
        }

        setSelectedSortOption(sortOption);
        setSortedTasks(sortedTasks);
        setDropdownVisible(false);
    };

    return (
        <div className="tasks__sort">
            <h3 className="sort__title">Sort tasks by:</h3>
            <div className="sort__dropdown">
                <div
                    className="dropdown__selected"
                    onClick={toggleDropdown}
                >
                    <p>{selectedSortOption}</p>
                    <img
                        className={`dropdown__arrow ${dropdownVisible ? 'rotated' : ''}`}
                        alt="arrow"
                        src="/Images/arrow-up.svg"
                    />
                </div>
                {dropdownVisible && (
                    <div className="dropdown__options">
                        <p
                            className="option"
                            onClick={() => handleSort('Priority (High to Low)')}
                        >
                            Priority (High to Low)
                        </p>
                        <p
                            className="option"
                            onClick={() => handleSort('Priority (Low to High)')}
                        >
                            Priority (Low to High)
                        </p>
                        <p
                            className="option"
                            onClick={() => handleSort('Recently added')}
                        >
                            Recently added
                        </p>
                        <p
                            className="option"
                            onClick={() => handleSort('Oldest added')}
                        >
                            Oldest added
                        </p>
                        <p
                            className="option"
                            onClick={() => handleSort('Deadline (Soonest first)')}
                        >
                            Deadline (Soonest first)
                        </p>
                        <p
                            className="option"
                            onClick={() => handleSort('Deadline (Latest first)')}
                        >
                            Deadline (Latest first)
                        </p>
                        <p
                            className="option"
                            onClick={() => handleSort('Name (A - Z)')}
                        >
                            Name (A - Z)
                        </p>
                        <p
                            className="option"
                            onClick={() => handleSort('Name (Z - A)')}
                        >
                            Name (Z - A)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SortTasks;
