import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyImports = () => {
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchImports = async () => {
      try {
        const res = await fetch('https://export-import-server-zeta.vercel.app/api/imports/my');
        const data = await res.json();
        if (res.ok) {
          setImports(data);
        } else {
          toast.error(data.error || 'Failed to load imports');
        }
      } catch {
        toast.error('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchImports();
  }, []);

  const handleRemove = async () => {
    if (!deleteId) return;

    const loadingToast = toast.loading('Removing import...');

    try {
      const res = await fetch(`https://export-import-server-zeta.vercel.app/api/imports/${deleteId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Import removed successfully!', { id: loadingToast });
        setImports(prev => prev.filter(i => i._id !== deleteId));
        setDeleteId(null);
        document.getElementById('remove_modal').close();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to remove', { id: loadingToast });
      }
    } catch {
      toast.error('Network error', { id: loadingToast });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        My Imports
      </h1>

      {imports.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-2xl">
          <p className="text-xl text-gray-600 mb-6">You haven't imported any products yet.</p>
          <Link to="/all-products" className="btn btn-primary btn-lg">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imports.map((imp) => {
            const p = imp.product;
            return (
              <div
                key={imp._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <figure className="h-56">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title text-xl font-bold text-primary">
                    {p.name}
                  </h2>
                  <div className="space-y-2 text-base">
                    <p className="font-semibold">
                      Price: <span className="text-success font-bold">${p.price}</span>
                    </p>
                    <p>Origin: <span className="font-medium">{p.country}</span></p>
                    <p>
                      Rating:{' '}
                      <span className="font-bold text-blue-600">
                        {p.rating} / 5
                      </span>
                    </p>
                    <p className="font-bold text-green-600">
                      Imported: {imp.importedQuantity} unit(s)
                    </p>
                  </div>

                  <div className="card-actions mt-6 flex gap-3">
                    <Link
                      to={`/products/${p._id}`}
                      className="btn btn-outline btn-primary flex-1"
                    >
                      See Details
                    </Link>
                    <button
                      onClick={() => {
                        setDeleteId(imp._id);
                        document.getElementById('remove_modal').showModal();
                      }}
                      className="btn btn-error flex-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <dialog id="remove_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error mb-4">Remove Import?</h3>
          <p className="text-gray-600 mb-6">
            This will remove the import and restore the product quantity.
          </p>
          <div className="modal-action">
            <button onClick={handleRemove} className="btn btn-error">
              Yes, Remove
            </button>
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyImports;