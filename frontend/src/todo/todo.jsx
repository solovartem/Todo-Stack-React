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

  handleAdd() {
    const inputDesc = document.getElementById("description").value;
    if (!inputDesc) return false;
    const description = this.state.description;

    return typeof this.state.id === "number"
      ? this.putTodo(description)
      : this.add(description);
  }

  async add(description) {
    return await Axios.post(URL.concat("todo"), {
      description
    }).then(resp => {
      if (resp.data.erro) {
        console.log(resp.data.erro.msg);
        return false;
      }

      return this.refresh();
    });
  }

  async putTodo(description) {
    const reqEdit = await Axios.put(`${URL}todo/${this.state.id}`, {
      description
    }).then(resp => {
      if (resp.data.erro) {
        console.log(resp.data.msg);
        return false;
      }

      this.state.id = null;
      return this.refresh();
    });
    return reqEdit;
  }

  async refresh(todo = {}) {
    return await Axios.get(URL.concat("todo")).then(listen =>
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
    await Axios.delete(`${URL}todo/${todo.id}`).then(resp => this.refresh());
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
