import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../Components/TaskCard";
import { TaskContext } from "../Context/TaskContext";

describe("TaskCard Component", () => {
    const deleteTaskMock = jest.fn();

    const renderTaskCard = (taskProps) => {
        return render(
            <TaskContext.Provider value={{ deleteTask: deleteTaskMock }}>
                <TaskCard {...taskProps} />
            </TaskContext.Provider>
        );
    };

    const mockTask = {
        taskId: "1",
        taskName: "Task 1",
        priority: "High",
        deadline: "2025-01-30",
        description: "Test task description",
        dateAdded: "2025-01-01",
    };

    test("renders task details", () => {
        renderTaskCard(mockTask);

        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Priority: High")).toBeInTheDocument();
        expect(screen.getByText("Deadline: 2025-01-30")).toBeInTheDocument();
    });

    test("toggles task details visibility", () => {
        renderTaskCard(mockTask);

        const toggleButton = screen.getByText("View Details");
        expect(toggleButton).toBeInTheDocument();

        fireEvent.click(toggleButton);

        expect(screen.getByText("Description: Test task description")).toBeInTheDocument();
        expect(screen.getByText("Date Added: 2025-01-01")).toBeInTheDocument();

        fireEvent.click(toggleButton);

        expect(screen.queryByText("Description: Test task description")).toBeNull();
        expect(screen.queryByText("Date Added: 2025-01-01")).toBeNull();
    });

    test("calls deleteTask when delete button is clicked", () => {
        renderTaskCard(mockTask);

        const deleteButton = screen.getByRole("button", { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);

        expect(deleteTaskMock).toHaveBeenCalledWith("1");
    });

    test("sets the taskId in drag events", () => {
        renderTaskCard(mockTask);

        const taskCard = screen.getByText("Task 1");
        const setDataMock = jest.fn();

        fireEvent.dragStart(taskCard, {
            dataTransfer: {
                setData: setDataMock,
            },
        });

        expect(setDataMock).toHaveBeenCalledWith("taskId", "1");
    });
});
