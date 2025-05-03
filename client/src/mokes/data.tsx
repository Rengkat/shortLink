// Mock database
const mockDb = {
  "http://short.est/GeAi9K": {
    longUrl: "https://indicina.co",
    shortUrl: "http://short.est/GeAi9K",
    createdAt: new Date("2023-05-15T09:30:00Z"),
    visits: 42,
    lastAccessed: new Date("2023-06-20T14:15:00Z"),
  },
  "http://short.est/JkLm8N": {
    longUrl: "https://example.com/products",
    shortUrl: "http://short.est/JkLm8N",
    createdAt: new Date("2023-06-01T11:20:00Z"),
    visits: 18,
    lastAccessed: new Date("2023-06-18T10:05:00Z"),
  },
  "http://short.est/PoQr7M": {
    longUrl: "https://another-example.org/blog",
    shortUrl: "http://short.est/PoQr7M",
    createdAt: new Date("2023-06-10T16:45:00Z"),
    visits: 7,
    lastAccessed: new Date("2023-06-19T09:30:00Z"),
  },
};

// Generate more mock data
const domains = ["google.com", "github.com", "twitter.com", "linkedin.com", "youtube.com"];
const paths = ["", "about", "contact", "products", "blog"];

for (let i = 0; i < 15; i++) {
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const randomPath = paths[Math.floor(Math.random() * paths.length)];
  const longUrl = `https://${randomDomain}/${randomPath}`;
  const code = Math.random().toString(36).substring(2, 8);
  const shortUrl = `http://short.est/${code}`;

  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));

  mockDb[shortUrl] = {
    longUrl,
    shortUrl,
    createdAt,
    visits: Math.floor(Math.random() * 100),
    lastAccessed: new Date(createdAt.getTime() + Math.random() * 15 * 24 * 60 * 60 * 1000),
  };
}

export default mockDb;
