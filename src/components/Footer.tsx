import React from 'react';

const Footer = () => {
  return (
    <footer className="relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556911073-a517e752729c?auto=format&fit=crop&w=2000&q=80" 
          alt="Footer background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-95"></div>
      </div>
      
      {/* Copyright */}
      <div className="py-4 relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-xs text-center">
            © Copyright 2025. All Rights Reserved By ZippStore.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;