import React from 'react';
import List from './Components/List';
import SeachForm from './Components/SeachForm';

class UserMange extends React.Components{
  constructor(props){
    super(props);
    this.state={params: {}};
    this.passParams=this.passParams.bind(this);
  }

  passParams(params) {
    this.setState({
      params: params
    });
  }

  render() {
    return (
      <div>
        <div className="block-panel">
          <SeachForm passParams={this.passParams}/>
        </div>
        <List params={this.state.params}/>
      </div>
      )
  }


}
export default UserMange;

