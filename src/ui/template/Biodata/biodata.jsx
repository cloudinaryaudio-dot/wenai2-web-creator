import React, { useState, useEffect, useRef } from "react";
import AutoS from './aScroll';
import { useLocation } from 'react-router-dom';
import { useContactStore } from "../../../db/store/useWeddingStore";

export function BioDataPage({ data }) {
  // ✅ Fetch user data from Zustand store using selector
  const userData = data;
  const contactData = useContactStore(s=>s.data);
  
  // ✅ Extract individual sections for cleaner access
  const personal = userData?.personal || {};
  const education = userData?.education || {};
  const profession = userData?.profession || {};
  const familyPaternal = userData?.family_paternal || {};
  const familyMaternal = userData?.family_maternal || {};
  const religion = userData?.religion || {};
  const contact = userData?.contact || {};
  const expectations = userData?.expectations || {};
  const backgroundImage = userData?.backgroundImage || [];
  const autoScrollImg = userData?.autoScrollImg || [];
  

  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedSection, setExpandedSection] = useState("");
  const sectionRefs = useRef({});
  const location = useLocation();

  // === SCROLL TO TOP ON NAVIGATION ===
  useEffect(() => {
    if (location.state?.scrollToTop || location.key !== location.state?.fromKey) {
      window.scrollTo(0, 0);
    }
  }, [location.state?.scrollToTop, location.key]);

  // === RESPONSIVE CHECK ===
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // === PAGE LOAD ANIMATION ===
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // === SMOOTH SCROLL ON SECTION EXPAND ===
  useEffect(() => {
    if (expandedSection && sectionRefs.current[expandedSection]) {
      setTimeout(() => {
        sectionRefs.current[expandedSection].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [expandedSection]);

  // === CONFETTI ANIMATION ===
  const createConfetti = () => {
    const colors = ["#d97706", "#fbbf24", "#f59e0b", "#fff8dc"];
    for (let i = 0; i < 60; i++) {
      const el = document.createElement("div");
      el.className =
        "fixed top-0 z-[9999] w-2 h-2 rounded-full animate-confetti";
      el.style.left = Math.random() * window.innerWidth + "px";
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2500);
    }
  };

  const handleConnect = () => {
    createConfetti();
    alert("संपर्क के लिए धन्यवाद! हम शीघ्र आपसे जुड़ेंगे। 🙏");
  };

  return (
    <main className="bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50 text-gray-900">
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        @keyframes fall {
          to { 
            transform: translateY(100vh) rotate(360deg); 
            opacity: 0; 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-confetti {
          animation: fall 2.5s ease-in forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }

        .glowing-border {
          box-shadow: 0 0 30px rgba(217, 119, 6, 0.4);
        }

        .hero-background {
          background-attachment: fixed;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 py-12 md:py-20 hero-background"
        style={{
          
            backgroundImage: isMobile
  ? `url('${backgroundImage[0]}')`
  : `url('${backgroundImage[1]}')`,

        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/75 via-rose-900/65 to-amber-900/80" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff8dc' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-20 text-center max-w-4xl md:max-w-5xl w-full">
          {/* Ganesh Mantra */}
          <div className="mb-4 ">
            <span className="font-bold font-[cursive] text-3xl md:text-4xl bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent animate-shimmer py-6">
              श्री गणेशाय नमः
            </span>
          </div>

          {/* Profile Image */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-80"
            }`}
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto glowing-border">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-200 to-rose-200 p-1 shadow-2xl">
                <img
                  src={personal.profile_image}
                  alt={personal.name_hindi}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* Decorative corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-amber-300" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-rose-300" />
            </div>
          </div>

          {/* Name */}
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-300 bg-clip-text text-transparent mb-2 py-6">
              {personal.name_hindi}
            </h1>
            <p className="text-2xl md:text-3xl text-amber-100 font-[cursive] font-bold mb-4">
              {personal.name_english}
            </p>
          </div>

          {/* Gender & Status Badge */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="bg-yellow-300/30 backdrop-blur-md text-yellow-100 px-6 py-2 rounded-full font-bold border border-yellow-400/50">
              {personal.gender}
            </span>
            <span className="bg-rose-300/30 backdrop-blur-md text-rose-100 px-6 py-2 rounded-full font-bold border border-rose-400/50">
              {personal.age} 
            </span>
            <span className="bg-amber-300/30 backdrop-blur-md text-amber-100 px-6 py-2 rounded-full font-bold border border-amber-400/50">
              {religion.subcaste} 
            </span>
          </div>

          {/* Scroll Hint */}
          <div
            className={`transition-opacity duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-amber-100 text-sm mb-2 font-[cursive]">
              विस्तृत परिचय के लिए नीचे स्क्रॉल करें
            </p>
            <div className="flex justify-center gap-1">
              <div className="w-1 h-6 bg-yellow-300 rounded-full animate-bounce" />
              <div className="w-1 h-6 bg-yellow-300 rounded-full animate-bounce delay-100" />
              <div className="w-1 h-6 bg-yellow-300 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <AutoS  bgImage={backgroundImage} autoScrImg={autoScrollImg} />
      </section>

      {/* ===== QUICK STATS SECTION ===== */}
      <section className="py-16 px-4 bg-white border-t-4 border-b-4 border-amber-300 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon="📅" label="आयु" value={personal.age} />
            <StatCard
              icon="📏"
              label="ऊंचाई"
              value={personal.height}
            />
            <StatCard
              icon="🩸"
              label="रक्त समूह"
              value={personal.blood_group}
            />
            <StatCard
              icon="🏙️"
              label="निवास"
              value={contact.ancestral_residence.village}
            />
          </div>
        </div>
      </section>

      {/* ===== DETAILED SECTIONS ===== */}
      <section className="py-16 px-4 bg-gradient-to-b from-amber-50 to-white relative z-10">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Personal Details Section */}
          <div ref={(el) => (sectionRefs.current["personal"] = el)}>
            <BioSection
              title="व्यक्तिगत विवरण"
              icon="👤"
              isExpanded={expandedSection === "personal"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "personal" ? "" : "personal"
                )
              }
              data={[
                {
                  label: "जन्म तिथि",
                  value: personal.birth_date,
                },
                {
                  label: "जन्म समय",
                  value: personal.birth_time,
                },
                {
                  label: "जन्म स्थान",
                  value: personal.birth_place,
                },
                // {
                //   label: "वैवाहिक स्थिति",
                //   value: personal.marital_status,
                // },
                // {
                //   label: "रंग",
                //   value: personal.complexion,
                // },
              ]}
            />
          </div>

          {/* Education Section */}
          <div ref={(el) => (sectionRefs.current["education"] = el)}>
            <BioSection
              title="शैक्षणिक विवरण"
              icon="📚"
              isExpanded={expandedSection === "education"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "education" ? "" : "education"
                )
              }
              data={[
                {
                  label: "योग्यता",
                  value: education.qualification,
                },
                {
                  label: "विश्वविद्यालय",
                  value: education.university,
                },
                // {
                //   label: "उत्तीर्ण वर्ष",
                //   value: education.year_of_completion,
                // },
              ]}
            />
          </div>

          {/* Professional Section */}
          <div ref={(el) => (sectionRefs.current["profession"] = el)}>
            <BioSection
              title="व्यवसायिक विवरण"
              icon="💼"
              isExpanded={expandedSection === "profession"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "profession" ? "" : "profession"
                )
              }
              data={[
                {
                  label: "पद",
                  value: profession.job_title,
                },
                {
                  label: "कंपनी",
                  value: profession.company,
                },
                // {
                //   label: "स्थान",
                //   value: profession.location,
                // },
                // {
                //   label: "वार्षिक आय",
                //   value: profession.annual_income,
                // },
              ]}
            />
          </div>

          {/* Paternal Family Section */}
          <div ref={(el) => (sectionRefs.current["paternal"] = el)}>
            <BioSection
              title="पैतृक परिवार विवरण"
              icon="👨‍👩‍👧‍👦"
              isExpanded={expandedSection === "paternal"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "paternal" ? "" : "paternal"
                )
              }
              data={[
                {
                  label: "पिता",
                  value: familyPaternal.father?.name,
                },
                {
                  label: "पिता का पेशा",
                  value: familyPaternal.father?.profession,
                },
                {
                  label: "दादा",
                  value: familyPaternal.grandfather?.name,
                },
                // {
                //   label: "माता",
                //   value: familyPaternal.mother?.name,
                // },
                {
                  label: "भाई-बहन",
                  value: familyPaternal.siblings?.length > 0 
                    ? `${familyPaternal.siblings.length} ${familyPaternal.siblings[0]?.relation_en}`
                    : "N/A",
                },
                {
                  label: "पैतृक निवास",
                  value: familyPaternal.ancestral_place?.name,
                },
              ]}
            />
          </div>

          {/* Maternal Family Section */}
          <div ref={(el) => (sectionRefs.current["maternal"] = el)}>
            <BioSection
              title="मातृ पक्ष विवरण"
              icon="👴"
              isExpanded={expandedSection === "maternal"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "maternal" ? "" : "maternal"
                )
              }
              data={[
                {
                  label: "नाना",
                  value: familyMaternal.grandfather?.name,
                },
                {
                  label: "नाना का निवास",
                  value: familyMaternal.ancestral_place?.name,
                },
                {
                  label: "मामा-1",
                  value: familyMaternal.uncles?.[0]?.name,
                },
                {
                  label: "मामा-2",
                  value: familyMaternal.uncles?.[1]?.name,
                },
                // {
                //   label: "निवास",
                //   value: familyMaternal.uncles?.[0]?.location,
                // },
                
              ]}
            />
          </div>

          {/* Religion & Caste Section */}
          <div ref={(el) => (sectionRefs.current["religion"] = el)}>
            <BioSection
              title="धार्मिक एवं सामाजिक विवरण"
              icon="🕉️"
              isExpanded={expandedSection === "religion"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "religion" ? "" : "religion"
                )
              }
              data={[
                {
                  label: "धर्म",
                  value: religion.religion,
                },
                {
                  label: "जाति",
                  value: religion.caste,
                },
                {
                  label: "उप जाति",
                  value: religion.subcaste,
                },
                {
                  label: "गोत्र",
                  value: religion.gotra,
                },
                {
                  label: "मातृ गोत्र",
                  value: religion.maternal_gotra,
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-900 to-rose-900 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-10 text-center">
              संपर्क विवरण
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Contact Person */}
              <ContactItem
                icon="👤"
                label="संपर्क व्यक्ति"
                value={contact.primary_contact?.name || contact.contact_person}
              />

              {/* Phone */}
              <ContactItem
                icon="📱"
                label="मोबाइल नंबर"
                value={contact.phone}
              />

              {/* Current Residence */}
              <ContactItem
                icon="🏠"
                label="वर्तमान निवास"
                value={contact.current_residence?.address || contact.current_residence}
              />

              {/* Ancestral Residence */}
              <ContactItem
                icon="🏛️"
                label="पैतृक निवास"
                value={contact.ancestral_residence?.address || contact.ancestral_residence}
              />
            </div>

            {/* WhatsApp & Call Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap">
              <button
                onClick={() => {
                  window.location.href = `tel:${contact.phone}`;
                }}
                className="px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>📞</span> कॉल करें
              </button>

              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/91${contact.phone?.replace(/\D/g, "")}?text=नमस्कार, मैं आपसे संपर्क करना चाहता हूँ`,
                    "_blank"
                  );
                }}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>💬</span> व्हाट्सअप
              </button>

              {/* <button
                onClick={handleConnect}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>✅</span> रुचि व्यक्त करें
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPECTATIONS SECTION ===== */}
      {/* <section className="py-16 px-4 bg-gradient-to-b from-white to-amber-50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl p-8 md:p-12 border-4 border-amber-200 shadow-xl transition-all duration-1000 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-8">
              🌸 विवाह अपेक्षा 🌸
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border-l-4 border-rose-400">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>👰</span> कन्या के लिए अपेक्षाएं
                </h3>
                <p className="text-gray-700 font-[cursive] text-lg leading-relaxed">
                  {expectations.bride?.full_description || "संस्कारी, सुशिक्षित, पारिवारिक मूल्यों में विश्वास रखने वाली, विनम्र और प्रेमपूर्ण स्वभाव वाली कन्या अपेक्षित है।"}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-l-4 border-amber-400">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>👨‍👩‍👧</span> परिवार के लिए अपेक्षाएं
                </h3>
                <p className="text-gray-700 font-[cursive] text-lg leading-relaxed">
                  {expectations.family?.full_description || "राजपूत या समकक्ष जाति के सभ्य, सम्मानित और संस्कारी परिवार वांछनीय हैं। परिवार में सौहार्द, विश्वास और स्नेह का वातावरण आवश्यक है।"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ===== FOOTER ===== */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 border-t-4 border-amber-400 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="font-[cursive] text-2xl text-amber-300 mb-2 font-bold">
            स्नेह, सम्मान एवं आशीर्वाद सहित 🙏
          </p>

          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent py-6">
            {personal.name_hindi}
          </h3>

          <p className="text-amber-100 text-lg font-[cursive] mb-6 font-semibold">
            "{personal.name_english}"
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-8" />

          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed font-[cursive]">
            "एक आशीर्वाद की तलाश में, एक कहानी लिखने के लिए तैयार — जहाँ दो हृदय,
            एक भविष्य, और परिवार के प्रेम से बंधे होंगे।"
          </p>

          <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-amber-400/30">
            <p className="text-white text-md max-w-xl mx-auto leading-relaxed px-4">
              यह डिजिटल Bio-Data{" "}
              <span className="text-yellow-400 font-semibold">DigiVivah</span>{" "}
              द्वारा स्नेहपूर्वक तैयार किया गया है, आप भी अपने विशेष अवसर के लिए
              हमारे साथ डिजिटल आमंत्रण बनवाने हेतु नीचे दिए गए बटन पर क्लिक करें।
            </p>

            {/* WhatsApp CTA */}
            <div className="mt-5">
              <a
                href={`https://wa.me/91${contactData.mobile}?text=नमस्कार%20DigiVivah,%20मैं%20अपने%20कार्यक्रम%20के%20लिए%20डिजिटल%20आमंत्रण%20बनवाना%20चाहता%20हूँ`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl">💬</span>
                WhatsApp पर DigiVivah से संपर्क करें
              </a>

              <p className="text-gray-400 text-sm my-4">
                © 2026 · DigiVivah · मध्य प्रदेश
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ===== REUSABLE COMPONENTS =====

/**
 * StatCard Component - Displays a statistic in a card format
 * @param {string} icon - Emoji or icon to display
 * @param {string} label - Label for the statistic
 * @param {string} value - Value to display
 */
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-rose-50 p-4 md:p-6 rounded-2xl border-2 border-amber-100 hover:shadow-lg transition-all duration-300 text-center">
      <p className="text-3xl md:text-4xl mb-2">{icon}</p>
      <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-base md:text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

/**
 * BioSection Component - Expandable section for biodata information
 * @param {string} title - Section title
 * @param {string} icon - Emoji for the section
 * @param {boolean} isExpanded - Whether section is expanded
 * @param {function} onToggle - Callback when section is toggled
 * @param {Array} data - Array of {label, value} objects
 */
function BioSection({ title, icon, isExpanded, onToggle, data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-amber-400">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 md:p-8 flex items-center justify-between bg-gradient-to-r from-amber-50 to-rose-50 hover:from-amber-100 hover:to-rose-100 transition-colors cursor-pointer"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          {title}
        </h2>
        <span
          className={`text-2xl transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 md:p-8 space-y-4 border-t border-amber-100 max-h-96 overflow-y-auto">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row md:items-start gap-3 pb-4 border-b border-amber-50 last:border-b-0"
            >
              <p className="font-bold text-amber-700 md:min-w-48">
                {item.label}:
              </p>
              <p className="text-gray-700 flex-1 font-semibold text-lg">
                {item.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * ContactItem Component - Displays contact information
 * @param {string} icon - Emoji for the contact type
 * @param {string} label - Contact label
 * @param {string} value - Contact value
 */
function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl border border-amber-100">
      <div className="text-4xl flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-lg font-bold text-gray-900">{value || "N/A"}</p>
      </div>
    </div>
  );
}