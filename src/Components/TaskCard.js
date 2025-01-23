import { useState, useContext } from 'react';
import '../App.scss';
import { TaskContext } from '../Context/TaskContext';

function TaskCard({ taskId, taskName, priority, deadline, description, dateAdded, status }) {
    const [showDetails, setShowDetails] = useState(false);
    const { deleteTask } = useContext(TaskContext);

    const toggleDetails = () => {
        setShowDetails((prev) => !prev);
    };

    const handleDelete = () => {
        
        deleteTask(taskId);
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    return (
        <div
            className="task__card"
            draggable="true"
            onDragStart={handleDragStart}
        >
            <div className="card__header">
                <h2 className="card__title">{taskName}</h2>
                <button className="card__button" onClick={handleDelete}></button>
            </div>
            <div className="card__content">
                <p>Priority: {priority}</p>
                <p>Deadline: {deadline}</p>
                {showDetails && (
                    <>
                        <p>Created: {dateAdded}</p>
                        <p className="details">Description: {description}</p>
                    </>
                )}
                <button className="button--generic" onClick={toggleDetails}>
                    {showDetails ? 'Hide Details' : 'View Details'}
                </button>
            </div>
        </div>
    );
}

export default TaskCard;
