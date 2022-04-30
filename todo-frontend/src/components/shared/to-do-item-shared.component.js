import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoService from "../../services/to-do.service"


const ToDoItemsShared = props => {
  const { uuid } = useParams();
  const [todos, setTodos] = useState([]);
  const [todo, _] = useState("");

  useEffect(() => {
    retrieveToDoItems(uuid);
  }, [uuid]);

  const retrieveToDoItems = (uuid) => {
    ToDoService.getAllTodosByUuid(uuid)
      .then(response => {
        setTodos(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="todo edit-form">
      <div className="outer">
        <label>
          <strong>Todo Items: </strong>
        </label>
      </div>

      <ul className="outer" style={{ padding: '1rem' }}>
        {todos.length ? todos.map(({ _id, task, completed }, i) => (
          <li
            className={completed ? "completed" : ""}
          >
            {task}
          </li>
        )) : <p>No Todos Yet :(</p>}
      </ul>
    </div>
  );
}

export default ToDoItemsShared;