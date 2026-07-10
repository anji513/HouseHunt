import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { History, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';
import { bookingService } from '../../services/bookingService';
import Loader from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const statusCfg: Record<string, { icon: typeof Clock; classes: string }> = {
  pending: { icon: Clock, classes: 'bg-warning-50 text-warning-700 dark:bg-warning-950/40 dark:text-warning-300' },
  approved: { icon: CheckCircle2, classes: 'bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300' },
  rejected: { icon: XCircle, classes: 'bg-error-50 text-error-700 dark:bg-error-950/40 dark:text-error-300' },
};

export default function BookingHistory() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookingService.userBookings();
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
        <h1 className="text-2xl font-bold flex items-center gap-2"><History className="w-6 h-6 text-primary-600" /> Booking History</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track all your past and current booking requests.</p>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <Loader full />
      ) : bookings.length === 0 ? (
        <EmptyState icon={History} title="No bookings yet" description="Browse properties and book your next home!" action={<Link to="/properties" className="btn-primary">Browse properties</Link>} />
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
            const { icon: Icon, classes } = statusCfg[b.status] || statusCfg.pending;
            return (
              <div key={b._id} className="card p-5 hover:shadow-card transition-all duration-300 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={b.property?.images?.[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=300'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{b.property?.title || 'Property'}</h3>
                      <span className={`chip ${classes}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {b.status || 'pending'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{b.property?.city}</p>
                    <p className="text-sm text-slate-500">{fmtDate(b.startDate)} — {fmtDate(b.endDate)}</p>
                  </div>
                  {b.property?._id && (
                    <Link to={`/properties/${b.property._id}`} className="btn-outline !py-2">
                      <Eye className="w-3.5 h-3.5" /> View
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
