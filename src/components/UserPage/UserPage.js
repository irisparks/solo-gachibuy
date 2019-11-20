import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button, Grid, Paper } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import ListItem from '../ListForm/ListForm'
import GroupList from '../GroupList/GroupList'
import CardExample from '../GroupList/Card'
import { makeStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};


class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "GET_GROUP" });
  }

  onCreate = () => {
    console.log('create hit');
    this.props.history.push('/Groupform')
  }

  // get for groups and put in componenet did mount
  render() { 
    const { classes } = this.props;
    return (
    
      <>
      
        <div>

          <DrawerNav />
          <Button                 className={classes.root}

          >Hook</Button>
                  <Button className={classes.root}>Higher-order component</Button>;

          <Grid 
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
            <Paper>xs=12

              <h1 id="welcome">
                Hello, {this.props.user.username}!
          </h1>
          </Paper>
            </Grid>


            <Button onClick={this.onCreate} startIcon={<CreateIcon />} > Create New Group </Button>

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
            <div><h1>Groups</h1></div>
            {/* MAP FUNCTION TO GO THROUGH ALL MY GROUP LISTS */}
            {this.props.groupReducer.map((group, i) =>
              <GroupList group={group} key={i} />
            )}
            <CardExample />
            <p>Your ID is: {this.props.user.id} </p>
          </Grid>
          </div>

        <pre> {JSON.stringify(this.props.groupReducer, null, 2)}</pre>
        <pre> {JSON.stringify(this.props.user.username, null, 2)}</pre>
      </>
    )
  }
}

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(withStyles(styles)(UserPage));






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
