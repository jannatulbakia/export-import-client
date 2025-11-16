import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const MyImports = () => {
  const { user } = useAuth();
  const [imports, setImports] = useState([]);

  useEffect(() => {
    const fetchImports = async () => {
      try {
        const res = await axios.get('https://export-import-server-zeta.vercel.app/api/imports', {
          headers: { 'X-User-ID': user.uid },
        });
        setImports(res.data);
      } catch (error) {
        console.error('Error fetching imports:', error.response?.data || error.message);
        toast.error('Failed to fetch imports');
      }
    };
    fetchImports();
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://export-import-server-zeta.vercel.app/api/imports/${id}`, {
        headers: { 'X-User-ID': user.uid },
      });
      setImports(imports.filter((item) => item._id !== id));
      toast.success('Import removed successfully!');
    } catch (error) {
      console.error('Error removing import:', error.response?.data || error.message);
      toast.error('Failed to remove import');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col py-12">
      <h2 className="text-3xl font-bold text-center mb-8">My Imports</h2>
      {imports.length === 0 ? (
        <p className="text-center text-gray-600 flex-grow">No imports found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {imports
            .filter((item) => item.productId)
            .map((item) => (
              <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{item.productId.name}</h3>
                  <p className="text-gray-600">${item.productId.price.toFixed(2)}</p>
                  <p className="text-gray-600">Origin: {item.productId.originCountry}</p>
                  <p className="text-gray-600">Rating: {item.productId.rating}/5</p>
                  <p className="text-gray-600">Imported Quantity: {item.quantity}</p>
                  <div className="mt-4 flex space-x-4">
                    <Link
                      to={`/products/${item.productId._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      See Details
                    </Link>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {imports.some((item) => !item.productId) && (
            <p className="text-red-500 text-center">
              Some imports could not be displayed due to missing product data.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyImports;