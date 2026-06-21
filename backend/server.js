import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoute from "./routes/analyze.js";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "\n⚠️  GEMINI_API_KEY is missing in .env — requests to /api/analyze will fail.\n" +
    "   Get a free key at https://aistudio.google.com/app/apikey\n"
  );
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRoute);

app.get("/", (req, res) => res.send("Resume Scorer API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));