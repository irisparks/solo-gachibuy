import React from 'react';
import DrawerNav from '../DrawerNav/DrawerNav'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
    <DrawerNav />

      <p>
      가치 Gachi-Buy is a mobile first - web application! Gachi is the korean word for "together" and this shopping list app, allows users to create a shopping list with
      multiple users to shop together.

      This project users: React.js, Redux, Sagas, Node.js/Express.js and Material-UI and CSS for styling. 
      </p>
    </div>
  </div>
);

export default AboutPage;
