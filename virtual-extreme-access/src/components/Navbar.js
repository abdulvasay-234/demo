// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Navbar.css';

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <span className="user-text">{user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;
