import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button, Grid, Paper, Typography } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import ListItem from '../ListForm/ListForm'
import GroupList from '../GroupList/GroupList'
import CardExample from '../GroupList/Card'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => {
  return ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    card: {
      display: 'flex',
      maxWidth: 345,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  });
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
      <div className="pageView">
        <div className={classes.root}>

          <div>

            <DrawerNav />

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid>
                <Paper className={classes.paper}>
                  <h1 id="welcome">
                    Hello, {this.props.user.username}!</h1>
                </Paper>



                <Button onClick={this.onCreate} startIcon={<CreateIcon />} > Create New Group </Button>
              </Grid>
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
                <Card className={classes.card}>
                  <CardContent className={classes.content}>
                      <GroupList group={group} key={i} />
                  </CardContent>
                  <CardMedia
                    className={classes.cover}
                    image="/background.png"
                    title="Live from space album cover"
                  />
                </Card>
              )}
              <CardExample />
              <p>Your ID is: {this.props.user.id} </p>
            </Grid>
          </div>
        </div>
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

