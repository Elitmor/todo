import { ChangeEvent } from 'react';
import { FilterValueType, TaskType } from '../app/App';
import { AddItemForm } from './addItemForm/AddItemForm';

type TodoListPropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValueType;
  addTask: (titleValue: string, todoListId: string) => void;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (filterValue: FilterValueType, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string,
  ) => void;
  removeTodoList: (todoListId: string) => void;
};

export const TodoList: React.FC<TodoListPropsType> = ({
  id,
  title,
  tasks,
  filter,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
  removeTodoList,
}) => {
  const handleFilterAll = () => {
    changeFilter('all', id);
  };

  const handleFilterActive = () => {
    changeFilter('active', id);
  };

  const handleFilterCompleted = () => {
    changeFilter('completed', id);
  };

  const handleRemoveTodoList = () => {
    removeTodoList(id);
  };

  const handleAddTask = (titleValue: string) => {
    addTask(titleValue, id);
  };

  return (
    <div>
      <h3>
        {title}
        <button onClick={handleRemoveTodoList}>×</button>
      </h3>
      <AddItemForm addItem={handleAddTask} />
      <ul>
        {tasks.map((task) => {
          const handleRemoveTask = () => {
            removeTask(task.id, id);
          };
          const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked, id);
          };
          return (
            <li
              className={task.isDone ? 'is-done' : ''}
              key={task.id}
            >
              <input
                onChange={handleChangeTask}
                type='checkbox'
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <button onClick={handleRemoveTask}>×</button>
            </li>
          );
        })}
      </ul>
      <button
        className={filter === 'all' ? 'active-filter' : ''}
        onClick={handleFilterAll}
      >
        All
      </button>
      <button
        className={filter === 'active' ? 'active-filter' : ''}
        onClick={handleFilterActive}
      >
        Active
      </button>
      <button
        className={filter === 'completed' ? 'active-filter' : ''}
        onClick={handleFilterCompleted}
      >
        Completed
      </button>
    </div>
  );
};
