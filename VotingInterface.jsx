import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VoteForm() {
  const [aadhaar, setAadhaar] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch list of candidates (you can replace this with your actual API call to get candidates)
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/getcandidates');
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setMessage('⚠️ Unable to fetch candidates.');
      }
    };

    fetchCandidates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if Aadhaar and candidateId are provided
    if (!aadhaar || !candidateId) {
      setMessage('⚠️ Please provide both Aadhaar number and select a candidate.');
      return;
    }

    // if (aadhaar !== signedInAadhaar) {
    //   console.log("Toast triggered for missing Aadhaar or candidateId"); 
    //   toast.error('⚠️ You can only vote with your signed-in Aadhaar number.');
    //   return;
    // }

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/cast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadhaar, candidateId }),
      });

      const result = await response.text(); // Assuming backend returns a plain text response

      if (response.ok) {
        setMessage(result); 
        // Navigate('/aboutnominees')// Success message
      } else {
        setMessage(result || '❌ Something went wrong.');
      }
    } catch (error) {
      console.error('Vote Error:', error);
      setMessage('⚠️ Something went wrong while casting the vote.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-white p-10 rounded-lg shadow-m"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Cast Your Vote</h2>

      {/* Aadhaar Input */}
      <div className="flex items-center bg-gray-100 rounded-full p-2 w-80 mb-4">
        <span className="text-gray-500 mx-2">🆔</span>
        <input
          type="text"
          placeholder="Aadhaar Number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          className="bg-transparent outline-none w-full"
          required
        />
      </div>

      {/* Candidate Select Dropdown */}
      <div className="flex items-center bg-gray-100 rounded-full p-2 w-80 mb-4">
        <span className="text-gray-500 mx-2">🏅</span>
        <select
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
          className="bg-transparent outline-none w-full"
          required
        >
          <option value="" disabled>Select Candidate</option>
          {candidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <input
        type="submit"
        className="w-40 h-12 bg-teal-700 text-white uppercase font-semibold rounded-full hover:bg-teal-800 transition"
        value="Vote"
      />

      {/* Message */}
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </form>
  );
}
