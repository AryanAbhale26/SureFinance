import imagekit from "../config/imagekit.js";
import PdfRecord from "../model/PdfRecord.js";
import User from "../model/User.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";

// Gemini client
const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

export const uploadPdf = async (req, res) => {
  try {
    const clerkUserId = req.body.clerkUserId;
    if (!clerkUserId) return res.status(401).json({ error: "Unauthorized" });

    // Ensure user exists
    let user = await User.findOne({ clerkId: clerkUserId });
    if (!user) {
      user = await User.create({ clerkId: clerkUserId });
    }

    if (!req.file) return res.status(400).json({ error: "No PDF uploaded" });

    // Upload to ImageKit
    const uploadResult = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });

    const pdfUrl = uploadResult.url;

    // Fetch PDF bytes for Gemini
    const pdfData = await fetch(pdfUrl).then((r) => r.arrayBuffer());

    const input = [
      {
        inlineData: {
          mimeType: "application/pdf",
          data: Buffer.from(pdfData).toString("base64"),
        },
      },
      {
        text: `
Extract the following fields as JSON only:
{
  "provider": "",
  "card_variant": "",
  "card_last4": "",
  "billing_cycle": "",
  "payment_due_date": "",
  "total_balance": ""
}
        `,
      },
    ];

    const result = await model.generateContent(input);

    let rawText = result.response.text().trim();
    rawText = rawText
      .replace(/^```(json)?\n?/, "")
      .replace(/```$/, "")
      .trim();

    const extractedData = JSON.parse(rawText);

    // Check if all fields are empty
    const hasData = Object.values(extractedData).some((value) => {
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "object" && value !== null)
        return Object.keys(value).length > 0;
      return value != null && value !== "";
    });

    if (!hasData) {
      return res.status(400).json({
        error:
          "No information could be extracted from the PDF. Please check if the document is a valid credit card statement.",
      });
    }

    // Save record in MongoDB
    const pdfRecord = await PdfRecord.create({
      user: user._id,
      pdfUrl,
      extractedData,
    });

    res.json({ pdfRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to process PDF" });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const user = await User.findOne({ clerkId: clerkUserId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const history = await PdfRecord.find({ user: user._id })
      .sort({ uploadedAt: -1 })
      .lean();

    res.json({ history });
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({ error: err.message });
  }
};
