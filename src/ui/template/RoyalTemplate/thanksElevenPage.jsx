import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { useWeddingStore } from "../../../db/store/useWeddingStore";

export default function ThanksElevenPage({userData}) {
  const data = userData?.pages?.thirteen_thanks;
  return (
    <section className="min-h-screen flex items-center justify-center py-8 px-4 ">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl">
        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-white to-amber-50 rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12 lg:p-16">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-rose-200/30 to-transparent rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Top Sparkle Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-amber-500 animate-pulse" />
                <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 bg-amber-400 rounded-full blur-xl opacity-50"></div>
              </div>
            </div>

            {/* Thank You Text */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-amber-600 via-rose-500 to-red-500 bg-clip-text text-transparent mb-4 drop-shadow-sm">
              {data.hindiTitle}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-gray-700 mb-6">
              {data.englishTitle}
            </h2>

            {/* Heart Divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400"></div>
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            {/* Message */}
            <p className="text-base font-bold md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
              {data.message}
            </p>

            {/* Signature */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-400 rounded-xl blur-lg opacity-30"></div>
              <div className="relative flex flex-col justify-center items-center backdrop-blur-sm bg-white/60 px-8 py-4 rounded-xl border border-amber-200/50 shadow-lg gap-2">
                <p className="text-lg md:text-xl font-serif font-semibold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                  {data.brideName}
                </p>
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                <p className="text-lg md:text-xl font-serif font-semibold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                  {data.groomName}
                </p>
              </div>
            </div>

            {/* Bottom Decoration */}
            <div className="mt-8 flex justify-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-rose-400 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 w-20 h-20 border-t-2 border-l-2 border-amber-300 rounded-tl-3xl opacity-40"></div>
          <div className="absolute bottom-4 right-4 w-20 h-20 border-b-2 border-r-2 border-rose-300 rounded-br-3xl opacity-40"></div>
        </div>
      </div>
    </section>
  );
}
