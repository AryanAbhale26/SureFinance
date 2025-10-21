import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="h-10 w-10 " />
        <Link to="/" className="text-xl font-bold text-white">
          PDF Extractor
        </Link>
      </div>

      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
