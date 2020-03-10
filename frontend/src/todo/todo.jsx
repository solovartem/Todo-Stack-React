import React, { Component } from "react";
import Axios from "axios";
// import validator from "validator";

import PageHeader from "../template/pageHeader";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
const URL = "http://localhost:3003/";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", list: [] };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggleMark = this.handleToggleMark.bind(this);
    this.refresh();
  }

  async handleAdd() {
    const inputDesc = document.getElementById("description").value;
    if (!inputDesc) return false;
    const description = this.state.description;
    const putTodo = await Axios.put(`${URL}putTodo/${this.state.id}`, {
      description
    }).then(
      resp => this.refresh()

      // !resp.data.error ? this.refresh() : console.log(resp.data.msg)
    );

    if (typeof this.state.id === "number") {
      return putTodo;
    }
    return await Axios.post(URL.concat("add"), {
      description
    }).then(resp =>
      !resp.data.error ? this.refresh() : console.log(resp.data.msg)
    );
  }

  async refresh(todo = {}) {
    Axios.get(URL.concat("list")).then(listen =>
      todo.mark
        ? this.setState({
            description: todo.description,
            id: todo.id,
            list: listen.data
          })
        : this.setState({ ...this.state, description: "", list: listen.data })
    );
  }

  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value });
  }

  async handleRemove(todo) {
    await Axios.delete(`${URL}delete/${todo.id}`).then(resp => this.refresh());
  }

  async handleToggleMark(todo) {
    return await Axios.put(`${URL}putMark/${todo.id}`)
      .then(resp => {
        this.refresh(todo);
      })
      .then(e => {});
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro"></PageHeader>
        <TodoForm
          description={this.state.description}
          handleAdd={this.handleAdd}
          handleChange={this.handleChange}
        />
        <TodoList
          list={this.state.list}
          handleRemove={this.handleRemove}
          handleToggleMark={this.handleToggleMark}
        />
      </div>
    );
  }
}
