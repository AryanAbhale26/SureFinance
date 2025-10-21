import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Clock, FileText, Loader2 } from "lucide-react";

export default function HistorySidebar({ onSelect, selectedId }) {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/history/${user.id}`);
        const data = await res.json();
        setHistory(data.history || []);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

    // 🔄 Refresh when a new upload happens
    const refreshHandler = () => fetchHistory();
    window.addEventListener("refreshHistory", refreshHandler);

    return () => window.removeEventListener("refreshHistory", refreshHandler);
  }, [user]);

  return (
    <aside className="w-72 bg-gradient-to-br from-gray-900 to-gray-950 border-r border-gray-800 text-white p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-emerald-500" />
        <h2 className="text-lg font-semibold">Upload History</h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center flex-1 space-y-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
          <p className="text-sm">Loading history...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 space-y-3 text-gray-500">
          <FileText className="w-6 h-6 text-gray-600" />
          <p className="text-sm text-gray-400">No PDFs uploaded yet.</p>
        </div>
      ) : (
        <ul className="space-y-2 overflow-y-auto flex-1 custom-scrollbar">
          {history.map((item) => (
            <li
              key={item._id}
              onClick={() => onSelect(item)}
              className={`group p-3 rounded-lg border border-gray-800 cursor-pointer transition-all ${
                selectedId === item._id
                  ? "bg-emerald-600/20 border-emerald-600"
                  : "bg-gray-800/30 hover:bg-gray-800/60 hover:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm text-gray-100 group-hover:text-emerald-400 truncate">
                  {item.extractedData?.provider || "Unknown Provider"}
                </p>
                <FileText className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
              </div>
              <p className="text-xs text-gray-500">
                {new Date(item.uploadedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
