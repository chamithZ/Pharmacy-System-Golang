import React , {useRef} from 'react';
import Header from '../../src/component/Header/Header';
import Footer from '../../src/component/Footer/Footer';

import { Link } from 'react-router-dom';

import img1 from '../Assests/img1.png'
import img2 from '../Assests/img2.png'
import img3 from '../Assests/img3.png'
import img4 from '../Assests/img4.png'



function Home() {
  // Check if the user is logged in based on your authentication logic
  const isLoggedIn = () => {
    // Check if the user is logged in by retrieving the token from localStorage
    const token = localStorage.getItem('jwtToken');
    return !!token; // Return true if the token exists, false otherwise
  };

  const targetComponentRef = useRef(null);

  const scrollToComponent = () => {
    window.scrollTo({
      top: targetComponentRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <div className='h-full'>
      <div className="bg-white ">
        <Header />
      
        <header className="flex bg-gradient-to-br from-blue-300 to-blue-50 text-black pt-5 pb-5 text-center pt-0">
  <div className='flex flex-col justify-center items-center w-full'>
    <h1 className="text-4xl font-semibold">
      Welcome to <span className="text-4xl sm:text-4xl font-bold text-blue-600">ABC</span> Pharmacy
    </h1>
    <p className="mt-2 text-lg">Order online and have your prescription medication delivered straight to your home.</p>
    <button onClick={scrollToComponent} className="bg-blue-300 hover:bg-blue-400 text-white text-lg font-semibold py-2 px-4 rounded-md mt-2">Get Started</button>
  </div>
</header>


        {/* Main Content */}
        <main className="container mx-auto mt-5" > {/* Add mb-16 (margin-bottom) */}
        
          <section className="text-center m-0">
            {/* <div className="mb-10">
              <img
                src={cover}
                alt="Cover Photo"
                className="w-full "
              />
            </div> */}

            {/* ----Card Section ----- */}
            <div className="flex flex-wrap justify-center bg-gradient-to-br from-blue-400 to-blue-50">
              {/* Feature 1 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 h-{200}">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Quality Medications</h3>
                  <img src={img1}/>
                  <p className="mt-2 text-gray-600">We take pride in offering a comprehensive range of quality medications. </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Quality medical devices</h3>
                  <img src={img2}/>
                  <p className="mt-2 text-gray-600">At ABC Pharmacy, we take pride in providing top-notch medical devices curated for your well-being. </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Expert Pharmacy Staff</h3>
                  <img src={img4}/>
                  <p className="mt-2 text-gray-600">Our pharmacy is staffed by experts who are dedicated to ensuring your well-being and providing the best guidance.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Community Health Initiatives</h3>
                  <img src={img3}/>
                  <p className="mt-2 text-gray-600">We actively engage in community health initiatives to promote well-being and awareness.</p>
                </div>
              </div>
            </div>
            {/* ---Call To Action ---- */}
            <section ref={targetComponentRef} className="my-5 text-center">
            <h2 className="text-4xl font-semibold mb-3">Ready to Experience Quality Healthcare?</h2>
            <p className="text-gray-600 text-lg">Join ABC Pharmacy and embark on a journey to better health like never before. Our experienced staff and top-notch services ensure you receive the best care possible. </p>

            {isLoggedIn() ? ( // Check if the user is logged in
              // If the user is logged in, display a message
              <p className="text-gray-600 mt-2">You are already logged in.</p>
            ) : (
              // If the user is not logged in, show the "Sign Up" and "Login" buttons
              <>
                <Link to="/register">
                  <button className="bg-[#41A4FF] hover:bg-blue-500 text-white  text-lg font-semibold py-2 px-4 rounded-md mt-2">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-blue-50 hover:bg-blue-100 text-blue-900 text-lg font-semibold py-2 px-4 rounded-md mt-2 ml-2">
                    Login
                  </button>
                </Link>
              </>
            )}
            
          </section>
          </section>
          
        </main>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;