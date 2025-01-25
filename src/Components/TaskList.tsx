import '../App.scss';
import { useContext, useEffect } from 'react';
import TaskCard from './TaskCard';
import { TaskContext, Task } from '../Context/TaskContext';

interface TaskListProps {
    status: 'open' | 'in-progress' | 'done'; 
    filteredTasks?: Task[]; 
    setFilteredTasks?: (tasks: Task[]) => void; 
}

const TaskList: React.FC<TaskListProps> = ({ status, filteredTasks, setFilteredTasks }) => {
    const { tasks, updateTaskStatus } = useContext(TaskContext);

    const filteredTasksList: Task[] = filteredTasks || tasks.filter((task) => task.status === status);

    useEffect(() => {
        if (setFilteredTasks) {
            setFilteredTasks(tasks.filter((task) => task.status === status));
        }
    }, [tasks, status, setFilteredTasks]);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('taskId');
        if (!taskId) {
            console.error("No taskId found in the drop event");
            return;
        }

        const draggedTask = tasks.find((task) => String(task.taskId) === taskId);
        if (!draggedTask) {
            console.error(`No task found with taskId: ${taskId}`);
            return;
        }

        console.log(`Task ${taskId} - Status before drag: ${draggedTask.status}`);

        if (draggedTask.status !== status) {
            updateTaskStatus(taskId, status);
            console.log(`Task ${taskId} - Status after drop: ${status}`);
        }
    };

    return (
        <div
            className="task__list"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h2 className="list__title">
                {status === 'open' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Done'}
            </h2>
            <div className="list__content">
                {filteredTasksList.map((task) => (
                    <TaskCard
                        key={task.taskId}
                        {...task}
                        draggable="true"
                        onDragStart={(event) => {
                            event.dataTransfer.setData('taskId', String(task.taskId));
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
