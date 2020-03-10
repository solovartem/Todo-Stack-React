import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import React from 'react';

// import './App.css';
import Menu from './template/menu';
import Routes from './main/routes';

function App() {
  return (
    <div className="container">
      <Menu />
      <Routes />
    </div>

  );
}

export default App;
