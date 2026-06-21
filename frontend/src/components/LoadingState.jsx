import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        className="p-4 rounded-full bg-linear-to-tr from-brand-500 to-indigo-400 mb-4"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.div>
      <p className="font-medium text-slate-600">Analyzing your resume...</p>
      <p className="text-sm text-slate-400 mt-1">
        Our AI is comparing it against the job description
      </p>

      <div className="w-full max-w-md mt-8 space-y-3">
        {[100, 80, 60].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-slate-200 animate-pulse-slow"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}