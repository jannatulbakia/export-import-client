import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://export-import-server-zeta.vercel.app/api/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        toast.error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col py-12 px-3">
      <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search products"
        />
      </div>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 flex-grow">
          {searchQuery ? 'No products match your search.' : 'No products available.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-base-100 shadow-md rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <p className="text-gray-600">Origin: {product.originCountry}</p>
                <p className="text-gray-600">Rating: {product.rating}/5</p>
                <p className="text-gray-600">Available: {product.availableQuantity}</p>
                <Link
                  to={`/products/${product._id}`}
                  className="mt-4 inline-block btn bg-purple-600 text-white text-lg  btn-md"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;