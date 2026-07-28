import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

// === PAGE COMPONENTS ===
import GlobalFloatingMusic from "../RoyalTemplate/GlobalFloatingMusic.jsx";
import LandingPage from "../RoyalTemplate/landing";
import GuestNames from "../RoyalTemplate/guestNames";
import WelcomeOverlay from "../RoyalTemplate/welcomeOverlayDemo";
import RoyalTemplateFirstPage from "../RoyalTemplate/royalTemplateFirstPage";
import RoyalTemplateSecondPage from "../RoyalTemplate/royalTemplateSecondPage";
import AutoScrollBackground from "../RoyalTemplate/autoScrollBGThirdPage";
import BrideGroomPage from "../RoyalTemplate/brideGroomFourthPage";
import FunctionCards from "../RoyalTemplate/functionCardsFifthPage";
import ImageCardSection from "../RoyalTemplate/imageCardSectionSixPage";
import WeddingVideoPage from "../RoyalTemplate/weddingVideoSeventhPage";
import WishesPage from "../RoyalTemplate/wishesEightPage.jsx";
import VenuePage from "../RoyalTemplate/vanueNinePage.jsx";
import NamesPage from "../RoyalTemplate/namesTenthPage";
import ThanksPage from "../RoyalTemplate/thanksElevenPage";
import NotePage from "../RoyalTemplate/noteTwelvePage";
import QRCodePage from "../RoyalTemplate/qrCodeThirteenPage";
import FooterPage from "../RoyalTemplate/footerFourteenPage";
import FloatingBackToTop from "../RoyalTemplate/FloatingBackToTop.jsx";

// === CONSTANTS ===
const STEP_DURATION = 400; // ms
const BACKGROUND_IMAGE = "url('https://i.pinimg.com/736x/aa/9d/4d/aa9d4d79fd38a472f7e660ff20e70e03.jpg')";

/**
 * WeddingInvitationFlow - Multi-step wedding invitation page flow
 * @param {Object} data - Wedding data object containing guest names and invitation details
 * @returns {React.ReactElement} Multi-step invitation interface
 */
export default function WeddingInvitationFlow({ data }) {
  // === STATE MANAGEMENT ===
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { guestId } = useParams();
  const music = data?.assets?.music;

  // === DERIVED STATE ===
  const totalGuests = useMemo(
    () => data?.two_guestNames?.groups?.length ?? 0,
    [data?.two_guestNames?.groups?.length]
  );

  const guestIndex = useMemo(() => {
    const rawGuestId = Number(guestId);
    const isValidGuestId =
      Number.isInteger(rawGuestId) &&
      rawGuestId > 0 &&
      rawGuestId <= totalGuests;
    return isValidGuestId ? rawGuestId - 1 : null;
  }, [guestId, totalGuests]);

  // === NAVIGATION HANDLER ===
  const goToStep = useCallback((nextStep) => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setStep(nextStep);
      setIsTransitioning(false);
    }, STEP_DURATION);

    return () => clearTimeout(timer);
  }, []);

  // === SIDE EFFECTS ===
  useEffect(() => {
    if (step === 2 && guestIndex === null) {
      goToStep(3);
    }
  }, [step, guestIndex, goToStep]);

  // === FULL INVITATION PAGE ===
  const InvitationPage = () => (
    <div
      className="min-w-screen relative"
      style={{ backgroundImage: BACKGROUND_IMAGE, backgroundAttachment: "fixed" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-900/60 via-rose-950/80 to-rose-900/70 backdrop-blur-2xl" />
      <GlobalFloatingMusic music={music} />
      <div className="relative z-10">
        <FloatingBackToTop />
        <RoyalTemplateFirstPage userData={data} />
        <RoyalTemplateSecondPage userData={data} />
        <AutoScrollBackground userData={data} />
        <BrideGroomPage userData={data} />
        <FunctionCards userData={data} />
        <ImageCardSection userData={data} />
        <WeddingVideoPage userData={data} />
        <WishesPage userData={data} />
        <VenuePage userData={data} />
        <NamesPage userData={data} />
        <ThanksPage userData={data} />
        <NotePage userData={data} />
        <QRCodePage userData={data} />
        <FooterPage userData={data} />
      </div>
    </div>
  );

  // === PAGE STEPS CONFIGURATION ===
  const steps = useMemo(
    () => [
      // STEP 1: Landing Page
      <LandingPage
        key="landing"
        onContinue={() => goToStep(2)}
        userData={data}
      />,

      // STEP 2: Guest Names (Conditional Render)
      step === 2 && guestIndex !== null ? (
        <GuestNames
          key="guest-names"
          guestId={guestIndex}
          onContinue={() => goToStep(3)}
          userData={data}
        />
      ) : null,

      // STEP 3: Welcome Overlay
      <WelcomeOverlay
        key="welcome-overlay"
        onContinue={() => goToStep(4)}
        userData={data}
      />,

      // STEP 4: Full Invitation
      <InvitationPage key="invitation" />,
    ],
    [step, guestIndex, data, goToStep]
  );

  // === RENDER ===
  return (
    <div className="min-h-screen overflow-hidden bg-black">
      {/* Main Content with Transition */}
      <div
        className={`transition-all duration-700 ease-in-out min-h-screen flex items-center justify-center ${
          isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {steps[step - 1]}
      </div>

      {/* Loading Overlay During Transition */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Loader2
            className="h-12 w-12 animate-spin text-white"
            aria-label="Loading"
            role="status"
          />
        </div>
      )}
    </div>
  );
}
