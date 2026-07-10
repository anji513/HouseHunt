import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export default function DashboardCard({
  icon: Icon,
  label,
  value,
  trend,
  color = 'primary',
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
}) {
  const colors: Record<string, string> = {
    primary: 'from-primary-500 to-primary-700',
    accent: 'from-accent-500 to-accent-700',
    success: 'from-success-500 to-success-700',
    warning: 'from-warning-500 to-warning-700',
    error: 'from-error-500 to-error-700',
  };
  return (
    <div className="card p-5 hover:shadow-card transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-bold font-display mt-1">{value}</p>
          {trend && <p className="text-xs text-success-600 mt-1">{trend}</p>}
        </div>
        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${colors[color]} grid place-items-center text-white shadow-soft`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export function StatCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: ReactNode }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 grid place-items-center text-primary-600">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
