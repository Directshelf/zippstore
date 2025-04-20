import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

interface HeaderProps {
  openContactPopup: () => void;
}

const Header: React.FC<HeaderProps> = ({ openContactPopup }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-white bg-opacity-95 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="text-xl font-bold text-gray-900 flex items-center">
              <span className="text-2xl font-bold flex flex-col">
                ZippStore<span className="text-xs text-gray-600 font-normal">Leading the Way in Retail-as-a-Service in India</span>
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#home" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300 text-lg font-semibold">Home</a>
            <a href="#why-zippstore" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300 text-lg font-semibold">Our Model</a>
            <a href="#what-we-offer" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300 text-lg font-semibold">What We Offer</a>
            <a href="#formats" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300 text-lg font-semibold">Formats</a>
            <a href="#about" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300 text-lg font-semibold">About Us</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openContactPopup(); }} className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300 text-lg font-semibold">Contact</a>
          </nav>
          
          {/* Phone Number */}
          <div className="hidden md:flex items-center">
            <a href="tel:08047939544" className="text-white bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-700 transition-colors text-base font-medium flex items-center ml-4">
              <Phone className="w-4 h-4 mr-2" /> 08047939544
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white mt-4 py-4 px-2 rounded-md shadow-lg">
            <nav className="flex flex-col space-y-1">
              <a href="#home" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#why-zippstore" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Our Model</a>
              <a href="#what-we-offer" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>What We Offer</a>
              <a href="#formats" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Formats</a>
              <a href="#about" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
              <a href="#" className="text-gray-800 hover:text-navy-700 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 text-lg font-semibold" onClick={(e) => { e.preventDefault(); openContactPopup(); setIsMobileMenuOpen(false); }}>Contact</a>
              <a href="tel:08047939544" className="text-white bg-blue-600 px-5 py-3 rounded-md hover:bg-blue-700 transition-colors text-base font-medium text-center mt-2 flex items-center justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Phone className="w-4 h-4 mr-2" /> 08047939544
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;