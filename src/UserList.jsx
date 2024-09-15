//component to render the list of users got from the server
import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);

  //fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/all");

        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);


  return (
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
  );
}
