import React from 'react';
import LoginForm from './LoginForm';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './App.css';
import NewEditClientForm from './NewEditClientForm';
import ClientList from './ClientList';

function App() {
  return (
    <BrowserRouter>
      <Switch>  
        <Route path="/list"><ClientList /></Route>
        <Route path="/new"><NewEditClientForm /></Route>
        <Route path="/edit/:id"><NewEditClientForm /></Route>
        <Route path="/"><LoginForm /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
