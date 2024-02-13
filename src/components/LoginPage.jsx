import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            username,
            password
        };

        try {
            let response = await axios.post("https://dummyjson.com/auth/login", body)
            localStorage.setItem("token", response.data.token);
            nav("/");
        } catch(e) {
            setPassword("");
            setUsername("");
            setMessage(e.response.data.message);
        }
    }

    return (
        <div className='container-fluid d-flex flex-column align-items-center justify-content-center' style={{height:"90vh"}}>
            <h4 className='text-bg-danger w-25 text-center'>{message}</h4>
            <form onSubmit={handleSubmit} className='w-25'>
                <input
                type="text"
                placeholder='username'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control w-100 my-4"
                id="formGroupExampleInput"
                />

                <input
                type={show?"text":"password"}
                placeholder='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control w-100 my-4"
                id="formGroupExampleInput"
                />
                
                <input type="checkbox" id='show' onClick={() => setShow((prev) => !prev)}/>
                <label htmlFor="show" className='mx-2'>Show Password</label>
                <br />
                <input type="submit" value="Sign In" className='btn btn-primary m-3 p-2'/>
            </form>
        </div>
    ) 
}

export default LoginPage