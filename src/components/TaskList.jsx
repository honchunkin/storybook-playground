import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import TaskHeader from "./TaskHeader";
import { Skeleton, Empty } from "antd";
import { connect } from "react-redux";
import { setFinishTask, setPinTask, changeTaskTitle, createTask, deleteTask } from "../lib/redux";
import useCreateTask from "./hooks/useCreateTask";
import NewTask from "./NewTask";

export const TasksList = ({
  loading,
  tasks,
  onPinTaskClick,
  onFinishTaskClick,
  onTitleChange,
  onCreateTask,
  onDeleteTask,
}) => {
  const { newTask, onFinishNewTaskClick, onPinNewTaskClick, onNewTaskTitleChange, resetNewTask } = useCreateTask();

  const events = {
    onPinTaskClick,
    onFinishTaskClick,
    onTitleChange,
    onDeleteTask,
  };

  const onSave = useCallback(() => {
    onCreateTask(newTask);
    resetNewTask();
  }, [newTask, onCreateTask, resetNewTask]);

  if (loading) {
    return (
      <React.Fragment>
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <Skeleton active />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  if (tasks.length === 0) {
    return <Empty />;
  }

  const tasksInOrder = [...tasks.filter((task) => task.isPinned), ...tasks.filter((task) => !task.isPinned)];

  return (
    <div>
      <TaskHeader />
      {tasksInOrder.map((task, index) => (
        <Task key={task.id} task={task} index={index + 1} {...events} />
      ))}
      <NewTask
        newTask={newTask}
        onFinishTaskClick={onFinishNewTaskClick}
        onPinTaskClick={onPinNewTaskClick}
        onTitleChange={onNewTaskTitleChange}
        onSave={onSave}
      />
    </div>
  );
};

TasksList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTaskChange: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTaskChange: PropTypes.func,
  onTitleChange: PropTypes.func,
  onCreateTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
};

TasksList.defaultProps = {
  loading: false,
};

export default connect(
  ({ tasks }) => ({
    // tasks: tasks.filter((t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"),
    tasks,
  }),
  (dispatch) => ({
    onFinishTaskClick: (id, isArchived) => dispatch(setFinishTask(id, isArchived)),
    onPinTaskClick: (id, isPinned) => dispatch(setPinTask(id, isPinned)),
    onTitleChange: (id, title) => dispatch(changeTaskTitle(id, title)),
    onCreateTask: ({ title, isFinished, isPinned }) => dispatch(createTask({ title, isFinished, isPinned })),
    onDeleteTask: (id) => dispatch(deleteTask(id)),
  })
)(TasksList);
