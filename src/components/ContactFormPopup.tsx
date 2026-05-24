import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ContactFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\s|-/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('popup-', '');
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    // Clear error for this field when user starts typing
    setErrors(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Google Form submission using form response endpoint
      const formId = '1FAIpQLSe-O-V6S0m-QWQjDTEriJ8VEthVVfzqlfstE0dbX0_x9AbeWw';
      // Try the standard formResponse endpoint
      const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

      const formDataToSend = new FormData();
      formDataToSend.append('entry.743891251', formData.name); // Name field
      formDataToSend.append('entry.1942974875', formData.email); // Email field
      formDataToSend.append('entry.2082526110', formData.phone); // Phone field
      formDataToSend.append('entry.1170563977', formData.message); // Message field

      console.log('Submitting to:', formUrl);
      console.log('Form data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });

      // Submit to Google Form
      const response = await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend
      });

      console.log('Response status:', response.status);
      console.log('Response statusText:', response.statusText);

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({ name: '', email: '', phone: '', message: '' });

      // Close popup after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✓</div>
              <p className="text-gray-700 font-semibold">Thank you!</p>
              <p className="text-gray-600 text-sm mt-2">Your message has been submitted successfully.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Let us know how we can help you never lose a customer to out-of-stock issues again.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="popup-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="popup-name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-navy-700 focus:border-navy-700 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="popup-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="popup-email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-navy-700 focus:border-navy-700 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    placeholder="you@company.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="popup-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="popup-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-navy-700 focus:border-navy-700 ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    placeholder="Your contact number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="popup-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="popup-message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-navy-700 focus:border-navy-700 ${errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    placeholder="Tell us about your current stock challenges and goals"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-navy-700 text-white py-2.5 rounded-md hover:bg-navy-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Send Message'}
                </button>
              </form>
            </>
          )}

          {/* Reach out us section */}
          {!submitted && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Reach Out to Us</h4>
              <p className="text-sm text-gray-600 mb-2">
                You can also contact us directly at:
              </p>
              <a
                href="mailto:support@zippstore.com"
                className="text-navy-700 hover:text-navy-800 font-medium text-sm break-all"
              >
                support@zippstore.com
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFormPopup;