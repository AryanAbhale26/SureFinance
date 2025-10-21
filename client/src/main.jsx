import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/HomePage/Navbar";
import GetStarted from "./components/HomePage/GetStarted";
import Upload from "./Page/Upload";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<GetStarted />} />

          {/* Protected Upload page */}
          <Route
            path="/upload"
            element={
              <SignedIn>
                <Upload />
              </SignedIn>
            }
          />

          {/* Redirect non-signed-in users trying to access /upload */}
          <Route
            path="/upload"
            element={
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ClerkProvider>
  </StrictMode>
);
