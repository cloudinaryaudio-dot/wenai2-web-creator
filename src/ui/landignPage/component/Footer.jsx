import React from 'react';
import { Crown, Heart, Instagram, Facebook, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import { useContactStore } from '../../../db/store/useWeddingStore';

/**
 * Footer Component
 * Senior-level design with improved layout, spacing, and visual hierarchy
 * Professional, clean, and well-organized
 */
export function Footer() {
  const data = useContactStore(s=>s.data);
  
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#instagram',
      gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      shadowColor: 'rgba(236, 72, 153, 0.25)'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#facebook',
      gradient: 'linear-gradient(135deg, #3b82f6, #1e40af)',
      shadowColor: 'rgba(59, 130, 246, 0.25)'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: '#twitter',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      shadowColor: 'rgba(6, 182, 212, 0.25)'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: '#youtube',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      shadowColor: 'rgba(239, 68, 68, 0.25)'
    }
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' }
  ];

  const supportLinks = [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' }
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: data?.mobile ? `+91${data.mobile}` : '+916264723951',
      href: data?.mobile ? `tel:+91${data.mobile}` :  'tel:+916264723951'
    },
    {
      icon: Mail,
      label: data?.email ? `${data.email}` : 'digiVivah@gmail.com',
      href: data?.email ? `mailto:${data.email}` : 'mailto:digiVivah@gmail.com'
    }
  ];

  return (
    <footer 
      className="relative overflow-hidden" 
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.98), rgba(255, 253, 250, 0.95))',
        borderTop: '1px solid rgba(236, 72, 153, 0.15)'
      }}
      role="contentinfo"
    >
      {/* Subtle Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent)'
          }}
        />
        <div 
          className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent)'
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4 py-12 md:py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-12">
          
          {/* Brand Section - Compact */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #f43f5e)'
                }}
              >
                <Crown className="h-6 w-6 text-white drop-shadow-md" />
              </div>
               <h1
                className="text-4xl font-bold"
                style={{
                  color: "#ec4899",
                }}
              >
                digiVivah
              </h1>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 max-w-xs">
              Transforming wedding invitations with innovative digital experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-3 text-gray-700 hover:text-rose-600 transition-colors duration-200 group"
                  >
                    <Icon className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                    <span className="text-sm md:text-base font-medium hover:underline">{info.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links - Minimal */}
          <div>
            <h4 className="font-semibold mb-5 text-gray-900 text-sm uppercase tracking-widest">Links</h4>
            <ul className="space-y-3 text-sm" role="navigation">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-700 hover:text-rose-600 transition-colors duration-200 font-medium"
                    style={{ textDecoration: 'none' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links - Minimal */}
          <div>
            <h4 className="font-semibold mb-5 text-gray-900 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-3 text-sm" role="navigation">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-700 hover:text-rose-600 transition-colors duration-200 font-medium"
                    style={{ textDecoration: 'none' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media - Vertical */}
          <div>
            <h4 className="font-semibold mb-5 text-gray-900 text-sm uppercase tracking-widest">Social</h4>
            <div className="flex flex-col gap-3" role="group" aria-label="Social media links">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group"
                    style={{
                      background: 'rgba(236, 72, 153, 0.05)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = social.gradient;
                      e.currentTarget.style.boxShadow = `0 8px 20px ${social.shadowColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(236, 72, 153, 0.05)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon 
                      className="w-4 h-4 transition-colors duration-300"
                      style={{ color: '#ec4899' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#ec4899';
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors duration-300">
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          style={{
            borderTop: '1px solid rgba(236, 72, 153, 0.15)'
          }}
          className="my-8"
        />

        {/* Bottom Section - Minimal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs md:text-sm text-gray-600 font-medium text-center md:text-left">
            © {new Date().getFullYear()} digiVivah. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <span>Made with</span>
            <Heart 
              className="w-4 h-4 fill-rose-500 text-rose-500 flex-shrink-0"
              style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
            <span>for special moments</span>
          </div>

          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#privacy" className="hover:text-rose-600 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-rose-600 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </footer>
  );
}
