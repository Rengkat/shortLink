import UrlForm from "../components/UrlForm";

const Home = () => {
  return (
    <div className="flex flex-col items-center py-12 h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Shorten Your Links</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Create short, URLs and track their performance with our powerful analytics dashboard.
        </p>
      </div>
      <UrlForm />
    </div>
  );
};

export default Home;
