import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    try {
      const response = await axios.post('http://localhost:3000/ai/signup', { email, password, name });
      
      if (response.status === 201) {
        setMessage('Signup successful!');
        navigate('/login');
      } else {
        setMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error signing up. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-900" 
         style={{ backgroundImage: "url('https://media.istockphoto.com/id/1206796363/photo/ai-machine-learning-hands-of-robot-and-human-touching-on-big-data-network-connection.jpg?s=612x612&w=0&k=20&c=xIX5Bz7h50B83cCZG_gXkyZSOu-mG93DtOcNK7RNEAo=')" }}>
      
      <div className="bg-opacity-80 bg-gray-800 rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4">Sign Up</h2>
        <p className="text-gray-400 mb-6">Enter Your Details</p>
        {message && <p className="text-red-400 mb-4">{message}</p>}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <input type="text" placeholder="Name" 
                   className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                   onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Email" 
                   className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                   onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-6">
            <input type="password" placeholder="Password" 
                   className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                   onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" 
                  className="w-full p-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition duration-300">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
