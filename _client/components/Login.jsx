import React, { useState } from 'react';
import { Link } from 'react-router-dom'



const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleChange = (e) => {
        if(e.target.name === 'username') {
            setUsername(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleLogin = (e) => {
        console.log('entered the signup handler')
        e.preventDefault();
        const userData = {
            username: username,
            password: password
        }
        console.log('this is my data', userData)

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userData),
        })
        .then((res) => res.json())
        .then((data) => window.location.replace(data.url))
        .catch((err) => console.log(err))
    }

    return (
        <div>
            <div>
                Username: 
                <input name='username' value={username} id='username' onChange={(e) => {handleChange(e)}}></input>
            </div>
            <div>
                Password:
                <input name='password' value={password} id='password' type='password' onChange={(e) => {handleChange(e)}}></input>
            </div>
            <button name='login' onClick={handleLogin}>Log In</button>
            <Link to='/signup'>
                <button type='button'>Create Account</button>
            </Link>
        </div>
    )
}

export default Login;