import { useState } from 'react';
import LoginForm from './LoginForm';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './App.css';
import NewEditClientForm from './NewEditClientForm';
import ClientList from './ClientList';
import DataContext from './DataContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Switch>
          <Route path="/list"><ClientList /></Route>
          <Route path="/new"><NewEditClientForm /></Route>
          <Route path="/edit/:editId"><NewEditClientForm /></Route>
          <Route path="/"><LoginForm /></Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2500} />
    </DataContext.Provider>
  );
}

export default App;
