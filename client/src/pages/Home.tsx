import { useState } from "react";

const Home = () => {
  const [recentUrl, setRecentUrl] = useState(null);

  return (
    <div className="flex flex-col items-center py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Shorten Your Links</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Create short, URLs and track their performance with our powerful analytics dashboard.
        </p>
      </div>

      {recentUrl && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">Your new short link appears above!</p>
          <p className="text-sm text-gray-500 mt-2">
            Visit the{" "}
            <a href="/dashboard" className="text-indigo-600 hover:underline">
              Dashboard
            </a>{" "}
            to manage all your links.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
