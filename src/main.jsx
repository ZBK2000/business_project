import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react'
import { ToastContainer } from 'react-toastify'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
    
  <ThemeProvider theme={theme}>
    <BrowserRouter>
    <App/>
 <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"/>
    </BrowserRouter>
    </ThemeProvider>

)
