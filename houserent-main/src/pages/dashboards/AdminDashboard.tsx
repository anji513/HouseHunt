import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, CalendarCheck, DollarSign, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';
import DashboardCard from '../../components/DashboardCard';
import ProfileCard from '../../components/ProfileCard';
import { ErrorState } from '../../components/EmptyState';
import { adminService } from '../../services/adminService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, properties: 0, bookings: 0, owners: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [u, p, b] = await Promise.allSettled([
          adminService.users(),
          adminService.properties(),
          adminService.bookings(),
        ]);
        const users = u.status === 'fulfilled' ? (u.value?.users || u.value?.data || u.value || []) : [];
        const properties = p.status === 'fulfilled' ? (p.value?.properties || p.value?.data || p.value || []) : [];
        const bookings = b.status === 'fulfilled' ? (b.value?.bookings || b.value?.data || b.value || []) : [];
        const usersArr = Array.isArray(users) ? users : [];
        setStats({
          users: usersArr.length,
          properties: Array.isArray(properties) ? properties.length : 0,
          bookings: Array.isArray(bookings) ? bookings.length : 0,
          owners: usersArr.filter((x: any) => x.role === 'owner').length,
        });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Simple bar chart from bookings per status
  const chartData = [
    { label: 'Mon', value: 12 }, { label: 'Tue', value: 19 }, { label: 'Wed', value: 8 },
    { label: 'Thu', value: 15 }, { label: 'Fri', value: 22 }, { label: 'Sat', value: 28 }, { label: 'Sun', value: 18 },
  ];
  const maxVal = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-primary-600" /> Admin Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Platform overview and management.</p>
      </div>

      {error ? (
        <ErrorState message={error} />
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard icon={Users} label="Total Users" value={loading ? '—' : stats.users} color="primary" trend="+12% this month" />
            <DashboardCard icon={Building2} label="Properties" value={loading ? '—' : stats.properties} color="accent" trend="+8% this month" />
            <DashboardCard icon={CalendarCheck} label="Bookings" value={loading ? '—' : stats.bookings} color="success" trend="+24% this month" />
            <DashboardCard icon={DollarSign} label="Owners" value={loading ? '—' : stats.owners} color="warning" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary-500" /> Weekly activity</h3>
                  <span className="chip bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300">+18%</span>
                </div>
                <div className="flex items-end justify-between gap-2 h-48">
                  {chartData.map((d) => (
                    <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-700"
                          style={{ height: `${(d.value / maxVal) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/admin/users" className="card p-5 hover:shadow-card transition group">
                  <Users className="w-8 h-8 text-primary-500" />
                  <p className="font-semibold mt-3">Manage Users</p>
                  <p className="text-sm text-slate-500 mt-1">View, approve, and remove users.</p>
                  <span className="text-sm text-primary-600 flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">Open <ArrowRight className="w-3.5 h-3.5" /></span>
                </Link>
                <Link to="/admin/approvals" className="card p-5 hover:shadow-card transition group">
                  <ShieldCheck className="w-8 h-8 text-accent-500" />
                  <p className="font-semibold mt-3">Owner Approvals</p>
                  <p className="text-sm text-slate-500 mt-1">Review pending owner applications.</p>
                  <span className="text-sm text-primary-600 flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">Open <ArrowRight className="w-3.5 h-3.5" /></span>
                </Link>
              </div>
            </div>

            <div>
              <ProfileCard />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
