import { motion } from "framer-motion";
import ScoreCard from "./ScoreCard";
import {
  StrengthsSection,
  MissingKeywordsSection,
  TipsSection,
} from "./KeywordBadges";

export default function ResultsDashboard({ result }) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10"
    >
      <div className="md:col-span-2">
        <ScoreCard score={result.matchScore} />
      </div>
      <StrengthsSection items={result.strengths} />
      <MissingKeywordsSection items={result.missingKeywords} />
      <div className="md:col-span-2">
        <TipsSection items={result.improvementTips} />
      </div>
    </motion.div>
  );
}