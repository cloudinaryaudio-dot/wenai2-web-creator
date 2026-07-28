import React, { useState } from "react";
import { Check, Crown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePriceStore } from "../../../db/store/useWeddingStore";

/**
 * PricingSection Component
 * Enhanced with rose theme and professional styling
 */
export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate(); // Updated
  const data = usePriceStore(s => s.data);


  const plans = [
    {
      name: "Best Package",
      price: data?.basic ?? "₹11,000",
      offerPrice: "₹2,100",
      features: [
        "Premium Invite",
        "Custom Edits",
        "3D Effects",
        "Fully Responsive",
        "Shareable Link",
        "Custom QR Code",
        "Photo Sharing",
        "Traditional Design",
      ],
      icon: Sparkles,
      popular: true,
      description:
        "Perfect for couples who want a beautiful, modern digital invite with essential features and traditional touch.",
    },
    {
      name: "Premium Package",
      price: data?.premium ?? "₹1,49,999",
      offerPrice: "₹99,999",
      features: [
        "3 Invite Templates",
        "Custom Edits",
        "Fully Responsive",
        "Guest List",
        "Pre-Wedding Shoot",
        "Wedding Shoot",
        "Post Wedding Shoot",
        "Digital Album",
      ],
      icon: Crown,
      popular: false,
      description:
        "Ideal for families looking for a complete wedding media solution with multiple events covered.",
    },
    {
      name: "Royal Package",
      price:  data?.silver ?? "₹79,999",
      offerPrice: "₹49,999",
      features: [
        "2 Invite Templates",
        "Custom Edits",
        "Fully Responsive",
        "Guest List",
        "Modern Album",
        "Wedding Shoot",
        "Drone Shoot",
        "Digital Album",
      ],
      icon: Crown,
      popular: false,
      description:
        "Best suited for royal-themed weddings with cinematic coverage and elegant digital presence.",
    },
  ];

  const parsePriceToNumber = (priceStr) => {
    if (!priceStr) return 0;
    const digits = priceStr.replace(/[^\d]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  return (
    <>
      <section
        id="pricing"
        className="py-28 px-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 250, 252, 0.92), rgba(255, 248, 250, 0.88), rgba(255, 245, 248, 0.85))",
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient orb 1 */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)",
              animation: "pulse 8s ease-in-out infinite",
            }}
          />
          {/* Gradient orb 2 */}
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(244, 63, 94, 0.3), transparent)",
              animation: "pulse 10s ease-in-out infinite",
              animationDelay: "2s",
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full max-w-max mx-auto border-2"
              style={{
                background: "rgba(244, 63, 94, 0.15)",
                borderColor: "rgba(244, 63, 94, 0.4)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Sparkles className="w-5 h-5 text-rose-600" />
              <span className="text-sm font-semibold text-rose-700 uppercase tracking-wider">
                Affordable Pricing
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{
                background:
                  "linear-gradient(to right, #ec4899, #f43f5e, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Choose Your Perfect Plan
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Select the perfect package for your dream wedding invitation
              experience
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {plans.map((plan, index) => {
              const hasOffer = !!plan.offerPrice;
              const originalNum = parsePriceToNumber(plan.price);
              const offerNum = parsePriceToNumber(plan.offerPrice);
              const percentOff =
                hasOffer && originalNum > 0
                  ? Math.round(((originalNum - offerNum) / originalNum) * 100)
                  : 0;

              const Icon = plan.icon;

              return (
                <div
                  key={index}
                  className="group relative rounded-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 overflow-hidden"
                  style={{
                    background: plan.popular
                      ? "rgba(255, 255, 255, 0.9)"
                      : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(20px)",
                    border: plan.popular
                      ? "2px solid rgba(244, 63, 94, 0.6)"
                      : "2px solid rgba(255, 255, 255, 0.7)",
                    boxShadow: plan.popular
                      ? "0 10px 40px rgba(244, 63, 94, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    if (plan.popular) {
                      e.currentTarget.style.boxShadow =
                        "0 25px 60px rgba(244, 63, 94, 0.35)";
                      e.currentTarget.style.borderColor =
                        "rgba(244, 63, 94, 0.8)";
                    } else {
                      e.currentTarget.style.boxShadow =
                        "0 20px 50px rgba(236, 72, 153, 0.25)";
                      e.currentTarget.style.borderColor =
                        "rgba(244, 63, 94, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.popular) {
                      e.currentTarget.style.boxShadow =
                        "0 10px 40px rgba(244, 63, 94, 0.2)";
                      e.currentTarget.style.borderColor =
                        "rgba(244, 63, 94, 0.6)";
                    } else {
                      e.currentTarget.style.boxShadow =
                        "0 8px 32px rgba(0, 0, 0, 0.08)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.7)";
                    }
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute left-1/2 -translate-x-1/2 z-20">
                      <div
                        className="px-6 py-2 rounded-full text-sm font-bold shadow-lg border-2 text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #ec4899, #f43f5e)",
                          borderColor: "rgba(255, 255, 255, 0.6)",
                          boxShadow: "0 8px 24px rgba(244, 63, 94, 0.3)",
                        }}
                      >
                        ⭐ Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8 md:p-10">
                    {/* Icon & Plan Name */}
                    <div className="text-center mb-8">
                      <div
                        className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center shadow-lg p-4 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: plan.popular
                            ? "linear-gradient(135deg, #ec4899, #f43f5e)"
                            : "linear-gradient(135deg, #f43f5e, #a855f7)",
                        }}
                      >
                        <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                        {plan.name}
                      </h3>

                      {/* Pricing */}
                      <div className="mb-4">
                        {hasOffer ? (
                          <div className="flex items-center justify-center gap-4 flex-wrap">
                            <div className="text-lg text-gray-500 line-through font-semibold">
                              {plan.price}
                            </div>
                            <div
                              className="text-4xl md:text-5xl font-bold drop-shadow-lg"
                              style={{
                                background:
                                  "linear-gradient(135deg, #ec4899, #f43f5e)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              {plan.offerPrice}
                            </div>
                            <div
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30"
                              style={{
                                background:
                                  "linear-gradient(135deg, #ef4444, #dc2626)",
                                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                              }}
                            >
                              Save {percentOff}%
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-4xl md:text-5xl font-bold drop-shadow-lg"
                            style={{
                              background:
                                "linear-gradient(135deg, #ec4899, #f43f5e)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {plan.price}
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 font-semibold tracking-wide">
                        per invitation
                      </p>
                    </div>
                    {/* Features List */}
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-gray-700 font-medium group/item hover:text-rose-600 transition-colors"
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center shadow-md flex-shrink-0 transition-all duration-300 group-hover/item:scale-110"
                            style={{
                              background: plan.popular
                                ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                                : "linear-gradient(135deg, #ec4899, #f43f5e)",
                            }}
                          >
                            <Check className="w-4 h-4 text-white drop-shadow-md" />
                          </div>
                          <span className="flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {/* View Details Button */}
                   
                    <button
                      className="w-full py-3 px-6 rounded-2xl font-semibold text-sm shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-white border-0"
                      style={{
                        background: plan.popular
                          ? "linear-gradient(135deg, #ec4899, #f43f5e)"
                          : "linear-gradient(135deg, #f43f5e, #a855f7)",
                      }}
                      onClick={() => {
                        const offerNum = plan.offerPrice
                          ? parseInt(plan.offerPrice.replace(/[^\d]/g, ""), 10)
                          : 0;

                        if (offerNum > 50000) {
                          navigate("/pricing/PlatinumTemplate", {  state: { scrollToTop: true } }); // Fixed logic order
                        } else if (offerNum > 5000) {
                          navigate("/pricing/SilverTemplate", {  state: { scrollToTop: true } });
                        } else {
                          setSelectedPlan(plan);
                        }
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.5;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </section>

      {/* Detail Modal */}
      {selectedPlan && (
        <PricingDetailModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </>
  );
}

/* Detail Component */
function PricingDetailModal({ plan, onClose }) {
  const Icon = plan.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-amber-50">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
              style={{
                background: "linear-gradient(135deg, #ec4899, #f43f5e)",
              }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="text-xs text-gray-500">
                Detailed view of inclusions & benefits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-rose-50 text-gray-500 hover:text-rose-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Price */}
          <div className="flex items-end gap-3">
            {plan.offerPrice && (
              <span className="text-xl font-bold text-rose-600">
                {plan.offerPrice}
              </span>
            )}
            {plan.price && (
              <span className="text-sm text-gray-400 line-through">
                {plan.price}
              </span>
            )}
          </div>

          {/* Description */}
          {plan.description && (
            <p className="text-sm text-gray-600">{plan.description}</p>
          )}

          {/* Feature list */}
          <div className="mt-2">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
              Includes
            </p>
            <ul className="space-y-2 max-h-48 overflow-auto pr-1">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-rose-600" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-rose-100 bg-gray-50 flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Perfect for wedding invite & media planning.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-500 text-white hover:bg-rose-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
