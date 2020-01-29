import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import TodoItem from './TodoItem/TodoItem';
import database from "./../firebase";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    title: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database.ref("todos").on("value", snapshot => {
      setTodos(snapshot.val() || []);
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
          const newTodos = [
            ...todos,
            {
              id: +new Date(),
              title: form.title,
              done: false,
            },
          ];

          setForm({
            title: "",
          });

          database.ref('todos').set(newTodos);
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
        {[...todos].reverse().map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={id => {
                setTodos(todos => todos.filter(todo => todo.id !== id))
                console.log("dd");
              }}
            />
          )
        })}
      </ul>
    </>
  )
};

export default Todos;
