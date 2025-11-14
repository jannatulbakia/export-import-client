import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAuth } from 'firebase/auth';

const AddExports = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get('name')?.trim();
    const image = formData.get('image')?.trim();
    const price = parseFloat(formData.get('price'));
    const country = formData.get('country')?.trim();
    const rating = parseFloat(formData.get('rating')) || 4.5;
    const availableQuantity = parseInt(formData.get('availableQuantity'), 10);

    if (!name || !image || !country || !price || !availableQuantity) {
      toast.error('Please fill all required fields');
      setLoading(false);
      return;
    }

    if (!/^https?:\/\//i.test(image)) {
      toast.error('Image URL must start with http:// or https://');
      setLoading(false);
      return;
    }

    const payload = {
      name,
      image,
      price,
      country,
      rating,
      availableQuantity,
      userId: auth.currentUser?.uid || 'anonymous',
    };

    try {
      const res = await fetch('https://export-import-server-zeta.vercel.app/api/exports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Export product added successfully!');
        localStorage.setItem('userId', auth.currentUser?.uid || 'anonymous');
        e.target.reset();
        navigate('/my-export');
      } else {
        toast.error(data.error || 'Failed to add product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error – Is backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">Add New Export Product</h1>
          <p className="text-xl text-gray-600">List your product for global buyers</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-base-100 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label"><span className="label-text text-lg font-semibold">Product Name *</span></label>
              <input name="name" type="text" placeholder="e.g., Premium Basmati Rice" className="input input-bordered input-lg w-full" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-lg font-semibold">Image URL *</span></label>
              <input name="image" type="url" placeholder="https://example.com/rice.jpg" className="input input-bordered input-lg w-full" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label"><span className="label-text text-lg font-semibold">Price (USD) *</span></label>
              <input name="price" type="number" step="0.01" min="0.01" placeholder="49.99" className="input input-bordered input-lg w-full" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-lg font-semibold">Available Quantity *</span></label>
              <input name="availableQuantity" type="number" min="1" placeholder="500" className="input input-bordered input-lg w-full" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label"><span className="label-text text-lg font-semibold">Origin Country *</span></label>
              <input name="country" type="text" placeholder="e.g., USA" className="input input-bordered input-lg w-full" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-lg font-semibold">Rating (0-5)</span></label>
              <input name="rating" type="number" step="0.1" min="0" max="5" defaultValue="4.5" className="input input-bordered input-lg w-full" />
            </div>
          </div>

          <div className="flex gap-6 pt-8">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success btn-lg flex-1 text-white text-xl"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Adding...
                </>
              ) : (
                'Add Export Product'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-ghost btn-lg flex-1 text-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExports;