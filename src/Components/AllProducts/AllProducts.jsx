import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://export-import-server-zeta.vercel.app/api/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h1 className="text-3xl font-bold text-center">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-6xl">
                {products.map((product) => (
                    <div key={product._id} className="border rounded-lg shadow-lg p-4">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Origin: {product.origin}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Available: {product.availableQuantity}</p>
                        <Link to={`/products/${product._id}`} className="btn btn-primary mt-2">See Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;