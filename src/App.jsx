import { useState } from "react";
import TaskModal from "./assets/TaskModal";
import BoardModal from "./assets/BoardModal";
function App() {
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  function showTaskDialog(boolean) {
    setShowTaskModal(boolean);
  }
  function showBoardDialog(boolean) {
    setShowBoardModal(boolean);
  }
  function createTasks(task) {
    setTasks((prev) => [...prev, task]);
  }
  function createBoard(board) {
    setBoards((prev) => [...prev, board]);
  }

  return (
    <>
      <h1 className="text-center text-4xl font-medium !text-teal-500">
        Task Manager
      </h1>
      <span className="fixed left-90 top-50">
        {showTaskModal && (
          <TaskModal
            onclose={() => showTaskDialog(false)}
            oncreate={createTasks}
          />
        )}
      </span>
      <button
        className="border-1 px-2 py-1 m-2"
        onClick={() => showTaskDialog(true)}
      >
        Create Task
      </button>
      <span className="fixed left-90 top-50">
        {showBoardModal && (
          <BoardModal
            onclose={() => showBoardDialog(false)}
            oncreate={createBoard}
          />
        )}
      </span>
      <button
        className="border-1 px-2 py-1 m-2"
        onClick={() => showBoardDialog(true)}
      >
        Create Board
      </button>
      <div className="flex h-full">
        <div className=" w-md  m-2 p-2 rounded-md min-h-[450px] shadow-sm shadow-red-400">
          <h2 className="text-center text-3xl !text-red-500 font-medium">
            TODO
          </h2>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong draggable>{task.title}</strong>
              
            </li>
          ))}
        </div>
        <div className=" w-md  m-2 p-2 rounded-md shadow-sm shadow-yellow-400">
          <h2 className="text-center text-3xl !text-yellow-500 font-medium">
            IN PROCESS
          </h2>
        </div>
        <div className=" w-md m-2 p-2 rounded-md shadow-sm shadow-green-400">
          <h2 className="text-center text-3xl !text-green-500 font-medium">
            COMPLETED
          </h2>
        </div>

        {boards.map((board, index) => (
          <div
            key={index}
            className=" w-md m-2 p-2 rounded-md shadow-sm shadow-fuchsia-400"
          >
            <h2 className="text-center text-3xl font-medium"style={{color:board.color}}>{board.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
