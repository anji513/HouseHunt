import { useEffect, useState } from 'react';
import { CalendarCheck, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const statusBadge: Record<string, string> = {
  pending: 'bg-warning-50 text-warning-700 dark:bg-warning-950/40 dark:text-warning-300',
  approved: 'bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300',
  rejected: 'bg-error-50 text-error-700 dark:bg-error-950/40 dark:text-error-300',
};

export default function OwnerBookings() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookingService.ownerBookings();
      const list = res?.bookings || res?.data || res || [];
      setBookings(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const update = async (id: string, status: string) => {
    try {
      await bookingService.updateStatus(id, status);
      toast(`Booking ${status}`, 'success');
      setBookings((b) => b.map((x) => x._id === id ? { ...x, status } : x));
    } catch (e: any) {
      toast(e.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><CalendarCheck className="w-6 h-6 text-primary-600" /> Booking Requests</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Approve or reject booking requests from renters.</p>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <Loader full />
      ) : bookings.length === 0 ? (
        <EmptyState icon={CalendarCheck} title="No booking requests yet" description="When renters request your properties, they'll appear here." />
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="card p-5 hover:shadow-card transition-all duration-300 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{b.property?.title || 'Property'}</h3>
                    <span className={`chip ${statusBadge[b.status] || statusBadge.pending}`}>
                      {b.status === 'approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : b.status === 'rejected' ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {b.status || 'pending'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Renter: <span className="font-medium text-slate-700 dark:text-slate-200">{b.renter?.name || 'Unknown'}</span> · {b.renter?.email}</p>
                  <p className="text-sm text-slate-500">{fmtDate(b.startDate)} — {fmtDate(b.endDate)}</p>
                  {b.message && <p className="text-sm text-slate-500 italic">"{b.message}"</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {b.property?._id && <Link to={`/properties/${b.property._id}`} className="btn-outline !py-2 !px-3"><Eye className="w-3.5 h-3.5" /></Link>}
                  {b.status === 'pending' && (
                    <>
                      <button onClick={() => update(b._id, 'approved')} className="btn-primary !py-2 !px-3"><CheckCircle2 className="w-3.5 h-3.5" /> Approve</button>
                      <button onClick={() => update(b._id, 'rejected')} className="btn-danger !py-2 !px-3"><XCircle className="w-3.5 h-3.5" /></button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
