import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-gradient-x">
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Extract Key Info from Credit Card Statements
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8">
          Upload your credit card statements and automatically extract all
          essential details securely for{" "}
          <span className="font-semibold text-green-400">Sure Finance</span>.
        </p>

        {/* Upload button */}
        <Link to="/upload">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition">
            Upload Statement
          </button>
        </Link>
      </main>

      <footer className="w-full py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Sure Finance. All rights reserved.
      </footer>
    </div>
  );
}
