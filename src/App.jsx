import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { RouterProvider } from 'react-router-dom';
import { route } from './Routes/Routes';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={route} />
        <Toaster position="top-center" reverseOrder={false} />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;