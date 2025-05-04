const API_BASE_URL = "http://localhost:5000/api";

interface UrlResponse {
  shortUrl?: string;
  longUrl?: string;
  error?: string;
}

interface UrlEntry {
  shortUrl: string;
  longUrl: string;
  createdAt: string;
  visits: number;
  lastAccessed?: string;
}

export const encodeUrl = async (longUrl: string): Promise<UrlResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/encode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to encode URL");
    }

    return await response.json();
  } catch (error) {
    console.error("Encoding error:", error);
    throw error;
  }
};

export const decodeUrl = async (shortUrl: string): Promise<UrlResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/decode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shortUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to decode URL");
    }

    return await response.json();
  } catch (error) {
    console.error("Decoding error:", error);
    throw error;
  }
};

export const getUrlStats = async (code: string): Promise<UrlEntry> => {
  try {
    const response = await fetch(`${API_BASE_URL}/statistic/${code}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get URL stats");
    }

    return await response.json();
  } catch (error) {
    console.error("Stats error:", error);
    throw error;
  }
};

export const getUrlList = async (query = ""): Promise<UrlEntry[]> => {
  try {
    const url = new URL(`${API_BASE_URL}/list`);
    if (query) {
      url.searchParams.append("q", query);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get URL list");
    }

    return await response.json();
  } catch (error) {
    console.error("List error:", error);
    throw error;
  }
};
export const trackVisit = async (shortUrl: string): Promise<void> => {
  try {
    const code = shortUrl.split("/").pop();
    if (!code) return;

    await fetch(`${API_BASE_URL}/${code}`, {
      method: "HEAD",
    });
  } catch (error) {
    console.error("Visit tracking error:", error);
  }
};

export const redirectToLongUrl = async (shortUrl: string): Promise<void> => {
  try {
    // First track the visit
    await trackVisit(shortUrl);

    // Then get the long URL to redirect to
    const { longUrl } = await decodeUrl(shortUrl);
    window.location.href = longUrl;
  } catch (error) {
    console.error("Redirect failed:", error);
    // Fallback to opening the short URL directly
    window.open(shortUrl, "_blank");
  }
};
