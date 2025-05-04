import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner";
import UrlItem from "../components/UrlItem";
import { getUrlList } from "../services/Api";

interface UrlEntry {
  shortUrl: string;
  longUrl: string;
  createdAt: string;
  visits: number;
  lastAccessed?: string;
}

const UrlList = () => {
  const [urls, setUrls] = useState<UrlEntry[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getUrlList(searchQuery);
        setUrls(data);
      } catch (err) {
        console.error("Failed to fetch URLs:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch URLs");
        setUrls(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Only search if query is empty or has at least 3 chars
    if (searchQuery === "" || searchQuery.length >= 3) {
      const debounceTimer = setTimeout(() => {
        fetchUrls();
      }, 500);

      return () => clearTimeout(debounceTimer);
    } else {
      // If query is less than 3 chars and not empty, clear results
      setUrls(null);
      setIsLoading(false);
    }
  }, [searchQuery]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full mt-20">
      <div className="flex items-center justify-center mt-6">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-2xl font-bold text-gray-800">Your Shortened URLs</h2>
          <div className="relative w-[40%] mt-5 mb-5">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search URLs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {error && <div className="text-center py-8 text-red-500">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : urls?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? "No URLs match your search" : "No URLs created yet"}
        </div>
      ) : (
        <div className="space-y-4 w-[70%] mx-auto">
          {urls?.map((url) => (
            <UrlItem key={url.shortUrl} url={url} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UrlList;
