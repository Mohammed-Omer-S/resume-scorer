import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileCheck2, X } from "lucide-react";

export default function UploadZone({ file, setFile }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped && dropped.type === "application/pdf") setFile(dropped);
    },
    [setFile]
  );

  const handleSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-48 sm:h-56 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300
        ${
          isDragging
            ? "border-brand-500 bg-brand-50 scale-[1.01]"
            : "border-slate-300 bg-white/60 hover:border-brand-400 hover:bg-brand-50/50"
        }`}
      >
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleSelect}
        />

        {!file ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="p-3 mb-3 rounded-full bg-brand-100">
              <UploadCloud className="w-7 h-7 text-brand-600" />
            </div>
            <p className="font-medium text-slate-700">
              Drag & drop your resume here
            </p>
            <p className="text-sm text-slate-400 mt-1">
              or click to browse · PDF only
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="p-3 mb-3 rounded-full bg-emerald-100">
              <FileCheck2 className="w-7 h-7 text-emerald-600" />
            </div>
            <p className="font-medium text-slate-700 truncate max-w-55">
              {file.name}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
              }}
              className="mt-2 flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
            >
              <X className="w-3.5 h-3.5" /> Remove file
            </button>
          </motion.div>
        )}
      </label>
    </div>
  );
}