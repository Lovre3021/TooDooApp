import http from "../http-common";

const getAll = () => {
  return http.get("/to-do-lists");
};

const get = (id) => {
  return http.get(`/to-do-lists/${id}`);
};

const getSharedPage = (uuid) => {
  return http.get(`/to-do-list/shared/${uuid}`);
};

const create = (data) => {
  return http.post("/to-do-lists", data);
};

const update = (id, data) => {
  return http.put(`/to-do-lists/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/to-do-lists/${id}`);
};

const removeAll = () => {
  return http.delete(`/to-do-lists`);
};

const findByTitle = (title) => {
  return http.get(`/to-do-lists?title=${title}`);
};

const ToDoListService = {
  getAll,
  get,
  getSharedPage,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
export default ToDoListService;
