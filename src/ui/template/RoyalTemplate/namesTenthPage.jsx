import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Users,
  Eye,
  HandHeart,
  UserCheck,
  Home,
  Baby,
  User,
  Contact2,
  Sparkles,
  Star,
  Share2,
  Building2,
} from "lucide-react";
import { useWeddingStore } from "../../../db/store/useWeddingStore";

// Contact Card Component - Updated with phone number display and icon click
const ContactCard = ({ member, index }) => {
  const ICON_MAP = {
  MapPin,
  Phone,
  Users,
  Eye,
  HandHeart,
  UserCheck,
  Home,
  Baby,
  User,
  Contact2,
  Sparkles,
  Star,
  Share2,
  Building2,
};

  return (
    <div
      className="relative bg-gradient-to-br from-white to-amber-50/80 rounded-2xl shadow-xl overflow-hidden p-5 hover:shadow-2xl transition-all duration-300 border border-amber-200/40 hover:scale-105 animate-fadeIn"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-2xl"></div>

      {/* Image Instead of Icon */}
      <div className="flex justify-center mb-3">
        <div className="p-0.5 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full shadow-md">
          <img
            src={member.image}
            alt="Family Member"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <h4 className="text-center text-lg md:text-xl font-serif font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
        {member.name}
      </h4>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent mb-3"></div>

      {/* Phone Numbers with Icon */}
      <div className="space-y-2">
        {member.phones.map((phone, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white/60 px-4 py-2 rounded-lg border border-amber-100/50 hover:bg-amber-50/80 transition-all duration-200"
          >
            <span className="text-gray-700 text-sm md:text-base font-medium">
              {phone}
            </span>
            <a
              href={`tel:${phone}`}
              aria-label={`Call ${phone}`}
              className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-white" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Name Card Component
const NameCard = ({ name, index }) => {
  return (
    <div
      className="text-gray-700 text-sm md:text-base py-2 px-3 bg-white/60 rounded-lg hover:bg-amber-50/80 transition-all duration-200 border border-amber-100/50 hover:scale-105 hover:shadow-md animate-fadeIn text-center"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {name}
    </div>
  );
};

// Main Component
export default function NamesTenthPage({userData}) {
  const data = userData?.pages?.twelve_familyMembers;
  const ICON_MAP = {
  MapPin,
  Phone,
  Users,
  Eye,
  HandHeart,
  UserCheck,
  Home,
  Baby,
  User,
  Contact2,
  Sparkles,
  Star,
  Share2,
  Building2,
};


  return (
    <section className="min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-10 left-10 w-6 h-6 text-amber-400 animate-pulse" />
        <Star className="absolute top-20 right-20 w-5 h-5 text-rose-400 animate-spin-slow" />
        <Sparkles
          className="absolute bottom-10 right-10 w-6 h-6 text-orange-400 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <Star
          className="absolute bottom-20 left-20 w-5 h-5 text-pink-400 animate-spin-slow"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Preshak Card - Enhanced Main Header */}
        <div className="relative bg-gradient-to-br from-white via-amber-50/50 to-rose-50/50 rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10 lg:p-12 border-2 border-amber-200/50 backdrop-blur-md animate-fadeIn">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-300/40 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tl from-rose-300/40 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header with Icon */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-400 via-rose-500 to-pink-500 rounded-xl shadow-lg animate-float">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl pt-5 md:text-5xl lg:text-6xl font-serif font-extrabold bg-gradient-to-r from-amber-600 via-rose-500 to-red-500 bg-clip-text text-transparent animate-gradient">
                प्रेषक
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-rose-400"></div>
              <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent via-rose-400 to-amber-400"></div>
            </div>

            {/* Welcome Message */}
            <div
              className="relative animate-fadeIn"
              style={{ animationDelay: "300ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-amber-400/20 rounded-2xl blur-xl"></div>
              <div className="relative backdrop-blur-md bg-white/80 px-8 py-6 rounded-2xl border-2 border-amber-300/60 shadow-xl text-center">
                <p className="text-xl md:text-2xl lg:text-3xl font-serif font-bold bg-gradient-to-r from-amber-700 via-rose-600 to-amber-700 bg-clip-text text-transparent leading-relaxed animate-gradient">
                  {data.familyName}
                  <br />
                  {data.welcomeMessage}
                </p>
              </div>
            </div>
          </div>

          {/* Family Members Contact Cards */}
          <div className="mb-8 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.familyMembers.map((member, idx) => (
                <ContactCard key={idx} member={member} index={idx} />
              ))}
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-8 text-center">
            <a
              href={data.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open location in Google Maps"
              className="inline-flex items-start gap-3 bg-white/70 backdrop-blur-sm px-6 py-4 rounded-xl border border-amber-200/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <MapPin className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0 animate-bounce" />
              <div className="text-base md:text-lg text-gray-700 leading-relaxed text-left">
                <p className="font-bold text-xl">
                  {data.location}
                </p>
                <p className="font-semibold">
                  {data.tehsil}, {data.district}
                </p>
              </div>
            </a>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 w-20 h-20 border-t-3 border-l-3 border-amber-300/60 rounded-tl-3xl animate-pulse"></div>
          <div
            className="absolute bottom-4 right-4 w-20 h-20 border-b-3 border-r-3 border-rose-300/60 rounded-br-3xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Other Groups Grid - With blur effect */}

        <div className="flex flex-wrap justify-center gap-6">
          {data.guestGroups.map((group, idx) => {
            const IconComponent = ICON_MAP[group.icon];
            if (!IconComponent) return null; // safety
            return (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-white to-amber-50/80 rounded-2xl shadow-xl overflow-hidden p-6 hover:shadow-2xl transition-all duration-300 border border-amber-200/40 hover:-translate-y-2 animate-fadeIn"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  width: "300px", // <– FIXED CARD WIDTH (no shrink)
                }}
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-2xl"></div>

                {/* Header with Icon */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-amber-400 to-rose-400 rounded-lg shadow-md group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                    {group.title}
                  </h3>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-amber-300 via-rose-300 to-transparent mb-4"></div>

                {/* Names List */}
                <div className="space-y-2 mb-4">
                  {group.names.map((name, nameIdx) => (
                    <NameCard key={nameIdx} name={name} index={nameIdx} />
                  ))}
                </div>

                {/* Special Child Note for Nanihal Paksh */}
                {group.childNote && (
                  <div className="relative mt-4 animate-fadeIn text-center flex flex-col items-center justify-center">
                    <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border-2 border-pink-300/50 shadow-inner">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Baby className="w-5 h-5 text-rose-500 animate-bounce self-center" />
                        <p className="text-xs font-bold text-rose-600 text-center">
                          बाल मनुहार
                        </p>
                      </div>
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed italic text-center">
                        {group.childNote}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Decorative Dots */}
        <div className="flex justify-center gap-3 pt-6">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
          <div
            className="w-3 h-3 rounded-full bg-rose-400 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style >{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
