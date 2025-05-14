import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const aadhaarRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const otpRef = useRef(null);

  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/auth/send-otp', { email: emailRef.current.value });
      setOtpSent(true);
      setMessage('OTP sent to your email.');
    } catch (error) {
      setMessage('Failed to send OTP.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aadhaar = aadhaarRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const otp = otpRef.current?.value || '';

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        aadhaar,email, password, otp
      });

      const resultText = response.data; 
      if (response.status === 200) {
        setMessage(resultText);
        // Clear fields
        aadhaarRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        if (otpRef.current) otpRef.current.value = '';
      } else {
        setMessage(resultText || 'Registration Failed.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      setMessage('⚠️ Something went wrong.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center bg-white p-10 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign Up</h2>

      
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
        <span className="text-gray-500 mx-2">📧</span>
        <input
          type="email"
          placeholder="Email Id"
          ref={emailRef}
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

      {otpSent && (
        <div className="flex items-center bg-gray-100 rounded-full p-2 w-80 mb-4">
          <span className="text-gray-500 mx-2">📨</span>
          <input
            type="text"
            placeholder="Enter OTP"
            ref={otpRef}
            className="bg-transparent outline-none w-full"
            required
          />
        </div>
      )}

      {!otpSent ? (
        <button
          type="button"
          onClick={sendOtp}
          className="w-40 h-12 bg-teal-700 text-white uppercase font-semibold rounded-full hover:bg-teal-800 transition mb-4"
        >
          Send OTP
        </button>
      ) : (
        <input
          type="submit"
          value="Register"
          className="w-40 h-12 bg-teal-700 text-white uppercase font-semibold rounded-full hover:bg-teal-800 transition"
        />
      )}

      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </form>
  );
}
