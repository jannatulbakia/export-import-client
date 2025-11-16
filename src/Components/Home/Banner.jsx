import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <img
        src="https://i.ibb.co.com/ZzC26Cgs/export-import-banner-1.jpg"
        alt="Export Import Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Connect Globally with Import Export Hub
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover, import, and export products seamlessly from around the world.
          </p>
          <div className="flex flex-col md:flex-row gap-2 items-center justify-center ">
            <Link to="/all-products" className="btn bg-purple-600 btn-lg text-white rounded-full">
              Explore Products
            </Link>
            <Link to="/signup" className="btn bg-purple-600 btn-lg  text-white rounded-full">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;