import React from 'react';
import logo from './logo.svg';
import './components/header/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js';
import { BrowserRouter, Route } from 'react-router-dom'
import $ from 'jquery';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route path="/">
      <Header/>
      <h1>Hello world</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
