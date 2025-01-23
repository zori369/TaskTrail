import { useContext } from 'react';
import '../App.scss';
import TaskCard from './TaskCard.js';
import { TaskContext } from '../Context/TaskContext';

function TaskList({ status, filteredTasks }) {
    const { tasks } = useContext(TaskContext);

    const displayedTasks = filteredTasks || tasks.filter((task) => task.status === status); 

    return (
        <div className="task__list">
            <h2 className="list__title">
                {status === 'open' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Done'}
            </h2>
            <div className="list__content">
                {displayedTasks.map((task) => (
                    <TaskCard key={task.taskName} {...task} />
                ))}
            </div>
        </div>
    );
}

export default TaskList;
