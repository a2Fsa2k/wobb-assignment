import { Check, X } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  visible: boolean;
}

interface ToastContainerProps {
  toasts: Toast[];
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg pointer-events-auto transition-all duration-300 ${
            toast.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          <Check className="w-4 h-4 text-green-400 dark:text-green-600" />
          {toast.message}
          <button
            onClick={() => {
              /* auto-dismiss */
            }}
            className="ml-2 p-0.5 rounded hover:bg-white/20"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
