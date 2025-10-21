import { useNavigate } from "react-router-dom";
import { FileText, Shield, Zap, ArrowRight, Lock } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

export default function GetStarted() {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (!isLoaded) {
      toast.info("Loading...", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    if (!isSignedIn) {
      // Show alert popup
      alert(
        "⚠️ Authentication Required\n\nPlease sign in first to upload PDF statements!"
      );

      toast.error("Please sign in first to upload PDF statements!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } else {
      navigate("/upload");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 py-12">
        {/* Main Heading */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Extract Key Info from
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Credit Card Statements
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Upload your credit card statements and automatically extract all
            essential details securely for{" "}
            <span className="font-semibold text-emerald-400">Sure Finance</span>
            .
          </p>
        </div>

        {/* Auth Warning Banner - Only shows when not signed in */}
        {isLoaded && !isSignedIn && (
          <div className="mb-8 max-w-2xl w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-amber-200 text-sm text-left">
              <span className="font-semibold">Sign in required:</span> You must
              be logged in to upload statements
            </p>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
            <Shield className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Secure</h3>
            <p className="text-gray-400 text-sm">
              Your data is encrypted and protected
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
            <Zap className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Fast</h3>
            <p className="text-gray-400 text-sm">
              Extract data in seconds with AI
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
            <FileText className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Accurate</h3>
            <p className="text-gray-400 text-sm">
              Precise extraction of all key details
            </p>
          </div>
        </div>

        {/* Upload button */}
        <button
          onClick={handleUploadClick}
          className={`group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-emerald-500/50 flex items-center space-x-3 ${
            !isSignedIn && isLoaded ? "opacity-75" : ""
          }`}
        >
          <span>Upload Statement</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {!isSignedIn && isLoaded && (
          <p className="text-gray-500 text-sm mt-4">
            Sign in to start uploading statements
          </p>
        )}
      </main>

      <footer className="w-full py-6 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Sure Finance. All rights reserved.
      </footer>
    </div>
  );
}
