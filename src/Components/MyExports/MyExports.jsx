import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const MyExports = () => {
  const { user } = useAuth();
  const [exports, setExports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExport, setCurrentExport] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    originCountry: '',
    rating: '',
    availableQuantity: '',
  });

  useEffect(() => {
    const fetchExports = async () => {
      try {
        const res = await axios.get('https://export-import-server-zeta.vercel.app/api/exports', {
          headers: { 'X-User-ID': user.uid },
        });
        setExports(res.data);
      } catch (error) {
        console.error('Error fetching exports:', error.response?.data || error.message);
        toast.error('Failed to fetch exports');
      }
    };
    fetchExports();
  }, [user]);

  const handleDelete = async (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center">
          <p className="mb-4">Are you sure you want to delete this export?</p>
          <div className="flex space-x-4">
            <button
              onClick={async () => {
                try {
                  await axios.delete(`https://export-import-server-zeta.vercel.app/api/exports/${id}`, {
                    headers: { 'X-User-ID': user.uid },
                  });
                  setExports(exports.filter((item) => item._id !== id));
                  toast.success('Export deleted successfully!');
                } catch (error) {
                  console.error('Error deleting export:', error.response?.data || error.message);
                  toast.error('Failed to delete export');
                }
                closeToast();
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleUpdate = (item) => {
    setCurrentExport(item);
    setFormData({
      name: item.name,
      image: item.image,
      price: item.price,
      originCountry: item.originCountry,
      rating: item.rating,
      availableQuantity: item.availableQuantity,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://export-import-server-zeta.vercel.app/api/exports/${currentExport._id}`,
        formData,
        { headers: { 'X-User-ID': user.uid } }
      );
      setExports(exports.map((item) => (item._id === currentExport._id ? res.data : item)));
      setIsModalOpen(false);
      toast.success('Export updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error updating export:', error.response?.data || error.message);
      toast.error('Failed to update export', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col py-12 px-3">
      <h2 className="text-3xl font-bold text-center mb-8">My Exports</h2>
      {exports.length === 0 ? (
        <p className="text-center text-gray-600 flex-grow">No exports found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {exports.map((item) => (
            <div key={item._id} className="bg-purple-200 shadow-md rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <p className="text-gray-600">Origin: {item.originCountry}</p>
                <p className="text-gray-600">Rating: {item.rating}/5</p>
                <p className="text-gray-600">Available: {item.availableQuantity}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleUpdate(item)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Update Export</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                  min="0"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyExports;