import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Box, Container, TextField, CssBaseline, Button, Grid, Card } from '@material-ui/core'
import '../LoginPage/LoginPage.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const styles = {
  title: {
    fontSize: '30px',
    marginTop: '20px',
    fontWeight: 'bold',
    textAlign: 'center'
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
  },
  body: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
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
class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

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
                  <Typography style={styles.title} className="loginHeader">
                    가치  </Typography>                  
                    <Typography style={styles.title} className="loginHeader">
                    Gachi-Buy   </Typography>
                  <Typography variant="body1" style={styles.body} className="loginHeader2">
                    Sign-up for a New account!</Typography>

                  <div>

                    {this.props.errors.registrationMessage && (
                      <h2
                        className="alert"
                        role="alert"
                      >
                        {this.props.errors.registrationMessage}
                      </h2>
                    )}
                    <Container component="main" maxWidth="xs">
                      <CssBaseline />
                      <div  >
                        {/* 
                        <Typography component="h10" variant="h9" >
                          Register User        </Typography> */}
                        <form onSubmit={this.registerUser}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            color="secondary"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInputChangeFor('username')}
                          />
                          <TextField
                            color="secondary"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            id="password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChangeFor('password')}
                          />

                          <Button
                            fullWidth
                            variant="contained"
                            style={styles.button}
                            type="submit"
                            name="submit"
                            value="Register"
                          >
                            Register
                          </Button>
                          <center>
                            <Button
                              className="loginHeader2"
                              style={{ fontWeight: 'bold' }}
                              fullWidth
                              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
                            >
                              Login
                                </Button>
                          </center>
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

export default connect(mapStateToProps)(RegisterPage);

