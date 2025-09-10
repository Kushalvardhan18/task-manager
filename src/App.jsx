import { useState } from "react";
import TaskModal from "./assets/TaskModal";
import BoardModal from "./assets/BoardModal";
import EditTask from "./assets/EditTask";
import TaskColumn from "./assets/TaskColumn";
function App() {
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function showTaskDialog(boolean) {
    setShowTaskModal(boolean);
  }
  function showBoardDialog(boolean) {
    setShowBoardModal(boolean);
  }
  function showEditDialog(boolean) {
    setEditModal(boolean);
  }
  function createTasks(task) {
    setTasks((prev) => [...prev, { ...task, id: Date.now(), status: "TODO" }]);
  }
  function createBoard(board) {
    setBoards((prev) => [...prev, { ...board, status: board.name }]);
  }
  function handleDragStart(e, taskId) {
    e.dataTransfer.setData("taskId", taskId);
  }

  function handleDrop(e, newStatus) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    setTasks((prev) =>
      prev.map((task) =>
        task.id.toString() === taskId ? { ...task, status: newStatus } : task
      )
    );
  }
  function deleteTask(id) {
    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
  }

  function handleEditTask(id) {
    const task = tasks.find((task) => task.id === id);
    setEditingTask(task); // store the selected task
    showEditDialog(true);
  }
  function updateTask(updatedTask) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  }

  return (
    <>
      {showBoardModal && (
        <BoardModal
          onclose={() => showBoardDialog(false)}
          oncreate={createBoard}
        />
      )}
      {showTaskModal && (
        <TaskModal
          onclose={() => showTaskDialog(false)}
          oncreate={createTasks}
        />
      )}
      {showEditModal && (
        <EditTask
          task={editingTask}
          onclose={() => showEditDialog(false)}
          onedit={updateTask}
        />
      )}

      <h1 className="text-center text-4xl font-medium !text-teal-500 my-5">
        Task Manager
      </h1>

      <button
        className="px-2 py-1 m-2 !bg-blue-500 rounded-sm hover:!bg-blue-700 duration-500"
        onClick={() => showTaskDialog(true)}
      >
        Create Task
      </button>

      <button
        className=" px-2 py-1 m-2 !bg-blue-500 rounded-sm hover:!bg-blue-700 duration-500"
        onClick={() => showBoardDialog(true)}
      >
        Create Board
      </button>
      <div className="flex h-full justify-center mt-15">
        <TaskColumn
          title="TODO"
          status="TODO"
          color="red"
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDelete={deleteTask}
          onEdit={handleEditTask}
          tasks={tasks.filter((t) => t.status === "TODO")}
        />
        <TaskColumn
          title="IN PROCESS"
          status="IN PROCESS"
          color="yellow"
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDelete={deleteTask}
          onEdit={handleEditTask}
          tasks={tasks.filter((t) => t.status === "IN PROCESS")}
        />
        <TaskColumn
          title="COMPLETED"
          status="COMPLETED"
          color="green"
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDelete={deleteTask}
          onEdit={handleEditTask}
          tasks={tasks.filter((t) => t.status === "COMPLETED")}
        />

        {boards.map((board) => (
          <TaskColumn
            key={board.status}
            title={board.name}
            status={board.status}
            color={board.color === "#ffffff" ? "red":board.color}
            tasks={tasks.filter((t) => t.status === board.status)}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onDelete={deleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </div>
    </>
  );
}

export default App;
