/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  AOS.init({
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 600, // values from 0 to 3000, with step 50ms
    easing: "ease-in",
    animatedClassName: "aos-animate",
  });
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [navTheme, setNavTheme] = useState("light");
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMenuClick = () => {
    setMobileMenuOpen(false);
  };
  const handleLogout = () => {
    logout()
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <div>
      <nav
        className={`${
          navTheme === "light" ? "bg-[#ffffffd3]" : "bg-[#5e5e5ed3]"
        } md:fixed block w-full py-3 z-40`}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-aos="fade-right"
        >
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between w-full ">
              <div className="flex-shrink-0 text-black font-semibold">
                {/* Your logo or branding */}
                <Link to="/" >
                  My TaskBloom
                </Link>
              </div>
              {/* Desktop menu */}
              <div className="hidden sm:block ml-10">
                <div className="flex space-x-5 text-sm">
                  {/* Navbar items */}
                  <Link to="/" onClick={handleMenuClick} className="navItem">
                    Home
                  </Link>
                  <Link
                    to="/instructor"
                    onClick={handleMenuClick}
                    className="navItem"
                  >
                    Instructors
                  </Link>
                  <Link
                    to="/classes"
                    onClick={handleMenuClick}
                    className="navItem"
                  >
                    Classes
                  </Link>
                  <Link
                    to="/upcomingClasses"
                    onClick={handleMenuClick}
                    className="navItem"
                  >
                    All Upcoming Class
                  </Link>
                  <Link
                    to="/contact"
                    onClick={handleMenuClick}
                    className="navItem"
                  >
                    Contact
                  </Link>
                  {user && (
                    <Link
                      to="/dashboard"
                      onClick={handleMenuClick}
                      className="navItem"
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
              </div>
              <div className="hidden sm:flex items-center">
                {user ? (
                  <>
                    {" "}
                    <button onClick={handleLogout} className="primary-btn">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login">
                    <button className="primary-btn">Login</button>
                  </Link>
                )}

                {user?.photoURL && (
                  <>
                    <div className="dropdown dropdown-end ms-3 ">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            title={`${
                              user?.displayName ? user?.displayName : ""
                            }`}
                            className="hidden md:block"
                            src={user?.photoURL}
                            alt={user?.displayName}
                          />
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <Link to="/profile" className="justify-between">
                            Profile
                            <span className="badge">New</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-black transition duration-150 ease-in-out"
              >
                {/* Toggle icon */}
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {/* Toggle icon lines */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {/* Close icon lines */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } sm:hidden transition-all duration-500 ease-in-out transform ${
            isMobileMenuOpen ? "h-screen" : "h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 flex flex-col space-y-10">
            {/* Navbar items */}
            <Link to="/" onClick={handleMenuClick} className="navItem">
              Home
            </Link>
            <Link
              to="/instructor"
              onClick={handleMenuClick}
              className="navItem"
            >
              Instructors
            </Link>
            <Link to="/classes" onClick={handleMenuClick} className="navItem">
              Classes
            </Link>
            <Link
              to="/upcomingClasses"
              onClick={handleMenuClick}
              className="navItem"
            >
              All Upcoming Class
            </Link>
            <Link to="/contact" onClick={handleMenuClick} className="navItem">
              Contact
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={handleMenuClick}
                className="navItem"
              >
                Dashboard
              </Link>
            )}
            {user?.photoURL && (
              <>
                <div className="dropdown dropdown-end ms-3">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        title={`${user?.displayName ? user?.displayName : ""}`}
                        className=" md:hidden block"
                        src={user?.photoURL}
                        alt={user?.displayName}
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {user ? (
              <>
                <button onClick={handleLogout} className="primary-btn btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={handleMenuClick}>
                <button className="primary-btn btn">Login</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
