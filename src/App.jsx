import React, { useState } from 'react';
import axios from 'axios';
import CryptoList from './CryptoList';
import Navigation from './Components/Common/Navigation';

function App() {
    

    return (
        <div>
            <Navigation/>
            <CryptoList/>
        </div>
    );
}

export default App;


