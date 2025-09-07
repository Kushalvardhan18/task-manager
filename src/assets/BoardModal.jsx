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
    <div className="fixed inset-0 !bg-black/50">
      <div className="flex border-1 flex-col justify-between  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-xl">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-semibold !text-blue-600">
            CREATE NEW BOARD
          </h1>
          <button
            className="hover:!text-red-800 px-2 py-1 h-fit m-1 font-bold text-2xl !text-red-500"
            onClick={onclose}
          >
            X
          </button>
        </div>
        <div className="flex flex-col p-2">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Board Name"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                className="border-1 px-2 py-1 focus:outline-none focus:border-amber-500 focus:border-1 rounded-sm "
              />
            </div>
            <div className="flex gap-2">
              <label>Color :</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            {name === "" ? (
              <button className=" !bg-green-300 w-fit px-5 py-2 cursor-not-allowed rounded-md">
                Create
              </button>
            ) : (
              <button
                onClick={() => {
                  board(), onclose();
                }}
                className="rounded-md !bg-green-500 w-fit px-5 py-2 hover:cursor-pointer hover:!bg-green-800"
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

export default BoardModal;
