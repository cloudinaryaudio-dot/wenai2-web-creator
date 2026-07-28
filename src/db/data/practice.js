function WeddingInvitationPage() {
  const { userId, guestId } = useParams();
  const { setUser, error, getUserData } = useWeddingStore();

  useEffect(() => {
    if (userId) setUser(userId);
    else setUser("user1");
  }, [userId, setUser]);

  const userData = getUserData();
  if (error) return <NotFound />;
  if (!userData) return <div>Loading...</div>;

  return <RoyalTemplate />;
}

function EngageInvitationPage() {
  const { userId, guestId } = useParams();
  const { setUser, error, getUserData } = useEngagementStore();

  useEffect(() => {
    if (userId) setUser(userId);
    else setUser("user1");
  }, [userId, setUser]);

  const userData = getUserData();
  if (error) return <NotFound />;
  if (!userData) return <div>Loading...</div>;

  return <EngagementTemplate />;
}

function BiodataPage() {
  const { userId, guestId } = useParams();
  const { setUser, error, getUserData } = useBiodataStore();

  useEffect(() => {
    if (userId) setUser(userId);
    else setUser("user1");
  }, [userId, setUser]);

  const userData = getUserData();
  if (error) return <NotFound />;
  if (!userData) return <div>Loading...</div>;

  return <BiodataTemplate />;
}

import { create } from "zustand";

export const useWeddingStore = create((set) => ({
  /** STATE */
  userId: "user1", 
  data: null,   // ---------
  loading: false,  
  error: null,

  /** ACTION */
  setUser: (userId) => {
    set({ loading: true, error: null });

    const userData = weddingUsersData[userId];

    if (!userData) {
      set({
        userId: "user1",
        data: weddingUsersData["user1"] ?? null,
        error: `Wedding invitation for ${userId} not found`,
        loading: false,
      });
      return;
    }

    set({
      userId,
      data: userData,
      loading: false,
      error: null,
    });
  },
}));


function WeddingInvitationPage() {
  const { userData, error } = useTemplateUser(useWeddingStore);

  if (error) return <NotFound />;
  if (!userData) return <div>Loading...</div>;

  return <RoyalTemplate />;
}

function EngageInvitationPage() {
  const { userData, error } = useTemplateUser(useEngagementStore);

  if (error) return <NotFound />;
  if (!userData) return <div>Loading...</div>;

  return <EngagementTemplate />;
}

function BiodataPage() {
  const { userData, error } = useTemplateUser(useBiodataStore);

  if (error) return <NotFound />;
  if (!userData) return <div>Loading...</div>;

  return <BiodataTemplate />;
}

price : {
  "wedding" : "2100",
  "Engagement" : "999",
  "Basic" : "11000",
  "Biodata" : "Free",
  "Silver" : "149999",
  "Premium" : "79999",
}