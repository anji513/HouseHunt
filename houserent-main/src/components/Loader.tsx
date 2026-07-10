import { Loader2 } from 'lucide-react';

export default function Loader({ full, label }: { full?: boolean; label?: string }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      {label && <p className="text-sm font-medium">{label}</p>}
    </div>
  );
  if (full) {
    return <div className="min-h-[60vh] grid place-items-center">{content}</div>;
  }
  return content;
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <Skeleton className="h-44 w-full rounded-2xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}
