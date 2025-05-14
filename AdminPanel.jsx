import React, { useState, useEffect, useRef } from 'react';

export default function AdminPanel({ setAdminLoggedIn }) {
  const [candidates, setCandidates] = useState([]);
  const nameRef = useRef(null);
  const partyRef = useRef(null);
  const bioRef = useRef(null);
  const photoUrlRef = useRef(null);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/results');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const party = partyRef.current.value;
    const bio = bioRef.current.value;
    const photoUrl = photoUrlRef.current.value;

    const candidateData = { name, party, bio, photoUrl };

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/addcandidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateData),
      });

      if (response.ok) {
        alert('Candidate added successfully!');
        fetchCandidates(); // Refresh list
        nameRef.current.value = ''; // Clear inputs
        partyRef.current.value = '';
        bioRef.current.value = '';
        photoUrlRef.current.value = '';
      } else {
        alert('Failed to add candidate.');
      }
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const handleDeleteCandidate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/deletecandidate/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Candidate deleted successfully!');
        fetchCandidates();
      } else {
        alert('Failed to delete candidate.');
      }
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminLoggedIn(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 sm:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      {/* Add Candidate Form */}
      <form onSubmit={handleAddCandidate} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Candidate Name"
          ref={nameRef}
          className="bg-white border p-3 rounded-lg w-full sm:w-1/4 outline-none"
          required
        />
        <input
          type="text"
          placeholder="Party"
          ref={partyRef}
          className="bg-white border p-3 rounded-lg w-full sm:w-1/4 outline-none"
          required
        />
        <input
          type="text"
          placeholder="Bio"
          ref={bioRef}
          className="bg-white border p-3 rounded-lg w-full sm:w-1/4 outline-none"
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          ref={photoUrlRef}
          className="bg-white border p-3 rounded-lg w-full sm:w-1/4 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg mt-4 sm:mt-0 w-full sm:w-auto"
        >
          Add Candidate
        </button>
      </form>

      {/* Display Candidates */}
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Current Candidates:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col items-center space-y-4"
            >
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <h3 className="font-semibold text-lg text-indigo-700">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.party}</p>
              <p className="text-gray-500 text-sm">{candidate.bio}</p>
              <span className="text-gray-600">Votes: {candidate.voteCount}</span>
              <button
                onClick={() => handleDeleteCandidate(candidate.id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
