import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';
import { Typography, Box, Container, TextField, CssBaseline, FormControlLabel, Checkbox, Button, Grid, Paper, Card } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';


const styles = {
  title: {
    fontSize: '30px',
    marginTop: '30px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  lemon: {
    fontSize: '30px',
    marginTop: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: "secondary"
  },
  link: {
    margin: '20px',
  },
  button: {
    fontWeight: 'bold',
    color: 'white',
    marginTop: '10px',
    background: 'linear-gradient(261deg, rgba(146,198,198,1) 28%, rgba(184,161,214,1) 84%)',
    border: 0,
    borderRadius: 16,
    boxShadow: '0 3px 5px 2px rgba(70, 87, 86, .3)',
    height: 48,
    padding: '0 30px',
    marginBottom: '10px'
  },
  paper: {
    textAlign: 'center',
    marin: 'auto',
    maxWidth: 500,
  },
  card: {
    madWidth: 500,
    borderRadius: 20,
    boxShadow: '0 3px 5px 2px rgba(70, 87, 86, .3)',

  }
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#EDE7F6', light: '#ffffff', dark: '#bbb5c3', contrastText: '#000' },
    secondary: { main: '#b2dfdb', light: '#e5ffff', dark: '#82ada9', contrastText: '#000' },
  },
  Typography: {
    fontFamily: "Rubik",
  },
});
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <>
        <ThemeProvider theme={theme}>

          <div className="background">
            <div class="overlay">
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
              >
                <Grid item xs={10}>

                  <Card style={styles.card}>
                    <div style={styles.lemon}><i class="far fa-lemon" color="primary"></i></div>
                    <Typography style={styles.title} component="h1">
                      Gachi-Buy   </Typography>

                    <div>
                      {this.props.errors.loginMessage && (
                        <h2
                          role="alert"
                        >
                          {this.props.errors.loginMessage}
                        </h2>
                      )}

                      <Container component="main" maxWidth="xs" style={styles.main}>
                        <CssBaseline />
                        <div  >
                          <form onSubmit={this.login}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              required
                              id="email"
                              label="Username"
                              name="username"
                              autoFocus
                              type="text"
                              value={this.state.username}
                              onChange={this.handleInputChangeFor('username')}
                            />
                            <TextField
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              required
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              value={this.state.password}
                              onChange={this.handleInputChangeFor('password')}
                            />
                            <FormControlLabel
                              control={<Checkbox value="remember" color="secondary" />}
                              label="Remember me"
                            />
                            <Button
                              fullWidth
                              style={styles.button}
                              type="submit"
                              variant="contained"
                              name="submit"
                              value="Log In"
                            >
                              LOGIN
                            </Button>
                            <Button
                              fullWidth
                              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                            >
                              SIGN-UP </Button>
                          </form>
                        </div>
                        <Box mt={8}>
                        </Box>
                      </Container>


                    </div>
                  </Card>
                </Grid>
              </Grid>

            </div>

          </div>
        </ThemeProvider>

      </>
    );
  }
}


// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({errors});
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
