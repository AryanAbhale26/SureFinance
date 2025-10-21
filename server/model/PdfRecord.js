import mongoose from "mongoose";

const pdfRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pdfUrl: { type: String, required: true },
  extractedData: {
    provider: String,
    card_variant: String,
    card_last4: String,
    billing_cycle: String,
    payment_due_date: String,
    total_balance: String,
  },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("PdfRecord", pdfRecordSchema);
