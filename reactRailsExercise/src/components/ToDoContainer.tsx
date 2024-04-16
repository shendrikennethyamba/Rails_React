import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDo from "./ToDo";
import { Button, TextField } from "@c-fo/vibes";

type Todos = {
  id: number;
  title: string;
  body: string;
};

const addNewTodo = async (newTitle: string, newTask: string) => {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/todos", {
      title: newTitle,
      body: newTask,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new todo:", error);
    throw error;
  }
};

const fetchTodos = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/v1/todos.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

const ToDoContainer = () => {
  const [newTask, setNewTask] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [todos, setTodos] = useState<Todos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
      
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddNewTodo = async () => {
    try {
      const newTodo = await addNewTodo(newTitle, newTask);
      setTodos([...todos, newTodo]);
      setNewTask("");
      setNewTitle("");
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error("Error adding new todo:", error);
    }
  };

  return (
    <div>
      <div>
        <p aria-label="Title">Title</p>
        <TextField
          width="large"
          value={newTitle}
          mb={2}
          onChange={(e) => setNewTitle(e.target.value)}
          aria-label="New task title"
        />
        <div>
          <p aria-label="Body">Body</p>
          <TextField
            width="large"
            mb={1}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            aria-label="New task body"
          />
        </div>
        <Button
          appearance="primary"
          data-testid="hover"
          onClick={handleAddNewTodo}
          aria-label="Add new task"
        >
          Add Task
        </Button>
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
