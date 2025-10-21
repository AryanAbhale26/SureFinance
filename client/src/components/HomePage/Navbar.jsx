import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FileText } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm shadow-lg px-10 py-4 flex justify-between items-center border-b border-gray-800 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <FileText className="w-6 h-6 text-white hidden" />
          </div>
          <Link
            to="/"
            className="text-xl font-bold text-white hover:text-emerald-400 transition-colors"
          >
            StatementIQ
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400 hidden md:block">
              Welcome back!
            </span>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-emerald-500/50",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
