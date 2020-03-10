import React from "react";

export default props => {
  return (
    <nav>
      <div className="d-flex bg-dark py-3 border rounded">
        <div className="navbar-header">
          <a href="#/todos" className="navbar-brand text-light">
            <i className="fa fa-calendar-check-o mx-3"></i>TodoApp
          </a>
        </div>
        <div id="navbar" className="navbar-collapse align-self-center">
          <ul className="nav text-light">
            <li>
              <a href="#/todos" className="text-light mx-4">
                Tarefas
              </a>
            </li>
            <li>
              <a className="text-light" href="#/about">
                Sobre
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
