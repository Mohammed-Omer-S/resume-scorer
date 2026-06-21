import express from "express";
import multer from "multer";
import { readFile } from "fs/promises";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt, buildUserPrompt } from "../utils/aiPrompt.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), async (req, res) => {
  const filePath = req.file?.path;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Server is missing a GEMINI_API_KEY. Add one to backend/.env.",
        code: "MISSING_API_KEY",
      });
    }

    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded.", code: "NO_FILE" });
    }
    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        error: "Job description is too short or missing.",
        code: "INVALID_JOB_DESCRIPTION",
      });
    }

    // 1. Extract text from PDF (pdf-parse v2 API)
    const dataBuffer = await readFile(filePath);
    const parser = new PDFParse({ data: dataBuffer });
    const pdfResult = await parser.getText();
    await parser.destroy();

    const resumeText = pdfResult.text.trim();

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({
        error: "Could not extract readable text from PDF. Try a different file.",
        code: "UNREADABLE_PDF",
      });
    }

    // 2. Call Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: buildSystemPrompt(),
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const result = await model.generateContent(
      buildUserPrompt(resumeText, jobDescription)
    );

    const rawText = result.response.text().trim();

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      return res.status(500).json({
        error: "AI returned invalid JSON. Try again.",
        code: "BAD_AI_RESPONSE",
        raw: rawText,
      });
    }

    res.json(parsed);
  } catch (err) {
    console.error(err);

    const status = err?.status || err?.response?.status;
    const message = err?.message || "";

    if (status === 429 || message.includes("RESOURCE_EXHAUSTED") || message.includes("quota")) {
      return res.status(429).json({
        error: "Free-tier rate limit reached. Please wait a minute and try again.",
        code: "RATE_LIMITED",
      });
    }

    if (status === 401 || status === 403 || message.includes("API key")) {
      return res.status(401).json({
        error: "Invalid or unauthorized Gemini API key.",
        code: "INVALID_API_KEY",
      });
    }

    res.status(500).json({
      error: "Server error while analyzing resume.",
      code: "SERVER_ERROR",
    });
  } finally {
    if (filePath) fs.unlink(filePath, () => {});
  }
});

export default router;