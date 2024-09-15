import React, { useState, useEffect } from 'react';
import CryptoList from './CryptoList';
import Navigation from './Components/Common/Navigation';
import UserList from './UserList';
import CreateUserForm from './CreateUser';
import Login from './Login';
import Signup from './SignUp';
import Watchlist from './Watchlist';

function App() {


    
    

    return (
      <div>
        <Navigation />
        {/* <CryptoList/> */}
        {/* <UserList/> */}
        {/* <CreateUserForm/> */}
        {/* <Login /> */}
        {/* <Signup /> */}
        <Watchlist />
      </div>
    );
}

export default App;


