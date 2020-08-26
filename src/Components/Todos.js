import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import TodoItem from './TodoItem/TodoItem';
import database from "./../firebase";
import { Redirect } from 'react-router-dom';

const Todos = ({ user }) => {
  const userTodoPath = `todos/${user.uid}`;
  const [todos, setTodos] = useState({});
  const [form, setForm] = useState({
    title: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database.ref(userTodoPath).on("value", snapshot => {
      setTodos(snapshot.val() || {});
      setLoading(false);
    })
  }, [userTodoPath]);

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

          database.ref(userTodoPath).push(newTodo);
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
                database.ref(`${userTodoPath}/${key}/done`).set(e.target.checked);
              }}
              deleteTodo={() => {
                database.ref(`${userTodoPath}/${key}`).remove();
              }}
            />
          )
        })}
      </ul>
    </>
  )
};

const withAuth = (Todos) => {
  return (props) => {
    if (props.user === false) {
      return (
        <>Loading...</>
      )
    }

    if (!props.user) {
      return (
        <Redirect to="/"/>
      )
    }

    return (
      <Todos {...props} />
    )
  }
};

export default withAuth(Todos);
