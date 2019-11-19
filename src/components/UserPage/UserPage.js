import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import ListItem from '../ListItems/ListItems'
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: "GET_GROUP" });

  }

  onCreate = () => {
    console.log('create hit');
    this.props.history.push('/Groupform')
  }

onEachList = () => {
  console.log('going into list');
}
  // get for groups and put in componenet did mount
  render() {
    return (
      <>
        <div>
          <DrawerNav />
          <CreateIcon onClick={this.onCreate} />
          <h1 id="welcome">
            Welcome, {this.props.user.username}!
    </h1>
          <div><h1>Groups</h1></div>

          <TextField onSubmit={this.onCreate}
            id="standard"
            label="Add Groups"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddCircleOutlineIcon color="primary" />
                </InputAdornment>
              )
            }}
          >
          </TextField>
          <h1>Group:{this.props.groupReducer.name}</h1>
            {this.props.groupReducer.map((group,i) => 
            <Button color="primary" onClick={this.onEachList} key={i}>{group.name}</Button>)}
          {/* <ListItem /> */}
          <p>Your ID is: {this.props.user.id} </p>
        </div>
        <pre> {JSON.stringify(this.props.groupReducer, null, 2)}</pre>
        <pre> {JSON.stringify(this.props.user.username, null, 2)}</pre>
      </>
    )
  }
}
// const mapStateToProps = state => ({
//   user: state.user,
// });

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(UserPage);






// const UserPage = (props) => (
//   <div>
//     <DrawerNav />
//     <CreateIcon />

//     <h1 id="welcome">
//       Welcome, {props.user.username}!
//     </h1>
//     <div><h1>Groups</h1></div>

//     <TextField

//                         id="standard"
//                         label="Add Groups"
//                         margin="normal"
//                         onChange
//                         fullWidth
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
// <AddCircleOutlineIcon color="primary" />                           </InputAdornment>
//                           )
//                         }}
//                         >
//                         </TextField>
//     <p>Your ID is: {props.user.id}</p>
//   </div>
// );

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
// const mapStateToProps = state => ({
//   user: state.user,
// });

// this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(UserPage);
