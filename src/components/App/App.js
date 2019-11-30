import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';
import Footer from '../Footer/Footer';
import GroupForm from '../GroupForm/GroupForm'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import ListView from '../ListView/ListView'
import ListForm from '../ListForm/ListForm'
import ItemItem from '../Item/ItemItem'
import Item from '../Item/Item'
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#EDE7F6', light: '#ffffff', dark: '#bbb5c3', contrastText: '#000'},
    secondary: { main: '#b2dfdb', light: '#ffffff', dark: '#bbb5c3', contrastText: '#000' },
  },
  shape: {
    borderRadius: 8,
  },
  Typography: {
    fontFamily: "Rubik",
  },
  spacing: 4,
});

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <ThemeProvider theme={theme}>

      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
             <ProtectedRoute exact path="/Groupform" component={GroupForm} />
             <ProtectedRoute exact path="/list" component={ListView} />
             <ProtectedRoute exact path="/Listform" component={ListForm} />
             <ProtectedRoute exact path="/item" component={Item} />



            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
              </ThemeProvider>

  )}
}

export default connect()(App);
