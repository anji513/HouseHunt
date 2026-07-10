import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';
interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const config: Record<ToastType, { icon: typeof Info; classes: string }> = {
  success: { icon: CheckCircle2, classes: 'bg-success-50 text-success-700 border-success-200 dark:bg-success-950/40 dark:text-success-300 dark:border-success-900' },
  error: { icon: XCircle, classes: 'bg-error-50 text-error-700 border-error-200 dark:bg-error-950/40 dark:text-error-300 dark:border-error-900' },
  warning: { icon: AlertTriangle, classes: 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-950/40 dark:text-warning-300 dark:border-warning-900' },
  info: { icon: Info, classes: 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-950/40 dark:text-primary-300 dark:border-primary-900' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, type, message }]);
      setTimeout(() => remove(id), 4000);
    },
    [remove]
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm">
        {toasts.map((t) => {
          const { icon: Icon, classes } = config[t.type];
          return (
            <div
              key={t.id}
              className={`glass-strong rounded-2xl border px-4 py-3 shadow-card flex items-start gap-3 animate-scale-in ${classes}`}
            >
              <Icon className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm font-medium flex-1">{t.message}</p>
              <button onClick={() => remove(t.id)} className="opacity-60 hover:opacity-100 transition">
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
