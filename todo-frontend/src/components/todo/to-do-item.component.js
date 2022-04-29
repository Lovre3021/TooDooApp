import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoService from "../../services/to-do.service"

const TodoItem = props => {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    retrieveToDoItems(id);
  }, [id]);

  const retrieveToDoItems = (id) => {
    ToDoService.getAllTodos(id)
      .then(response => {
        setTodos(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const createTodo = (e) => {
    e.preventDefault()
    if (!todo) {
      alert("please enter something");
      return;
    }
    const todoData = {
      task: todo,
      completed: false,
      listId: id,
    }
    ToDoService.createTodo(todoData).then(response => {
    setTodos([...todos, response.data]);
  }).catch(e => {
    console.log(e);
  });
};

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await ToDoService.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) { }
  };

  const updateTodo = async (e, id) => {  
    e.stopPropagation()
    const payload = { completed: !todos.find(todo => todo._id === id).completed }
    ToDoService.updateTodo(id, payload).then(response => {
    setTodos(todos.map((todo) => todo._id === id ? response.data : todo));
    }
    ).catch(e => {
      console.log(e);
    });
  };

  return (
    <div className="todo edit-form">
      <div className="outer">
        <label>
          <strong>ToDo Items: </strong>
        </label>
        <input
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
          placeholder="Enter a todo"
        />
        <button className="btn btn-outline-secondary inner" type="button" onClick={createTodo}>
          Add
        </button>
      </div>

      <ul className="outer" style={{ padding: '1rem' }}>
        {todos.length ? todos.map(({ _id, task, completed }, i) => (
          <li
            key={i}
            onClick={e => updateTodo(e, _id)}
            className={completed ? "completed" : ""}
          >
            {task} <button className="badge badge-warning inner" style={{ backgroundColor: 'red' }} onClick={e => deleteTodo(e, _id)}>X</button>
          </li>
        )) : <p>No Todos Yet :(</p>}
      </ul>
    </div>
  );
}

export default TodoItem;