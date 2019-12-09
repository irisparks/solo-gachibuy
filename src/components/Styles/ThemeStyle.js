import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {Button} from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
      primary: { main:  purple[500]},
      secondary: { main: '#C8E6C9'}
  },
  });

export default function Palette() {
  return (
    <ThemeProvider theme={theme}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
    </ThemeProvider>
  )};