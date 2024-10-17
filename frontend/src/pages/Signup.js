import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        gender: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(name,value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) =>{
        e.preventDefault();
        const {name, email, password, phone, dob, gender} = signupInfo;
        if(!name || !email || !password || !phone || !dob || !gender){
            return handleError('All feild are required!!')
        }
        try {
            const url = 'https://registration-form-five-liard.vercel.app/auth/signup';
            const response = await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },credentials: 'include',
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error} = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result)
        } catch (err) {
            handleError(err);
        }

    }
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input onChange={handleChange} type='text' name='name' autoFocus placeholder='Enter your name...' value={signupInfo.name} />
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' name='email' placeholder='Enter your email...' value={signupInfo.email}/>
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} type='password' name='password' placeholder='Enter your password...' value={signupInfo.password}/>
                </div>

                <div>
                    <label htmlFor='phone'>Phone</label>
                    <input onChange={handleChange} type='tel' name='phone' placeholder='Enter your phone number...' value={signupInfo.phone}/>
                </div>

                <div>
                    <label htmlFor='dob'>Date of Birth</label>
                    <input onChange={handleChange} type='date' name='dob' value={signupInfo.dob}/>
                </div>

                <div>
                    <label htmlFor='gender'>Gender</label>
                    <select onChange={handleChange} name='gender' value={signupInfo.gender}>
                        <option value=''>Select your gender...</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                </div>

                <button type='submit'>Signup</button>

                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
