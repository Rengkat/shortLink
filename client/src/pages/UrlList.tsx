import { useState, useEffect } from "react";
import { FiSearch, FiClock, FiEye } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { getUrlList } from "../mokes/mockApiService";
// import UrlItem from "./UrlItem";
// import LoadingSpinner from "./LoadingSpinner";

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      setIsLoading(true);
      try {
        const data = await getUrlList();
        setUrls(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUrls();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full mt-20 ">
      <div className="flex items-center justify-center mt-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Shortened URLs</h2>
          <div className="relative w-64 mt-5">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search URLs..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">Loading...</div>
      ) : (
        <div className="space-y-4">
          {urls.map((url) => (
            <></>
          ))}
        </div>
      )}
    </div>
  );
};

export default UrlList;
