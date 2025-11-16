import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const AddExports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    originCountry: '',
    rating: '',
    availableQuantity: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending POST to /api/exports with data:', formData);
      const response = await axios.post(
        'https://export-import-server-zeta.vercel.app/api/exports',
        formData,
        {
          headers: { 'X-User-ID': user.uid },
        }
      );
      console.log('Response from /api/exports:', response.data);
      toast.success('Product added successfully!');
      navigate('/my-export');
    } catch (error) {
      console.error('Error adding export:', error.response?.data || error.message);
      setError('Failed to add product. Please try again.');
      toast.error(error.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center py-12">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add Export</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Image URL</label>
            <input
              type="url"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="originCountry" className="block text-gray-700">Origin Country</label>
            <input
              type="text"
              name="originCountry"
              id="originCountry"
              value={formData.originCountry}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700">Rating (0-5)</label>
            <input
              type="number"
              name="rating"
              id="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="availableQuantity" className="block text-gray-700">Available Quantity</label>
            <input
              type="number"
              name="availableQuantity"
              id="availableQuantity"
              value={formData.availableQuantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              min="0"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Export
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExports;