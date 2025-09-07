import { useState } from "react";
import TaskModal from "./assets/TaskModal";
import BoardModal from "./assets/BoardModal";
import edit from "../src/assets/edit.svg";
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
    setTasks((prev) => [...prev, { ...task, id: Date.now(), status: "TODO" }]);
  }
  function createBoard(board) {
    setBoards((prev) => [...prev, { ...board, status: board.name }]);
  }
  function handleDragStart(e, taskId) {
    e.dataTransfer.setData("taskId", taskId);
  }

  function handleDragOver(e) {
    e.preventDefault();
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

      <h1 className="text-center text-4xl font-medium !text-teal-500">
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
        <div
          className=" w-md  m-2 p-2 rounded-md min-h-[450px] shadow-sm shadow-red-400"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "TODO")}
        >
          <h2 className="text-center text-3xl !text-red-500 font-medium mb-5">
            TODO
          </h2>
          {tasks
            .filter((t) => t.status === "TODO")
            .map((task) => (
              <div className="flex  my-2 w-full !bg-white rounded-md  justify-between overflow-hidden">
                <ul
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className=" p-2  !bg-white  !text-red-500 font-bold w-[95%] overflow-hidden text-2xl"
                >
                  {task.title}
                </ul>
                <div className="flex gap-5 !bg-white overflow-hidden">
                  <img src={edit} alt="Edit" width={20} className="!bg-white" />
                  <button className="!text-red-600 !bg-white  mr-5 font-bold text-2xl ">
                    X
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div
          className=" w-md m-2 p-2 rounded-md shadow-sm shadow-yellow-400"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "IN PROCESS")}
        >
          <h2 className="text-center text-3xl !text-yellow-500 font-medium mb-5">
            IN PROCESS
          </h2>
          {tasks
            .filter((t) => t.status === "IN PROCESS")
            .map((task) => (
              <div className="flex  my-2 w-full !bg-white rounded-md  justify-between overflow-hidden">
                <ul
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className=" p-2  !bg-white  !text-yellow-500 font-bold w-[95%] overflow-hidden text-2xl"
                >
                  {task.title}
                </ul>
                <div className="flex gap-5 !bg-white overflow-hidden">
                  <img src={edit} alt="Edit" width={20} className="!bg-white" />
                  <button className="!text-red-600 !bg-white  mr-5 font-bold text-2xl ">
                    X
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div
          className="w-md m-2 p-2 rounded-md shadow-sm shadow-green-400"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "COMPLETED")}
        >
          <h2 className="text-center text-3xl !text-green-500 font-medium mb-5">
            COMPLETED
          </h2>
          {tasks
            .filter((t) => t.status === "COMPLETED")
            .map((task) => (
              <div className="flex  my-2 w-full !bg-white rounded-md  justify-between overflow-hidden">
                <ul
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className=" p-2  !bg-white  !text-green-500 font-bold w-[95%] overflow-hidden text-2xl"
                >
                  {task.title}
                </ul>
                <div className="flex gap-5 !bg-white overflow-hidden">
                  <img src={edit} alt="Edit" width={20} className="!bg-white" />
                  <button className="!text-red-600 !bg-white  mr-5 font-bold text-2xl ">
                    X
                  </button>
                </div>
              </div>
            ))}
        </div>

        {boards.map((board) => (
          <div
            key={board.status}
            className=" w-md m-2 p-2 rounded-md shadow-sm shadow-fuchsia-400"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, board.status)}
          >
            <h2
              className="text-center text-3xl font-medium mb-5"
              style={{ color: board.color }}
            >
              {board.name}
            </h2>
            {tasks
              .filter((t) => t.status === board.status)
              .map((task) => (
                <div className="flex  my-2 w-full !bg-white rounded-md  justify-between overflow-hidden">
                  <ul
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className=" p-2  !bg-white  font-bold w-[95%] overflow-hidden text-2xl"
                    style={{color:board.color}}
                  >
                    {task.title}
                  </ul>
                  <div className="flex gap-5 !bg-white overflow-hidden">
                    <img
                      src={edit}
                      alt="Edit"
                      width={20}
                      className="!bg-white"
                    />
                    <button className="!text-red-600 !bg-white  mr-5 font-bold text-2xl ">
                      X
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
