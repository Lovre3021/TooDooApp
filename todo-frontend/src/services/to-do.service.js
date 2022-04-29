import http from "../http-common";

const getAllTodos = (listId) => {
  return http.get(`/todos/${listId}`);
};

const getAllTodosByUuid = (uuid) => {
  return http.get(`/todos/${uuid}`);
};

const createTodo = (data) => {
  return http.post(`/todos`, data);
};

const updateTodo = (id, payload) => {
  return http.put(`/todos/${id}`, payload);
};

const deleteTodo = (id) => {
  return http.delete(`/todos/${id}`);
};

const ToDoService = {
  createTodo,
  deleteTodo,
  updateTodo,
  getAllTodos,
  getAllTodosByUuid
};
export default ToDoService;


// import axios from "axios";

// const API_URL="http://localhost:8080/todos/"

// async function createTodo(task, listId) {
//   const { data: newTodo } = await axios.post(API_URL, {
//     task, listId
//   });
//   return newTodo;
// }

// async function deleteTodo(id) {
//   const message = await axios.delete(`${API_URL}${id}`);
//   return message;
// }

// async function updateTodo(id, payload) {
//   const {data:newTodo} = await axios.put(`${API_URL}${id}`, payload);
//   return newTodo;
// }

// async function getAllTodos(listId) {
//   const { data: todos } = await axios.get(`${API_URL}${listId}`);
//   return todos;
// }

// async function getAllTodosByUuid(uuid) {
//   const { data: todos } = await axios.get(`${API_URL}${uuid}`);
//   return todos;
// }


// export default { createTodo, deleteTodo, updateTodo, getAllTodos, getAllTodosByUuid };