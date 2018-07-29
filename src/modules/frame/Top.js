import React,{ Component } from 'react';
import {Icon} from "antd";


import AddWin from '../forgetPwd'

class Top extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      title: "",
    };
    this.signOut=this.signOut.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.showModal =this.showModal.bind(this);
    this.hideModal =this.hideModal.bind(this);
  }

  signOut(e) {
    localStorage.clear();
    window.location.reload();
  }

  toggleMenu() {
    this.props.toggleMenu();
  }

  showModal() {
    this.setState({
        visible: true,
        title: "修改密码",
    });
  }

  handleOk() {
  
  }

  handleCancel() {
    var state = {visible: false}
    this.setState(state);
  }



  hideModal() {
    this.setState({
        visible: false,
        title: "",
    });
  }


  render() {
    var fold = this.props.fold;
    var me = this;
    return (
      <div className="main-header">
        <div className="logo">
          <span className="logo-mini"></span>
          <span className="logo-lg"></span>
        </div>

        <div className="navbar navbar-static-top">
          <a href="#" className="sidebar-toggle" onClick={this.toggleMenu}>
            <Icon type={`${ fold ? 'menu-unfold' : 'menu-fold'}`}/>
            <span className="system-name">Admin System</span>
          </a>

          <div className="navbar-custom-menu">
            <div className="fn-right right-block">
              欢迎您，{window.Cookies.get("username")}
              <a onClick={this.signOut}>
                <Icon type="logout"/> 注销
              </a>
              <i className="anticon anticon-edit"></i>
              <a style={{display: "inline-block", marginLeft: '5px'}} onClick={this.showModal.bind(this, window.Cookies.get("id"))}>
                 修改密码
              </a>
            </div>

          </div>
        </div>

        <AddWin ref="AddWin" visible={this.state.visible} title={this.state.title} hideModal={me.hideModal}/>
      </div>
    )
  }
}
export default Top;