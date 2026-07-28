import React, { useState } from 'react';
import { Phone, MapPin, Send, MessageCircle } from 'lucide-react';

/**
 * ContactSection Component
 * Updated: Email removed, form sends ONLY user input to WhatsApp
 * WhatsApp card has fixed Hindi/English greeting (no form data)
 * Phone opens dialer, both WhatsApp options optimized for mobile
 */
export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const businessPhone = '+916264723951';

  // Form submits ONLY what user types - no greeting
  // Form submits user input with clear prefixes
const handleWhatsAppSubmit = (e) => {
  e.preventDefault();
  const message = `👤 Name: ${formData.name}
📱 Phone: ${formData.phone}

💍 Details:
${formData.message}`;
  
  const phoneClean = businessPhone.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  
  setSubmitStatus('whatsapp');
  setTimeout(() => setSubmitStatus(null), 3000);
};


  // WhatsApp card - FIXED Hindi/English greeting only
  const handleWhatsAppCardClick = () => {
    const greeting = `नमस्ते 🙏\nमैं Digivivah के साथ डिजिटल विवाह निमंत्रण बनाना चाहता/चाहती हूँ।\n\nNamaste 🙏\nI want to create digital wedding invitations with Digivivah.`;
    const phoneClean = businessPhone.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(greeting);
    const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${businessPhone}`;
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      primary: businessPhone,
      secondary: 'Tap to Call',
      gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
      hoverShadow: 'rgba(59, 130, 246, 0.3)',
      hoverColor: '#2563eb',
      bgGradient: 'rgba(59, 130, 246, 0.08)',
      onClick: handlePhoneClick,
      isInteractive: true
    },
    {
      icon: MapPin,
      title: 'Location',
      primary: 'Ashta, Madhya Pradesh',
      secondary: 'India - 466116',
      gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      hoverShadow: 'rgba(168, 85, 247, 0.3)',
      hoverColor: '#7c3aed',
      bgGradient: 'rgba(168, 85, 247, 0.08)'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      primary: businessPhone,
      secondary: 'Quick Greeting',
      gradient: 'linear-gradient(135deg, #25d366, #128c7e)',
      hoverShadow: 'rgba(37, 211, 102, 0.3)',
      hoverColor: '#128c7e',
      bgGradient: 'rgba(37, 211, 102, 0.08)',
      onClick: handleWhatsAppCardClick,
      isInteractive: true
    }
  ];

  return (
    <section 
      id="contact" 
      className="py-28 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 250, 252, 0.92), rgba(255, 248, 250, 0.88), rgba(255, 245, 248, 0.85))'
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5), transparent)',
            animation: 'pulse 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(212, 116, 95, 0.4), transparent)',
            animation: 'pulse 10s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)',
            animation: 'pulse 12s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div 
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full max-w-max mx-auto border-2 transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(244, 63, 94, 0.12)",
              borderColor: "rgba(244, 63, 94, 0.45)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Send className="w-5 h-5 text-rose-600 animate-pulse" />
            <span className="text-sm font-semibold text-rose-700 uppercase tracking-wider">
              Get In Touch
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(to right, #ec4899, #f43f5e, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Let's Create Magic Together
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Ready to transform your wedding vision into an extraordinary digital experience with Digivivah?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* WhatsApp Form - Sends ONLY user input */}
          <div 
            className="p-8 sm:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2"
            style={{
              background: 'rgba(255, 255, 255, 0.93)',
              backdropFilter: 'blur(25px)',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(236, 72, 153, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-green-500" />
              Send Your Details
            </h3>
            
            {submitStatus === 'whatsapp' && (
              <div 
                className="p-4 rounded-2xl text-center font-semibold text-white border-2 mb-6 animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  borderColor: 'rgba(37, 211, 102, 0.6)',
                  boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)'
                }}
              >
                ✅ WhatsApp opening with your details!
              </div>
            )}

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-4 border-2 rounded-2xl transition-all duration-300 text-lg placeholder-gray-400 font-medium focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderColor: '#e5e7eb',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#25d366';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 211, 102, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.04)';
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-4 border-2 rounded-2xl transition-all duration-300 text-lg placeholder-gray-400 font-medium focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderColor: '#e5e7eb',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#25d366';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 211, 102, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.04)';
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Wedding Details *</label>
                <textarea
                  placeholder="Tell us about your wedding date, theme, or special requirements..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-4 border-2 rounded-2xl transition-all duration-300 text-lg placeholder-gray-400 font-medium resize-vertical focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderColor: '#e5e7eb',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
                    minHeight: '120px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#25d366';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 211, 102, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.04)';
                  }}
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-5 px-8 rounded-2xl font-bold text-lg text-white shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                style={{
                  boxShadow: '0 10px 30px rgba(34, 197, 94, 0.4)'
                }}
                onMouseEnter={(e) => e.target.style.boxShadow = '0 15px 40px rgba(34, 197, 94, 0.6)'}
                onMouseLeave={(e) => e.target.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.4)'}
              >
                <MessageCircle className="w-6 h-6" />
                Send My Details
              </button>
            </form>
          </div>

          {/* Interactive Contact Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const isInteractive = info.isInteractive;
              return (
                <div
                  key={index}
                  className={`p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 group ${isInteractive ? 'cursor-pointer ring-2 ring-transparent hover:ring-green-200' : 'cursor-default'}`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.93)',
                    backdropFilter: 'blur(25px)',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                  }}
                  onClick={info.onClick}
                  role={isInteractive ? "button" : undefined}
                  tabIndex={isInteractive ? 0 : undefined}
                  onKeyDown={(e) => isInteractive && e.key === 'Enter' && info.onClick()}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-4 rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0 relative"
                      style={{ 
                        background: info.gradient,
                      }}
                    >
                      <Icon className="w-7 h-7 text-white drop-shadow-lg" />
                      {isInteractive && (
                        <div className="absolute -inset-1 bg-green-400/20 rounded-xl blur animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-xl font-bold text-gray-900 mb-2 truncate"
                        style={{ color: info.hoverColor }}
                      >
                        {info.title}
                      </h3>
                      <p className="text-gray-700 font-semibold text-lg break-all">{info.primary}</p>
                      <p className="text-gray-600 text-sm mt-1">{info.secondary}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
