import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ResultChart = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch election results from the backend
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/results');
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  // Prepare the data for the pie chart
  const chartData = {
    labels: results.map(candidate => candidate.name), // Candidate names
    datasets: [
      {
        data: results.map(candidate => candidate.voteCount), // Vote count
        backgroundColor: [
          'rgba(201, 45, 79, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ], // Colors for each candidate
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Election Results</h2>
      <div className="w-96 h-96">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default ResultChart;
