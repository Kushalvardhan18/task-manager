import { useState } from "react";
import Modal from "./assets/Modal";
function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  function showDialog(boolean) {
    setShowModal(boolean);
  }
  function createTasks(task) {
    setTasks((prev) => [...prev, task]);
  }

  return (
    <>
      <h1>Task Manager</h1>
      {showModal && (
        <Modal onclose={() => showDialog(false)} oncreate={createTasks} />
      )}
      <button
        className="border-1 px-2 py-1 m-2"
        onClick={() => showDialog(true)}
      >
        Create Task
      </button>
      <button className="border-1 px-2 py-1 m-2">Create Board</button>
      <div className="border-1 w-md h-100 m-2">
        <h2>TODO</h2>
        <div>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
