import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Upload, FileText, Loader2, AlertCircle, Download } from "lucide-react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export default function PDFUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Check if file is PDF
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a valid PDF file!", {
        position: "top-center",
        theme: "dark",
      });
      e.target.value = null;
      return;
    }

    // Check file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error(
        `File size exceeds 10MB limit! Your file: ${(
          selectedFile.size /
          1024 /
          1024
        ).toFixed(2)}MB`,
        {
          position: "top-center",
          theme: "dark",
        }
      );
      e.target.value = null;
      return;
    }

    // Check if file size is too small (likely corrupted or empty)
    if (selectedFile.size < 1024) {
      toast.error("File is too small. Please select a valid PDF!", {
        position: "top-center",
        theme: "dark",
      });
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
    setResult(null);
    toast.success("PDF selected successfully!", {
      position: "top-center",
      theme: "dark",
      autoClose: 2000,
    });
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please select a PDF first!", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    if (!user) {
      toast.error("You must be signed in to upload!", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("clerkUserId", user.id);

    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (data.pdfRecord) {
        setResult(data.pdfRecord);
        setFile(null);
        toast.success("Data extracted successfully!", {
          position: "top-center",
          theme: "dark",
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error(err);
      toast.error(`Upload failed: ${err.message}`, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportToExcel = () => {
    if (!result || !result.extractedData) {
      toast.error("No data to export!", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    try {
      // Convert extracted data to array format for Excel
      const dataArray = Object.entries(result.extractedData).map(
        ([key, value]) => ({
          Field: key.replace(/([A-Z])/g, " $1").trim(),
          Value: typeof value === "object" ? JSON.stringify(value) : value,
        })
      );

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(dataArray);

      // Set column widths
      ws["!cols"] = [{ wch: 30 }, { wch: 50 }];

      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Statement Data");

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `credit_card_statement_${timestamp}.xlsx`;

      // Download
      XLSX.writeFile(wb, filename);

      toast.success("Excel file downloaded successfully!", {
        position: "top-center",
        theme: "dark",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to export to Excel!", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  const renderTableData = (data) => {
    if (!data) return null;

    const entries = Object.entries(data);
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                Field
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, value], idx) => (
              <tr
                key={key}
                className={`border-b border-gray-800 hover:bg-gray-700/30 transition-colors ${
                  idx % 2 === 0 ? "bg-gray-800/30" : ""
                }`}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-300">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </td>
                <td className="py-4 px-6 text-sm text-gray-400">
                  {typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Upload Statement</h2>
      </div>

      {/* Upload Section */}
      <div className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pdf-input"
          disabled={isLoading || !user}
        />
        <label
          htmlFor="pdf-input"
          className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-lg transition-all cursor-pointer ${
            file
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-gray-600 hover:border-emerald-500 bg-gray-800/50 hover:bg-gray-700/50"
          } ${isLoading || !user ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="text-center">
            <Upload
              className={`w-12 h-12 mx-auto mb-3 ${
                file ? "text-emerald-500" : "text-gray-500"
              }`}
            />
            <p className="text-sm text-gray-300 font-medium">
              {file ? file.name : "Click to select PDF file"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {file
                ? `${(file.size / 1024).toFixed(2)} KB`
                : "PDF only • Max 10MB"}
            </p>
          </div>
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || isLoading || !user}
          className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>Upload & Extract</span>
            </>
          )}
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
              <div className="absolute inset-0 blur-xl bg-emerald-500/30 animate-pulse"></div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                Extracting Data
              </h3>
              <p className="text-sm text-gray-400">
                Analyzing your PDF and extracting information...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !isLoading && (
        <div className="space-y-4">
          {/* Export Button */}
          <div className="flex justify-end">
            <button
              onClick={handleExportToExcel}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Export to Excel</span>
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
            <div className="bg-emerald-600/20 px-6 py-4 border-b border-gray-700">
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Extracted Information</span>
              </h3>
            </div>
            <div className="p-6">{renderTableData(result.extractedData)}</div>
          </div>

          {result.pdfUrl && (
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="font-semibold mb-3 text-white text-sm">
                Uploaded PDF URL
              </h3>
              <a
                href={result.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline break-all text-sm"
              >
                {result.pdfUrl}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Not logged in warning */}
      {!user && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-semibold text-sm">
              Authentication Required
            </p>
            <p className="text-red-300/80 text-xs mt-1">
              Please sign in to upload PDF files
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
