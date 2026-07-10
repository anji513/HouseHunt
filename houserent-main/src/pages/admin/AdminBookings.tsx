import { useEffect, useState } from 'react';
import { CalendarCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { adminService } from '../../services/adminService';
import Loader from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.bookings();
      const list = res?.bookings || res?.data || res || [];
      setBookings(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><CalendarCheck className="w-6 h-6 text-primary-600" /> All Bookings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Every booking across the platform.</p>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <Loader full />
      ) : bookings.length === 0 ? (
        <EmptyState icon={CalendarCheck} title="No bookings yet" />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-left text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Renter</th>
                  <th className="px-4 py-3 font-medium">Dates</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    <td className="px-4 py-3 font-medium">{b.property?.title || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{b.renter?.name || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{fmtDate(b.startDate)} — {fmtDate(b.endDate)}</td>
                    <td className="px-4 py-3">
                      <span className={`chip ${b.status === 'approved' ? 'bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300' : b.status === 'rejected' ? 'bg-error-50 text-error-700 dark:bg-error-950/40 dark:text-error-300' : 'bg-warning-50 text-warning-700 dark:bg-warning-950/40 dark:text-warning-300'}`}>
                        {b.status === 'approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : b.status === 'rejected' ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {b.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
