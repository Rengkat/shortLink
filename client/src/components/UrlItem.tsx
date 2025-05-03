import { FiCopy, FiExternalLink, FiBarChart2, FiClock } from "react-icons/fi";
import { format } from "date-fns";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UrlItem = ({ url }) => {
  const handleCopy = () => {
    copy(url.shortUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1 mb-2 md:mb-0">
          <div className="flex items-center">
            <a
              href={url.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline font-medium break-all">
              {url.shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="ml-2 p-1 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
              title="Copy to clipboard">
              <FiCopy size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1 break-all">{url.longUrl}</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500">
            <FiBarChart2 className="mr-1" />
            <span>{url.visits} visits</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FiClock className="mr-1" />
            <span>{format(new Date(url.createdAt), "MMM d, yyyy")}</span>
          </div>
          <Link
            to={`/stats/${url.shortUrl.split("/").pop()}`}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
            title="View stats">
            <FiExternalLink size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UrlItem;
