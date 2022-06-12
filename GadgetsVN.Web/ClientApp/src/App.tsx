import * as React from 'react';
import ReactDOM from 'react-dom';
import NavMenu from './components/NavMenu';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#f58624',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavMenu />
      </ThemeProvider>
    </>

  );
}

export default App;
