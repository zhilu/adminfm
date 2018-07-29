import Reflux from 'reflux';
import AppActions from '../actions/AppActions';

var data = [{
  "value": 1,
  "parentId": null,
  "label": "系统管理",
  children: [{
    "value": 2,
    "parentId": 1,
    "label": "用户管理",
    "name": "userm",
    "url": "url",
    "iconCls": "",
    "scriptId": "sysUserManage",
    "sort": 1
  },{
    "value": 3,
    "parentId": 1,
    "label": "角色管理",
    "name": "userm",
    "url": "url",
    "iconCls": "",
    "scriptId": "role",
    "sort": 2
  }]
},
  {
    "value": 4,
    "parentId": null,
    "label": "产品管理",
    children: [{
      "value": 2,
      "parentId": 1,
      "label": "好",
      "name": "userm",
      "url": "url",
      "iconCls": "",
      "scriptId": "good",
      "sort": 1
    },{
      "value": 5,
      "parentId": 1,
      "label": "坏",
      "name": "userm",
      "url": "url",
      "iconCls": "",
      "scriptId": "bad",
      "sort": 2
    }]
  },
  {
    "value": 6,
    "parentId": null,
    "label": "last",
    "name": "测试",
    "url": "url",
    "iconCls": "",
    "scriptId": "last",
    "sort": 1
  }];

class MenuStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables=AppActions;
  }

  onInitMenu() {
    this.queryData();
  }

  queryData() {
    this.menuData = data;
    this.update();
  }

  update() {
    this.setState(this.menuData);
  }
}

export default MenuStore;