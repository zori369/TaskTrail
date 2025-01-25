import { useContext, useState } from 'react';
import '../App.scss';
import { TaskContext } from '../Context/TaskContext';

interface TaskCardProps {
    taskId: string;
    taskName: string;
    priority: string;
    deadline: string;
    description: string;
    dateAdded: string;
}

function TaskCard({
    taskId,
    taskName,
    priority,
    deadline,
    description,
    dateAdded,
}: TaskCardProps) {
    const { deleteTask } = useContext(TaskContext);
    const [detailsVisible, setDetailsVisible] = useState(false);

    const handleDelete = () => {
        deleteTask(taskId);
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('taskId', taskId);
    };

    const toggleDetails = () => {
        setDetailsVisible((prev) => !prev);
    };

    return (
        <div
            className="task__card"
            draggable
            onDragStart={handleDragStart}
        >
            <div className="card__header">
                <h2 className="card__title">{taskName}</h2>
                <button className="card__button" onClick={handleDelete}></button>
            </div>
            <div className="card__content">
                <p>Priority: {priority}</p>
                <p>Deadline: {deadline}</p>
                {detailsVisible && (
                    <>
                        <p>Description: {description}</p>
                        <p>Date Added: {dateAdded}</p>
                    </>
                )}
                <button className="button--generic" onClick={toggleDetails}>
                    {detailsVisible ? 'Hide Details' : 'View Details'}
                </button>
            </div>
        </div>
    );
}

export default TaskCard;
