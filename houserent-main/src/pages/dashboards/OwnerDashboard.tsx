import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, CalendarCheck, Plus, Eye, TrendingUp, DollarSign, Home, ArrowRight,
} from 'lucide-react';
import DashboardCard from '../../components/DashboardCard';
import ProfileCard from '../../components/ProfileCard';
import { CardSkeleton } from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';
import { propertyService } from '../../services/propertyService';
import { bookingService } from '../../services/bookingService';
import { Property } from '../../components/PropertyCard';

const placeholder = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600';
const fmtMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function OwnerDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [pRes, bRes] = await Promise.allSettled([
          propertyService.myProperties(),
          bookingService.ownerBookings(),
        ]);
        if (pRes.status === 'fulfilled') {
          const list = pRes.value?.properties || pRes.value?.data || pRes.value || [];
          setProperties(Array.isArray(list) ? list : []);
        }
        if (bRes.status === 'fulfilled') {
          const list = bRes.value?.bookings || bRes.value?.data || bRes.value || [];
          setBookings(Array.isArray(list) ? list : []);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalRent = properties.reduce((s, p) => s + (p.rent || 0), 0);
  const pendingBookings = bookings.filter((b) => b.status === 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Owner Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Welcome back. Here's your overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={Building2} label="Total Properties" value={loading ? '—' : properties.length} color="primary" />
        <DashboardCard icon={CalendarCheck} label="Booking Requests" value={loading ? '—' : bookings.length} color="accent" />
        <DashboardCard icon={TrendingUp} label="Pending" value={loading ? '—' : pendingBookings.length} color="warning" />
        <DashboardCard icon={DollarSign} label="Total Value" value={loading ? '—' : fmtMoney(totalRent)} color="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick actions */}
          <div className="card p-5">
            <h3 className="font-semibold mb-3">Quick actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link to="/owner/properties/new" className="btn-primary !py-3"><Plus className="w-4 h-4" /> Add Property</Link>
              <Link to="/owner/properties" className="btn-outline !py-3"><Building2 className="w-4 h-4" /> My Listings</Link>
              <Link to="/owner/bookings" className="btn-outline !py-3"><CalendarCheck className="w-4 h-4" /> Bookings</Link>
            </div>
          </div>

          {/* Recent bookings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Recent booking requests</h3>
              <Link to="/owner/bookings" className="text-sm text-primary-600 flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
            {error ? (
              <ErrorState message={error} />
            ) : loading ? (
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}</div>
            ) : bookings.length === 0 ? (
              <EmptyState icon={CalendarCheck} title="No bookings yet" description="Booking requests will appear here." />
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 4).map((b) => (
                  <div key={b._id} className="card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 grid place-items-center text-primary-600"><Home className="w-5 h-5" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{b.property?.title || 'Property'}</p>
                      <p className="text-xs text-slate-500">{b.renter?.name} · {new Date(b.startDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`chip ${b.status === 'approved' ? 'bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300' : b.status === 'rejected' ? 'bg-error-50 text-error-700 dark:bg-error-950/40 dark:text-error-300' : 'bg-warning-50 text-warning-700 dark:bg-warning-950/40 dark:text-warning-300'}`}>{b.status || 'pending'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My properties preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">My properties</h3>
              <Link to="/owner/properties" className="text-sm text-primary-600 flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4">{Array.from({ length: 2 }).map((_, i) => <CardSkeleton key={i} />)}</div>
            ) : properties.length === 0 ? (
              <EmptyState icon={Building2} title="No properties yet" action={<Link to="/owner/properties/new" className="btn-primary"><Plus className="w-4 h-4" /> Add property</Link>} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {properties.slice(0, 4).map((p) => (
                  <Link key={p._id} to={`/properties/${p._id}`} className="card overflow-hidden hover:shadow-card transition group">
                    <div className="relative h-28 overflow-hidden">
                      <img src={p.images?.[0] || placeholder} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2 right-2 chip bg-white/90 text-slate-800">{fmtMoney(p.rent)}</span>
                    </div>
                    <div className="p-3">
                      <p className="font-medium line-clamp-1">{p.title}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><Eye className="w-3 h-3" /> {p.city}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}
