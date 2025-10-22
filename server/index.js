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
