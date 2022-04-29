import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/authentication/auth.service";
import Login from "./components/authentication/login.component";
import Register from "./components/authentication/register.component";
import ToDoList from "./components/todo/to-do-list.component";
import AddToDoList from "./components/todo/add-to-do-list.component";
import ToDos from "./components/todo/to-do.component";
import ToDo from "./components/todo/to-do-item.component";
import ToDosShared from "./components/shared/to-do-shared.component";
import ToDoItemsShared from "./components/shared/to-do-item-shared.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
              Too Doo
          </Link>
          <div className="navbar-nav mr-auto">
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/to-do-lists"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
          </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/to-do-lists" element={<ToDoList/>} />
            <Route exact path="/add" element={<AddToDoList/>} />
            <Route path="/to-do-lists/:id" element={<><ToDos/><ToDo/></>} />
            <Route path="/to-do-lists/shared/:uuid" element={<><ToDosShared/><ToDoItemsShared/></>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
