import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../../Assests/user.png';
import Swal from 'sweetalert2';


function AdminDashboard() {
  const [selectedAdmin, setSelectedAdmin] = useState('item');


 

  const handleLogout = () => {
    Swal.fire({
      title: 'Confirm Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('jwtToken'); 
        window.location.href = '/';
      }
    });
  };

  const handleSidebarSelect = (adminType) => {
    setSelectedAdmin(adminType);
  };

  return (
    <div>
     
      <header className="border-b-2 p-4 flex justify-between items-center">
        <div>
          <Link to="/admindashboard" className="text-2xl font-semibold text-black ">
            <span className='text-blue-500'>ABC</span>Pharmacy
          </Link>
        </div>
        <div>
            
          <img
          onClick={handleLogout}
            src={userIcon}
            alt="User Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
      </header>

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Dashboard</h2>
        <br />
        <br />

        <div className="grid grid-cols-3 ">
          {/* Sidebar */}
          <Sidebar selectedAdmin={selectedAdmin} onSelect={handleSidebarSelect} />

          {/* Content based on selected admin */}
          <section className="bg-white p-4 rounded-lg shadow mb-4 w-4/5">
            {selectedAdmin === 'item' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Item Management</h3>
                <Link to="/addItem">
                  <button className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2">
                    Add Item
                  </button>
                </Link>
                <Link to="/viewItems">
                  <button
                    className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2"
                  >
                    View Items
                  </button>
                </Link>
              
              
              </div>
            )}
            {selectedAdmin === 'invoice' && (
              <div>
                <h3 className="text-xl font-semibold mb-4 ">Invoice Management</h3>
                <Link to="/addInvoice">
                  <button
                    className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2"
                  >
                    Add Invoice
                  </button>
                </Link>
                <Link to="/viewInvoices">
                  <button
                    className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2"
                  >
                   View Invoices
                  </button>
                </Link>
              
              </div>
            )}
          </section>
         
        </div>
      </div>
    </div>
  );
}

function Sidebar({ selectedAdmin = '', onSelect }) {
  const getButtonStyle = (adminType) => {
    return selectedAdmin === adminType
      ? 'bg-blue-500 text-white py-3 px-6'
      : 'bg-blue-300 text-black py-2 px-4';
  };

  return (
    <div className="bg-gradient-to-br from-blue-300 to-blue-50 p-4 rounded-lg shadow mb-4 w-3/5"> {/* Adjust width as needed */}
      <h3 className="text-xl font-semibold mb-4"> Menu</h3>
      <button
        onClick={() => onSelect('item')}
        className={`${getButtonStyle('item')} hover:bg-blue-500 font-semibold rounded-lg mb-2 block w-full text-left`}
      >
        Item Management
      </button>
      <button
        onClick={() => onSelect('invoice')}
        className={`${getButtonStyle('invoice')} hover:bg-blue-500 font-semibold rounded-lg block w-full text-left`}
      >
        Invoice Management
      </button>
    </div>
  );
}







export default AdminDashboard;