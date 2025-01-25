import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../Components/TaskList";
import { TaskContext } from "../Context/TaskContext";

const mockTasks = [
    { taskId: "1", taskName: "Task 1", status: "open", priority: "High", deadline: "2025-01-30" },
    { taskId: "2", taskName: "Task 2", status: "in-progress", priority: "Medium", deadline: "2025-02-10" },
    { taskId: "3", taskName: "Task 3", status: "done", priority: "Low", deadline: "2025-03-15" },
];

describe("TaskList Component", () => {
    const updateTaskStatusMock = jest.fn();

    const renderTaskList = (status) => {
        return render(
            <TaskContext.Provider
                value={{ tasks: mockTasks, updateTaskStatus: updateTaskStatusMock }}
            >
                <TaskList status={status} />
            </TaskContext.Provider>
        );
    };

    test("renders tasks with the correct status", () => {
        renderTaskList("open");

        const taskElement = screen.getByText("Task 1");
        expect(taskElement).toBeInTheDocument();

        const nonMatchingTask = screen.queryByText("Task 2");
        expect(nonMatchingTask).toBeNull();
    });

    test("handles drag-and-drop correctly", () => {
        renderTaskList("open");

        const taskElement = screen.getByText("Task 1");

        fireEvent.dragStart(taskElement, {
            dataTransfer: {
                setData: jest.fn(),
            },
        });

        fireEvent.drop(taskElement, {
            dataTransfer: {
                getData: jest.fn(() => "1"),
            },
        });

        expect(updateTaskStatusMock).toHaveBeenCalledWith("1", "open");
    });

    test("renders empty message when no tasks match the status", () => {
        renderTaskList("archived");

        const emptyMessage = screen.queryByText(/no tasks/i);
        expect(emptyMessage).toBeNull();
    });
});
