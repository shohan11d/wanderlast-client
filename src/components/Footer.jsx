const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
  <div className="mx-auto max-w-7xl px-6 py-12">
    <div className="grid gap-8 md:grid-cols-3">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">
          Learning Services
        </h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              One-to-One Tutoring
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Online Courses
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Homework Assistance
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Exam Preparation
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">
          Contact
        </h3>
        <ul className="space-y-2">
          <li>Email: hello@example.com</li>
          <li>Phone: +880 1234-567890</li>
          <li>Dhaka, Bangladesh</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">
          Follow Us
        </h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Facebook
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              YouTube
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm">
      <p>&copy; 2026 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</footer>
  );
};

export default Footer;