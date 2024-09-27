import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    try {
      const response = await axios.post('/api/login', { email, password });
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful!');
        navigate("/");

      } else {
        setMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setMessage('Error logging in. Please try again.'); 
      console.error(error);
    }
  };

  return (
    <div className="overflow-hidden bg-cover bg-center min-h-screen flex flex-col md:flex-row justify-center items-center bg-gray-900"
         style={{ backgroundImage: "url('https://media.istockphoto.com/id/1206796363/photo/ai-machine-learning-hands-of-robot-and-human-touching-on-big-data-network-connection.jpg?s=612x612&w=0&k=20&c=xIX5Bz7h50B83cCZG_gXkyZSOu-mG93DtOcNK7RNEAo=')" }}>
      
      <div className="grid grid-cols-2 gap-4 w-11/12 max-sm:hidden max-md:hidden lg:w-[70%] p-4 min-h-screen">
        <div className="bg-500 bg-white text-white font-bold text-center p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg animate-float">
          
        </div>
        <div className="bg-500 text-white font-bold text-center p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg animate-float">
          <img className="h-full w-500 object-cover rounded-md" src="https://www.drcf.org.uk/__data/assets/image/0034/264688/Generative-AI-blog-image.jpg" alt="" />
        </div>
        <div className="bg-500 text-white font-bold text-center p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg animate-float">
          <img className="h-full w-full object-cover rounded-md" src="https://blogs.idc.com/wp-content/uploads/2023/07/July-31-AI-Everywhere-Blog-Header.png" alt="" />
        </div>
        <div className="bg--500 text-white font-bold text-center p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg animate-float">
          <img className="h-full w-full object-cover rounded-md" src="https://www.thompsoncoburn.com/images/default-source/default-album/tech-learning_650x510.jpg?sfvrsn=56ee43ea_0" alt="" />
        </div>
      </div>

      <div className="w-full md:w-[40%] h-full flex justify-center items-center">
        <div className="bg-opacity-80 bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg m-4 w-full max-w-lg">
          <h2 className="text-white text-2xl font-bold mb-4">Login</h2>
          <p className="text-gray-400 mb-6">Enter Your Credentials</p>
          {message && <p className="text-red-400 mb-4">{message}</p>}
          <form onSubmit={onSubmit}>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
