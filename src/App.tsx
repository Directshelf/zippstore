import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Paintbrush, Settings, Store, Building, Building2, ShoppingBag, FileSignature, Package, Globe, Lightbulb, Search, MapPinned, Plane, Landmark, Building as Buildings, CircleDashed, ShoppingCart } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactFormPopup from './components/ContactFormPopup';
import './animations.css';

function App() {
  const connectingLineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const [countersVisible, setCountersVisible] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const ticking = useRef(false);
  const animationStarted = useRef(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  // Add to refs array
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current[index] = el;
    }
  };

  useEffect(() => {
    // Animation for scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    // Animation for connecting line and active step with requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateLineHeight();
          checkStatsVisibility();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    const updateLineHeight = () => {
      const modelSection = document.getElementById('model-section');
      if (!modelSection) return;

      const rect = modelSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Only calculate when section is visible or partially visible
      if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
        // Create a smoother range with more granular steps
        const visibleRange = windowHeight + sectionHeight;
        const scrolled = windowHeight - sectionTop;
        
        // Add more easing to the animation
        const scrollProgress = Math.min(1, Math.max(0, scrolled / visibleRange));
        const easedProgress = Math.pow(scrollProgress, 1.5) * 100; // Power function for smoother easing
        
        // Limit scroll range to prevent the line from going beyond the section
        const finalProgress = Math.min(98, Math.max(0, easedProgress));
        
        setLineHeight(finalProgress);
        
        // Calculate a normalized value for determining active step with smoother transitions
        const normalizedPercentage = finalProgress;
        
        // Smoother thresholds with hysteresis to prevent flickering
        if (normalizedPercentage < 33) {
          setActiveStep(0);
        } else if (normalizedPercentage >= 33 && normalizedPercentage < 66) {
          setActiveStep(1);
        } else {
          setActiveStep(2);
        }
      } else if (sectionTop >= windowHeight) {
        // Reset when completely above viewport
        setLineHeight(0);
        setActiveStep(0);
      } else if (sectionTop <= -sectionHeight) {
        // Ensure completion when completely below viewport
        setLineHeight(98);
        setActiveStep(2);
      }
    };

    // More robust check for stats section visibility
    const checkStatsVisibility = () => {
      if (statsRef.current) {
        const statsRect = statsRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Trigger counter animation when stats section is 30% visible
        if (statsRect.top < windowHeight * 0.7 && !animationStarted.current) {
          setCountersVisible(true);
          animationStarted.current = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Run once on component mount
    updateLineHeight();
    checkStatsVisibility();

    return () => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect for updating the line DOM element when lineHeight changes
  useEffect(() => {
    if (connectingLineRef.current) {
      connectingLineRef.current.style.height = `${lineHeight}%`;
    }
  }, [lineHeight]);

  // Animate counters when visible
  useEffect(() => {
    if (countersVisible) {
      // Animate percentage counters with a more robust animation
      const duration = 2000;
      const interval = 20;
      const steps = duration / interval;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = Math.min(1, currentStep / steps);
        
        // Using eased progress for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        
        setCount1(0); // Zero Lease Hassles stays at 0
        setCount2(Math.round(75 * easedProgress)); // 75% Reduced Launch Costs
        setCount3(Math.round(100 * easedProgress)); // 100% Omnichannel Integration (changed from 80%)
        setCount4(Math.min(6, Math.round(6 * easedProgress))); // 4-6 Weeks Average Launch Time
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [countersVisible]);

  // Format cards data - removed Innovation Hubs and Travel Retail
  const formatCards = [
    {
      id: 'retail-ecosystem',
      title: 'Retail Ecosystem',
      description: 'Our diverse portfolio accommodates every brand expansion strategy',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      icon: <CircleDashed className="w-6 h-6" />
    },
    {
      id: 'urban-flagships',
      title: 'Urban Flagships',
      description: 'Premium high-visibility locations in city centers and commercial districts',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      icon: <Landmark className="w-6 h-6" />
    },
    {
      id: 'shopping-destinations',
      title: 'Shopping Destinations',
      description: 'Strategic positions in high-traffic malls and retail centers',
      image: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?auto=format&fit=crop&w=800&q=80',
      icon: <ShoppingCart className="w-6 h-6" />
    },
    {
      id: 'specialized-retail',
      title: 'Specialized Retail',
      description: 'Curated spaces for pop-ups, seasonal concepts, and outlet opportunities',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
      icon: <Store className="w-6 h-6" />
    }
  ];

  const openContactPopup = () => {
    setIsContactPopupOpen(true);
  };

  const closeContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  return (
    <div className="font-sans">
      <Header openContactPopup={openContactPopup} />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-[100vh] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=2000&q=80" 
            alt="Retail Store Interior"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 flex items-center justify-center relative z-10">
          <div className="max-w-5xl mx-auto text-center py-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white reveal">
              We solve the hardest part of retail
              <span className="relative inline-block">
                <span className="word-rotate absolute inset-0 text-blue-500">right size</span>
                <span className="word-rotate absolute inset-0 text-blue-500">right time</span>
                <span className="word-rotate absolute inset-0 text-blue-500">right there</span>
                <span className="opacity-0">right there</span>
              </span>
            </h1>
            
            {/* Out of Stock CTA - Moved from CTA section to hero */}
            <div className="mt-8 max-w-3xl mx-auto reveal">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-blue-500">
                Never lose a customer to 'Out of Stock' again.
              </h2>
              <button 
                onClick={openContactPopup}
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300 pulse"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why ZippStore Section */}
      <section id="why-zippstore" className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why ZippStore?</h2>
            <p className="text-lg sm:text-xl font-bold max-w-3xl mx-auto text-blue-600 italic">
              "Getting a customer to walk into the store is already a major challenge - missing their size at that moment risks losing both satisfaction and future sales."
            </p> 
            <p className="text-gray-700 max-w-3xl mx-auto mt-2">
              We offer a comprehensive solution to empower your brand's offline presence
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg reveal hover-lift">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-700 flex items-center justify-center mr-3">
                  <FileSignature className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Flexible Leasing, Zero Hassles</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                We sign the lease, not you. We cover the majority of initial build-out costs.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg reveal hover-lift">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-700 flex items-center justify-center mr-3">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Plug & Play Stores</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                From display racks to billing systems—everything's set up. Just walk in and start selling.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg reveal hover-lift">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-700 flex items-center justify-center mr-3">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Go Omnichannel, Instantly</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                Never Go Stock out as our Local fulfillment hubs are approximately 5Km so that replenishment will happen instantly.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg reveal hover-lift">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-700 flex items-center justify-center mr-3">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Test, Learn, Expand</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                Run pop-ups, pilot products, or explore new markets—without heavy overheads.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg reveal hover-lift">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-700 flex items-center justify-center mr-3">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Digital Discovery & Booking</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                Explore locations, compare pricing, and book retail space 100% online—no agents, no delays.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg reveal hover-lift">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-700 flex items-center justify-center mr-3">
                  <MapPinned className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Prime Locations, Curated for You</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                We partner with malls, high streets, and transit hubs to bring you only high-visibility spaces that convert.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section id="performance" ref={statsRef} className="py-16 md:py-20 bg-gray-100" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&w=2000&q=80")', backgroundSize: 'cover', backgroundBlendMode: 'soft-light' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Launch Fast. Spend Smart. Perform Big.</h2>
            <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
              ZippStore powers rapid retail rollouts by securing prime spots at lower costs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Zero Lease Hassles (changed from Financial Burden) */}
            <div className="text-center reveal">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#e5e5e5" 
                    strokeWidth="2"
                  />
                  {/* Progress circle - full navy circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="3"
                    strokeDasharray="283" 
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl font-bold text-gray-900">{count1}</span>
                </div>
              </div>
              <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-900">Zero Lease Hassles</h3>
            </div>
            
            {/* 75% Reduced Launch Costs - With animation */}
            <div className="text-center reveal">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#e5e5e5" 
                    strokeWidth="2"
                  />
                  {/* Progress circle with animation */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="3" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * count2 / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl font-bold text-gray-900">{count2}%</span>
                </div>
              </div>
              <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-900">Reduced Launch Costs</h3>
            </div>
            
            {/* 100% Omnichannel Integration - With animation (changed from 80%) */}
            <div className="text-center reveal">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#e5e5e5" 
                    strokeWidth="2"
                  />
                  {/* Progress circle with animation */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="3" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * count3 / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl font-bold text-gray-900">{count3}%</span>
                </div>
              </div>
              <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-900">Omnichannel Integration</h3>
            </div>
            
            {/* 4-6 Weeks Average Launch Time (changed from 4 Weeks) */}
            <div className="text-center reveal">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#e5e5e5" 
                    strokeWidth="2"
                  />
                  {/* Full navy circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="3" 
                    strokeDasharray="283" 
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-4xl font-bold text-gray-900">4-6</span>
                  <span className="text-xs sm:text-sm text-gray-700">Weeks</span>
                </div>
              </div>
              <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-900">Average Launch Time</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Offer Section */}
      <section id="what-we-offer" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">What We Offer</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              A comprehensive suite of services to support your brand's growth
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md reveal hover-lift">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-navy-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-navy-700" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 text-center">Finding the Perfect Space</h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                Identifying the ideal offline destination for your brand.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white p-4 rounded-lg shadow-md reveal hover-lift">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-navy-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6 text-navy-700" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 text-center">Crafting Retail Identity</h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                Designing and executing store concepts that reflect your brand.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white p-4 rounded-lg shadow-md reveal hover-lift">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-navy-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-navy-700" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 text-center">Smooth Retail Operations</h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                Effortless POS integrations and trained staff support.
              </p>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white p-4 rounded-lg shadow-md reveal hover-lift">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-navy-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Store className="w-5 h-5 sm:w-6 sm:h-6 text-navy-700" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 text-center">Marketing Solutions</h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                Boosting visibility and engagement for your physical stores.
              </p>
            </div>
            
            {/* Service 5 */}
            <div className="bg-white p-4 rounded-lg shadow-md reveal hover-lift">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-navy-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-navy-700" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 text-center">Retail Intelligence</h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                Data-driven insights to enhance brand performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Formats Section - updated to display 4 cards in one row */}
      <section id="formats" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Retail Ecosystem</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Our diverse portfolio accommodates every brand expansion strategy
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {formatCards.map((format, index) => (
              <div key={format.id} className="reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift h-full">
                  <div className="relative h-36 sm:h-44 overflow-hidden">
                    <img 
                      src={format.image}
                      alt={format.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-navy-700 rounded-full flex items-center justify-center mr-3 shadow-md">
                          {React.cloneElement(format.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-white" })}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white">{format.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs sm:text-sm text-gray-700">{format.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Us Section - Moved to after Retail Ecosystem section */}
      <section id="about" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">About Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Global Experience, Local Impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="reveal">
              <img 
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80" 
                alt="Global Experience" 
                className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center reveal">
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                With over a <span className="font-bold">15+ years of real estate expertise and operations across 10+ countries</span>, our founders bring a wealth of global insight and strategic vision to the Indian retail landscape.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                Our mission is to be a seamless offline enabler and ecosystem for brands—empowering them to source, design, execute, and operate retail stores with ease.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                We bring together strategic thinking, operational excellence, and a future-ready mindset to help brands expand their physical presence with speed, flexibility, and precision—all while keeping customer experience at the core.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-blue-500 reveal">
              "Turn digital success into offline growth<br/>
              with Zippstore's flexible, end-to-end retail solutions."
            </h2>
            <div className="reveal mt-8" style={{ transitionDelay: '0.2s' }}>
              <button 
                onClick={openContactPopup}
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300 pulse"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form Popup */}
      <ContactFormPopup 
        isOpen={isContactPopupOpen}
        onClose={closeContactPopup}
      />
      
      <Footer />
    </div>
  );
}

export default App;