import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Remove the JWT token from local storage
      localStorage.removeItem('token');

      // Navigate the user to the login page after logout
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center">
        <FaUserCircle className="text-white text-3xl mr-2" />
        <h1 className="text-white text-xl">Profile Page</h1>
      </div>
      
      <div>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Nav;
