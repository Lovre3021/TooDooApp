import React, { useState, useEffect } from "react";
import ToDoListService from "../../services/to-do-list.service";
import "bootstrap/dist/css/bootstrap.min.css";
import withAuth from "../withAuth.component";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [toDoList, setToDoList] = useState([]);
  const [currentToDoList, setCurrentToDoList] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  useEffect(() => {
    retrieveToDoLists();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveToDoLists = () => {
    ToDoListService.getAll()
      .then(response => {
        setToDoList(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveToDoLists();
    setCurrentToDoList(null);
    setCurrentIndex(-1);
  };


  const setActiveToDoList = (toDoList, index) => {
    setCurrentToDoList(toDoList);
    setCurrentIndex(index);
  };

  const removeAllToDoLists = () => {
    ToDoListService.removeAll()
      .then(() => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ToDoListService.findByTitle(searchTitle)
      .then(response => {
        setToDoList(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>To Do List</h4>
        <ul className="list-group">
          {toDoList &&
            toDoList.map((toDoList, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveToDoList(toDoList, index)}
                key={index}
              >
                {toDoList.title}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllToDoLists}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentToDoList ? (
          <div>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentToDoList.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentToDoList.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentToDoList.published ? "Published" : "Pending"}
            </div>
            <Link
              to={"/to-do-lists/" + currentToDoList.id}
              className="badge badge-warning"
              style={{color: 'black'}}
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a To Do List...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(TodoList);
