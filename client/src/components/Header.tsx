import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiHome, FiLink, FiBarChart2, FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when clicking on a nav item
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      if (isMobileMenuOpen && target && !target.closest(".mobile-menu-container")) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2 z-50" onClick={closeMobileMenu}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <FiLink className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-800">ShortLink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:text-indigo-600"
                }`
              }>
              <FiHome className="text-lg" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:text-indigo-600"
                }`
              }>
              <FiLink className="text-lg" />
              <span>My Links</span>
            </NavLink>
            <NavLink
              to="/stats"
              className={({ isActive }) =>
                `flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:text-indigo-600"
                }`
              }>
              <FiBarChart2 className="text-lg" />
              <span>Analytics</span>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 focus:outline-none z-50"
            aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu-container md:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pt-20"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}>
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-lg ${
                    isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:bg-gray-100"
                  }`
                }>
                <FiHome className="text-xl" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-lg ${
                    isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:bg-gray-100"
                  }`
                }>
                <FiLink className="text-xl" />
                <span>My Links</span>
              </NavLink>
              <NavLink
                to="/stats"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-lg ${
                    isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:bg-gray-100"
                  }`
                }>
                <FiBarChart2 className="text-xl" />
                <span>Analytics</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
