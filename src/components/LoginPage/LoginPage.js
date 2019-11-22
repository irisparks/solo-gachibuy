import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';
import { Typography, Box, Container, TextField, CssBaseline, FormControlLabel, Checkbox, Button, Grid, Paper } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';


const styles = {
  title: {
    textAlign: 'center',
    fontSize: '30px',
    marginTop: '150px',
    color: '#FFFF66',
  },
  TextField: {
    borderColor: 'white',
  },
  link: {
    margin: '20px',
  },
  button: {
    marginTop: '5px',
    background: 'linear-gradient(45deg, #4ac29a, #bdfff3)',
    color: "white",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: 48,
    padding: '0 30px',
  },
  paper: {
    textAlign: 'center',
    marin: 'auto',
    maxWidth: 500,
  }
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFF' },
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
        <div className="background">
          <div class="overlay">

            <Typography component="h1" variant="h10" style={styles.title}>
Gachi-Buy        </Typography>

            <div>
              {this.props.errors.loginMessage && (
                <h2
                  role="alert"
                >
                  {this.props.errors.loginMessage}
                </h2>
              )}
              <ThemeProvider theme={theme}>

                <Container component="main" maxWidth="xs" style={styles.main}>
                  <CssBaseline />
                  <div  >
          
                    <Typography component="h1" variant="h5" style={styles.title}>
                      Sign in
        </Typography>
                    <form onSubmit={this.login}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="email"
                        label="Username"
                        name="username"
                        autoFocus
                        type="text"
                        value={this.state.username}
                        style={styles.TextField}
                        onChange={this.handleInputChangeFor('username')}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        style={styles.TextField}

                        onChange={this.handleInputChangeFor('password')}
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        style={styles.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                        name="submit"
                        value="Log In"
                      >
                        Sign In
          </Button>
                      <Grid container>
                        <Grid item>
                          <center>
                            <button
                              type="button"
                              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                            >
                              Register </button>
                          </center>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                  <Box mt={8}>
                  </Box>
                </Container>
              </ThemeProvider>

              {/* old form code below */}
              {/* <form onSubmit={this.login}>
            <h1>Login</h1>
            <div>
              <label htmlFor="username">
                Username:
              <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password:
              <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>
            <div>
              <input
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              />
            </div>
          </form>
          <center>
            <button
              type="button"
              className="link-button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
            >
              Register
          </button>
          </center> */}
            </div>
          </div>
        </div>

      </>
    );
  }
}


// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
