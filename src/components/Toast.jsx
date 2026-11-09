import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-400 shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-stone-900 border-emerald-500/50 text-white',
    error: 'bg-stone-900 border-rose-500/50 text-white',
    info: 'bg-stone-900 border-amber-500/50 text-white',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`p-4 rounded-xl shadow-2xl border flex items-center gap-3 ${
          bgStyles[toast.type] || bgStyles.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <div className="text-xs font-medium leading-snug flex-1">{toast.message}</div>
      </div>
    </div>
  );
}

