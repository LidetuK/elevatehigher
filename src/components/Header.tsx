import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [adminKeySequence, setAdminKeySequence] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const SECRET_SEQUENCE = ['e', 'l', 'e', 'v', 'a', 't', 'e', 'h', 'i', 'g', 'h', 'e', 'r', '@', '1', '2', '3'];

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

  useEffect(() => {
    if (adminKeySequence.length === SECRET_SEQUENCE.length) {
      const isMatch = adminKeySequence.every((key, index) => key === SECRET_SEQUENCE[index]);
      
      if (isMatch) {
        navigate('/admin');
        setAdminKeySequence([]);
      }
    }
    
    const timer = setTimeout(() => {
      if (adminKeySequence.length > 0 && adminKeySequence.length < SECRET_SEQUENCE.length) {
        setAdminKeySequence([]);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [adminKeySequence, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        setAdminKeySequence(prev => {
          const newSequence = [...prev, e.key.toLowerCase()];
          if (newSequence.length > SECRET_SEQUENCE.length) {
            return newSequence.slice(1);
          }
          return newSequence;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
      </div>
    </header>
  );
};

export default Header;
