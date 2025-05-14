import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function SignIn() {
  const aadhaarRef = useRef(null);
  const passwordRef = useRef(null);
  

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aadhaar = aadhaarRef.current.value;
    const password = passwordRef.current.value;
    

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        aadhaar, password
      });

      if (response.status === 200) {
        setMessage('✅ Login Successful!');
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setMessage('❌ Invalid credentials!');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setMessage('⚠️ Something went wrong during login.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center bg-white p-10 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign In</h2>

      <div className="flex items-center bg-gray-100 rounded-full p-2 w-80 mb-4">
        <span className="text-gray-500 mx-2">🆔</span>
        <input
          type="text"
          placeholder="Aadhaar Number"
          ref={aadhaarRef}
          className="bg-transparent outline-none w-full"
          required
        />
      </div>

      <div className="flex items-center bg-gray-100 rounded-full p-2 w-80 mb-4">
        <span className="text-gray-500 mx-2">🔒</span>
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="bg-transparent outline-none w-full"
          required
        />
      </div>

      

      <input
        type="submit"
        value="Login"
        className="w-40 h-12 bg-teal-700 text-white uppercase font-semibold rounded-full hover:bg-teal-800 transition"
      />

      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </form>
  );
}
