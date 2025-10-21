import PDFUploader from "../components/handlePdf/PdfUploader";

export default function Upload() {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-gradient-x">
      <h1 className="text-3xl font-bold text-white mb-6">Upload PDF</h1>
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
        <PDFUploader />
      </div>
    </div>
  );
}
