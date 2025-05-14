import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/v1/auth/adminlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    try {
      if (response.ok) {
        const data = await response.json();
        console.log("Login success:", data.message);
        alert("Admin logged in successfully!");
        localStorage.setItem("adminToken", data.token); // Save the token for future use
        navigate('/dashboard');
      } else {
        const errorData = await response.json(); // Now the backend sends JSON error messages
        console.error("Login error:", errorData.error);
        alert(errorData.error); // Show the error message
      }
    } catch (error) {
      console.error("JSON Parsing error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleAdminLogin}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Admin Login</h2>

        {/* Username Input */}
        <div className="flex items-center bg-gray-100 rounded-full p-2 mb-4">
          <span className="text-gray-500 mx-2">👤</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent outline-none w-full rounded-full p-2"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center bg-gray-100 rounded-full p-2 mb-4">
          <span className="text-gray-500 mx-2">🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent outline-none w-full rounded-full p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <input
          type="submit"
          className="w-full h-12 bg-teal-700 text-white uppercase font-semibold rounded-full hover:bg-teal-800 transition mb-4"
          value="Login"
        />

        {message && <p className="mt-4 text-gray-600 text-center">{message}</p>}
      </form>
    </div>
  );
}
