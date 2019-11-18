import React from 'react';
import { connect } from 'react-redux';
// import Nav from '../Nav/Nav'
import { TextField,InputAdornment } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`


const UserPage = (props) => (
  <div>
    <DrawerNav />
    <CreateIcon />

    <h1 id="welcome">
      Welcome, {props.user.username}!
    </h1>
    <div><h1>Groups</h1></div>

    <TextField
                        
                        id="standard"
                        label="Add Groups"
                        margin="normal"
                        onChange
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
<AddCircleOutlineIcon color="primary" />                           </InputAdornment>
                          )
                        }}
                        >
                        </TextField>
    <p>Your ID is: {props.user.id}</p>
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
