import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{Provider} from "react-redux";
import store from './store/index'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {dashboardTheme} from './dashboardTheme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={dashboardTheme}>
            <BrowserRouter>
                 <App />
             </BrowserRouter>
         </ThemeProvider>
    </Provider>

);

