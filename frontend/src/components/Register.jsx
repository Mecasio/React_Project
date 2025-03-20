import React, { useState } from "react";
import axios from 'axios';

const Register = () => {
    const [usersData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:5000/register", usersData);
            setUserData({ username: '', email: '', password: '' });  // Reset the state correctly
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <>  
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h1>Register</h1>
            <input 
                type="text" 
                name="username" 
                value={usersData.username} 
                onChange={handleChanges} 
                placeholder="Username"
            />
            <input 
                type="email" 
                name="email" 
                value={usersData.email} 
                onChange={handleChanges} 
                placeholder="Email"
            />
            <input 
                type="password" 
                name="password" 
                value={usersData.password} 
                onChange={handleChanges} 
                placeholder="Password"
            />
            <button onClick={handleRegister}>Save</button>
            </div>
        </>
    );
};

export default Register;
