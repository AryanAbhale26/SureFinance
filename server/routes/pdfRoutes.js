import express from "express";
import multer from "multer";
import { uploadPdf } from "../controller/pdfController.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("pdf"), uploadPdf);

export default router;
