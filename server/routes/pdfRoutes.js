import express from "express";
import multer from "multer";
import { uploadPdf, getUserHistory } from "../controller/pdfController.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("pdf"), uploadPdf);
router.get("/history/:clerkUserId", getUserHistory);

export default router;
