import React,{Component} from 'react'
import { Button, Form, Input, Checkbox,Icon} from 'antd';
import Cookies from'./util/Cookies';

import './login.css';
const FormItem = Form.Item;

class Login extends Component{
  handleSubmit= (e) =>{
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      var params = {
        username: values.username,
        password: values.password,
        isRememberMe: values.isRememberMe,
      };
      this.login(params);
    });
  }

  login(params) {
    if(params.username==="admin" && params.username==="admin"){
      Cookies.set("username", params.username);
      Cookies.set("password", params.password);
      localStorage.isLogin = true;
      window.location.reload();
    }
  }
  render() {
    var username = Cookies.get("username");
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div className="g-hd">
          <div className="m-hd f-cb">
            <span className="u-logo"></span>
          </div>
        </div>
        <div className="g-loginbox">
          <div className="g-bd">
            <div className="m-loginbg" style={{height:document.body.clientHeight-46}}>
            </div>
            <div className="m-bgwrap" style={{ cursor: "pointer" }}></div>
            <div className="m-loginboxbg" ></div>
            <div className="m-loginbox">
              <div className="lbinner" id="J_body_bg">
                <div className="login-form">
                  <div className="login-hd">ADMIN 管理系统</div>
                  <div className="login_input">
                    <Form inline-block onSubmit={this.handleSubmit} form={this.props.form}>
                      
                      <FormItem>
                        {getFieldDecorator('username', {
                          initialValue: username ? username : "",
                          rules: [{required: true, message: 'Please input your username!'}],
                        })(
                          <Input  className="ipt ipt-user" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                 placeholder="username"/>
                        )}
                      </FormItem>
                      
                      <FormItem>
                        {getFieldDecorator('password', {
                          rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                          <Input className="ipt ipt-pwd" prefix={<Icon type="lock" style={{color: 'rgba(10,10,1,.25)'}}/>} type="password"
                                 placeholder="Password"/>
                        )}
                      </FormItem>
                      
                      <FormItem>
                        {getFieldDecorator('isRememberMe', {valuePropName: 'checked',initialValue: true,
                        })(
                          <Checkbox className="rem-checkbox" >Remember me</Checkbox>
                        )}
                      </FormItem>
    
                      <Button type="primary" size="large" className="ant-input u-loginbtn" htmlType="submit">登录</Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


Login = Form.create()(Login);
export default Login;