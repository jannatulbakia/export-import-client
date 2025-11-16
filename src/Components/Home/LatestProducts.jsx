import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://export-import-server-zeta.vercel.app/api/products/latest');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching latest products:', error);
        toast.error('Failed to fetch latest products');
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-600 flex-grow">No latest products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <p className="text-gray-600">Origin: {product.originCountry}</p>
                <p className="text-gray-600">Rating: {product.rating}/5</p>
                <p className="text-gray-600">Available: {product.availableQuantity}</p>
                <Link
                  to={`/products/${product._id}`}
                  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestProducts;