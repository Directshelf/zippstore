import React from 'react';
import { X } from 'lucide-react';

interface ContactFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Popup content */}
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full z-10 relative overflow-hidden">
        {/* Navy blue header */}
        <div className="bg-navy-700 text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Form content */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Let us know how we can help you never lose a customer to out-of-stock issues again.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="popup-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
                type="text" 
                id="popup-name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-navy-700 focus:border-navy-700" 
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="popup-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="popup-email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-navy-700 focus:border-navy-700" 
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="popup-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                id="popup-phone" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-navy-700 focus:border-navy-700" 
                placeholder="Your contact number"
              />
            </div>
            <div>
              <label htmlFor="popup-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="popup-message" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-navy-700 focus:border-navy-700"
                placeholder="Tell us about your current stock challenges and goals"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-navy-700 text-white py-2.5 rounded-md hover:bg-navy-800 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormPopup;