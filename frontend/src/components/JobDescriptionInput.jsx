import { ClipboardList } from "lucide-react";

export default function JobDescriptionInput({ value, onChange }) {
  return (
    <div className="flex flex-col h-full">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
        <ClipboardList className="w-4 h-4 text-brand-600" />
        Job Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the full job description here..."
        className="w-full h-48 sm:h-56 resize-none rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
      />
    </div>
  );
}