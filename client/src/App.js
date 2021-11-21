import React, {createContext, useReducer} from 'react'
import Navbar from './Components/Navbar';
import {Route, Switch} from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ErrorPage from './Components/ErrorPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Logout from './Components/Logout';

import {initialState, reducer} from '../src/reducer/UseReducer';


// 1- createContext
export const UserContext = createContext(); 

const Routing = () => {
  return(
    <Switch>
    <Route path="/" exact>
      <Home />
    </Route>

    <Route path="/about">
      <About />
    </Route>

    <Route path="/contact">
      <Contact />
    </Route>

    <Route path="/login">
      <Login />
    </Route>

    <Route path="/register">
      <Signup />
    </Route>

    <Route path="/logout">
      <Logout/>
    </Route>

    <Route>
      <ErrorPage />
    </Route>
    </Switch>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>

          <Navbar/>
          <Routing/>

    </UserContext.Provider>
    </>

  )
}

export default App