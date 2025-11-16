import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/all-products', label: 'All Products' },
    { path: '/my-export', label: 'My Exports' },
    { path: '/my-import', label: 'My Imports' },
    { path: '/add-export', label: 'Add Export' },
  ];

  const handleProfileClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogout = () => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center">
          <p className="mb-4">Are you sure you want to logout?</p>
          <div className="flex space-x-4">
            <button
              onClick={async () => {
                try {
                  await logout();
                  setIsDropdownOpen(false);
                  toast.success('Logged out successfully!', {
                    position: 'top-center',
                    autoClose: 3000,
                  });
                } catch (error) {
                  console.error('Error logging out:', error.message);
                  toast.error('Failed to logout', {
                    position: 'top-center',
                    autoClose: 3000,
                  });
                }
                closeToast();
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: 'top-center',
      }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-base-200 shadow-md z-50">
      <div className="container mx-auto px-2 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-lg font-bold pl-2">
        <img src="https://i.ibb.co.com/BVntdbLh/Screenshot-2025-11-10-102654.png" alt="" className='h-8 rounded-full'/>
          Import Export Hub
        </Link>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <nav
          className={`md:flex items-center ${
            isOpen ? 'block' : 'hidden'
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-base-200 md:bg-transparent p-4 md:p-0`}
        >
          <ul className="md:flex space-x-12 flex-col md:flex-row">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'text-purple-600 font-semibold' : 'hover:text-purple-600'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 md:mt-0 md:ml-4 flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-ghost"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
            {user ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={handleProfileClick}
                  className="focus:outline-none"
                  aria-label="Toggle user menu"
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt="User profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-lg py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="btn bg-gray-200 btn-sm w-full text-left px-3 py-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="hover:text-purple-600">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-purple-600">
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;