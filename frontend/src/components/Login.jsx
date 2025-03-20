import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // const [usersData, setUserData] = useState({
    //     email: '',
    //     password: '',
    // });

    // const navigate = useNavigate();

    // const [errorMessage, setErrorMessage] = useState(""); 

    // const handleChanges = (e) => {
    //     const { name, value } = e.target;
    //     setUserData(prevState => ({ ...prevState, [name]: value }));
    // };

    // const handleLogin = async (event) => {
    //     event.preventDefault();

    //     if (!usersData.email || !usersData.password) {
    //         setErrorMessage("Please fill all required credentials");
    //         return;
    //     }

    //     try {
    //         const response = await fetch('http://localhost:5000/login', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(usersData),
    //         });

    //         console.log('Login response status:', response.status);

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Login response data:', data);

    //             if (data.token) {
    //                 localStorage.setItem('token', data.token);
    //                 const decoded = JSON.parse(atob(data.token.split('.')[1]));
    //                 console.log('Decoded JWT:', decoded);

    //                 navigate('/enrolled_student');
    //             } else {
    //                 setErrorMessage('No token received from the server.');
    //                 console.error('No token received');
    //             }
    //         } else {
    //             const data = await response.json();
    //             setErrorMessage(data.error || 'Invalid credentials');
    //             console.error('Login failed:', data.error);
    //         }
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //         setErrorMessage('Invalid Credentials');
    //     }
    // };

    return (
        <>  
            {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>Login</h1>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
                <button onClick={handleLogin}>Login</button>
            </div> */}
        </>        
    );
}

export default Login;
