import React, { Component } from 'react';
import cx from 'clsx';

import { connect } from 'react-redux';
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import CreateIcon from '@material-ui/icons/Create';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import NewsCard2 from '../GroupList/Card'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
// import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
// import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: 304,
    margin: 'auto',
    borderRadius: 0,
    position: 'relative',
  },
  content: {
    padding: 24,
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    color: '#fff',
    letterSpacing: '3px',
    fontWeight: 200,
    fontSize: 12,
  },
  title: {
    color: '#fff',
    letterSpacing: '2px',
  },
  paper: {
    textAlign: 'center',
    margin: 'auto',
    maxWidth: 500,
    color: '#fff9c4',
    display: 'flex',
    background: '#d1c4e9',
  },
  paperGroup: {
    textAlign: 'center',
    margin: 'auto',
    color: '#fff9c4',
    display: 'flex',
    background: '#9575cd',
    marginTop: '5px',
    height: 48,
    padding: '0 30px',

  },
  card: {
    display: 'flex',
    maxWidth: 500,
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
  button: {
    marginTop: '5px',
    background: '#b39ddb',
    color: "white",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(72, 185, 182, .3)',
    height: 48,
    padding: '0 30px',
  },
};


const theme = createMuiTheme({
  palette: {
    primary: { main: '#4ac29a' },
  },
});

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "GET_GROUP" });
  }

  onCreate = () => {
    console.log('create hit');
    this.props.history.push('/Groupform')
  }

  onGroupClick = (group) => {
    console.log('clicked on group')
    this.props.dispatch({ type: "FIND_GROUP", payload: group });
    this.props.history.push(`/list`)
  }

  // get for groups and put in componenet did mount
  render() {
    return (

      <>
        <ThemeProvider theme={theme}>

          <div className="pageView">
            <div style={styles.root}>
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
                    <Paper style={styles.paper}>
                      <h1 id="welcome">
                        Hello, {this.props.user.username}!</h1>
                    </Paper>
                    <AddCircleIcon onClick={this.onCreate} size="large"></AddCircleIcon>
                    <Button style={styles.button} onClick={this.onCreate} startIcon={<AddCircleIcon />} > Create New Group </Button>
                  </Grid>
                  {/* <TextField onSubmit={this.onCreate}
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
                  </TextField> */}
                  <Paper style={styles.paperGroup}><h2>Groups <i class="far fa-lemon"></i>

                  </h2></Paper>

                  {/* MAP FUNCTION TO GO THROUGH ALL MY GROUP LISTS */}


                  {this.props.groupReducer.map((group, i) =>
                    <NewsCard2 group={group} key={i} onGroupClick={()=> this.onGroupClick(group)}/>

                    // <Grid item xs={12}>
                    //   <Card style={styles.card} key={i} onClick={() => this.onGroupClick(group)}>
                    //     <CardContent style={styles.content}>
                    //       <Typography component="h5" variant="h5">
                    //         {group.name}
                    //       </Typography>
                    //       <Typography variant="subtitle1" color="textSecondary">
                    //       </Typography>
                    //     </CardContent>
                    //     <div class="container">
                    //       <img src={group.img_src} alt='lemons' />
                    //     </div>
                    //   </Card>
                    // </Grid>
                  )}

                  < p > Your ID is: {this.props.user.id} </p>
                </Grid>
              
              </div>
            </div>
          </div>
        </ThemeProvider>
      </>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(UserPage);

