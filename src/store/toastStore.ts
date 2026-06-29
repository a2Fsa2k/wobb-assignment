import { create } from "zustand";

interface Toast {
  id: number;
  message: string;
  visible: boolean;
}

interface ToastState {
  toasts: Toast[];
  show: (message: string) => void;
  dismiss: (id: number) => void;
}

let nextId = 0;

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  show: (message) => {
    const id = nextId++;
    set((s) => ({ toasts: [...s.toasts, { id, message, visible: true }] }));
    setTimeout(() => {
      set((s) => ({
        toasts: s.toasts.map((t) => (t.id === id ? { ...t, visible: false } : t)),
      }));
      setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
      }, 300);
    }, 2000);
  },
  dismiss: (id) => {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  },
}));
