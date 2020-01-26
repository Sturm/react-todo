import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

class TodoItem extends Component {
  render() {
    const { id, title, description, done } = this.props.todo;
    const todoContent = (
      <>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="danger" onClick={this.props.deleteTodo.bind(id)}>Delete</Button>
      </>
    );

    if (done) {
      return (
        <li className="pb-4">
          <Card>
            <Card.Body>
              <s>
                {todoContent}
              </s>
            </Card.Body>
          </Card>
        </li>
      )
    } else {
      return (
        <li className="pb-4">
          <Card>
            <Card.Body>
              {todoContent}
            </Card.Body>
          </Card>
        </li>
      )
    }
  }
}

export default TodoItem;
