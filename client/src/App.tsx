import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UrlList from "./pages/UrlList";
import Stats from "./pages/Stats";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/link-list" element={<UrlList />} />
            <Route path="/stats/:code" element={<Stats />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
};

export default App;
