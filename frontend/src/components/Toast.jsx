import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Clock, KeyRound, X } from "lucide-react";

const ICONS = {
  RATE_LIMITED: Clock,
  INVALID_API_KEY: KeyRound,
  MISSING_API_KEY: KeyRound,
  default: AlertTriangle,
};

const STYLES = {
  RATE_LIMITED: "bg-amber-50 border-amber-200 text-amber-700",
  INVALID_API_KEY: "bg-red-50 border-red-200 text-red-700",
  MISSING_API_KEY: "bg-red-50 border-red-200 text-red-700",
  default: "bg-red-50 border-red-200 text-red-700",
};

export default function Toast({ toast, onClose }) {
  const Icon = ICONS[toast?.code] || ICONS.default;
  const style = STYLES[toast?.code] || STYLES.default;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className={`fixed top-4 right-4 left-4 sm:left-auto sm:max-w-sm z-50 flex items-start gap-3 rounded-2xl border shadow-lg p-4 backdrop-blur-md ${style}`}
        >
          <Icon className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-current opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}