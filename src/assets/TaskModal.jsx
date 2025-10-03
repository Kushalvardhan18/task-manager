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
    <div className="fixed inset-0  !bg-black/50 flex items-center justify-center z-50 ">
      <div className="flex flex-col border p-5 border-amber-500 m-2 min-h-[200px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl text-2xl z-50 overflow-hidden bg-gray-900">
        <div className="flex justify-center items-center p-2 ">
          <h1 className="text-2xl font-semibold !text-white">CREATE NEW TASK</h1>
          <button
            className="hover:!text-red-900 px-2 py-1 h-10 m-1 font-extrabold !text-red-500 text-3xl fixed right-2"
            onClick={onclose}
          >
            X
          </button>
        </div>
        <div className="p-3 m-2 flex flex-col flex-wrap gap-5 w-md ">
          <label className="!text-amber-500">Task Title :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.toUpperCase())}
            className="border-1 px-2 py-1 focus:outline-none rounded-sm"
          />
          <label className="!text-amber-500">Task Description :</label>
          <textarea
            text="true"
            value={description}
            onChange={(e) => setDescription(e.target.value.toUpperCase())}
            className="border-1 px-2 py-1 focus:outline-none rounded-sm "
          />
          <span className="flex gap-2 items-center">
            <label className="!text-amber-500">Deadline :</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="dark:[color-scheme:dark] border-1 p-1 rounded-sm"
            />
          </span>

          <div className="flex justify-center my-2">
            {title === "" || description === "" ? (
              <button className=" !bg-green-300 w-fit px-5 py-2 cursor-not-allowed rounded-md">
                Create
              </button>
            ) : (
              <button
                onClick={() => {
                  task(), onclose();
                }}
                className="rounded-md !bg-green-500 w-fit px-5 py-2 hover:cursor-pointer hover:!bg-green-800 "
              >
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
