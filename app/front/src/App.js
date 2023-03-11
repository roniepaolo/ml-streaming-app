import React from 'react';
import { Navbar } from './components';
import { Header, Description, Demo, Footer } from './containers';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Manrope'
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="gradient__bg">
          <Navbar />
          <Header />
        </div>
        <Description />
        <Demo />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App;