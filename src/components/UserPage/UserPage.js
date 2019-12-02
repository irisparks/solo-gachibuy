import React, { Component } from 'react';
import cx from 'clsx';
import List from '@material-ui/core/List';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { Container } from '@material-ui/core';

import { connect } from 'react-redux';
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import CreateIcon from '@material-ui/icons/Create';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import NewsCard2 from '../Styles/GroupCard'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import WebFont from 'webfontloader';
import { styled } from '@material-ui/core/styles';

// WebFont.load({
//   google: {
//     families: ['Rubik Web:300,400,700', 'sans-serif']
//   }
// });
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
    color: 'primary',
    letterSpacing: '3px',
    fontWeight: 200,
    fontSize: 12,
  },
  title: {
    color: 'primary',
    letterSpacing: '2px',
  },
  paper: {
    textAlign: 'center',
    margin: 'auto',
    maxWidth: 500,
    // color: '#fff9c4',
    display: 'flex',
    background: 'primary',
  },
  paperGroup: {
    textAlign: 'center',
    margin: 'auto',
    // color: '#fff9c4',
    display: 'flex',
    // background: '#9575cd',
    marginTop: '5px',
    height: 48,
    padding: '0 30px',

  },
  card: {
    background: 'primary',
    // display: 'flex',
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
    // background: '#b39ddb',
    // color: "white",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(72, 185, 182, .3)',
    height: 48,
    padding: '0 30px',
  },
  fabStyle: {
    margin: 0,
    top: 'auto',
    right: 20,
    left: 'auto',
    position: 'fixed'
  }

};


const theme = createMuiTheme({
  palette: {
    primary: { main: '#EDE7F6', light: '#ffffff', dark: '#bbb5c3', contrastText: '#000' },
    secondary: { main: '#b2dfdb', light: '#ffffff', dark: '#bbb5c3', contrastText: '#000' },
  },
  Typography: {
    fontFamily: "Single Day",
  },
  spacing: 4,
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
          <div
            className="pageView">

            <div style={styles.root}>

              <div>
                <DrawerNav />
                <Grid
                  style={{ overflowY: 'scroll', height: '100' }}
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs>
                    <Typography variant="h3" color="secondary">  Hello, {this.props.user.username}!</Typography>
                  </Grid>

                  <Fab color="secondary" style={styles.fabStyle} aria-label="add" onClick={this.onCreate}>
                    <AddIcon />
                  </Fab>
                </Grid>

                <Grid item xs={12}>
                  <Card style={styles.card} >
                    <CardContent style={styles.content} >
                      <Typography style={styles.title} >Groups
                  </Typography>
                    </CardContent>
                  </Card>

                </Grid>
                {/* <Typography className={styles.cta} variant={'overline'}> */}


                {/* MAP FUNCTION TO GO THROUGH ALL MY GROUP LISTS */}
                  {this.props.groupReducer.map((group, i) =>
                    <>
                      <Grid item xs>
                        <NewsCard2 group={group} key={i} onGroupClick={() => this.onGroupClick(group)} />
                      </Grid>
                      {/* <Grid item xs={12}>
                    <Card style={styles.card} key={i} onClick={() => this.onGroupClick(group)}>
                      <CardContent style={styles.content}>
                        <Typography component="h5" variant="h5">
                          {group.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                        </Typography>
                      </CardContent>
                      <div class="container">
                        <img src={group.img_src} alt='lemons' />
                      </div>
                    </Card>
                  </Grid> */}

                    </>


                  )}


              </div>

            </div>
          </div>

        </ThemeProvider >
      </>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(UserPage);

