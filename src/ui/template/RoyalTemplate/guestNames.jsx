import React, { useState } from "react";

export default function GuestNames({ guestId = 0, onContinue, userData }) {
  // const asset = useWeddingStore(s => s.getUserData()?.assets?.two_guest);
  // const guestNames = useWeddingStore(s => s.getUserData()?.two_guestNames);
  // const data = useWeddingStore(s => s.data);
  const data = userData;
  const asset = data?.assets?.two_guest;
  const guestNames = data?.two_guestNames;
  const guest = guestNames?.groups[guestId];
  if (!guest) return null;

  //   const totalGuests = Array.isArray(data) ? data.length : 0;

  // const isValidGuestId =
  //   Number.isInteger(guestId) &&
  //   guestId >= 0 &&
  //   guestId < totalGuests;

  // if (!isValidGuestId) return null;

  // const guest = data[guestId];

  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const selectedGuest = guestNames.groups[guestId];

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="min-h-screen min-w-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${asset.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Floating cartoon logo with responsive positioning */}

      {/* Enhanced background blur overlay - Rose Gold */}
      <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-pink-600/20 via-fuchsia-200/10 to-purple-600/20"></div>

      <div
        className="max-w-md w-full relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-3xl border border-white/30 overflow-hidden space-y-8 p-8 sm:p-4 pt-6 sm:pt-6"
        style={{
          boxShadow:
            "0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Improved internal gradient with layered blur - Rose Gold */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/95 via-white/98 to-rose-50/92 backdrop-blur-md pointer-events-none rounded-3xl"></div>

        <div
          className="bg-gradient-to-r from-rose-800/90 to-red-900/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50
             h-32 w-32 sm:h-28 sm:w-28 md:h-26 md:w-26"
          style={{
            // position: "absolute",
            // top: isMobile ? "55px" : "25px",
            // left: "50%",
            // transform: "translateX(-50%)",
            // zIndex: 30,
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            width: "fit-content", // Keeps it centered
            // Keep positioning if needed:
            // marginTop: isMobile ? "55px" : "25px",
          }}
        >
          <img
            src={asset.logoImage}
            alt="Cartoon Logo"
            className="
      rounded-full object-contain shadow-xl
      h-28 w-28           /* mobile */
      sm:h-26 sm:w-26     /* tablets/small laptop */
      md:h-26 md:w-26     /* bigger laptop/desktop */
    "
            style={{
              transform: "scale(1)",
              transformOrigin: "center",
            }}
          />
        </div>

        {/* Guest names card with enhanced design */}
        <div className="relative z-10 gap-3 space-y-4">
          {/* Header with decorative line */}
          <div className="flex items-center justify-center gap-3 space-x-2">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-rose-600/50 to-transparent"></div>
            <span className="text-2xl sm:text-xl font-semibold text-rose-700 uppercase tracking-wider">
              {asset.headerTitle}
            </span>
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-rose-600/50 to-transparent"></div>
          </div>

          {/* Guest names bordered card - Rose Gold */}
          <div
            className="rounded-2xl border-2 border-rose-300/40 bg-gradient-to-br from-rose-50/60 to-pink-50/40 backdrop-blur-sm space-y-1"
            style={{
              boxShadow:
                "0 4px 15px rgba(190, 24, 93, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            }}
          >
            {/* Guest names */}

            <div className="">
              {selectedGuest.names.map((name, idx) => (
                <div
                  key={idx}
                  className="text-center py-2 px-2 rounded-lg bg-white/50 border border-rose-200/30 hover:bg-white/70 transition-colors duration-200"
                >
                  <p className="text-xl sm:text-base font-medium text-gray-800">
                    {name}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-rose-300/30 to-transparent my-3"></div>

            {/* Address and family info */}
            <div className="text-center space-y-1 pt-1">
              <p className="text-2xl sm:text-xl font-semibold text-rose-700">
                {selectedGuest.thikana}
              </p>
              <p className="text-xl sm:text-xl font-medium text-gray-600">
                {selectedGuest.sa_parivar}
              </p>
            </div>
          </div>
        </div>

        {/* Button - Rose Gold */}
        <button
          onClick={onContinue}
          className="w-full flex justify-center py-4 px-6 border-0 text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm"
        >
          Open Card
        </button>
      </div>
    </div>
  );
}
