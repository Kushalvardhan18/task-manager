import { useState } from "react";

function TaskModal({ onclose, oncreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  function task() {
    console.log("Task created", title, description, date);
    const newTask = { title, description, date };
    oncreate(newTask);
  }
  return (
    <div className="flex border-1  border-amber-500 m-2 min-h-[200px] ">
      <div className="p-2 m-2 flex flex-col flex-wrap gap-5 w-md justify-around">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-1 px-2 py-1 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-1 px-2 py-1 focus:outline-none"
        />
        <span className="flex gap-2">
          Deadline
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="dark:[color-scheme:dark]"
        />
        </span>
        {title === "" || description === "" ? (
          <button className=" !bg-green-300 w-fit px-3 py-1 cursor-not-allowed rounded-md">
            Create
          </button>
        ) : (
          <button
            onClick={() => {
              task(), onclose();
            }}
            className="rounded-md !bg-green-500 w-fit px-3 py-1 hover:cursor-pointer hover:!bg-green-800"
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

export default TaskModal;
