import React from "react";
import { Mail, Phone, Heart } from "lucide-react";
import { useContactStore } from "../../../db/store/useWeddingStore";

export default function FooterFourteenPage(){

  const data = useContactStore(s=>s.data);
  
  return (
    <footer className="bg-gradient-to-r from-amber-50 via-rose-100 to-orange-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Company Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 p-1.5 shadow-md">
                <img 
                  src="https://pngdownload.io/wp-content/uploads/2024/02/Instagram-Logo-social-media-transparent-PNG-image-1536x1536.webp" 
                  alt="digiVivaha Invite Logo" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                  digiVivah Invite
                </h3>
                <p className="text-gray-500 text-xs">Digital Wedding Invites</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center">
            <div className="space-y-1 text-center">
              <a 
                href={`tel:+91${data.mobile}`}
                className="flex items-center justify-center gap-1 text-gray-700 hover:text-rose-600 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+91 {data.mobile}</span>
              </a>
              <a 
                href={`mailto:${data.email}`}
                className="flex items-center justify-center gap-1 text-gray-700 hover:text-rose-600 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{data.email}</span>
              </a>
            </div>
          </div>

          {/* Social & CTA Section */}
          
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mb-5"></div>

        {/* Order CTA Section */}
        <div className="bg-gradient-to-r from-rose-100 to-amber-100 rounded-xl p-5 mb-5 text-center border border-rose-200">
          <p className="text-sm text-gray-700 mb-3">
            अपनी शादी का परफ़ेक्ट डिजिटल निमंत्रण बनाएं!
          </p>
          <a 
            href={`https://wa.me/91${data.mobile}?text=I%20want%20to%20order%20digital%20wedding%20invitations`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
              alt="WhatsApp"
              className="w-4 h-4"
            />
            <span>WhatsApp पर संपर्क करें</span>
          </a>
        </div>

        {/* Credit Section */}
        <div className="mt-2 text-center">
        <span className="block font-medium text-gray-700">
          यह निमंत्रण <span className="text-rose-600 font-bold">digiVivah Invite</span> पर बनाया गया है
        </span>
        <span className="block text-gray-600">
          अपनी शादी को खास बनाएं, हमारे डिजिटल निमंत्रण सेवा के साथ।
        </span>
      </div>

        {/* Bottom Footer - Two Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-center md:text-left border-t border-rose-200 pt-4">
          <div className="text-gray-600">
            <p>© 2025 digiVivah Invite | All Rights Reserved</p>
            <p className="text-gray-500"><a href="#" className="hover:text-rose-600">Privacy Policy</a> | <a href="#" className="hover:text-rose-600">Terms & Conditions</a></p>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-1 text-gray-600">
            <span>Made with</span>
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500 animate-pulse" />
            <span>by digiVivah Invite</span>
            </div></div></div></footer>
  );
};


