import React, { useEffect, useState } from 'react';
import './App.css';
import Todos from "./Components/Todos";
import { Button, Container } from 'react-bootstrap';
import Navigation from './Components/Layout/Navigation';
import { auth } from "./firebase";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setUser(user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Navigation/>
      <Container>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/todos">
            <Todos user={user}/>
          </Route>
          <Route path="/">
            {!user && (
              <Button
                onClick={() => {
                  auth.signInAnonymously();
                }}>Sign In</Button>
            )}
            {user && (
              <Link
                to="/todos"
                className="btn btn-primary"
              >View Todos</Link>
            )}
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
