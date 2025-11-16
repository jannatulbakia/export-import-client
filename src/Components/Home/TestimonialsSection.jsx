const TestimonialsSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-700">"This platform made importing products so easy! The interface is clean and intuitive."</p>
            <p className="mt-4 font-semibold">— Jane Doe</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-700">"I love the real-time sync feature. Managing my exports has never been smoother."</p>
            <p className="mt-4 font-semibold">— John Smith</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;