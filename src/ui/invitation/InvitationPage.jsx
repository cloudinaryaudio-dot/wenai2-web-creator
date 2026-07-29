import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { loadInvitation } from "../../lib/invitation/invitationLoader";
import InvitationRenderer from "./InvitationRenderer";
import NotFound from "../Utility/NotFound";

export default function InvitationPage() {
  const { id = "default" } = useParams();
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState(undefined);

  useEffect(() => {
    // Read via the loader — the page never touches the storage layer directly.
    setInvitation(loadInvitation(id));
  }, [id]);

  if (invitation === undefined) return null;
  if (!invitation) return <NotFound />;

  return (
    <div className="relative">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur border border-white/20 text-white text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <InvitationRenderer invitation={invitation} />
    </div>
  );
}
