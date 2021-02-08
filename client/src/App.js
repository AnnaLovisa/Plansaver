import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { TodosList, TodosUpdate } from './pages';
import { NotesUpdate } from './pages';
import Register from './containers/auth/Register';
import Login from './containers/auth/Login';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import './App.scss';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {

  return (
    <div className="App">
      <Provider store={ store }>
        <Router>         
          <Header />
          {/* <Navbar /> */}
          <Switch>
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            <PrivateRoute exact path="/dashboard/todos/list" component={ TodosList } />
            {/* <PrivateRoute exact path="/dashboard/todos/create" component={ TodosInsert } /> */}
            <PrivateRoute exact path="/dashboard/todos/update/:id" component={ TodosUpdate } />
            {/* <PrivateRoute exact path="/dashboard/user/todos" component={ TodosListByUser } /> */}
            {/* <PrivateRoute exact path="/dashboard/notes/list" component={ Notes }  /> */}
            {/* <PrivateRoute exact path="/dashboard/notes/create" component={ NotesInsert } /> */}
            <PrivateRoute exact path="/dashboard/notes/update/:id" component={ NotesUpdate } />
            {/* <PrivateRoute exact path="/dashboard/user/notes" component={ NotesByUser } /> */}
            {/* <PrivateRoute exact path="/dashboard/user/projects" component={Projects} /> */}
            {/* <PrivateRoute exact path="/dashboard/projects/project" component={ProjectCreate} /> */}
            {/* <PrivateRoute exact path="/dashboard/user/lists" component={Lists} /> */}
            {/* <PrivateRoute exact path="/dashboard/lists/list" component={ListCreate} /> */}
          </Switch>
        </Router>
      </Provider>
    </div>
  );
  }
}

export default App;

