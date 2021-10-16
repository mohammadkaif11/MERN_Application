import React from 'react';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/note/NoteState';
import Login from './components/Login';
import Singup from './components/Singup';

function App() {
  return (
  <>
  <NoteState>
  <Router>
  <Navbar/>
    <Switch>
     <Route exact path="/">
       <Home/>
    </Route> 
    <Route exact path="/about">
       <About/>
    </Route> 
    <Route exact path="/login">
       <Login/>
    </Route> 
    <Route exact path="/singup">
      <Singup/>
    </Route> 
 
    </Switch>
  </Router>
  </NoteState>
  </>
 );
}

export default App;
