
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold text-book-secondary transition-all duration-300"
        >
          Book<span className="text-book-primary">Review</span>
        </Link>

        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className="text-sm font-medium text-book-secondary/80 hover:text-book-primary transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/admin" 
                className="text-sm font-medium text-book-secondary/80 hover:text-book-primary transition-colors duration-200"
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
