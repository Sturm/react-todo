import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import TodoItem from './TodoItem/TodoItem';
import database from "./../firebase";

const Todos = () => {
  const [todos, setTodos] = useState({});
  const [form, setForm] = useState({
    title: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database.ref("todos").on("value", snapshot => {
      //console.log(snapshot.val());
      setTodos(snapshot.val() || {});
      setLoading(false);
    })
  }, []);

  return (
    <>
      <h2> Add Task </h2>
      <Form
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          const newTodo = {
              timestamp: +new Date(),
              title: form.title,
              done: false,
            };

          setForm({
            title: "",
          });

          database.ref('todos').push(newTodo);
        }}
      >
        <Form.Group>
          <Form.Label htmlFor="title">
            Title:
          </Form.Label>
          <Form.Control
            id="title"
            name="title"
            type="text"
            value={form.title}
            placeholder="Please enter title"
            onChange={e => {
              setForm({
                title: e.target.value,
              })
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Add</Button>
      </Form>
      {loading && (
        <div>
          Loading...
        </div>
      )}
      <ul className="list-unstyled m-0">
        {Object.keys(todos).reverse().map((key) => {
          const todo = todos[key];
          return (
            <TodoItem
              key={key}
              todo={todo}
              changeDone={e => {
                database.ref(`todos/${key}/done`).set(e.target.checked);
              }}
              deleteTodo={() => {
                database.ref(`todos/${key}`).remove();
              }}
            />
          )
        })}
      </ul>
    </>
  )
};

export default Todos;
