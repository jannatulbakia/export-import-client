import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { RouterProvider } from 'react-router-dom'
import { route } from './Routes/Routes'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
function App() {

  return (
    <>
    <AuthProvider>

    
      <RouterProvider router={route}/>
      <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </>
  )
}

export default App
