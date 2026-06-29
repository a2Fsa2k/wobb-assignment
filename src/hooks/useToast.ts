import { useState, useCallback } from "react";

interface Toast {
  id: number;
  message: string;
  visible: boolean;
}

let nextId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, visible: true }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 2000);
  }, []);

  return { toasts, showToast };
}
