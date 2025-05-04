import { FormEvent, useState } from "react";
import { FiLink, FiCopy, FiArrowRight } from "react-icons/fi";
import { decodeUrl } from "../services/Api";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

const DecodePage = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!shortUrl) return;

    setIsLoading(true);
    try {
      // Validate the short URL format
      if (!isValidShortUrl(shortUrl)) {
        throw new Error("Please enter a valid ShortLink URL (e.g., http://short.est/abc123)");
      }

      const { longUrl: decodedUrl } = await decodeUrl(shortUrl);
      setLongUrl(decodedUrl);
      toast.success("URL decoded successfully!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to decode URL";
      toast.error(errorMessage);
      setLongUrl("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!longUrl) return;
    copy(longUrl);
    toast.success("Copied to clipboard!");
  };

  // Validate the short URL format
  const isValidShortUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === "short.est" && urlObj.pathname.length > 1;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center py-12 min-h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Decode Short URLs</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Retrieve the original URL from your ShortLink shortened URL
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="shortUrl" className="text-sm font-medium text-gray-700">
              Enter your short URL
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <FiLink />
              </span>
              <input
                type="url"
                id="shortUrl"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
                placeholder="http://short.est/GeAi9K"
                className="flex-1 py-2 px-1 focus:outline-none"
                required
                pattern="https?://short\.est/.+"
                title="Must be a ShortLink URL (e.g., http://short.est/abc123)"
              />
            </div>
            <p className="text-xs text-gray-500">
              Must be a ShortLink URL (e.g., http://short.est/abc123)
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !shortUrl}
            className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}>
            {isLoading ? (
              "Decoding..."
            ) : (
              <>
                <span>Decode URL</span>
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>
        </form>

        {longUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Original URL</h3>
            <div className="flex items-center justify-between">
              <a
                href={longUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline break-all">
                {longUrl}
              </a>
              <button
                onClick={handleCopy}
                className="ml-2 p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
                title="Copy to clipboard"
                aria-label="Copy to clipboard">
                <FiCopy />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecodePage;
