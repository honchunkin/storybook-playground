import React, { useState, useCallback } from "react";

const INITIAL_TASK = {
  title: "",
  isFinished: false,
  isPinned: false,
};

const useCreateTask = () => {
  const [newTask, setNewTask] = useState(INITIAL_TASK);
  console.log("%cuseCreateTask.jsx line:11 newTask", "color: white; background-color: #26bfa5;", newTask);

  const onFinishNewTaskClick = useCallback((isFinished) => setNewTask({ ...newTask, isFinished }), [newTask]);

  const onPinNewTaskClick = useCallback((isPinned) => setNewTask({ ...newTask, isPinned }), [newTask]);

  const onNewTaskTitleChange = useCallback((title) => setNewTask({ ...newTask, title }), [newTask]);

  const resetNewTask = useCallback(() => setNewTask(INITIAL_TASK), []);

  return { newTask, onFinishNewTaskClick, onPinNewTaskClick, onNewTaskTitleChange, resetNewTask };
};
export default useCreateTask;
