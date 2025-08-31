import { useState } from "react";

function Modal({ onclose, oncreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  function task() {
    console.log("Task created", title, description, date);
    const newTask = { title, description, date };
    oncreate(newTask);
    setTitle("");
    setDescription("");
    setDate("");
  }
  return (
    <div className="flex border-1 justify-between border-amber-500 w-md h-xl m-2">
      <div className=" flex flex-col p-2 ">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {title === "" || description === "" || date === "" ? (
          <button className="border-1 !bg-green-300 w-fit px-2 cursor-not-allowed">
            Create
          </button>
        ) : (
          <button
            onClick={() => {
              task(), onclose();
            }}
            className="rounded-xs border-1 !bg-green-500 w-fit px-2 hover:cursor-pointer hover:!bg-green-800"
          >
            Create
          </button>
        )}
      </div>
      <button
        className="hover:!text-red-500 px-2 py-1 h-fit m-1 font-bold"
        onClick={onclose}
      >
        X
      </button>
    </div>
  );
}

export default Modal;
