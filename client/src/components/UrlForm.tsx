import { useState } from "react";
import { FiLink, FiCopy } from "react-icons/fi";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

const UrlForm = ({ onNewUrl }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return;
  };

  const handleCopy = () => {
    copy(shortUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shorten Your URL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="longUrl" className="text-sm font-medium text-gray-700">
            Enter your long URL
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="px-3 text-gray-500">
              <FiLink />
            </span>
            <input
              type="url"
              id="longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              className="flex-1 py-2 px-1 focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Your shortened URL</h3>
          <div className="flex items-center justify-between">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline break-all">
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="ml-2 p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
              title="Copy to clipboard">
              <FiCopy />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
