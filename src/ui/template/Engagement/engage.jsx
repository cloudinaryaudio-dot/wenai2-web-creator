import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useContactStore } from "../../../db/store/useWeddingStore";


export default function EngagementPage({data}) {
  // ✅ Fetch engagement data from Zustand store
  const contactData = useContactStore(s=>s.data);
  const groomData = data?.engagement;
  const brideData = data?.engagement;
  const engagementData = data?.engagement ;

  // ✅ Extract data with fallbacks
  const engagement = engagementData || {};
  const groom = groomData || {};
  const bride = brideData || {};

  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      location.state?.scrollToTop ||
      location.pathname !== location.state?.from
    ) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked by browser");
      });
    }

    setIsPlaying((prev) => !prev);
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const createConfetti = () => {
    const colors = ["#d97706", "#991b1b", "#fbbf24", "#fff8dc"];
    for (let i = 0; i < 80; i++) {
      const el = document.createElement("div");
      el.className =
        "fixed top-0 z-[9999] w-2 h-2 rounded-full animate-confetti";
      el.style.left = Math.random() * window.innerWidth + "px";
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2500);
    }
  };

  const handleAction = (action) => {
    createConfetti();
    if (action === "rsvp") {
      alert(
        "Thank you for confirming! We look forward to celebrating with you 🙏💕"
      );
    } else {
      alert("Your blessings mean everything to us ✨🎉");
    }
  };

  return (
    <main className="bg-amber-50 text-gray-900 overflow-x-hidden">
      <style>{`
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
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
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

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }

        .parallax {
          background-attachment: fixed;
        }
      `}</style>

      {/* HERO SECTION */}
      <section
        className="
    relative min-h-screen flex items-center justify-center
    px-4 py-16
    md:px-8 md:py-24
    lg:px-16 lg:py-28
    overflow-hidden parallax
  "
        style={{
          backgroundImage: isMobile
            ? "url('https://i.pinimg.com/1200x/55/33/8e/55338e3ed0f63de870b91a8b47fb70a3.jpg')"
            : "url('https://i.pinimg.com/736x/68/ae/89/68ae899fd07a302d66164ce8ca9f42c6.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 via-rose-800/60 to-amber-900/80" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff8dc' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="
      relative z-20 text-center
      max-w-4xl
      md:max-w-5xl
      lg:max-w-6xl
    "
        >
          {/* Top Image */}
          <div
            className="
    absolute left-1/2 -translate-x-1/2 z-10
    -top-28 md:-top-30 lg:-top-24
    w-36 h-36
    md:w-40 md:h-40
    lg:w-44 lg:h-44
    rounded-full
    overflow-hidden
    bg-black/10 backdrop-blur-md
  "
          >
            <img
              src={engagement.couple_image || "https://i.pinimg.com/736x/66/c0/85/66c085adc73eb03c953277e90a5f0c79.jpg"}
              alt="Couple"
              className="
      w-full h-full
      object-cover
      scale-115
      origin-center
    "
            />
          </div>

          {/* Ganesh Text */}
          <div className="mb-4 mt-11 lg:mt-24">
            <span
              className="
          font-bold font-[cursive]
          text-4xl
          md:text-5xl
          bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400
          bg-clip-text text-transparent
        "
            >
              श्री गणेशाय नमः
            </span>
          </div>

          <p
            className={`font-[cursive] text-lg sm:text-xl md:text-2xl text-amber-100 mb-4 tracking-wide transition-all duration-1000 mt-2 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {engagement.tagline || "हमें अत्यंत हर्ष हो रहा है कि आप हमारे इस शुभ अवसर के साक्षी बनें"}
          </p>

          {/* === NAMES : MOBILE (unchanged) === */}
          <div className="md:hidden">
            <h1
              className={`text-5xl sm:text-7xl font-serif font-bold mb-2 transition-all duration-1000 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                {groom.name_short || "आरव"}
              </span>
            </h1>

            <div className="text-4xl text-yellow-300 my-4 animate-pulse">
              संग
            </div>

            <h1
              className={`text-5xl sm:text-7xl font-serif font-bold transition-all duration-1000 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="bg-gradient-to-r from-red-200 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                {bride.name_short || "प्रिया"}
              </span>
            </h1>
          </div>

          {/* === NAMES : TABLET & LAPTOP (NEW) === */}
          <div
            className={`hidden md:flex items-center justify-center gap-8 transition-all duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-6xl lg:text-7xl font-serif font-bold">
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                {groom.name_short || "आरव"}
              </span>
            </h1>

            <span className="text-4xl text-yellow-300">संग</span>

            <h1 className="text-6xl lg:text-7xl font-serif font-bold">
              <span className="bg-gradient-to-r from-red-200 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                {bride.name_short || "प्रिया"}
              </span>
            </h1>
          </div>

          <p className="mt-6 font-[cursive] text-2xl sm:text-3xl md:text-4xl text-amber-100">
            {engagement.event_name || "सगाई समारोह"}
          </p>

          {/* === DATE + MUSIC : MOBILE (unchanged layout) === */}
          <div className="md:hidden">
            <div
              className={`mt-2 inline-flex items-center rounded-full bg-white/20 backdrop-blur-xl px-8 py-4 border-2 border-yellow-300/50 ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-100">
                  {engagement.date || "15 फ़रवरी 2026"}
                </p>
                <p className="text-sm text-amber-200">
                  {engagement.time || "सायं 6:00 बजे से"}
                </p>
              </div>
            </div>

            <audio 
              ref={audioRef} 
              src={engagement.music_url || "https://res.cloudinary.com/dvmj16pxk/video/upload/v1766912262/jodha_g23vpj.mp3"} 
              loop 
              preload="metadata"
            />

            <div className="flex justify-center mt-4 mb-4">
              <button
                type="button"
                onClick={toggleMusic}
                title={isPlaying ? "संगीत रोकें" : "संगीत चलाएँ"}
                className="
          relative
          w-16 h-16
          md:w-18 md:h-18
          lg:w-20 lg:h-20
          rounded-full
          backdrop-blur-2xl
          bg-gradient-to-br from-yellow-200/90 via-amber-300/80 to-yellow-500/90
          border border-yellow-600/60
          shadow-[0_0_25px_rgba(234,179,8,0.55)]
          hover:shadow-[0_0_40px_rgba(234,179,8,0.85)]
          transition-all duration-500
          hover:scale-110
          active:scale-95
          flex items-center justify-center
          overflow-hidden
        "
              >
                <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-yellow-600/60 to-transparent" />
                <span className="absolute right-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-yellow-600/60 to-transparent" />
                <span className="absolute inset-1 rounded-full bg-white/10 blur-md" />
                <span className="relative z-10 text-3xl md:text-4xl text-amber-900 drop-shadow-md">
                  {isPlaying ? "⏸️" : "🎵"}
                </span>
              </button>
            </div>
          </div>

          {/* === DATE + MUSIC : TABLET & LAPTOP (NEW SINGLE ROW) === */}
          <div
            className={`hidden md:flex items-center justify-center gap-6 mt-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            {/* Date */}
            <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-xl px-8 py-4 border-2 border-yellow-300/50">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-100">
                  {engagement.date || "15 फ़रवरी 2026"}
                </p>
                <p className="text-sm text-amber-200">
                  {engagement.time || "सायं 6:00 बजे से"}
                </p>
              </div>
            </div>

            {/* Music Button */}
            <button
              type="button"
              onClick={toggleMusic}
              title={isPlaying ? "संगीत रोकें" : "संगीत चलाएँ"}
              className="
      relative w-16 h-16 rounded-full
      backdrop-blur-2xl
      bg-gradient-to-br from-yellow-200/90 via-amber-300/80 to-yellow-500/90
      border border-yellow-600/60
      shadow-[0_0_25px_rgba(234,179,8,0.55)]
      hover:shadow-[0_0_40px_rgba(234,179,8,0.85)]
      transition-all duration-500
      hover:scale-110 active:scale-95
      flex items-center justify-center overflow-hidden
    "
            >
              <span className="relative z-10 text-3xl text-amber-900">
                {isPlaying ? "⏸️" : "🎵"}
              </span>
            </button>
          </div>

          {/* Scroll Hint */}
          <div
            className={`mt-2 transition-opacity duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-amber-100 text-sm mb-2">
              आगे देखने के लिए नीचे स्क्रॉल करें
            </p>
            <div className="flex justify-center gap-1">
              <div className="w-1 h-6 bg-yellow-300 rounded-full animate-bounce" />
              <div className="w-1 h-6 bg-yellow-300 rounded-full animate-bounce delay-100" />
              <div className="w-1 h-6 bg-yellow-300 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      </section>

      {/* COUPLE STORIES SECTION */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-[cursive] text-amber-700 text-xl font-bold mb-2">
              हृदयों का एक सुंदर सफ़र
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              वर एवं वधू से परिचय
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            {/* Groom */}
            <div
              className={`transform transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <PersonCard
                img={groom.profile_image || "https://i.pinimg.com/736x/4f/7b/6c/4f7b6cc2aab1bfc0560b2dd62ed4c16b.jpg"}
                name={groom.name_short || "ची. आरव कुमार"}
                side={groom.side || "भावी वर"}
                details={groom.family_details || [
                  "सुपुत्र : ठा.सा. राजेंद्रसिंहजी चौहान",
                  "सुपुत्र : कुं.सा. दीपिकासिंह चौहान (दीपा)",
                  "ठि. खजूरीखेड़ा, जि. धार",
                ]}
                colorClass="from-yellow-400 to-orange-500"
                textColor="text-yellow-600"
              />
            </div>

            {/* Bride */}
            <div
              className={`transform transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <PersonCard
                img={bride.profile_image || "https://i.pinimg.com/736x/21/6e/21/216e21dd85868eac47390e28cd71ed57.jpg"}
                name={bride.name_short || "सु. प्रिया सिंह"}
                side={bride.side || "भावी वधू"}
                details={bride.family_details || [
                  "सुपोत्रा : ठा.सा. भैरोंसिंह सिसोदिया",
                  "सुपुत्र : कुं.सा. जयसिंह सिसोदिया",
                  "ठि. तराना, जि. उज्जैन",
                ]}
                colorClass="from-rose-400 to-pink-500"
                textColor="text-rose-600"
              />
            </div>
          </div>

          {/* Love Story */}
          <div
            className={`bg-white rounded-3xl p-8 md:p-12 border-2 border-yellow-200 shadow-xl transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">
              🌸🌼ईश्वर की कृपा से 🌼🌸
            </h3>

            <p className="text-lg text-gray-800 leading-relaxed font-[cursive] text-center max-w-3xl mx-auto font-semibold">
              {engagement.love_story || "परमपिता परमेश्वर की असीम कृपा एवं माता-पिता के आशीर्वाद से यह शुभ अवसर हमारे जीवन में उपस्थित हुआ है। इस पावन सगाई समारोह के माध्यम से दो परिवारों के स्नेह, संस्कार एवं विश्वास का सुंदर संगम हो रहा है। हम आप सभी स्नेहीजनों से निवेदन करते हैं कि इस मंगल अवसर पर अपनी गरिमामयी उपस्थिति एवं आशीर्वाद प्रदान कर हमें कृतार्थ करें।"}
            </p>
          </div>
        </div>
      </section>

      {/* INVITATION CARD SECTION */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: isMobile
            ? "url('https://i.pinimg.com/736x/0f/b0/e7/0fb0e75d6b074d3fe7341f17b089a18b.jpg')"
            : "url('https://i.pinimg.com/1200x/9e/5b/95/9e5b950dd7a659c3675ee7f3b673d1ec.jpg')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-700/60 via-yellow-600/55 to-amber-800/70" />

        <div
          className="absolute inset-0 z-0"
          style={{ filter: "blur(8px) brightness(0.4)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div
            className={`bg-gradient-to-br from-amber-50 via-white to-yellow-50 rounded-3xl shadow-2xl p-8 md:p-16 border-4 border-yellow-300 transition-all duration-1000 transform ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="absolute top-6 left-6 text-5xl opacity-30">🌺</div>
            <div className="absolute bottom-6 right-6 text-5xl opacity-30">
              🌸
            </div>

            <p className="text-center text-amber-700 font-[cursive] text-lg mb-6 font-extrabold">
              समस्त परिवारजन सादर अनुरोध करते हैं कि आप अपनी गरिमामयी उपस्थिति
              से इस शुभ अवसर की शोभा बढ़ाएँ
            </p>

            <div className="text-center mb-4">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                {groom.name_short || "आरव कुमार"}
              </h2>

              <p className="text-amber-600 font-[cursive] text-xl my-3 font-bold">
                एवं
              </p>

              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                {bride.name_short || "प्रिया सिंह"}
              </h2>
            </div>

            <div className="border-t-4 border-b-4 border-yellow-300 my-8 py-8 space-y-6">
              <DetailRow
                icon="🗓️"
                label="तिथि"
                value={engagement.date_detail || "15 फ़रवरी 2026 | शनिवार"}
              />
              <DetailRow
                icon="⏰"
                label="समय"
                value={engagement.time_detail || "सायं 6:00 बजे से रात्रि 11:00 बजे तक"}
              />
              <div
                onClick={() =>
                  window.open(
                    engagement.venue_map_url || "https://www.google.com/maps/search/?api=1&query=Grand+Ballroom+Palace+Indore+Madhya+Pradesh",
                    "_blank"
                  )
                }
                className="cursor-pointer hover:scale-[1.02] transition-all"
              >
                <DetailRow
                  icon="📍"
                  label="स्थान"
                  value={engagement.venue || "ग्रैंड बॉलरूम पैलेस, इंदौर (मध्य प्रदेश)"}
                />
              </div>

              <div
                onClick={() => {
                  window.location.href = `tel:${engagement.contact_phone || "+919876543210"}`;
                }}
                className="cursor-pointer hover:scale-[1.02] transition-all"
              >
                <DetailRow 
                  icon="☎️" 
                  label="संपर्क" 
                  value={engagement.contact_phone || "+91 98765 43210"} 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-amber-700 font-semibold text-xl uppercase">
                  समारोह
                </p>
                <p className="text-gray-700 font-[cursive] mt-2 text-md">
                  {engagement.event_type || "स्नेह भोज एवं सांस्कृतिक कार्यक्रम"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS TIMELINE */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              कार्यक्रम
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto" />
          </div>

          <div className="space-y-8">
            {engagement.timeline ? (
              engagement.timeline.map((item, idx) => (
                <TimelineItem
                  key={idx}
                  time={item.time}
                  title={item.title}
                  desc={item.description}
                />
              ))
            ) : (
              <>
                <TimelineItem
                  time="सायं 6:00 बजे"
                  title="स्वागत एवं जलपान"
                  desc="आपके आगमन पर हल्के जलपान की व्यवस्था"
                />
                <TimelineItem
                  time="सायं 6:45 बजे"
                  title="अंगूठी रस्म"
                  desc="पवित्र बंधन का शुभ क्षण"
                />
                <TimelineItem
                  time="सायं 7:30 बजे"
                  title="परिवारजनों का आशीर्वाद एवं छायांकन"
                  desc="परिजनों संग यादगार पल"
                />
                <TimelineItem
                  time="सायं 8:30 बजे"
                  title="भोज व्यवस्था"
                  desc="स्वादिष्ट एवं विशेष व्यंजनों का आनंद"
                />
                <TimelineItem
                  time="सायं 9:30 बजे"
                  title="संगीत एवं उत्सव"
                  desc="संगीत, नृत्य एवं उल्लासमय वातावरण"
                />
                <TimelineItem
                  time="सायं 10:30 बजे"
                  title="केक कटिंग एवं शुभकामनाएँ"
                  desc="मधुर क्षण एवं हृदय से शुभाशीष"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              स्मृतियाँ
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {engagement.gallery ? (
              engagement.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end p-6">
                    <p className="text-white font-[cursive] text-xl tracking-wide">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src="https://i.pinimg.com/1200x/f9/be/64/f9be64cc631b4194a79872a0007e980b.jpg"
                    alt="वधू पक्ष"
                    className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end p-6">
                    <p className="text-white font-[cursive] text-xl tracking-wide">
                      वधू पक्ष
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src="https://i.pinimg.com/736x/f0/ee/3a/f0ee3aa4b129fe91160a8d60ed05b764.jpg"
                    alt="वर पक्ष"
                    className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end p-6">
                    <p className="text-white font-[cursive] text-xl tracking-wide">
                      वर पक्ष
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src="https://i.pinimg.com/1200x/c0/b8/60/c0b86090804943e89ff19af356ad265f.jpg"
                    alt="नवयुगल"
                    className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end p-6">
                    <p className="text-white font-[cursive] text-xl tracking-wide">
                      नवयुगल
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/97/ff/90/97ff90e7481a2ded7e719b9e2414dfbb.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-rose-800/60 to-amber-900/40" />

        <div
          className="absolute inset-0 z-0"
          style={{ filter: "brightness(0.3) blur(4px)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            अपनी गरिमामयी उपस्थिति से हमें अनुग्रहित करें
          </h2>

          <p className="text-xl text-white mb-2 max-w-2xl mx-auto font-[cursive] font-bold px-2">
            आपकी उपस्थिति हमारे लिए सर्वश्रेष्ठ आशीर्वाद है।
          </p>
          <p className="text-3xl text-amber-300 mb-10 max-w-2xl mx-auto font-[cursive] font-bold">
            🙏🙏🙏
          </p>
        </div>

        {/* ===== VENUE SHOWCASE SECTION ===== */}
        <section className="py-16 px-4 bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100 relative z-10 overflow-hidden rounded-4xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-rose-300 to-pink-400 text-white font-bold rounded-full shadow-lg text-2xl">
              📍 Venue 📍
            </div>
            {/* Venue Card */}
            <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200/50 overflow-hidden hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
              
              {/* Image with Overlay */}
              <div className="relative h-11/12 md:h-[500px] overflow-hidden">
                <img 
                  src={engagement.venue_image || "https://i.pinimg.com/736x/3a/31/32/3a31327277384346c1ebe5192deb9d62.jpg"}
                  alt={engagement.venue_name || "राजवाड़ा पैलेस"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Venue Name & Address */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-rose-900/95 via-rose-800/80 to-transparent ">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg mb-2">
                    💒 {engagement.venue_name || "राजवाड़ा पैलेस"}
                  </h3>
                  <p className="text-rose-100 font-medium text-lg drop-shadow-md">
                    {engagement.venue_address || "ठि. कुशालनगर, जिला उज्जैन, मध्य प्रदेश"}
                  </p>
                </div>
              </div>
            </div>

            {/* Direction Button - Outside Card */}
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => window.open(engagement.venue_map_url || 'https://maps.google.com/?q=राजवाड़ा+पैलेस,कुशालनगर,उज्जैन', '_blank')}
                className="group px-8 py-4 bg-gradient-to-r from-rose-300 to-pink-400 text-white font-bold rounded-full shadow-lg text-2xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  🗺️Map में दिशा देखें
                </span>
                <div className="absolute inset-0 bg-white/20 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>
          </div>
        </section>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 text-center border-t-4 border-yellow-500">
        <p className="font-[cursive] text-xl text-yellow-300 mb-2 font-semibold">
          स्नेह, सम्मान एवं आशीर्वाद सहित 🌸
        </p>

        <h3 className="font-serif text-3xl md:text-4xl font-bold mb-3">
          {groom.name_short || "आरव"} एवं {bride.name_short || "प्रिया"}
        </h3>

        <p className="text-white text-md mt-4 font-[cursive] font-bold">
          {engagement.footer_tagline || "दो हृदय, एक संकल्प — आजीवन साथ"}
        </p>

        {/* Divider */}
        <div className="w-28 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto my-6" />

        {/* Meaningful Credit Line */}
        <p className="text-white text-md max-w-xl mx-auto leading-relaxed px-4">
          यह डिजिटल आमंत्रण{" "}
          <span className="text-yellow-400 font-semibold">DigiVivah</span>{" "}
          द्वारा स्नेहपूर्वक तैयार किया गया है, आप भी अपने विशेष अवसर के लिए
          हमारे साथ डिजिटल आमंत्रण बनवाने हेतु नीचे दिए गए बटन पर क्लिक करें।
        </p>

        {/* WhatsApp CTA */}
        <div className="mt-5">
          <a
            href={ `https://wa.me/91${contactData.mobile}?text=नमस्कार%20DigiVivah,%20मैं%20अपने%20कार्यक्रम%20के%20लिए%20डिजिटल%20आमंत्रण%20बनवाना%20चाहता%20हूँ` }
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
      </footer>
    </main>
  );
}

/* Components */

/**
 * PersonCard Component - Displays groom/bride information
 * @param {string} img - Profile image URL
 * @param {string} name - Person's name
 * @param {string} side - Person's role (भावी वर/भावी वधू)
 * @param {Array} details - Family details array
 * @param {string} colorClass - Gradient color class
 * @param {string} textColor - Text color class
 */
function PersonCard({ img, name, side, details, colorClass, textColor }) {
  return (
    <div className="relative group flex justify-center ">
      {/* Glow background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${colorClass} rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition duration-500`}
      />

      {/* Card */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/5 w-full max-w-md text-center lg:w-[350px]">
        {/* Image */}
        <div className="relative overflow-hidden h-[520px] lg:h-[400px]">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="px-8 py-2 flex flex-col items-center">
          {/* Side (वर / भावी वधू) */}
          <p
            className={`text-3xl uppercase tracking-[.15em] ${textColor} font-semibold`}
          >
            {side}
          </p>

          {/* Name with blur */}
          <div className="relative mt-1 mb-4">
            {/* Blur layer */}
            <span className="absolute inset-0 text-3xl md:text-4xl font-serif font-bold blur-md opacity-40 ">
              {name}
            </span>

            {/* Actual name */}
            <h3
              className={`relative text-3xl md:text-4xl font-serif font-bold ${textColor} `}
            >
              {name}
            </h3>
          </div>

          {/* Divider */}
          <div className="w-12 h-[2px] bg-gradient-to-r from-yellow-400 to-orange-400 mb-5" />

          {/* Details list */}
          <div className="space-y-2 text-md text-gray-900 text-center font-semibold">
            {details?.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * DetailRow Component - Displays event detail information
 * @param {string} icon - Emoji icon
 * @param {string} label - Detail label
 * @param {string} value - Detail value
 */
function DetailRow({ icon, label, value }) {
  return (
    <div
      className="
      flex items-start
      gap-4
      max-w-xl mx-auto
      text-left
    "
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        <span className="text-3xl text-amber-600">{icon}</span>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-amber-700 font-semibold">
          {label}
        </p>
        <p className="text-gray-700 font-[cursive] text-base md:text-lg leading-relaxed">
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * TimelineItem Component - Displays event timeline
 * @param {string} time - Event time
 * @param {string} title - Event title
 * @param {string} desc - Event description
 */
function TimelineItem({ time, title, desc }) {
  return (
    <div className="relative flex gap-6 max-w-3xl">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-yellow-500 rounded-full border-4 border-white shadow-[0_0_12px_rgba(234,179,8,0.8)]" />
        <div className="flex-1 w-[3px] bg-gradient-to-b from-yellow-300 to-transparent mt-1" />
      </div>

      {/* Content */}
      <div className="pb-10 text-left">
        <p className="text-xl md:text-base font-semibold text-amber-700">
          {time}
        </p>

        <h4 className="text-lg md:text-xl font-serif font-bold text-gray-900 mt-1">
          {title}
        </h4>

        <p className="text-gray-800 mt-2 text-md md:text-base leading-relaxed max-w-xl">
          {desc}
        </p>
      </div>
    </div>
  );
}