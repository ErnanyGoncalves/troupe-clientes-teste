import { useState } from 'react';
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

  /** @TODO Por no local storage que o status de online e usa-lo na verificacao do redirect */

  const [data, setData] = useState([]);
  const [online, setOnline] = useState(false);

  const handleLogout = (ev: any) => {
    ev.preventDefault();
    setOnline(false);
  }

  return (
    <DataContext.Provider value={{ data, setData, online, setOnline }}>
      <NavbarTroupe>
        <h1>Clientes Troupe</h1>
        {online ? <Button onClick={handleLogout}>Sair</Button> : null}
      </NavbarTroupe>
      <BrowserRouter>
        <Switch>
          <Route path="/list">
            {!online ? <Redirect to="/" /> : <ClientList />}</Route>
          <Route path="/new">
            {!online ? <Redirect to="/" /> : <NewEditClientForm />}</Route>
          <Route path="/edit/:editId">
            {!online ? <Redirect to="/" /> : <NewEditClientForm />}
          </Route>
          <Route path="/"><LoginForm /></Route>
          <Route path="/:anythingElse">
            {!online ? <LoginForm /> : <ClientList />}</Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2500} />
    </DataContext.Provider>
  );
}

export default App;
