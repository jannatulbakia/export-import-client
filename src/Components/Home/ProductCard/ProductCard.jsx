import { Link } from 'react-router-dom';
import { Star, MapPin, Package } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          New
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-1 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
        </div>

        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {product.country}
          </p>
          <p className="flex items-center gap-1">
            <Package className="w-4 h-4" />
            Available: <span className="font-medium text-gray-800">{product.quantity}</span>
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
        </div>

        <Link
          to={`/products/${product._id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;