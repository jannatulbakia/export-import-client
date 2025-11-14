import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Components/Home/Home";
import Signup from "../Components/Signup/Signup";
import Login from "../Components/Login/Login";
import MyImports from "../Components/MyImports/MyImports";
import MyExports from "../Components/MyExports/MyExports";
import AllProducts from "../Components/AllProducts/AllProducts";
import AddExports from "../Components/AddExports/AddExports";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";

export const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <Signup/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
       {
        path: '/my-import',
        element: <PrivateRoute>
          <MyImports/>
        </PrivateRoute>
        
      },
       {
        path: '/my-export',
        element: <PrivateRoute>
            <MyExports />
          </PrivateRoute>
      },
       {
        path: '/all-products',
        element: <AllProducts/>,
      },
       {
        path: '/add-export',
        element: <PrivateRoute>
            <AddExports />
          </PrivateRoute>
      },
       {
        path: '/products/:id',
        element: <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
      },

    ],
  },
]);
