import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://export-import-server-zeta.vercel.app/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(() => toast.error('Product not found'));
  }, [id]);

  const handleImport = async () => {
    const available = product.availableQuantity;

    if (quantity > available) {
      toast.error(`Only ${available} available. You entered ${quantity}.`);
      return;
    }

    try {
      const res = await fetch('https://export-import-server-zeta.vercel.app/api/imports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Imported ${quantity} item(s)!`);

        setProduct(prev => ({
          ...prev,
          availableQuantity: prev.availableQuantity - quantity
        }));

        setQuantity(1);
        document.getElementById('my_modal_4').close();
      } else {
        toast.error(data.error || 'Import failed');
      }
    } catch {
      toast.error('Network error');
    }
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
          <div className="badge badge-success absolute top-4 left-4">In Stock</div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            <div className="rating rating-md mb-4">
              {[...Array(5)].map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  className="mask mask-star-2 bg-yellow-400"
                  checked={i < Math.floor(product.rating)}
                  readOnly
                />
              ))}
              <span className="ml-2 text-gray-600">({product.rating})</span>
            </div>

            <div className="space-y-3 text-lg text-gray-700 mb-6">
              <p>Origin: {product.country}</p>
              <p>
                <span className="font-medium">Available:</span>{' '}
                <span className="text-2xl font-bold text-green-600">
                  {product.availableQuantity}
                </span>
              </p>
            </div>

            <div className="text-4xl font-bold text-blue-600 mb-6">
              ${product.price}
            </div>
          </div>
          <button
            className={`btn btn-primary btn-lg w-full ${product.availableQuantity === 0 ? 'btn-disabled' : ''}`}
            onClick={() => {
              if (product.availableQuantity === 0) {
                toast.error('Out of stock');
              } else {
                document.getElementById('my_modal_4').showModal();
              }
            }}
          >
            Import Now
          </button>
        </div>
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">Import {product.name}</h3>

          <div className="flex items-center gap-4 mb-4 p-3 bg-base-200 rounded-lg">
            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
            <div>
              <p className="font-semibold text-lg">${product.price}</p>
              <p className="text-sm text-gray-600">
                Available: {product.availableQuantity}
              </p>
            </div>
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Quantity to Import</span>
            </label>
            <input
              type="number"
              min="1"
              max={product.availableQuantity}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setQuantity(Math.max(1, Math.min(val, product.availableQuantity)));
              }}
              className="input input-bordered w-full"
            />
            {quantity > product.availableQuantity && (
              <label className="label">
                <span className="label-text-alt text-error">
                  Only {product.availableQuantity} available
                </span>
              </label>
            )}
          </div>

          <div className="modal-action">
            <button
              onClick={handleImport}
              disabled={quantity > product.availableQuantity}
              className="btn btn-primary"
            >
              Confirm Import
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;