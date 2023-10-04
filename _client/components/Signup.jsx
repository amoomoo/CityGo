import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Signup = () => {
    const [ firstName, setFirstName] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleChange = (e) => {
        if(e.target.name === 'firstName') {
            setFirstName(e.target.value)
        } else if (e.target.name === 'lastName') {
            setLastName(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'username') {
            setUsername(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSignup = (e) => {
        console.log('entered the signup handler')
        e.preventDefault();
        const newUserData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        }
        console.log('this is my data', newUserData)

        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newUserData),
        })
        .then((res) => res.json())
        .then((data) => window.location.replace(data.url))
        .catch((err) => console.log(err))
    }
    
    return (
        <div>
            <div>
                First Name:
                <input name="firstName" value={firstName} id="fName" onChange={(e) => {handleChange(e)}}></input>
            </div>
            <div>
                Last Name:
                <input name="lastName" value={lastName} id="lName" onChange={(e) => {handleChange(e)}}></input>
            </div>
            <div>
                Email Address:
                <input name="email" value={email} id="email" onChange={(e) => {handleChange(e)}}></input>
            </div>
            <div>
                Username:
                <input name="username" value={username} id='username' onChange={(e) => {handleChange(e)}}></input>
            </div>
            <div>
                Password:
                <input name="password" value={password}id='password' type='password' onChange={(e) => {handleChange(e)}}></input>
            </div>
            <button onClick={handleSignup}>Create Account</button>
        </div>
    );
};

export default Signup;