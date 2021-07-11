import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { BrowserRouter, Switch, Route, useHistory, Redirect } from "react-router-dom";

import './App.css';
import NewEditClientForm from './NewEditClientForm';
import ClientList from './ClientList';
import DataContext from './DataContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavbarTroupe } from './StyledComponents';
import { Button } from 'semantic-ui-react';

function App() {
  const [data, setData] = useState([]);
  const [online, setOnline] = useState(window.localStorage.getItem("user") ? true : false);

  const handleLogout = (ev: any) => {
    ev.preventDefault();
    setOnline(false);
    localStorage.removeItem('user');
  }

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setOnline(true);
    }
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, online, setOnline }}>
      <NavbarTroupe>
        <h1>Clientes Troupe</h1>
        {online ? <Button onClick={handleLogout}>Sair</Button> : null}
      </NavbarTroupe>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><LoginForm /></Route>
          <Route path="/list">
            {!online ? <Redirect to="/" /> : <ClientList />}</Route>
          <Route path="/new">
            {!online ? <Redirect to="/" /> : <NewEditClientForm />}</Route>
          <Route path="/edit/:editId">
            {!online ? <Redirect to="/" /> : <NewEditClientForm />}
          </Route>
          <Route path="*">
            {!online ? <Redirect to="/" /> : <Redirect to="/list" />}</Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2500} />
    </DataContext.Provider>
  );
}

export default App;
