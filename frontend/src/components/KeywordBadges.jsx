import { CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

function Section({ title, icon, items, badgeClass }) {
  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-semibold text-slate-700">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items?.length ? (
          items.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`text-sm px-3 py-1.5 rounded-full font-medium ${badgeClass}`}
            >
              {item}
            </motion.span>
          ))
        ) : (
          <p className="text-sm text-slate-400">None found</p>
        )}
      </div>
    </div>
  );
}

export function StrengthsSection({ items }) {
  return (
    <Section
      title="Strengths"
      icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      items={items}
      badgeClass="bg-emerald-50 text-emerald-700 border border-emerald-200"
    />
  );
}

export function MissingKeywordsSection({ items }) {
  return (
    <Section
      title="Missing Keywords"
      icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
      items={items}
      badgeClass="bg-amber-50 text-amber-700 border border-amber-200"
    />
  );
}

export function TipsSection({ items }) {
  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-brand-500" />
        <h3 className="font-semibold text-slate-700">Improvement Tips</h3>
      </div>
      <ol className="space-y-3">
        {items?.map((tip, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-3 text-sm text-slate-600"
          >
            <span className="shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span>{tip}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}