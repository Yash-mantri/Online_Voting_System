import React, { useState } from 'react';

// import { Link } from 'react-router-dom';
import Navbar from './Navbar'

import Expence from './Expense'
import { Link } from 'react-router-dom'

const First = () => { 
  const [language, setLanguage] = useState('en'); // track selected language

  const guidelines = {
    en: `
✅ Verify your identity securely using Aadhaar or Voter ID before voting

📱 Use only the official e-voting platform—never share OTPs or passwords

🗳️ Review your selected candidate carefully—every vote counts

🔒 Ensure you vote in a private, trusted environment to protect your choice

📧 Confirm your vote submission and keep the acknowledgment for reference
    `,
    hi: `
✅ मतदान से पहले अपने आधार या मतदाता पहचान पत्र का उपयोग करके अपनी पहचान सुरक्षित रूप से सत्यापित करें

📱 केवल आधिकारिक ई-वोटिंग प्लेटफॉर्म का उपयोग करें—ओटीपी या पासवर्ड कभी साझा न करें

🗳️ अपने चुने हुए उम्मीदवार की सावधानीपूर्वक समीक्षा करें—हर वोट महत्वपूर्ण है

🔒 मतदान करते समय सुरक्षित और विश्वसनीय वातावरण सुनिश्चित करें

📧 अपने वोट जमा करने की पुष्टि करें और रसीद को सुरक्षित रखें
    `
  };
  return (
    <div className='bg-white'>



      <div className='  h-screen flex  justify-center items-center'>
        <div className='text-center w-[80%]'>
          <h1 className='font-["Kanit"] text-8xl font-extrabold text-[var(--blue)]'>A Secure Platform to Choose your Leader</h1>
       <Link to='/choose-role'>   <button className='bg-[var(--blue)] p-7 text-3xl text-white mt-20 rounded-[50px] duration-300 border-5 border-white hover:border-[var(--blue)] hover:bg-white hover:text-[var(--blue)] mb-4'>Get Started <i className="fa-solid fa-arrow-right " ></i></button></Link>
        </div>
      </div>


      <div className='  mt-[63px] flex justify-center '>
    
        <div className='2xl:w-[50%] xl:w-[60%] lg:w-[70%] md:w-[75%] sm:w-[120%]'>
          <img className='rounded-[155px] md:rounded-[75px] sm:rounded-[75px] w-[100%]' src="public/images/slider-img.png" alt="/slider" />
        </div>
        <div className='relative mt-15'>
        <div className='mb-5'>
        {/* Language Switch Button */}
        <button onClick={() => setLanguage('en')} className="px-4 py-2 m-2 bg-blue-500 text-white rounded">English</button>
        <button onClick={() => setLanguage('hi')} className="px-4 py-2 m-2 bg-green-500 text-white rounded">हिंदी</button>
      </div>

     
         
          {/* <p className='text-3xl md:text-xl sm:text-xl mt-7 ml-4'>
            ✅ Verify your identity securely using Aadhaar or Voter ID before voting<br />
            <br />
            📱 Use only the official e-voting platform—never share OTPs or passwords<br />
            <br />
            🗳️ Review your selected candidate carefully—every vote counts<br />
            <br />
            🔒 Ensure you vote in a private, trusted environment to protect your choice<br />
            <br />
            📧 Confirm your vote submission and keep the acknowledgment for reference
          </p> */}

          {/* Guidelines based on selected language */}
          <p className='text-3xl md:text-xl sm:text-xl mt-7 ml-4 whitespace-pre-line'>
            {guidelines[language]}
          </p>
        </div>
      </div>


    


    </div>
  )
}

export default First
