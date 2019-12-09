import React from 'react';
import DrawerNav from '../DrawerNav/DrawerNav'
import { Typography, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const styles = {
  gridstyle: {
      margin: 20,
      position: 'center'
  },
}


const theme = createMuiTheme({
  palette: {
    primary: { main: '#b8a1d6'},
    secondary: { main: '#48b9b6'},
  },
  shape: {
    borderRadius: 8,
  },
  Typography: {
    fontFamily: "Single Day', cursive",
  },
  spacing: 4,
});

const AboutPage = () => (
  <div>
    <div>
    <ThemeProvider theme={theme}>

    <DrawerNav />
    <Grid container justify="center">

<Typography color="secondary" variant="h3">Gachi-Buy</Typography>
        <Grid item xs={12} style={styles.gridstyle}>
        <Typography variant="body1">
      가치 Gachi-Buy is a mobile first - web application! Gachi is the korean word for "together" and this shopping list app, allows users to create a shopping list with
      multiple users to shop together.

      This project users: React.js, Redux, Sagas, Node.js/Express.js and Material-UI and CSS for styling. 
      </Typography>
      </Grid>
      </Grid>
      </ThemeProvider>

    </div>
  </div>
);

export default AboutPage;
