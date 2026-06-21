import { motion } from "framer-motion";

export default function ScoreCard({ score }) {
  const getColor = () => {
    if (score >= 80) return "from-emerald-500 to-emerald-400";
    if (score >= 50) return "from-amber-500 to-amber-400";
    return "from-red-500 to-red-400";
  };

  const getLabel = () => {
    if (score >= 80) return "Strong Match";
    if (score >= 50) return "Moderate Match";
    return "Needs Improvement";
  };

  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-700">Match Score</h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full bg-linear-to-r ${getColor()} text-white`}
        >
          {getLabel()}
        </span>
      </div>

      <div className="flex items-end gap-2 mb-3">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl sm:text-5xl font-bold text-slate-800"
        >
          {score}
        </motion.span>
        <span className="text-slate-400 mb-1">/ 100</span>
      </div>

      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-linear-to-r ${getColor()}`}
        />
      </div>
    </div>
  );
}