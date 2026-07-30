import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useInvitationViewModel } from "../../application";
import InvitationRenderer from "./InvitationRenderer";
import NotFound from "../Utility/NotFound";

export default function InvitationPage() {
  const { id = "default" } = useParams();
  const navigate = useNavigate();
  // The page invokes the application layer only — no orchestration here.
  const { viewModel, loading } = useInvitationViewModel(id);

  if (loading) return null;
  if (!viewModel || !viewModel.visible) return <NotFound />;



  return (
    <div className="relative">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur border border-white/20 text-white text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <InvitationRenderer invitation={viewModel.invitation} themeId={viewModel.themeId} />
    </div>
  );
}
