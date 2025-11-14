import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const MyExports = () => {
  const [exports, setExports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId') || 'test-user';

    fetch(`https://export-import-server-zeta.vercel.app/api/exports/my?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setExports(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load your exports');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4">
          <p className="font-semibold">Delete this product?</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading('Deleting...');
                fetch(`https://export-import-server-zeta.vercel.app/api/exports/${id}`, { method: 'DELETE' })
                  .then(res => {
                    if (res.ok) {
                      toast.success('Product deleted successfully!', { id: loadingToast });
                      setExports(prev => prev.filter(e => e._id !== id));
                    } else {
                      toast.error('Failed to delete', { id: loadingToast });
                    }
                  })
                  .catch(() => toast.error('Network error', { id: loadingToast }));
              }}
              className="btn btn-error btn-sm"
            >
              Yes, Delete
            </button>
            <button onClick={() => toast.dismiss(t.id)} className="btn btn-ghost btn-sm">
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold text-center mb-12 text-primary">My Exports</h1>

      {exports.length === 0 ? (
        <div className="text-center py-24 bg-base-200 rounded-2xl">
          <p className="text-3xl mb-8">You haven't added any products yet</p>
          <Link to="/add-export" className="btn btn-success btn-lg text-xl">
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exports.map((exp) => {
            const p = exp.product;
            return (
              <div key={exp._id} className="card bg-base-100 shadow-2xl hover:shadow-3xl transition-all">
                <figure className="h-64">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-t-2xl" />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title text-2xl font-bold">{p.name}</h2>
                  <div className="space-y-3 mt-4 text-lg">
                    <p className="text-3xl font-bold text-success">${p.price}</p>
                    <p><strong>Origin:</strong> {p.country}</p>
                    <p><strong>Rating:</strong> {p.rating} stars</p>
                    <p className="text-xl font-bold text-info">
                      Available: <span className="text-2xl">{p.availableQuantity}</span>
                    </p>
                  </div>
                  <div className="card-actions mt-6">
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="btn btn-error btn-block"
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  );
};

export default MyExports;