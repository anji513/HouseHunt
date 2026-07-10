import { useAuth } from '../context/AuthContext';
import { Mail, Phone, User as UserIcon, ShieldCheck } from 'lucide-react';

export default function ProfileCard() {
  const { user } = useAuth();
  if (!user) return null;

  const initials = user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="card p-6 flex flex-col items-center text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white text-xl font-bold font-display shadow-soft">
        {initials}
      </div>
      <h3 className="text-lg font-semibold mt-3 flex items-center gap-1.5">
        {user.name}
        {user.role === 'owner' && user.isApproved && <ShieldCheck className="w-4 h-4 text-success-500" />}
      </h3>
      <span className="chip bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300 capitalize mt-1">
        {user.role}
      </span>
      <div className="w-full mt-4 space-y-2 text-sm text-left">
        <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Mail className="w-4 h-4 text-slate-400" /> {user.email}
        </p>
        {user.phone && (
          <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Phone className="w-4 h-4 text-slate-400" /> {user.phone}
          </p>
        )}
        <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <UserIcon className="w-4 h-4 text-slate-400" /> ID: {user._id.slice(-6)}
        </p>
      </div>
    </div>
  );
}
