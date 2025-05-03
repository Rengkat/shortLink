const API_BASE_URL = "http://localhost:3000/api";

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
