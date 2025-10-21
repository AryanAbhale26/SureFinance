import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import GetStarted from "./components/HomePage/GetStarted";
import PDFUploader from "./components/handlePdf/PdfUploader";

export default function App() {
  return (
    <>
      <SignedOut>
        <GetStarted />
      </SignedOut>

      <SignedIn>
        <PDFUploader />
      </SignedIn>
    </>
  );
}
