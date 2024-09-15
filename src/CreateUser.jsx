//create a new user form and pass formdata to backend
//component to create a new user
import React from "react";

const CreateUserForm = ({ onSubmit }) => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(""); // Add password state
    
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ username, email, password });
    };
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-[30vw] m-auto">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
            
            <button type="submit" className="bg-red-400 my-4 ">Create User</button>

        </form>
    );
}

export default CreateUserForm;