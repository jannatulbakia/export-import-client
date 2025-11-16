import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://export-import-server-zeta.vercel.app/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product details:', error.response?.data || error.message);
        toast.error('Failed to fetch product details');
      }
    };
    fetchProduct();
  }, [id]);

  const handleImport = async () => {
    try {
      await axios.post(
        'https://export-import-server-zeta.vercel.app/api/imports',
        { productId: id, quantity },
        { headers: { 'X-User-ID': user.uid } }
      );
      toast.success('Product imported successfully!');
      setIsModalOpen(false);
      const res = await axios.get(`https://export-import-server-zeta.vercel.app/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error('Error importing product:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to import product');
    }
  };

  if (!product) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center py-12">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600 mt-2">Price: ${product.price.toFixed(2)}</p>
        <p className="text-gray-600">Origin: {product.originCountry}</p>
        <p className="text-gray-600">Rating: {product.rating}/5</p>
        <p className="text-gray-600">Available Quantity: {product.availableQuantity}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-purple-600 text-white hover:bg-purple-800  px-4 py-2 rounded"
        >
          Import Now
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Import {product.name}</h3>
            <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={product.availableQuantity}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={quantity > product.availableQuantity || quantity < 1}
                className={`px-4 py-2 rounded text-white ${
                  quantity > product.availableQuantity || quantity < 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;