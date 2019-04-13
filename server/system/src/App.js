import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'


import Home from './components/home/home.js'
import './App.css';


class App extends Component {
  render() {
    return (
    <HashRouter>
      <Route path="/" component={Home}/>
    </HashRouter>
    );
  }
}

export default App;
