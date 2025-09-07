import { useState } from "react";

function BoardModal({ oncreate, onclose }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ffffff");

  function board() {
    console.log("board", name, color);
    const newBoard = { name, color };
    oncreate(newBoard);
  }
  return (
    <div className="flex border-1  justify-between gap-4  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col p-2">
        <div className="flex flex-col gap-2">
          <span className="flex gap-2 items-center">
            Name:
            <input
              type="text"
              placeholder="Board Name"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              className="border-1 px-2 py-1 focus:outline-none focus:border-amber-500 focus:border-1 rounded-sm "
            />
          </span>
          <span className="flex gap-2">
            Color :
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </span>
        </div>
        {name === "" ? (
          <button className=" !bg-green-300 w-fit px-3 py-1 cursor-not-allowed rounded-md">
            Create
          </button>
        ) : (
          <button
            onClick={() => {
              board(), onclose();
            }}
            className="rounded-md !bg-green-500 w-fit px-3 py-1 hover:cursor-pointer hover:!bg-green-800"
          >
            Create
          </button>
        )}
      </div>
      <button
        className="hover:!text-red-500 px-2 py-1 h-fit m-1 font-bold text-xl"
        onClick={onclose}
      >
        X
      </button>
    </div>
  );
}

export default BoardModal;
