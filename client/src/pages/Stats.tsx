import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiLink, FiClock, FiEye, FiArrowLeft } from "react-icons/fi";
import { format, formatDistanceToNow } from "date-fns";

import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { getUrlStats } from "../mokes/mockApiService";

const Stats = () => {
  const { code } = useParams();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const data = await getUrlStats(code);
        setStats(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [code]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center py-8 text-gray-500">Failed to load statistics</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto mt-20">
      <Link
        to="/link-list"
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <FiArrowLeft className="mr-2" />
        Back to Link list
      </Link>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">URL Statistics</h2>

      <div className="space-y-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Short URL</h3>
          <div className="flex items-center">
            <FiLink className="text-gray-500 mr-2" />
            <a
              href={stats.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline break-all">
              {stats.shortUrl}
            </a>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Original URL</h3>
          <p className="text-gray-800 break-all">{stats.longUrl}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Total Visits</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.visits}</p>
          </div>

          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Created</h3>
            <div className="flex items-center">
              <FiClock className="text-gray-500 mr-2" />
              <p className="text-gray-800">{formatDistanceToNow(new Date(stats.createdAt))} ago</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {format(new Date(stats.createdAt), "MMM d, yyyy h:mm a")}
            </p>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Last Accessed</h3>
          <div className="flex items-center">
            <FiEye className="text-gray-500 mr-2" />
            <p className="text-gray-800">
              {stats.lastAccessed
                ? format(new Date(stats.lastAccessed), "MMM d, yyyy h:mm a")
                : "Never"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
