import React from 'react';

const Banner = () => {
    return (

        <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">Why Choose Global Trade?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                        <div className="text-6xl mb-4">Globe</div>
                        <h3 className="text-xl font-bold mb-3">Worldwide Reach</h3>
                        <p className="text-gray-600">Access products from 100+ countries with one click</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                        <div className="text-6xl mb-4">Shield</div>
                        <h3 className="text-xl font-bold mb-3">Secure & Safe</h3>
                        <p className="text-gray-600">Escrow payments and verified suppliers</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                        <div className="text-6xl mb-4">Truck</div>
                        <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                        <p className="text-gray-600">Real time tracking from warehouse to door</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
