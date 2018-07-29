import React from 'react';
import {Menu} from 'antd';

import Reflux from 'reflux';
import AppActions from './actions/AppActions';
import MenuStore from './stores/MenuStore';

var SubMenu = Menu.SubMenu;
var data = [
    {
    "value": 1,
    "parentId": null,
    "label": "产品管理",
    "scriptId": "productManage",
    "iconCls": "icon-chanpinguanli",
    "children": [{
        "value": 2,
        "parentId": 1,
        "label": "普通产品",
        "name": "userm",
        "url": "urlx",
        "iconCls": "",
        "scriptId": "product",
      }, {
        "value": 3,
        "parentId": 1,
        "label": "高级产品",
        "name": "userm",
        "url": "url",
        "iconCls": "",
        "scriptId": "vipProduct",
        "sort": 2
      }]
    },{
    "value": 1,
    "parentId": null,
    "label": "系统管理",
    "scriptId": "systemManage",
    "iconCls": "icon-xitongguanli",
    "children": [{
        "value": 2,
        "parentId": 1,
        "label": "用户管理",
        "name": "userm",
        "url": "urlx",
        "iconCls": "",
        "scriptId": "userManage",
      }, {
        "value": 3,
        "parentId": 1,
        "label": "角色管理",
        "name": "userm",
        "url": "url",
        "iconCls": "",
        "scriptId": "role",
        "sort": 2
      },{
        "value": 4,
        "parentId": 1,
        "label": "权限管理",
        "name": "userm",
        "url": "privileges",
        "iconCls": "",
        "scriptId": "privileges",
        "sort": 2
      }]

}];


class SideBar extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "workbench",
      menuData: data
    }
    this.store = MenuStore;
    this.handleClickWhenFold = this.handleClickWhenFold.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpenChange = this.handleOpenChange.bind(this);
  }

  componentDidMount() {
    AppActions.initMenu();
  }


  getMenuByData() {
    var SubMenuNodes = [];
    if (this.state.menuData.length) {
      SubMenuNodes = this.state.menuData.map((item) => {
        if (item.children) {
          let itemNodes = item.children && item.children.map((child) => {
            if (!child.children) {
              return (<Menu.Item key={child.scriptId} tabName={child.label} tabId={child.scriptId}>
                       {child.label}
                      </Menu.Item>)
            } else {
              var childChild = child.children;
              let childrenNodes = childChild.map((son) => {
                return (<Menu.Item key={son.scriptId} tabName={son.label} tabId={son.scriptId}>
                         {son.label}
                        </Menu.Item>)
              });
              return (<SubMenu key={child.scriptId}
                                title={
                                 <span><i className={`iconfont ${child.iconCls}`}></i>
                                   <span className="menu-text">
                                     {child.label}
                                   </span>
                                 </span>
                                }>
                {childrenNodes}
                </SubMenu>);
            }
          });
          return (
            <SubMenu key={item.scriptId}
                     title={<span>
                              <i className={`iconfont ${item.iconCls}`}></i>
                              <span className="menu-text">{item.label}</span>
                            </span>}>
              {itemNodes}
            </SubMenu>);
        } else {
          return (
            <Menu.Item key={item.scriptId} tabName={item.label} tabId={item.scriptId}>
              <i className={`iconfont ${item.iconCls}`}></i>
              <span className="menu-text">{item.label}</span>
            </Menu.Item>);
        }
      });
    }
    return SubMenuNodes;
  }

  render() {
    var SubMenuNodes = this.getMenuByData();
    return (
      <div>
        <div onClick={this.handleClickWhenFold}>
          <Menu onClick={this.handleClick} 
                onOpenChange={this.handleOpenChange}
                style={{width: '100%'}}
                selectedKeys={[this.state.current]}
                mode="inline">
            {SubMenuNodes}
          </Menu>
        </div>
      </div>
    )
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
    AppActions.setTabActiveKey(e.item.props.tabName, e.item.props.tabId);
  }

  handleOpenChange(e) {
    this.setState({
      openKeys: e.openKeys
    });
  }


  handleClickWhenFold() {
    if (this.props.fold) {
      this.toggleMenu();
    }
  }


  toggleMenu() {
    this.setState({
      openKeys: null
    });
    this.props.toggleMenu();
  }
}
export default SideBar;


