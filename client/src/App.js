import React from 'react';
import Welcome from './components/Welcome'
import NavBar from './components/NavBar'
import './App.css';
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
    <NavBar />
    <Router>
      <Switch>

    <Welcome exact path="/" />
      </Switch>
    </Router>
    </>
  );
}

export default App;
