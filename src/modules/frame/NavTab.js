import React from 'react';
import {Tabs} from 'antd';

var TabPane = Tabs.TabPane; 
var AppActions = require('./actions/AppActions');
var TabStore = require('./stores/TabStore');

class NavTab extends React.Component{
  
  constructor(props){
    super(props);
    this.state ={
      tabList: [
       {'key': 'workbench',
        'tabName': '工作台',
        'tabId':'workbench',
         tabContent:"Workbench"}],
      activeId: 'workbench',
    }
    this.store = TabStore;
  }

  onChange = (activeId) => {
    this.setState({activeId});
  }

  remove(tabId, e) {
    e.stopPropagation();
    AppActions.removeTab(tabId);
  }

  onMatch(data) {
    this.setState({
      activeId:data.activeId,
      tablist: data.tabList
    });
  }

  render() {
    return (
      <div className="Mytabs">
        <Tabs activeKey={this.state.activeId}
              onChange={this.onChange} 
              destroyInactiveTabPane animation={null}
              contentStyle={{height:document.body.clientHeight-100,overflow: 'auto'}}>
          {
            this.state.tabList.map((t, i)=> {
              return i === 0 ?
                <TabPane key="workbench" tab="工作台"> <div /></TabPane>
                : 
                <TabPane key={t.tabId}
                         tab={<div>
                                {t.tabName}
                                <i className="anticon anticon-cross-circle" 
                                   onClick={this.remove.bind(this,t.tabId)}>
                                </i>
                              </div>}>
                  {t.tabContent}
                </TabPane>;
            })
          }
        </Tabs>
      </div>);
  }
}

export default NavTab;
