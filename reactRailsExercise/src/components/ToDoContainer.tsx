import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDo from "./ToDo";
import { Button, TextField, Text, ZebraBase } from "@c-fo/vibes";

type Todos = {
  id: number;
  title: string;
  body: string;
};

const fetchTodos = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/v1/todos.json");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ToDoContainer = () => {
  const [newTask, setNewTask] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [todos, setTodos] = useState<Todos[]>([]);
  const [errors, setErrors] = useState<string>("");

  const addNewTodo = async (newTitle: string, newTask: string) => {
    try {
      if (newTitle && newTask) {
        const response = await axios.post(
          "http://localhost:3001/api/v1/todos",
          {
            title: newTitle,
            body: newTask,
          }
        );
        setErrors("");
        return response.data;
      } else {
        setErrors("10 characters minimum");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAddNewTodo = async () => {
    try {
      await addNewTodo(newTitle, newTask);

      setNewTask("");
      setNewTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <p aria-label="Title">Title</p>
        <TextField
          width="large"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          aria-label="New task title"
        />
        <div>
          {errors ? (
            <Text color="alert" mb={3}>
              {errors}
            </Text>
          ) : null}
          <p aria-label="Body">Body</p>
          <TextField
            width="large"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            aria-label="New task body"
          />
        </div>
        {errors ? (
          <Text color="alert" mb={3}>
            {errors}
          </Text>
        ) : null}
        <div>
          <Button
            appearance="primary"
            data-testid="hover"
            onClick={handleAddNewTodo}
            aria-label="Add new task"
          >
            Add Task
          </Button>
        </div>
      </div>
      <div>
        {todos.map((todo: Todos) => (
          <ToDo setTodos={setTodos} todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
};

export default ToDoContainer;
