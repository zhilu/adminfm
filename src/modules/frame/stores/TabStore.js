import React from 'react';
import Workbench from '../WorkBench';
var Reflux = require('reflux');
var AppActions = require('../actions/AppActions');


class TabStore extends Reflux.Store{
  constructor(){
    super();
    this.listenables = AppActions;
    this.state = {
      tabList: [{
        'key': 'workbench',
        'tabName': '工作台',
        "tabId": 'workbench'
      }],
      activeId: 'workbench',
    };
  }

  onSetTabActiveKey(tabName, tabId) {
    var me = this;
    var tablist = window.tablist || this.state.tablist;

    var flag = false;
    var activeId = this.state.activeId;

    tablist.forEach((v) => {
      if (tabId === v.tabId) {
        flag = true;
        return
      }
    });
    var tabContent;

    if (!flag) {
      var Component = Workbench;
        console.log(tabId);
      switch (tabId) {

        case 'userManage': { //用户管理
          require.ensure([], function (require) {
            Component = require('../../../component/system/user/index');
            tabContent = <Component />;
            me.updataTablist(tabId, tabName, tabContent, tablist);
          }, 'UserManage');
          break;
        }
        
      }
    } else {
      this.update(activeId, tablist);
    }
  }

  updataTablist(tabId, tabName, tabContent, tabList) {
    tabList = tabList.concat({
      key: tabId,
      tabName: tabName,
      tabId: tabId,
      tabContent: tabContent
    });
    this.update(tabId, tabList);
  }

  onRemoveTab(tabId) {
    let tablist = window.tablist || this.tablist;
    let foundIndex = 0;
    tablist = tablist.filter(function (t, index) {
      if (t.tabId !== tabId) {
        return true;
      } else {
        foundIndex = index;
        return false;
      }
    });
    var activeId = window.activeId || this.activeId;
    if (activeId === tabId) {
      if (foundIndex) {
        foundIndex--;
      }
      activeId = tablist[foundIndex].tabName;
    }
    this.update(activeId, tablist);
  }

  update(activeId, tabList) {
    window.tablist = tabList;
    window.activeId = activeId;

    this.setState({
      activeId: activeId,
      tabList: tabList
    });
  }

}
