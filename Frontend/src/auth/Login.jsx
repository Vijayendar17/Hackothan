import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    setLoading(true);  

    try {
      const response = await axios.post('/api/login', { email, password });
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful!');
        setLoading(false); 
        navigate("/"); 
      } else {
        setMessage('Invalid credentials. Please try again.');
        setLoading(false);  
      }
    } catch (error) {
     
      if (error.response) {
       
        setMessage('Invalid credentials. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received (network error)
        setMessage('Network error. Please check your connection.');
      } else {
        // Something else happened while setting up the request
        setMessage('Error logging in. Please try again.');
      }
      console.error("Login error:", error);
      setLoading(false); 
    }
  };

  return (
   <div className="overflow-hidden bg-cover bg-center min-h-screen flex flex-col justify-center items-center bg-gray-900"
     style={{ backgroundImage: "url('https://media.istockphoto.com/id/1206796363/photo/ai-machine-learning-hands-of-robot-and-human-touching-on-big-data-network-connection.jpg?s=612x612&w=0&k=20&c=xIX5Bz7h50B83cCZG_gXkyZSOu-mG93DtOcNK7RNEAo=')" }}>

  <div className="grid grid-cols-2 gap-4 w-11/12 hidden md:grid lg:w-[70%] p-4 min-h-screen">
    {/* Other content goes here */}
  </div>

  <div className="w-full md:w-[40%] flex justify-center items-center">
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
                className={`w-full p-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  </div>

  <div className="mt-4">
    <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
  </div>

</div>
  );
}

export default Login;
