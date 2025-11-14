import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase.config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const defaultAvatar = 'https://i.ibb.co.com/TMWDjGgQ/avatar.jpg';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || 'User',
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/all-products">All Products</Link></li>
      <li><Link to="/my-export">My Exports</Link></li>
      <li><Link to="/my-import">My Imports</Link></li>
      <li><Link to="/add-export">Add Export</Link></li>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-indigo-800 rounded-box w-60 text-white font-medium">
            {navLinks}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://i.ibb.co.com/BVntdbLh/Screenshot-2025-11-10-102654.png"
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-white"
          />
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight">
            Import Export Hub
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 text-base font-medium">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        {!loading && (
          user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-white ring-offset-2 ring-offset-transparent">
                  <img
                    src={user.photoURL || defaultAvatar}
                    alt={user.displayName || 'User'}
                    onError={(e) => e.target.src = defaultAvatar}
                  />
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-4 shadow-lg bg-base-100 rounded-box w-56 text-gray-800 font-medium">
                <li className="menu-title text-lg font-bold text-primary">
                  {user.displayName?.split(' ')[0] || 'User'}
                </li>
                <li className="text-sm text-gray-600 truncate">{user.email}</li>
                <div className="divider my-2"></div>
                <li>
                  <a onClick={handleLogout} className="text-red-600 hover:bg-red-50 font-semibold">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signup" className="btn btn-primary btn-sm md:btn-md text-white font-bold">
              Register
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;