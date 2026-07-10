import { NavLink, Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Home, PlusCircle, Building2, CalendarCheck, History,
  Users, ShieldCheck, User as UserIcon, LogOut,
} from 'lucide-react';

interface Item { to: string; label: string; icon: typeof Home; }

const ownerItems: Item[] = [
  { to: '/owner', label: 'Overview', icon: LayoutDashboard },
  { to: '/owner/properties', label: 'My Properties', icon: Building2 },
  { to: '/owner/properties/new', label: 'Add Property', icon: PlusCircle },
  { to: '/owner/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/profile', label: 'Profile', icon: UserIcon },
];

const renterItems: Item[] = [
  { to: '/renter', label: 'Overview', icon: LayoutDashboard },
  { to: '/properties', label: 'Browse', icon: Home },
  { to: '/renter/history', label: 'Booking History', icon: History },
  { to: '/profile', label: 'Profile', icon: UserIcon },
];

const adminItems: Item[] = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/properties', label: 'Properties', icon: Building2 },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/admin/approvals', label: 'Owner Approvals', icon: ShieldCheck },
  { to: '/profile', label: 'Profile', icon: UserIcon },
];

export default function Sidebar({ children }: { children?: ReactNode }) {
  const { user, logout } = useAuth();
  const items = user?.role === 'admin' ? adminItems : user?.role === 'owner' ? ownerItems : renterItems;

  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] gap-6">
      <aside className="hidden lg:block sticky top-20 self-start">
        <div className="card p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400 px-2 mb-2">Menu</p>
          <nav className="flex flex-col gap-1">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.to === '/owner' || it.to === '/renter' || it.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                <it.icon className="w-4 h-4" /> {it.label}
              </NavLink>
            ))}
          </nav>
          <div className="h-px bg-slate-200 dark:bg-slate-800 my-3" />
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <Home className="w-4 h-4" /> Back to site
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-error-600 hover:bg-error-50 dark:hover:bg-error-950/30 transition">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-slate-200/60 dark:border-slate-800">
        <div className="flex justify-around py-2">
          {items.slice(0, 5).map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === '/owner' || it.to === '/renter' || it.to === '/admin'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium ${isActive ? 'text-primary-600' : 'text-slate-500'}`
              }
            >
              <it.icon className="w-5 h-5" />
              {it.label.split(' ')[0]}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="min-h-[60vh] pb-20 lg:pb-0">{children}</div>
    </div>
  );
}
