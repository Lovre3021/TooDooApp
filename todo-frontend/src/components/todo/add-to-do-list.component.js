import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoListService from "../../services/to-do-list.service";
import withAuth from "../withAuth.component";

const AddToDoList = () => {
  const initialToDoListState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [toDoList, setToDoList] = useState(initialToDoListState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setToDoList({ ...toDoList, [name]: value });
  };
  const saveToDoList = () => {
    var data = {
      title: toDoList.title,
      description: toDoList.description
    };
    ToDoListService.create(data)
      .then(response => {
        setToDoList({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const newToDoList = () => {
    setToDoList(initialToDoListState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newToDoList}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={toDoList.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={toDoList.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={saveToDoList} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default withAuth(AddToDoList);
