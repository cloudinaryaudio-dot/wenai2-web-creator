// Mock data source — single source of truth used to seed localStorage.
// No database is used. The DataContext reads from localStorage first,
// falling back to these mock JSON files, and the admin panel can
// seed/reset localStorage from here at any time.

import weddingMock from "../db/data/wedding.json";
import engagementMock from "../db/data/engagement.json";
import biodataMock from "../db/data/biodata.json";
import cardsMock from "../db/data/cards.json";
import invitationsMock from "../db/data/invitations.json";

export const MOCK_DATA = {
  wedding: weddingMock,
  engagement: engagementMock,
  biodata: biodataMock,
  cards: cardsMock,
  invitations: invitationsMock,
};

export const DATASETS = ["wedding", "engagement", "biodata", "cards", "invitations"];

export const STORAGE_PREFIX = "wgen:";
export const storageKey = (name) => `${STORAGE_PREFIX}${name}`;
