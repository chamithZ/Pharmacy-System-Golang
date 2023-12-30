import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../Assests/user.png';
import Swal from 'sweetalert2';

function Header() {
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const isLoggedIn = () => {
   
    const token = localStorage.getItem('jwtToken'); 
    return !!token; // Return true if the token exists, false otherwise
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear the authentication data
        localStorage.removeItem('jwtToken');
  
        window.location.href = '/'; // direct to home page URL
        setShowLogoutButton(false);
      }

    });
  };

  return (
    <header className="border-b-2 p-4">
      <div className="container mx-auto flex justify-between items-center font-medium">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-2xl  text-black  "
          >
            <span className='text-blue-400'>ABC</span>Pharmacy
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4 flex-grow text-right font-medium ">
          <Link
            to="/"
            className="
            hover:text-gray-500 hover:font-semibold
            capitalize
            inline-block
            text-xl
            text-blue-black
            relative
            cursor-pointer
            transition-all
            duration-400
            before:content-['']
            before:absolute
            before:-bottom-2
            before:left-0
            before:w-0
            before:h-1.5
            before:rounded-full
            before:opacity-0
            before:transition-all
            before:duration-300
            before:bg-gradient-to-r
            before:from-blue-200
            before:via-blue-300
            before:to-blue-400
            hover:before:w-full
            hover:before:opacity-100
    "
          >
            Home
          </Link>
          <Link
            to="/store"
            className="
            hover:text-gray-500 hover:font-semibold
            capitalize
            inline-block
            text-xl
            text-black
            relative
            cursor-pointer
            transition-all
            duration-400
            before:content-['']
            before:absolute
            before:-bottom-2
            before:left-0
            before:w-0
            before:h-1.5
            before:rounded-full
            before:opacity-0
            before:transition-all
            before:duration-300
            before:bg-gradient-to-r
            before:from-blue-200
            before:via-blue-300
            before:to-blue-400
            hover:before:w-full
            hover:before:opacity-100
    "
          >
            Store
          </Link>
         

        </nav>
        {isLoggedIn() && (
          <div className="text-blue-500 hover:text-blue-700" >
          <img
            onClick={handleLogout}
            src={img1}
            alt="User"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
        )}
      </div>
    </header>
  );
}

export default  Header;