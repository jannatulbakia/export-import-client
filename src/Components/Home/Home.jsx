import ProductCard from './ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import toast from 'react-hot-toast';
import Banner from './Banner/Banner';

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://export-import-server-zeta.vercel.app/api/products/latest');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setLatestProducts(data);
      } catch (error) {
        toast.error('Failed to load latest products');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          loop
          className="h-full"
        >
          {[
            { img: 'https://i.ibb.co.com/mCh6H6j2/export-1.jpg', title: 'Global Trade, One Click Away' },
            { img: 'https://i.ibb.co.com/5g5JrJSM/export-2.png', title: 'Import & Export with Confidence' },
            { img: 'https://i.ibb.co.com/7NrKR4Rd/export-3.jpg', title: 'Connect to Worldwide Markets' },
            { img: 'https://i.ibb.co.com/NgBCXP0Z/export-4.jpg', title: 'Your Gateway to Global Commerce' },
          ].map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full">
                <img src={slide.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-3">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl drop-shadow">
                      Discover global products and manage your imports easily
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Latest Products
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 border-2 border-dashed rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {latestProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            to="/all-products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            See All Products
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            Benefits of Using Our Service
          </h2>
          <ul className="space-y-4 text-lg text-gray-700">
            {[
              'Access to a wide range of global products.',
              'Efficient and secure import/export processes.',
              'User-friendly interface for easy navigation.',
              'Secure transactions and user data protection.',
              'Real-time tracking of your imports and exports.',
            ].map((benefit, i) => (
              <li key={i} className="flex items-center">
                <span className="text-2xl mr-3">{['Globe', 'Truck', 'Lightbulb', 'Lock', 'Chart'][i]}</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: 'Excellent service! I imported products without any hassles. Highly recommend!', author: 'Alice, Business Owner' },
              { text: 'The platform is user-friendly and made my export process so much easier.', author: 'Bob, International Trader' },
              { text: 'Great selection of products! I\'ll definitely use this service again.', author: 'Charlie, Retailer' },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                <p className="italic text-gray-700 mb-3">"{t.text}"</p>
                <p className="text-right font-semibold text-blue-600">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Banner />
    </div>
  );
};

export default Home;