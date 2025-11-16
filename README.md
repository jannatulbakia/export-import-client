# Export Import Hub

**Import Export Hub** is a modern, user-friendly web platform built with React and Vite, designed for users to browse global products, manage their own export listings, and import products into a personal collection with one click. Featuring a clean, responsive design, real-time database sync, and secure Firebase authentication, this single-page application offers a seamless experience across mobile, tablet, and desktop devices.

## Overview

Import Export Hub is like an online marketplace where you can explore products from around the world, add your own products for others to see, and save products you like to your personal list. With a sleek interface, intuitive navigation, and features like search and dark mode, it’s perfect for buyers and sellers alike. The platform connects to a MongoDB database via a Vercel-hosted backend, ensuring real-time updates for product quantities, imports, and exports.

## Key Features

- **Global Product Browsing**: Explore all products or the latest six in a responsive 3-column grid, showing name, price, origin country, rating, and available quantity. Click "See Details" for more info.
- **One-Click Imports**: Logged-in users can import products by specifying a quantity (within stock limits), with instant database updates and toast notifications.
- **Export Management**: Add, update, or delete your own products through private routes, with a form for adding and a modal for updating, all synced in real-time.
- **Secure Authentication**: Log in or register with email/password (with password validation) or Google OAuth, with custom toast messages for success/errors.
- **Personalized Private Routes**: Access "My Imports" and "My Exports" pages, protected by Firebase, showing your imported or added products with options to manage them.
- **Search & Dark Mode**: Search products by name on the All Products page and toggle between dark/light modes for a comfortable experience.
- **Responsive Design**: Works flawlessly on all devices, with consistent styling, equal-sized product cards, and uniform button designs.

## Navigation

The **Navbar** is your guide to the platform, appearing at the top of every page with a consistent, responsive design:

- **Logo (Left)**: Displays "Import Export Hub" (click to return to Home).
- **Navigation Links (Left)**:
  - **All Products**: View all products in a grid.
  - **My Exports**: See and manage your added products (requires login).
  - **My Imports**: View your imported products (requires login).
  - **Add Export**: Add a new product (requires login).
- **User Section (Right)**:
  - **Not Logged In**: Shows "Login" and "Register" buttons.
  - **Logged In**: Displays your profile picture and a "Logout" button.
  - Includes a dark/light mode toggle switch.
- **Behavior**: Private routes redirect to the Login page if you’re not signed in, and page reloads maintain your session.

The **Footer** includes copyright, contact info, and social links (using the new X logo), consistent across all pages.

## Authentication

Authentication, powered by Firebase, lets you securely access personalized features. Here’s how it works:

- **Login Page**:
  - **Form**: Enter email and password, or use Google login.
  - **Features**: Links to Register; custom toast notifications for errors (e.g., “Invalid credentials”).
  - **On Success**: Redirects to your desired page or Home.
- **Register Page**:
  - **Form**: Enter name, email, photo URL, and password (must have uppercase, lowercase, 6+ characters).
  - **Features**: Google login option; validation errors shown via toasts (e.g., “Password too weak”).
  - **On Success**: Redirects to Home.
- **Security**: Private routes (e.g., My Imports) are protected, and Firebase ensures you stay logged in after page refreshes.

## Main Pages

- **Home**:
  - Features a banner, the six latest products in a grid (with image, name, price, origin, rating, quantity, and “See Details” button), plus two extra sections (e.g., About Us, Testimonials).
- **All Products**:
  - Shows all products in a 3-column grid with a search bar to filter by name.
- **Product Details (Private)**:
  - Displays full product details and an “Import Now” button. Opens a modal to enter quantity (disabled if exceeding stock). Updates stock on submit.
- **My Imports (Private)**:
  - Lists your imported products with options to remove or view details. Warns if product data is missing.
- **Add Export (Private)**:
  - Form to add a product (name, image URL, price, origin, rating, quantity). Saves to the database and appears in All Products.
- **My Exports (Private)**:
  - Shows your added products with “Update” (modal with prefilled form) and “Delete” buttons.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, React Toastify
- **Backend**: Node.js, Express, MongoDB (Vercel)
- **Authentication**: Firebase (Email/Password, Google OAuth)
- **Deployment**: Netlify (client), Vercel (server)
- **Database**: MongoDB Atlas
