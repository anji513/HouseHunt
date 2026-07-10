import { LucideIcon } from 'lucide-react';

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card p-10 text-center flex flex-col items-center gap-3 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 grid place-items-center text-slate-400">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="card p-10 text-center flex flex-col items-center gap-3 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-error-50 dark:bg-error-950/40 grid place-items-center text-error-500">
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">Something went wrong</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">{message}</p>
      {onRetry && <button onClick={onRetry} className="btn-primary mt-2">Try again</button>}
    </div>
  );
}
