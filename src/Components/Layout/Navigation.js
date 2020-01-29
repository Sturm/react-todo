import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">React Todo App</Navbar.Brand>
        </Container>
      </Navbar>
    )
  }
}
export default Navigation;