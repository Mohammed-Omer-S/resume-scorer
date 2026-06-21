import { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ScanSearch, RotateCcw } from "lucide-react";
import UploadZone from "./components/UploadZone";
import JobDescriptionInput from "./components/JobDescriptionInput";
import LoadingState from "./components/LoadingState";
import ResultsDashboard from "./components/ResultsDashboard";
import Toast from "./components/Toast";

export default function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, code) => {
    setToast({ message, code });
    setTimeout(() => setToast(null), 6000);
  };

  const handleAnalyze = async () => {
    if (!file || jobDescription.trim().length < 20) {
      showToast(
        "Please upload a resume and paste a complete job description.",
        "VALIDATION"
      );
      return;
    }

    setResult(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/analyze`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(data);
    } catch (err) {
      const errData = err.response?.data;
      showToast(
        errData?.error || "Something went wrong. Please try again.",
        errData?.code
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription("");
    setResult(null);
    setToast(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-slate-50">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Resume Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Resume <span className="text-brand-600">Parser & Scorer</span>
          </h1>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Upload your resume and a job description to get an instant
            AI-driven match score with actionable feedback.
          </p>
        </motion.div>

        {/* Hide inputs once results are shown, to keep focus on the dashboard */}
        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <UploadZone file={file} setFile={setFile} />
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
            />
          </div>
        )}

        {!result && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-brand-600 to-indigo-500 text-white font-medium shadow-lg shadow-brand-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <ScanSearch className="w-5 h-5" />
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading && <LoadingState key="loading" />}
        </AnimatePresence>

        <AnimatePresence>
          {result && !loading && (
            <>
              <ResultsDashboard result={result} />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mt-8"
              >
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-medium shadow-sm hover:shadow-md hover:border-brand-300 hover:text-brand-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Analyze Another Resume
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}