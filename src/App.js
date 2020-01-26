import React from 'react';
import './App.css';
import Todos from "./Components/Todos";
import { Container } from 'react-bootstrap';
import Navigation from './Components/Layout/Navigation';

function App() {
  return (
    <>
      <Navigation/>
      <Container fluid>
        <Todos/>
      </Container>
    </>
  );
}

export default App;
