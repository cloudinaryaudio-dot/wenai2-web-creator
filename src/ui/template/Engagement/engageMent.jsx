import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

import GuestNames from "../RoyalTemplate/guestNames";
import Engagement from "./engage"; // ✅ PascalCase component

export default function EngagementInvitationFlow({ data }) {
  const { guestId } = useParams();

  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const guestGroups = data?.two_guestNames?.groups ?? [];
  const totalGuests = guestGroups.length;

  const parsedGuestId = Number(guestId);
  const guestIndex =
    Number.isInteger(parsedGuestId) &&
    parsedGuestId > 0 &&
    parsedGuestId <= totalGuests
      ? parsedGuestId - 1
      : null;

  // 👉 Skip guest screen if guestId is invalid or missing
  useEffect(() => {
    if (step === 1 && guestIndex === null) {
      goToStep(2);
    }
  }, [step, guestIndex]);

  const goToStep = (nextStep) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ===== STEP CONTENT ===== */}
      <div
        className={`transition-all duration-500 ease-in-out min-h-screen ${
          isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* STEP 1 – Guest Name */}
        {step === 1 && guestIndex !== null && (
          <GuestNames
            guestId={guestIndex}
            userData={data}
            onContinue={() => goToStep(2)}
          />
        )}

        {/* STEP 2 – Engagement Invitation */}
        {step === 2 && (
          <div
            className="min-h-screen bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/aa/9d/4d/aa9d4d79fd38a472f7e660ff20e70e03.jpg')",
            }}
          >
            <div className="min-h-screen bg-gradient-to-b from-rose-900/60 via-rose-950/80 to-rose-900/70 backdrop-blur-xl">
              <Engagement data={data} />
            </div>
          </div>
        )}
      </div>

      {/* ===== TRANSITION LOADER ===== */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Loader2 className="w-12 h-12 animate-spin text-white" />
        </div>
      )}
    </div>
  );
}
