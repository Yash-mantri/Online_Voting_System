import React, { useState, useEffect } from 'react';

export default function AboutNominees() {
  const [candidates, setCandidates] = useState([]);

  // Fetch candidates when the component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/getcandidates');
        const data = await response.json();
        setCandidates(data);  // Set the fetched candidates to state
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();  // Call the function to fetch candidates
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Meet the Nominees
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates.map((nominee, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden p-4 flex flex-col items-center text-center transition-transform hover:scale-105"
          >
            <img
              src={nominee.photoUrl}
              alt={nominee.name}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-500"
            />
            <h2 className="text-xl font-semibold text-indigo-700">{nominee.name}</h2>
            <p className="text-sm text-gray-600 mt-1 italic">{nominee.party}</p>
            <p className="text-gray-700 mt-3">{nominee.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
