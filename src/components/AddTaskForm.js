import React from "react";
import { MdAdd, MdMode } from "react-icons/md";

const style = {
  accentColor: { backgroundColor: "var(--accent-clr)" },
  successColor: { backgroundColor: "var(--success-color)" },
};

const AddTaskForm = ({ taskInput, formSubmitHandler, isEditing }) => {
  return (
    <form className="list-form" onSubmit={(e) => formSubmitHandler(e)}>
      <label className="list-input-wrap" htmlFor="list-input">
        <input
          type="text"
          id="list-input"
          className="input-text"
          ref={taskInput}
          placeholder="&nbsp;"
        />

        <span className="placeholder">
          {!isEditing ? "Add New Task" : "Editing Task"}
        </span>
        <span className="icon"></span>
      </label>
      <button
        className="add-button"
        style={!isEditing ? style.accentColor : style.successColor}
        type="submit"
      >
        {!isEditing ? <MdAdd /> : <MdMode />}
      </button>
    </form>
  );
};

export default AddTaskForm;
