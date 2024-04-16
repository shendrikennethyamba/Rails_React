import { Button, ListCard, TextField } from "@c-fo/vibes";
import React, { useState } from "react";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  body: string;
};

const ToDo = ({ todo, setTodos }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo>({
    id: todo.id,
    title: todo.title,
    body: todo.body,
  });

  const deleteNewTodo = (id: number) => {
    axios
      .delete(`http://localhost:3001/api/v1/todos/${id}`)
      .then((response) => {
        console.log(response.data);
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const editTodo = (id: number) => {
    axios
      .put(`http://localhost:3001/api/v1/todos/${id}`, {
        title: editedTodo.title,
        body: editedTodo.body,
      })
      .then((response) => {
        console.log(response.data);
        setTodos((prevTodos) =>
          prevTodos.map((t) => (t.id === id ? { ...t, title: editedTodo.title, body: editedTodo.body } : t))
        );
      })
      .catch((error) => console.log(error));
    setIsEditing(!isEditing);
  };

  return (
    <div key={todo.id}>
      {isEditing ? (
        <ListCard
          mb={1}
          actions={
            <>
              <Button mr={1} primary small onClick={() => editTodo(todo.id)}>
                Save
              </Button>
              <Button small onClick={() => setIsEditing(!isEditing)} danger>
                Cancel
              </Button>
            </>
          }
          title={
            <TextField
              value={editedTodo.title}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, title: e.target.value })
              }
            />
          }
        >
          <TextField
            value={editedTodo.body}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, body: e.target.value })
            }
          />
        </ListCard>
      ) : (
        <ListCard
          mb={1}
          actions={
            <>
              <Button onClick={() => setIsEditing(true)} mr={1} primary small>
                Edit
              </Button>
              <Button small onClick={() => deleteNewTodo(todo.id)} danger>
                Delete
              </Button>
            </>
          }
          title={todo.title}
        >
          {todo.body}
        </ListCard>
      )}
    </div>
  );
};

export default ToDo;