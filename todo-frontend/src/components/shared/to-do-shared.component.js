import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoListService from "../../services/to-do-list.service";

const ToDosShared = props => {
  const { uuid } = useParams();
  console.log(uuid);
  const initialSharedToDoListState = {
    id: null,
    title: "",
    description: "",
    published: false,
    uuid: "",
  };

  const [currentSharedToDoList, setCurrentSharedToDoList] = useState(initialSharedToDoListState);
  const getToDoList = uuid => {
    ToDoListService.getSharedPage(uuid)
      .then(response => {
        setCurrentSharedToDoList(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (uuid)
      getToDoList(uuid);
  }, [uuid]);

  return (
    <div>
      {currentSharedToDoList ? (
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                disabled
                className="form-control"
                id="title"
                name="title"
                value={currentSharedToDoList.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                disabled
                className="form-control"
                id="description"
                name="description"
                value={currentSharedToDoList.description || ''}
              />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <br />
        </div>
      )}
    </div>
  );
};

export default ToDosShared;