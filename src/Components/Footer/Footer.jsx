const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Import Export Hub</h3>
            <p>Connecting global markets with ease.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img src="https://example.com/x-logo.png" alt="X" className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>Email: support@importexporthub.com</p>
            <p>Phone: +1-800-123-4567</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p>&copy; 2025 Import Export Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;