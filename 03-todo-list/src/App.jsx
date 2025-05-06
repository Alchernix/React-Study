import { useState } from "react";

let currentId = 2;

const initialTodos = [
  { id: 1, title: "dummy1", isDone: false },
  {
    id: 2,
    title: "dummy2",
    isDone: false,
  },
];

function Todo({ todo, handleToggleIsDone, handleDelete, handleUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

  let content = "";
  if (isEditing) {
    content = (
      <li>
        <input
          type="checkbox"
          checked={todo.isDone}
          name={todo.title}
          onChange={() => handleToggleIsDone(todo.id)}
        />
        <input
          type="text"
          autoFocus
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onBlur={() => {
            handleUpdate(todo.id, newTodoTitle);
            setIsEditing(false);
          }}
        />
        <div className="icon-container">
          <i
            className="fa-solid fa-trash"
            onClick={() => handleDelete(todo.id)}
          ></i>
        </div>
      </li>
    );
  } else {
    content = (
      <li>
        <input
          type="checkbox"
          name={todo.title}
          onClick={() => handleToggleIsDone(todo.id)}
        />
        <p className={todo.isDone ? "done" : "undone"}>{todo.title}</p>
        <div className="icon-container">
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => setIsEditing(true)}
          ></i>
          <i
            className="fa-solid fa-trash"
            onClick={() => handleDelete(todo.id)}
          ></i>
        </div>
      </li>
    );
  }
  return content;
}

export default function App() {
  const [todoList, setTodoList] = useState(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  function handleInput(e) {
    e.preventDefault();
    const newTodoList = [
      ...todoList,
      { id: ++currentId, title: newTodoTitle, isDone: false },
    ];
    setTodoList(newTodoList);
    setNewTodoTitle("");
  }

  function handleUpdate(todoId, newTodoTitle) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, title: newTodoTitle };
        } else {
          return todo;
        }
      })
    );
  }

  function handleToggleIsDone(todoId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });
    setTodoList(newTodoList);
  }

  function handleDelete(todoId) {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
  }

  return (
    <main>
      <h1>To Do List</h1>

      <form onSubmit={handleInput}>
        <input
          type="text"
          onChange={(e) => setNewTodoTitle(e.target.value)}
          value={newTodoTitle}
          required
        />
        <button type="submit">+</button>
      </form>

      <div>
        <ul>
          {todoList.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleToggleIsDone={handleToggleIsDone}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
