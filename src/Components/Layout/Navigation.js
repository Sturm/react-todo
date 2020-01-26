import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand href="/">React Todo App</Navbar.Brand>
      </Navbar>
    )
  }
}
export default Navigation;