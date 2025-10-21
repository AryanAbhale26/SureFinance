// import fs from "fs";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyCbaUYHz-HZZABTBCMkmosW9EPuXDbSPY8";
// const client = new GoogleGenerativeAI(API_KEY);
// const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

// async function extractFromPDF(pdfPath) {
//   const fileData = fs.readFileSync(pdfPath);

//   const input = [
//     {
//       inlineData: {
//         mimeType: "application/pdf",
//         data: fileData.toString("base64"),
//       },
//     },
//     {
//       text: `
// Extract the following fields as JSON only (do not add extra text):
// {
//   "provider": "",
//   "card_variant": "",
//   "card_last4": "",
//   "billing_cycle": "",
//   "payment_due_date": "",
//   "total_balance": ""
// }
//       `,
//     },
//   ];

//   const result = await model.generateContent(input);
//   let rawText = result.response.text().trim();

//   // Remove markdown-style ```json``` or ``` wrapper
//   rawText = rawText
//     .replace(/^```(json)?\n?/, "")
//     .replace(/```$/, "")
//     .trim();

//   let jsonOutput;
//   try {
//     jsonOutput = JSON.parse(rawText);
//   } catch (err) {
//     console.error("❌ Failed to parse Gemini response as JSON.");
//     console.log("Raw output after cleanup:", rawText);
//     return;
//   }

//   console.log(`📄 JSON Results for ${pdfPath}:`);
//   console.log(JSON.stringify(jsonOutput, null, 2));
// }

// // Call your PDF file
// extractFromPDF("d3.pdf");
// const API_KEY = "AIzaSyCbaUYHz-HZZABTBCMkmosW9EPuXDbSPY8";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/config.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api", pdfRoutes);

app.listen(PORT, () => {
  console.log(` Sure Finance Server running on port ${PORT}`);
});
