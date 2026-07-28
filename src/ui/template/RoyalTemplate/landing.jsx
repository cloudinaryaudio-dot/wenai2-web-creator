import TapToStartPlay from "./tapToStartButton";

export default function Landing({ onContinue, userData }) {
  return (
    <TapToStartPlay
      onClick={onContinue}  // ✅ Works perfectly now!
      allData={userData}
    />
  );
}
