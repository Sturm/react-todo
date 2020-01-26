import React, { Component } from 'react';
import TodoItem from "./TodoItem/TodoItem";
import { Button, Col, Form, Row } from 'react-bootstrap';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      done: false,
    };

    this.lastId = 0;
    this.addTodo = this.addTodo.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
  }

  componentDidMount() {
    const exampleTodo = {
      id: this.lastId,
      title: "Hello",
      completed: false,
      description: "Example Description"
    };
    this.setState({ todos: [...this.state.todos, exampleTodo] });
  }

  deleteTodo(id) {
    this.setState({ todos: this.state.todos.filter(item => item.id !== id) });
  }

  getTodos() {
    return this.state.todos.map(todo => {
      return <TodoItem key={todo.id} todo={todo} deleteTodo={this.deleteTodo.bind(this, todo.id)}/>
    });
  }

  addTodo(ev) {
    ev.preventDefault();
    const { title, description } = ev.target;

    if (!title.value || !description.value) {
      return;
    }

    this.lastId = this.lastId + 1;
    const todo = {
      id: this.lastId,
      title: title.value,
      done: this.state.done,
      description: description.value,
    };
    this.setState({ todos: [...this.state.todos, todo] });
    ev.target.reset();
  }

  toggleDone(ev) {
    const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    this.setState({ done: value });
  }

  render() {
    const todosElements = this.getTodos();
    return (
      <>
        <Row className="pt-4">
          <Col xs={12} sm={12} md={12} lg={6}>
            <ul className="list-unstyled m-0">
              {todosElements}
            </ul>
            <h2>Add Task</h2>
            <Form onSubmit={this.addTodo}>
              <Form.Group>
                <Form.Label htmlFor="title">
                  Title:
                </Form.Label>
                <Form.Control id="title" name="title" type="text" placeholder="Please enter title"/>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="description">
                  Description:
                </Form.Label>
                <Form.Control id="description"
                              name="description"
                              type="text"
                              placeholder="Please enter short description"/>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="completed">
                  Completed?:
                </Form.Label>
                <Form.Check id="completed" name="completed" type="checkbox"
                            checked={this.state.done} onChange={this.toggleDone}/>
              </Form.Group>
              <Button variant="primary" type="submit">Add</Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

export default Todos;
