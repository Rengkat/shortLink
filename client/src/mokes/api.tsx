import mockDb from "./data";

// Simulate network delay
const simulateNetworkDelay = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 100));

const mockApi = {
  encode: async (longUrl: string) => {
    await simulateNetworkDelay();

    if (!longUrl) {
      throw new Error("Long URL is required");
    }

    // Check if URL already exists
    const existingEntry = Object.values(mockDb).find((entry) => entry.longUrl === longUrl);
    if (existingEntry) {
      return { shortUrl: existingEntry.shortUrl };
    }

    // Create new short URL
    const code = Math.random().toString(36).substring(2, 8);
    const shortUrl = `http://short.est/${code}`;

    mockDb[shortUrl] = {
      longUrl,
      shortUrl,
      createdAt: new Date(),
      visits: 0,
      lastAccessed: null,
    };

    return { shortUrl };
  },

  decode: async (shortUrl: string) => {
    await simulateNetworkDelay();

    if (!shortUrl) {
      throw new Error("Short URL is required");
    }

    const urlEntry = mockDb[shortUrl];

    if (!urlEntry) {
      throw new Error("Short URL not found");
    }

    return { longUrl: urlEntry.longUrl };
  },

  getStatistics: async (code) => {
    await simulateNetworkDelay();

    const shortUrl = `http://short.est/${code}`;
    const urlEntry = mockDb[shortUrl];

    if (!urlEntry) {
      throw new Error("URL not found");
    }

    return {
      shortUrl: urlEntry.shortUrl,
      longUrl: urlEntry.longUrl,
      visits: urlEntry.visits,
      createdAt: urlEntry.createdAt,
      lastAccessed: urlEntry.lastAccessed || "Never accessed",
    };
  },

  getList: async (query = "") => {
    await simulateNetworkDelay();

    let urlList = Object.values(mockDb);

    if (query && query.length >= 3) {
      urlList = urlList.filter((entry) =>
        entry.longUrl.toLowerCase().includes(query.toLowerCase())
      );
    }

    return urlList.sort((a, b) => b.createdAt - a.createdAt);
  },

  incrementVisit: async (shortUrl) => {
    const urlEntry = mockDb[shortUrl];
    if (urlEntry) {
      urlEntry.visits++;
      urlEntry.lastAccessed = new Date();
    }
  },
};

export default mockApi;
