import React, { Component } from 'react';

import './login.css';
import ajax from '../../ajax';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor (props, context){
    super(props, context)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      code: 1,
      message: 'password wrong',
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        ajax('get', `http://127.0.0.1:7001/api/accounts/login?account=${values.userName}&password=${values.password}`).then(e => {
          if (e) {
            const result = JSON.parse(e);
            console.log(result)
            if (result.success) {
              this.props.loginCallback()
            } else {
              this.setState({
                code: 0
              })
            }
          }
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { code, message } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
        <p hidden={code === 1}>{message}</p>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default WrappedNormalLoginForm;

