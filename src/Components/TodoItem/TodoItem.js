import React from 'react';
import { Button, Card } from 'react-bootstrap';

const TodoItem = ({ todo: { id, title, description, done }, deleteTodo, changeDone }) => (
  <>
    <Card className="my-4">
      <Card.Body>
        <Card.Title>
          {done ? (
            <s>{title}</s>
          ) : title
          }
        </Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="danger" onClick={deleteTodo}>Delete</Button>
        <label>
          Complete
          <input type="checkbox" className="form-check p-4" checked={done} onChange={changeDone}/>
        </label>
      </Card.Body>
    </Card>
  </>
);

export default TodoItem;
