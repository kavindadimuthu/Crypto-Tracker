import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoList from './CryptoList';
import Navigation from './Components/Common/Navigation';

function App() {
    const [response, setResponse] = useState([]);
    const[users, setUsers] = useState([]);
    //fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response =await axios.get("http://localhost:5000/api/user/all");

                // console.log(response);
                console.log(response.data);
                setUsers(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    },[]);

    
    

    return (
      <div>
        <Navigation />
        <CryptoList/>
        <div>
          <h1>UserList</h1>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user.mobileNumber}</p>
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default App;


