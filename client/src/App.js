import React from 'react';
import Welcome from './components/Welcome'
import NavBar from './components/NavBar'
import Stats from './components/Stats'
import './App.css';
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
          <Welcome />
          </Route>
          <Route path="/stats/:id">
          <Stats />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
