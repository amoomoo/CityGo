import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../css/styles.css'

import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Dashboard from './Dashboard.jsx';

const App = () => {
    return(
        <Routes>
            <Route path='/' Component={Login} />
            <Route path='/signup' Component={Signup} />
            <Route path='/dashboard' Component={Dashboard} />
        </Routes>
    );
}

export default App; 