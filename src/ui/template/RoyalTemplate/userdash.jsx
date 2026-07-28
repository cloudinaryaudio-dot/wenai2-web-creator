import React, { useState } from "react";
import { ArrowLeft, Eye, Share2, Download, Phone, Mail, MapPin, Clock } from "lucide-react";

// ===== DUMMY DATA =====
const mockUser = {
  id: "user_001",
  name: "राहुल शर्मा",
  nameEnglish: "Rahul Sharma",
  email: "rahul.sharma@digivah.com",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  memberSince: "नवंबर 2025",
  totalTemplates: 4,
};

const mockTemplates = [
  {
    id: 1,
    name: "क्लासिक वैवाहिक परिचय",
    nameEnglish: "Classic Wedding Biodata",
    status: "Active",
    previewImage: "https://i.pinimg.com/736x/68/ae/89/68ae899fd07a302d66164ce8ca9f42c6.jpg",
    lastUpdated: "12 दिसंबर 2025",
    views: 45,
    shares: 12,
    groom: {
      name: "राहुलसिंहजी राठौड़",
      nameEnglish: "Rahul Singh Rathod",
      age: 28,
      height: "5' 8\"",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    bride: {
      name: "अनिता कुमारी",
      nameEnglish: "Anita Kumari",
      age: 26,
      height: "5' 4\"",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
  },
  {
    id: 2,
    name: "प्रीमियम फूलों का परिचय",
    nameEnglish: "Premium Floral Biodata",
    status: "Active",
    previewImage: "https://i.pinimg.com/1200x/f9/be/64/f9be64cc631b4194a79872a0007e980b.jpg",
    lastUpdated: "08 दिसंबर 2025",
    views: 32,
    shares: 8,
    groom: {
      name: "विक्रमसिंहजी सिसोदिया",
      nameEnglish: "Vikram Singh Sisodia",
      age: 30,
      height: "5' 10\"",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    bride: {
      name: "प्रिया सिंह",
      nameEnglish: "Priya Singh",
      age: 28,
      height: "5' 5\"",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
  },
  {
    id: 3,
    name: "आधुनिक न्यूनतम परिचय",
    nameEnglish: "Modern Minimalist Biodata",
    status: "Draft",
    previewImage: "https://i.pinimg.com/736x/f0/ee/3a/f0ee3aa4b129fe91160a8d60ed05b764.jpg",
    lastUpdated: "05 दिसंबर 2025",
    views: 15,
    shares: 3,
    groom: {
      name: "अमितसिंहजी चौहान",
      nameEnglish: "Amit Singh Chauhan",
      age: 27,
      height: "5' 9\"",
      image: "https://images.unsplash.com/photo-1530268729831-4be100a9f57c?w=400&h=400&fit=crop",
    },
    bride: {
      name: "दिव्या शर्मा",
      nameEnglish: "Divya Sharma",
      age: 25,
      height: "5' 3\"",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  },
  {
    id: 4,
    name: "परंपरागत शाही परिचय",
    nameEnglish: "Traditional Royal Biodata",
    status: "Active",
    previewImage: "https://i.pinimg.com/1200x/c0/b8/60/c0b86090804943e89ff19af356ad265f.jpg",
    lastUpdated: "01 दिसंबर 2025",
    views: 67,
    shares: 19,
    groom: {
      name: "कुंवरसिंहजी राठौड़",
      nameEnglish: "Kunwar Singh Rathod",
      age: 29,
      height: "5' 11\"",
      image: "https://images.unsplash.com/photo-1521296573592-7aae4d994744?w=400&h=400&fit=crop",
    },
    bride: {
      name: "सुप्रिया देवी",
      nameEnglish: "Supriya Devi",
      age: 27,
      height: "5' 6\"",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
  },
];

// ===== DASHBOARD COMPONENT =====
export default function UserDashboard({ onViewTemplate }) {
  const [shareModal, setShareModal] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleShare = (templateId) => {
    setShareModal(templateId);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("लिंक कॉपी हो गया! 📋");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .animate-slide-in-down {
          animation: slideInDown 0.6s ease-out forwards;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .button-pulse {
          animation: pulse-scale 2s ease-in-out infinite;
        }
      `}</style>

      {/* ===== TOP BAR ===== */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button className="p-2 hover:bg-rose-50 rounded-full transition-colors duration-200 group">
            <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-rose-600 transition-colors" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
            आपके टेम्प्लेट
          </h1>
          <div className="w-9" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* ===== USER PROFILE CARD ===== */}
        <div className="mb-12 animate-slide-in-up">
          <div className="bg-gradient-to-br from-white to-rose-50/50 rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-lg card-hover">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-1">
                  {mockUser.name}
                </h2>
                <p className="text-lg text-rose-600 font-medium mb-4">
                  {mockUser.nameEnglish}
                </p>

                {/* Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-700 justify-center sm:justify-start">
                    <Mail className="w-4 h-4 text-rose-500" />
                    <span className="text-sm">{mockUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 justify-center sm:justify-start">
                    <Phone className="w-4 h-4 text-rose-500" />
                    <span className="text-sm">{mockUser.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 justify-center sm:justify-start">
                    <Clock className="w-4 h-4 text-rose-500" />
                    <span className="text-sm">सदस्य: {mockUser.memberSince}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 justify-center sm:justify-start">
                    <LayoutGrid className="w-4 h-4 text-rose-500" />
                    <span className="text-sm font-semibold">{mockUser.totalTemplates} टेम्प्लेट</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  प्रोफाइल संपादित करें
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TEMPLATES SECTION ===== */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-rose-100 rounded-xl">
              <LayoutGrid className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                आपके टेम्प्लेट
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                कुल {mockTemplates.length} सक्रिय टेम्प्लेट
              </p>
            </div>
          </div>
        </div>

        {/* ===== TEMPLATES GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTemplates.map((template, idx) => (
            <TemplateCard
              key={template.id}
              template={template}
              isHovered={hoveredCard === template.id}
              onHover={() => setHoveredCard(template.id)}
              onLeave={() => setHoveredCard(null)}
              onView={(tpl) => onViewTemplate?.(tpl)}
              onShare={() => handleShare(template.id)}
              delay={idx}
            />
          ))}
        </div>

        {/* ===== EMPTY STATE (Optional) ===== */}
        {mockTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4 text-6xl">📝</div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
              कोई टेम्प्लेट नहीं
            </h3>
            <p className="text-gray-600 mb-6">
              अपना पहला टेम्प्लेट बनाएं और अपनी जानकारी साझा करना शुरू करें।
            </p>
            <button className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              नया टेम्प्लेट बनाएं
            </button>
          </div>
        )}
      </div>

      {/* ===== SHARE MODAL ===== */}
      {shareModal && (
        <ShareModal
          template={mockTemplates.find(t => t.id === shareModal)}
          onClose={() => setShareModal(null)}
          onCopy={copyToClipboard}
        />
      )}
    </div>
  );
}

// ===== TEMPLATE CARD COMPONENT =====
function TemplateCard({ template, isHovered, onHover, onLeave, onView, onShare, delay }) {
  return (
    <div
      className="card-hover overflow-hidden rounded-2xl bg-white shadow-md border border-rose-100 group"
      style={{
        animation: `slideInUp 0.6s ease-out ${delay * 100}ms forwards`,
        opacity: 0,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-rose-100 to-amber-100">
        <img
          src={template.previewImage}
          alt={template.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute inset-0 flex items-center justify-center gap-3">
            <button
              onClick={() => onView(template)}
              className="bg-white text-rose-600 p-4 rounded-full hover:bg-rose-50 transition-all duration-200 hover:scale-110 shadow-lg"
              title="देखें"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={onShare}
              className="bg-gradient-to-r from-rose-500 to-rose-600 text-white p-4 rounded-full hover:shadow-lg transition-all duration-200 hover:scale-110 shadow-lg"
              title="साझा करें"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-4 py-1 rounded-full text-xs font-bold shadow-md ${
              template.status === "Active"
                ? "bg-green-400 text-white"
                : "bg-amber-400 text-white"
            }`}
          >
            {template.status === "Active" ? "सक्रिय" : "ड्राफ्ट"}
          </span>
        </div>

        {/* Stats Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur text-gray-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {template.views}
          </span>
          <span className="bg-white/90 backdrop-blur text-gray-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Share2 className="w-3 h-3" />
            {template.shares}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-6">
        <h4 className="text-lg font-serif font-bold text-gray-900 mb-1 line-clamp-1">
          {template.name}
        </h4>
        <p className="text-sm text-gray-600 mb-1 line-clamp-1">
          {template.nameEnglish}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4 line-clamp-1">
          <Clock className="w-3 h-3" />
          अपडेट: {template.lastUpdated}
        </div>

        {/* Couple Info (Preview) */}
        <div className="mb-4 pb-4 border-t border-rose-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <span className="font-semibold text-rose-600">वर:</span>
            <span>{template.groom.nameEnglish}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <span className="font-semibold text-rose-600">वधू:</span>
            <span>{template.bride.nameEnglish}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(template)}
            className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-1 text-sm"
          >
            <Eye className="w-4 h-4" />
            देखें
          </button>
          <button
            onClick={onShare}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-1 text-sm group/share"
          >
            <Share2 className="w-4 h-4 group-hover/share:rotate-12 transition-transform" />
            साझा
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== SHARE MODAL COMPONENT =====
function ShareModal({ template, onClose, onCopy }) {
  const shareUrl = `https://digivah.com/templates/${template.id}`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-slide-in-up">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          साझा करें
        </h3>
        <p className="text-gray-600 mb-6">
          "{template.name}" को साझा करने के लिए लिंक कॉपी करें।
        </p>

        {/* Share Link */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-600 mb-2">लिंक</p>
          <p className="text-sm font-mono text-gray-800 break-all">{shareUrl}</p>
        </div>

        {/* Social Share Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors" title="WhatsApp पर साझा करें">
            <span className="text-2xl">💬</span>
            <span className="text-xs font-semibold text-blue-700">WhatsApp</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors" title="Facebook पर साझा करें">
            <span className="text-2xl">👥</span>
            <span className="text-xs font-semibold text-blue-700">Facebook</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors" title="ईमेल से साझा करें">
            <span className="text-2xl">📧</span>
            <span className="text-xs font-semibold text-purple-700">ईमेल</span>
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onCopy(shareUrl)}
            className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            लिंक कॉपी करें
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-900 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== TEMPLATE VIEW COMPONENT =====
export function TemplateViewPage({ template, onBack }) {
  const [showShare, setShowShare] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>

      {/* ===== TOP BAR ===== */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-rose-100 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-rose-50 rounded-full transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-rose-600" />
          </button>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
            {template.name}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowShare(true)}
              className="p-2 hover:bg-rose-50 rounded-full transition-colors group"
            >
              <Share2 className="w-5 h-5 text-gray-700 group-hover:text-rose-600" />
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 hover:bg-rose-50 rounded-full transition-colors group"
            >
              <Download className="w-5 h-5 text-gray-700 group-hover:text-rose-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* ===== PREVIEW IMAGE ===== */}
        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-rose-100">
          <img
            src={template.previewImage}
            alt={template.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* ===== TEMPLATE DETAILS ===== */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Groom Details */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-rose-100">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">🤵</span> वर विवरण
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold uppercase mb-1">नाम</p>
                <p className="text-lg font-bold text-gray-900">{template.groom.name}</p>
                <p className="text-sm text-gray-600">{template.groom.nameEnglish}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">आयु</p>
                  <p className="text-lg font-bold text-gray-900">{template.groom.age} वर्ष</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">ऊंचाई</p>
                  <p className="text-lg font-bold text-gray-900">{template.groom.height}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-rose-100">
                <img
                  src={template.groom.image}
                  alt={template.groom.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Bride Details */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-rose-100">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">👰</span> वधू विवरण
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold uppercase mb-1">नाम</p>
                <p className="text-lg font-bold text-gray-900">{template.bride.name}</p>
                <p className="text-sm text-gray-600">{template.bride.nameEnglish}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">आयु</p>
                  <p className="text-lg font-bold text-gray-900">{template.bride.age} वर्ष</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">ऊंचाई</p>
                  <p className="text-lg font-bold text-gray-900">{template.bride.height}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-rose-100">
                <img
                  src={template.bride.image}
                  alt={template.bride.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== METADATA ===== */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-6 sm:p-8 border border-rose-100 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase mb-2">टेम्प्लेट का नाम</p>
              <p className="text-lg font-bold text-gray-900">{template.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase mb-2">अंतिम अपडेट</p>
              <p className="text-lg font-bold text-gray-900">{template.lastUpdated}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase mb-2">दृश्य / साझा</p>
              <p className="text-lg font-bold text-gray-900">
                {template.views} / {template.shares}
              </p>
            </div>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="text-center mb-8 no-print">
          <button
            onClick={() => setShowShare(true)}
            className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            यह टेम्प्लेट साझा करें
          </button>
        </div>
      </div>

      {/* ===== SHARE MODAL ===== */}
      {showShare && (
        <ShareModal
          template={template}
          onClose={() => setShowShare(false)}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            alert("लिंक कॉपी हो गया! 📋");
          }}
        />
      )}
    </div>
  );
}

// Missing import from lucide-react
import { LayoutGrid } from "lucide-react";
