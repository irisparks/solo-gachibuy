import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class ListView extends Component {

  componentDidMount() {
    // this.props.dispatch({ type: "GET_GROUP" });

  }


  onBack = () => {
    this.props.history.push('/home')
  }

  onCreate = () => {
    console.log('create list hit');
    this.props.history.push('/Listform')
  }

  // get for groups and put in componenet did mount
  render() {
    return (
      <>
        <div>
          <DrawerNav />
          <h1>GROUP NAME</h1>
          <CreateIcon onClick={this.onCreate} />

          <TextField onSubmit={this.onCreate}
            id="standard"
            label="Add List"
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
          <Button onClick={this.onBack} variant="outlined" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Back</Button>

          <div><h1>Lists</h1></div>

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

export default connect(mapReduxStateToProps)(ListView);


