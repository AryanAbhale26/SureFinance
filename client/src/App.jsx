import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import GetStarted from "./components/HomePage/GetStarted";
import PDFUploader from "./components/handlePdf/PdfUploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer />

      <SignedOut>
        <GetStarted />
      </SignedOut>

      <SignedIn>
        <PDFUploader />
      </SignedIn>
    </>
  );
}
