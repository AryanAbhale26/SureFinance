import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

export default function PDFUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const { user } = useUser(); // get Clerk user

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Select a PDF first!");
    if (!user) return alert("You must be signed in to upload");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("clerkUserId", user.id); // send Clerk user ID

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.pdfRecord);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div className="flex flex-col space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="border border-gray-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Upload & Extract
      </button>

      {result && (
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded text-white">
            <h3 className="font-semibold mb-2">Extracted JSON</h3>
            <pre className="overflow-x-auto text-sm">
              {JSON.stringify(result.extractedData, null, 2)}
            </pre>
          </div>

          {result.pdfUrl && (
            <div className="bg-gray-800 p-4 rounded text-white">
              <h3 className="font-semibold mb-2">Uploaded PDF URL</h3>
              <a
                href={result.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline"
              >
                {result.pdfUrl}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
