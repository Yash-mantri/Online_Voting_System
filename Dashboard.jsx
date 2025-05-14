import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import hamburger from "../../public/images/Hamburger.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');

    if (adminToken) {
      setIsAdmin(true);   // Admin logged in
    } else if (userToken) {
      setIsAdmin(false);  // User logged in
    } else {
      // navigate('/');  // No token → navigate back to home page or login page
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className='flex flex-col bg-[var(--backColorBlue)] h-screen'>

      {/* Hamburger Menu (Optional) */}
      {/* <div className='m-5 flex items-center gap-2'>
        <img src={hamburger} alt="" className='h-[34px] w-[34px]' onClick={handleClick}/>
        <span className='text-[24px]'>Dashboard</span>
      </div> */}

      {/* Dashboard Links */}
      <ul className='flex flex-col mt-35 px-4 font-bold text-[1.7rem] font-"Nunito" gap-5 [&>a]:duration-100 [&>a]:hover:bg-[var(--blue)] [&>a]:hover:text-white [&>a]:whitespace-nowrap [&>a]:px-5 [&>a]:py-2 [&>a]:rounded-2xl'>

        

        {/* Only for Admins */}
        {isAdmin && (
          <>
            <Link to="Transaction">Admin Panel</Link>
            <Link to="Reports">Result Chart</Link>
          </>
        )}

        {/* Only for Users */}
        {!isAdmin && (
          <>
            <Link to="Budget">About</Link>
            <Link to="VotingInterface">Voting</Link>
          </>
        )}

        {/* Logout option */}
        <Link to="/login" onClick={handleLogout}>Logout</Link>
      </ul>

    </div>
  );
};

export default Dashboard;
