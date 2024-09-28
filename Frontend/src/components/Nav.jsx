import React from 'react'
import {FaUserCircle,} from "react-icons/fa"
import {Link,useNavigate} from 'react-router-dom'

function Nav() {
   const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}

export default Nav;
