import React, { Component } from 'react';


import Login from '../login/login'
import Table from "../table/table";
import './home.css';


class App extends Component {
  constructor (props, context){
    super(props, context)
    this.loginCallback = this.loginCallback.bind(this);

    this.state = {
      // login 0 未登录, 1 已登录
      login: 0,
    }
  }

  loginCallback() {
    this.setState({
      login: 1,
    })
  }

  

  render() {
    const { login } = this.state;
    return (
      <div className="App">
        <h1 className="title">点餐系统后台</h1>
        {!login ? <Login loginCallback={this.loginCallback} /> : (
          <Table />
        )}
      </div>
    );
  }
}

export default App;
