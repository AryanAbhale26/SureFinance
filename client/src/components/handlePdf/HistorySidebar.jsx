import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { X, Clock, FileText, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function HistorySidebar({ isOpen, onClose, onSelectRecord }) {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (isOpen && user) {
      fetchHistory();
    }
  }, [isOpen, user]);

  const fetchHistory = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      console.log("Fetching history for user:", user.id);
      const res = await fetch(`http://localhost:5000/api/history/${user.id}`);
      const data = await res.json();

      console.log("History response:", data);

      if (res.ok) {
        setHistory(data.history || []);
      } else {
        throw new Error(data.error || "Failed to fetch history");
      }
    } catch (err) {
      console.error("History fetch error:", err);
      toast.error("Failed to load history!", {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRecordClick = (record) => {
    onSelectRecord(record);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-gradient-to-b from-gray-900 to-gray-950 border-l border-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-emerald-500" />
            <h2 className="text-xl font-bold text-white">Upload History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-5rem)] overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
              <p className="text-gray-400">Loading history...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <FileText className="w-16 h-16 text-gray-600" />
              <p className="text-gray-400 text-center">
                No upload history yet
                <br />
                <span className="text-sm text-gray-500">
                  Upload a PDF to get started
                </span>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((record) => (
                <div
                  key={record._id}
                  onClick={() => handleRecordClick(record)}
                  className="bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-emerald-500/50 rounded-xl p-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-semibold text-white">
                        {record.extractedData?.provider || "Unknown Provider"}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-500 transition-colors" />
                  </div>

                  <div className="space-y-2 text-xs">
                    {record.extractedData?.card_variant && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Card:</span>
                        <span className="text-gray-300">
                          {record.extractedData.card_variant}
                        </span>
                      </div>
                    )}
                    {record.extractedData?.card_last4 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Last 4:</span>
                        <span className="text-gray-300">
                          •••• {record.extractedData.card_last4}
                        </span>
                      </div>
                    )}
                    {record.extractedData?.total_balance && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Balance:</span>
                        <span className="text-emerald-400 font-semibold">
                          {record.extractedData.total_balance}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-700 flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(record.uploadedAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
