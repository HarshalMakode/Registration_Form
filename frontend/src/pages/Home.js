import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        
        if (loggedInUser && loggedInEmail) {
            setUserInfo({
                name: loggedInUser,
                email: loggedInEmail
            });
        } else {
            handleError("User is not logged in.");
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInEmail');
        handleSuccess("Logged out successfully!");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    return (
        <div className='container'>
            <h1>Welcome, {userInfo.name}!</h1>
            <p>Here are your details:</p>
            <ul>
                <li><strong>Email:</strong> {userInfo.email}</li>
            </ul>
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer />
        </div>
    );
}

export default Home
