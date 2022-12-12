import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

// Routes
import Routers from './Routers';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blue[500],
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
