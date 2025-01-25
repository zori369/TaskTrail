import React, { useState, useContext } from 'react';
import { TaskContext, TaskContextType } from '../Context/TaskContext';
import '../App.scss';

interface AddNewTaskProps {
    toggleModal: () => void;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ toggleModal }) => {
    const [taskName, setTaskName] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const { addTask } = useContext(TaskContext) as TaskContextType;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const today = new Date().toISOString().split('T')[0];
        const taskId = Date.now();

        const newTask = {
            taskId,
            taskName,
            priority,
            deadline,
            dateAdded: today,
            description,
            status: 'open',
        };

        addTask(newTask);

        toggleModal();
        setTaskName('');
        setPriority('');
        setDeadline('');
        setDescription('');
    };

    const handleClose = () => {
        toggleModal();
        setTaskName('');
        setPriority('');
        setDeadline('');
        setDescription('');
    };

    return (
        <>
            <div className="popup__cover">
                <div className="task__add">
                    <form className="task__card" onSubmit={handleSubmit}>
                        <div className="card__header">
                            <div className="imput__field">
                                <label className="text__label" htmlFor="task-name">
                                    <img alt="pen" src="./Images/pen.svg" />
                                </label>
                                <input
                                    className="text__field title"
                                    type="text"
                                    id="task-name"
                                    name="task-name"
                                    placeholder="Task Name ..."
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className="card__button"
                                type="button"
                                onClick={handleClose}
                            >
                            </button>
                        </div>
                        <div className="card__content">
                            <div className="imput__field">
                                <p className="text__label date">Priority:</p>
                                <input
                                    className="radio"
                                    type="radio"
                                    id="high"
                                    name="priority"
                                    value="high"
                                    checked={priority === 'high'}
                                    onChange={(e) => setPriority(e.target.value)}
                                />
                                <label className="radio__label" htmlFor="high">
                                    High
                                </label>
                                <input
                                    className="radio"
                                    type="radio"
                                    id="mid"
                                    name="priority"
                                    value="mid"
                                    checked={priority === 'mid'}
                                    onChange={(e) => setPriority(e.target.value)}
                                />
                                <label className="radio__label" htmlFor="mid">
                                    Medium
                                </label>
                                <input
                                    className="radio"
                                    type="radio"
                                    id="low"
                                    name="priority"
                                    value="low"
                                    checked={priority === 'low'}
                                    onChange={(e) => setPriority(e.target.value)}
                                />
                                <label className="radio__label" htmlFor="low">
                                    Low
                                </label>
                            </div>

                            <div className="date__field">
                                <div className="imput__field">
                                    <label className="text__label date" htmlFor="deadline">
                                        Deadline:
                                    </label>
                                    <input
                                        className="text__field"
                                        type="date"
                                        id="deadline"
                                        name="deadline"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="imput__field">
                                <label className="text__label" htmlFor="task-description">
                                    <img alt="pen" src="./Images/pen.svg" />
                                </label>
                                <textarea
                                    className="text__field description"
                                    id="task-description"
                                    name="task-description"
                                    placeholder="Description ..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={10}
                                    cols={44.5}
                                ></textarea>
                            </div>

                            <input
                                className="button--generic"
                                type="submit"
                                value="Add Task"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddNewTask;
