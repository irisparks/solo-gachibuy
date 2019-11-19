import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class GroupList extends Component {

onEachList = () => {
  console.log('going into list');
}
  render() {
    return (
      <>
        <div>
          <DrawerNav />
        
            {this.props.groupReducer.map((group,i) => 
            <Button color="primary" onClick={this.onEachList} key={i}>{group.name}</Button>)}
        </div>
      </>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(GroupList);


