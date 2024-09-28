import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(5); 
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
   
    localStorage.removeItem('token');

    navigate('/login');
  };

  useEffect(() => {
    let timer;

    if (isDropdownOpen && logoutTimer > 0) {
      timer = setInterval(() => {
        setLogoutTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    if (logoutTimer === 0) {
      handleLogout();
    }

    return () => clearInterval(timer); 
  }, [isDropdownOpen, logoutTimer]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setLogoutTimer(5); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        onMouseEnter={() => {
          setIsDropdownOpen(true);
          setLogoutTimer(5); 
        }}
        onMouseLeave={() => {
        
        }}
      >
        <FaUserCircle className="cursor-pointer" />
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg">
            <button 
              onClick={handleLogout} 
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
            >
              Logout
            </button>
            <div className="text-gray-300 text-center">
              Auto logout in {logoutTimer} {logoutTimer === 1 ? 'second' : 'seconds'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;


