import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between text-3xl p-5 text-white">
      <div>
        <p className="pl-4 text-[2rem]">Generative AI</p>
      </div>
      <div>
        <Link to="/image" className='text-xl capitalize'>Image Generator</Link>
      </div>
      <div 
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <FaUserCircle className="cursor-pointer" />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg">
            <button 
              onClick={handleLogout} 
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
