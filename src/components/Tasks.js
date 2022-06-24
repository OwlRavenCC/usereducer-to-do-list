import React from "react";
import { MdMode, MdDelete } from "react-icons/md";

const style = {
  danger: { color: "var(--danger-color)" },
  success: { color: "var(--success-color)" },
};

const Tasks = ({ tasks, deleteTask, editTask }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <li className="task" key={task.id}>
            <span className="text"> {task.text} </span>
            <span
              className="icon"
              style={style.success}
              onClick={() => editTask(task.id, task.text)}
            >
              <MdMode />
            </span>
            <span
              className="icon"
              style={style.danger}
              onClick={() => deleteTask(task.id, task.text)}
            >
              <MdDelete />
            </span>
          </li>
        );
      })}
    </>
  );
};

export default Tasks;
