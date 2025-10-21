import PDFUploader from "../components/PDFUploader.jsx";

export default function Upload() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
            Upload PDF Statement
          </h1>
          <p className="text-gray-400">
            Extract key information from your credit card statements securely
          </p>
        </div>

        <PDFUploader />
      </div>
    </div>
  );
}
