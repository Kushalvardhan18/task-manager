import React from "react";
import edit from "../assets/edit.svg";
const TaskColumn = ({
  title,
  status,
  color,
  onDrop,
  onDragStart,
  onDelete,
  tasks,
  onEdit
}) => {
   return (
    <div
      className="w-md m-2 p-2 rounded-md shadow-sm"
      style={{ boxShadow: `0 0 5px ${color}` }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, status)}
    >
      <h2 className="text-center text-3xl font-medium mb-5" style={{ color }}>
        {title}
      </h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex my-2 w-full !bg-white rounded-md justify-between overflow-hidden"
        >
          <ul
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            className="p-2 font-bold w-[95%] overflow-hidden text-2xl !bg-white"
            style={{ color}}
          >
            {task.title}
          </ul>
          <div className="flex gap-5 !bg-white overflow-hidden w-fit">
            <img
              src={edit}
              alt="Edit"
              width={20}
              className="!bg-white cursor-pointer transform transition-transform duration-200 hover:scale-110 "
              onClick={() => onEdit(task.id)}
            />
            <button
              className="!text-red-500 !bg-white mr-5 font-extrabold text-3xl cursor-pointer hover:!text-red-800 duration-500"
              onClick={() => onDelete(task.id)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskColumn;
