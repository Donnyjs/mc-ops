import { Button, Form, Input, notification } from 'antd';
import React from 'react';
import '../../node_modules/antd/dist/antd.min.css'
import '../css/login.css'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    const {username, password} = values
    if (username === 'admin' && password === 'qsqdqdq123') {
      localStorage.setItem("token", "qwert")
      navigate("/sandBox")
    } else {
      notification.open({
        message: '',
        description:
          '账号或密码错误',
        style: {
           width: 150,
           height: 60,
        },
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    
  };
  return (
    <div id="login">
        <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 6,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
  
