import React, { useRef, useReducer, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import Alert from "./components/Alert";
import Tasks from "./components/Tasks";

const defaultState = {
  tasks: [],
  alert: { state: false, type: "", message: "" },
};

const reducer = (state, action) => {
  if (action.type === "ADD_TASK") {
    const newTasks = [...state.tasks, action.payload];
    const successAlert = {
      state: true,
      type: "success",
      message: "Task Added",
    };

    return {
      ...state,
      tasks: newTasks,
      alert: successAlert,
    };
  }

  if (action.type === "EDIT_TASK") {
    const taskIndex = state.tasks.findIndex(
      (task) => task.id === action.payload.id
    );

    state.tasks[taskIndex] = action.payload;

    const successAlert = {
      state: true,
      type: "success",
      message: "Task Edited",
    };

    return {
      ...state,
      alert: successAlert,
    };
  }

  if (action.type === "DELETE_TASK") {
    const newTaskList = state.tasks.filter(
      (task) => task.id !== action.payload.id
    );
    const dangerAlert = {
      state: true,
      type: "danger",
      message: `${action.payload.text} Task Deleted`,
    };

    return {
      ...state,
      tasks: newTaskList,
      alert: dangerAlert,
    };
  }

  if (action.type === "EMPTY_TASK") {
    const newAlert = {
      state: true,
      type: "danger",
      message: "Task Field is Empty",
    };

    return {
      ...state,
      alert: newAlert,
    };
  }

  if (action.type === "CLOSE_ALERT") {
    const defaultAlert = { state: false, type: "", message: "" };
    return {
      ...state,
      alert: defaultAlert,
    };
  }
};

const App = () => {
  const taskInput = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!taskInput.current.value) {
      dispatch({ type: "EMPTY_TASK" });
    } else if (isEditing && taskInput.current.value) {
      const editedTask = {
        id: taskInput.current.getAttribute("data-id-task"),
        text: taskInput.current.value,
      };

      dispatch({
        type: "EDIT_TASK",
        payload: editedTask,
      });

      setIsEditing(false);
      taskInput.current.value = "";
    } else {
      const newTask = {
        id: new Date().getTime().toString(),
        text: taskInput.current.value,
      };
      dispatch({ type: "ADD_TASK", payload: newTask });
      taskInput.current.value = "";
    }
  };

  const deleteTask = (id, text) => {
    dispatch({ type: "DELETE_TASK", payload: { id: id, text: text } });
  };

  const editTask = (id, text) => {
    setIsEditing(true);
    taskInput.current.value = text;
    taskInput.current.setAttribute("data-id-task", id);
  };

  const closeAlert = () => {
    dispatch({ type: "CLOSE_ALERT" });
  };

  return (
    <section className="main-app">
      <div className="title">
        <h1>To Do List</h1>
        <div className="line"></div>
        <h2>Using React UseReducer </h2>
      </div>

      <div className="list-app-container">
        <AddTaskForm
          taskInput={taskInput}
          state={state}
          formSubmitHandler={formSubmitHandler}
          isEditing={isEditing}
        />
        {state.alert.state && (
          <Alert alert={state.alert} closeAlert={closeAlert} />
        )}
        <div className="list-tasks">
          <ul>
            <Tasks
              tasks={state.tasks}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </ul>
        </div>
      </div>
    </section>
  );
};

export default App;
