export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} ShortLink - A URL shortening service
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
              Privacy Policy
            </a>
            <a
              href="https://indicina.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-4 text-center md:text-left">
          <p className="text-gray-400 text-xs">Built for Indicina technical assessment</p>
        </div>
      </div>
    </footer>
  );
}
