import React, { Component } from "react";
import "./App.css";
import ToDoContainer from "./components/ToDoContainer";
import { Balloon } from "@c-fo/vibes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>To Do List CRUD HTTP Request</h1>
        </div>
        <ToDoContainer />
      </div>
    );
  }
}

export default App;
