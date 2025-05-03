import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8"></main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
};

export default App;
