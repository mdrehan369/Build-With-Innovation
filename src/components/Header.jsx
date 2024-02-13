import React from 'react'
import { useUserContext } from '../context/UserContext'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { user, setUser } = useUserContext();
    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("token", undefined);
        setUser(null);
        nav("/login");
    }

    return (
        <nav className='text-center'>
            {user && <>
                <h1 className='d-inline my-3 p-2'>Build With Innovation!</h1>
                <button onClick={handleLogout} className='btn btn-primary m-3 p-2 float-end' style={{justifySelf:'end'}}>Log Out</button>
                </>}
            {!user && <NavLink to="/login" className='btn btn-primary m-3 p-2 float-end'>Log In</NavLink>}
        </nav>
    )
}

export default Header