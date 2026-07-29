import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from './ui/landignPage/admin/AdminDashboard.jsx'
import LandingPage from "./ui/landignPage/LandingPage.jsx";
import DreamTemplate from './ui/template/templates/DreamScapeTemplate.jsx';
import ModernTemplate from './ui/template/templates/ModernInstagramTemplate.jsx';
import RoyalTemplate from './ui/template/templates/RoyalIndianTemplate.jsx';
import NotFound from './ui/Utility/NotFound.jsx'
import {BioDataPage} from './ui/template/Biodata/biodata.jsx'
import EngageMent from './ui/template/Engagement/engage.jsx'
import EngagementInvitationFlow from "./ui/template/Engagement/engageMent.jsx"
import Loading from "./ui/Utility/Loading.jsx";
import './App.css'
import './index.css'
import { useWeddingStore, useBioDataStore, useEngagementStore, usePriceStore } from './db/store/useWeddingStore.js';
import { useParams} from "react-router-dom";
import { useEffect } from "react";  // CORRECT!
import { DataProvider } from './context/DataContext.jsx';
import SimpleAdminDashboard from './ui/landignPage/admin/SimpleAdminDashboard.jsx';
import CardsPage from './ui/CardsPage.jsx';
import InvitationPage from './ui/invitation/InvitationPage.jsx';



function WeddingInvitationPage() {
  const { slug, id } = useParams();

  const fetchInvitation = useWeddingStore(s => s.fetchInvitation);
  const data = useWeddingStore(s => s.data);
  const error = useWeddingStore(s => s.error);
  const loading = useWeddingStore(s => s.loading);

  useEffect(() => {
    if (slug && id) {
      fetchInvitation({ slug, id });
    }
  }, [slug, id, fetchInvitation]);

  if (loading) return <Loading />;
  if (error) return <NotFound />;
  if (!data) return <Loading />;

  return <RoyalTemplate data={data} />;
}

function EngageInvitationPage() {
  const { slug, id } = useParams();

  const fetchInvitation = useEngagementStore(s => s.fetchInvitation);
  const data = useEngagementStore(s => s.data);
  const error = useEngagementStore(s => s.error);
  const loading = useEngagementStore(s => s.loading);

  useEffect(() => {
    if (slug && id) {
      fetchInvitation({ slug, id });
    }
  }, [slug, id, fetchInvitation]);

  if (loading) return <Loading />;
  if (error) return <NotFound />;
  if (!data) return <Loading />;

  return <EngagementInvitationFlow data={data} />;
}


function Biodata() {
  const { slug, id } = useParams();

  const fetchInvitation = useBioDataStore(s => s.fetchInvitation);
  const data = useBioDataStore(s => s.data);
  const error = useBioDataStore(s => s.error);
  const loading = useBioDataStore(s => s.loading);

  useEffect(() => {
    if (slug && id) {
      fetchInvitation({ slug, id });
    }
  }, [slug, id, fetchInvitation]);

  if (loading) return <Loading />;
  if (error) return <NotFound />;
  if (!data) return <Loading />;

  return <BioDataPage data={data} />;
}

const App = () => {
  
  const fetchPrices = usePriceStore(s => s.fetchPrices);
useEffect(() => {
  fetchPrices();
}, []);
  return (
    <Router>
      <DataProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#4a0f0e] via-[#8f201a] to-[#4a0f0e]">
        <Routes>
          <Route path="/" element={<LandingPage  />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-dashboard" element={<SimpleAdminDashboard />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/invitation" element={<InvitationPage />} />
          <Route path="/invitation/:id" element={<InvitationPage />} />
          <Route path="/Royal/:slug/:id/:guestId?" element={<WeddingInvitationPage />} />
          <Route path="/Engagement/:slug/:id/:guestId?" element={<EngageInvitationPage />} />
          <Route path="/Biodata/:slug/:id" element={<Biodata />} />

          <Route path="/pricing/PlatinumTemplate" element={<ModernTemplate />} />
          <Route path="/pricing/SilverTemplate" element={<DreamTemplate />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </div>
      </DataProvider>
    </Router>
  );
};

export default App;
