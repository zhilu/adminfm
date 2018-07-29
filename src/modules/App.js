import React from 'react';
import Top from './frame/Top';
import SideBar from './frame/SideBar';
import NavTab from './frame/NavTab';
import Cookies from './util/Cookies';


window.Cookies = Cookies;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '工作台',
      fold: false
    };
    this.roleName = 'admin';
    this.toggleMenu = this.toggleMenu.bind(this);
    this.setRoleName =this.setRoleName.bind(this);
  }

  toggleMenu() {
    this.setState({
      fold: !this.state.fold
    });
  }

  setRoleName(roleName) {
    this.roleName = roleName;
  }

  render() {
    var fold = this.state.fold;
    return (
      <div className={`${ fold ? 'app-aside-folded' : ''}`}>
        <Top setRoleName={this.setRoleName} toggleMenu={this.toggleMenu} fold={fold}/>
        <div className="clearfix">
          <div className='leftSide' ref="leftSide">
            <SideBar fold={fold} toggleMenu={this.toggleMenu}/>
          </div>
          <div className='rightSide' ref="rightSide" >
              <div className="app-content-body">
                <NavTab getRoleName = { this.getRoleName }/> 
              </div> 
          </div>
        </div>
      </div>)
  }
}

export default App;
