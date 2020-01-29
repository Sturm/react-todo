import React from 'react';
import { Button, Card } from 'react-bootstrap';

const TodoItem = ({ todo: { id, title, description, done }, deleteTodo }) => (
  <>
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="danger" onClick={deleteTodo}>Delete</Button>
      </Card.Body>
    </Card>
  </>
);

export default TodoItem;
