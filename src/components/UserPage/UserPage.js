import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Typography, Card, CardContent, Fab} from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import NewsCard2 from '../Styles/GroupCard'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

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
    flex: '1 0 auto',
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    color: 'primary',
    letterSpacing: '3px',
    fontWeight: 200,
    fontSize: 12,
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
  title: {
    fontSize: 30,
    textAlign: 'center',
    textWeight: 'bold',
    color: 'primary',
    letterSpacing: '2px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
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
    primary: { main: '#b8a1d6' },
    secondary: { main: '#48b9b6' },
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
                  <center>
                    <Fab color="secondary" style={styles.fabStyle} aria-label="add" onClick={this.onCreate}>
                      <AddIcon />
                    </Fab>
                  </center>
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
                  <div key={i}>
                    <Grid item>
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
                  </div>
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

