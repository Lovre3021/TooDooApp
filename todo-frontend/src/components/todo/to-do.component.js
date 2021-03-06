import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoListService from "../../services/to-do-list.service";
import ToDoService from "../../services/to-do.service";
import { v4 as uuidv4 } from 'uuid';
import withAuth from "../withAuth.component";

const Todo = props => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialToDoListState = {
    id: null,
    title: "",
    description: "",
    published: false,
    uuid: "",
  };

  const [currentToDoList, setCurrentToDoList] = useState(initialToDoListState);
  const [message, setMessage] = useState("");
  const [todos, setTodos] = useState([]);
  const getToDoList = id => {
    ToDoListService.get(id)
      .then(response => {
        setCurrentToDoList(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getToDoList(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentToDoList({ ...currentToDoList, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentToDoList.id,
      title: currentToDoList.title,
      description: currentToDoList.description,
      published: status,
    };

    ToDoListService.update(currentToDoList.id, data)
      .then(response => {
        setCurrentToDoList({ ...currentToDoList, published: status });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateToDoList = () => {
    ToDoListService.update(currentToDoList.id, currentToDoList)
      .then(response => {
        setMessage("The Todo list was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteToDoList = () => {
    ToDoListService.remove(currentToDoList.id)
      .then(response => {
        navigate("/to-do-lists");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const generateSharedLink = () => {
    ToDoListService.get(id).then(response => {
    if (!response.data?.uuid) {
    let uuid = uuidv4();
    currentToDoList.uuid = uuid;
    let sLink = "http://localhost:8081/to-do-lists/shared/" + uuid;

    const updatedTodo = ToDoService.updateTodo(id);
    setTodos(todos.map((todo) => todo._id === id ? updatedTodo : todo));

    ToDoListService.update(currentToDoList.id, currentToDoList)
      .then(() => {
        setMessage("The Todo list was updated successfully!");
        navigator.clipboard.writeText(sLink);
        alert("Shared link generated :" + sLink);
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      let sLink = "http://localhost:8081/to-do-lists/shared/" + response.data.uuid;
      navigator.clipboard.writeText(sLink);
      alert("Shared link generated :" + sLink);
    }
    })
  };

  return (
    <div>
      {currentToDoList ? (
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentToDoList.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentToDoList.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentToDoList.published ? "Completed" : "Pending"}
            </div>
          </form>
          {currentToDoList.published ? (
            <button
              className="badge badge-primary mr-2"
              style={{backgroundColor:"Darkred" , color:"White"}}
              onClick={() => updatePublished(false)}
            >
              Uncomplete
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              style={{backgroundColor:"Green" , color:"White"}}
              onClick={() => updatePublished(true)}
            >
              Completed
            </button>
          )}
          <button className="badge badge-danger mr-2"
           onClick={deleteToDoList}
           style={{backgroundColor:"Red" , color:"White"}}
           >
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            style={{backgroundColor:"Blue" , color:"White"}}
            onClick={updateToDoList}
          >
            Update
          </button>
          <button
            type="submit"
            className="badge badge-success"
            style={{backgroundColor:"Coral" , color:"White"}}
            onClick={generateSharedLink}
          >
            Share
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Todo list...</p>
        </div>
      )}
    </div>
  );
};

export default withAuth(Todo);