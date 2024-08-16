import React, { useState, useEffect } from "react";
import img from "../assets/todo.png";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  try {
    return lists ? JSON.parse(lists) : [];
  } catch (error) {
    console.error("Error parsing local storage data", error);
    return [];
  }
};

const Todo = () => {
  const [todos, setTodos] = useState(getLocalData());
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (newTodo.trim() === "") {
      setError("Please write something");
      return;
    }

    if (editingIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex ? newTodo : todo
      );
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo("");
    setError("");
  };

  const handleEdit = (index) => {
    setNewTodo(todos[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);

    if (index === editingIndex) {
      setNewTodo("");
      setEditingIndex(null);
    }
  };

  const handleClearAll = () => {
    setTodos([]);
    setNewTodo("");
    setEditingIndex(null);
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddOrUpdate();
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="todo-container">
      <img src={img} alt="Todo" />

      <div className="searchbox">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search todos"
        />
      </div>

      <div className="inputbox">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="✍️ Add a new todo"
        />
        <button onClick={handleAddOrUpdate} className={editingIndex !== null ? "update-btn" : "add-btn"}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <p className="error-message">{error}</p>

      {filteredTodos.length > 0 && (
        <>
          <ul>
            {filteredTodos.map((todo, index) => (
              <li key={index}>
                <span className="todo-text">{todo}</span>
                <button onClick={() => handleEdit(index)} className="update-btn">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button onClick={() => handleDelete(index)} className="delete-btn">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </li>
            ))}
          </ul>
          <p className="todo-counter">Total items: {search ? filteredTodos.length : todos.length}</p>
          <button onClick={handleClearAll} className="clear-btn">
            Clear All
          </button>
        </>
      )}
    </div>
  );
};

export default Todo;
