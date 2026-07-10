import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, History, Search, ArrowRight, Sparkles } from 'lucide-react';
import DashboardCard from '../../components/DashboardCard';
import ProfileCard from '../../components/ProfileCard';
import PropertyCard, { Property } from '../../components/PropertyCard';
import { CardSkeleton } from '../../components/Loader';
import { EmptyState } from '../../components/EmptyState';
import { propertyService } from '../../services/propertyService';
import { bookingService } from '../../services/bookingService';

export default function RenterDashboard() {
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const pRes = await propertyService.list({ limit: 4 });
        const list = pRes?.properties || pRes?.data || pRes || [];
        setRecommended(Array.isArray(list) ? list : []);
        const bRes = await bookingService.userBookings();
        const bl = bRes?.bookings || bRes?.data || bRes || [];
        setBookings(Array.isArray(bl) ? bl : []);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Renter Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Discover your next home.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={Search} label="Recent Searches" value="—" color="primary" />
        <DashboardCard icon={Heart} label="Saved Properties" value="0" color="error" />
        <DashboardCard icon={History} label="Total Bookings" value={loading ? '—' : bookings.length} color="accent" />
        <DashboardCard icon={Sparkles} label="Recommended" value={loading ? '—' : recommended.length} color="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent-500" /> Recommended for you</h3>
              <Link to="/properties" className="text-sm text-primary-600 flex items-center gap-1 hover:gap-2 transition-all">Browse all <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-5">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>
            ) : recommended.length === 0 ? (
              <EmptyState icon={Home} title="No recommendations yet" description="Browse properties to get personalized recommendations." action={<Link to="/properties" className="btn-primary">Browse properties</Link>} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {recommended.map((p) => <PropertyCard key={p._id} property={p} />)}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2"><History className="w-5 h-5 text-primary-500" /> Recent bookings</h3>
              <Link to="/renter/history" className="text-sm text-primary-600 flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
            {bookings.length === 0 ? (
              <EmptyState icon={History} title="No bookings yet" description="Your booking history will appear here." action={<Link to="/properties" className="btn-primary">Find a home</Link>} />
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 3).map((b) => (
                  <Link key={b._id} to={`/properties/${b.property?._id}`} className="card p-4 flex items-center gap-3 hover:shadow-card transition">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 grid place-items-center text-primary-600"><Home className="w-5 h-5" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{b.property?.title || 'Property'}</p>
                      <p className="text-xs text-slate-500">{new Date(b.startDate).toLocaleDateString()} — {new Date(b.endDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`chip ${b.status === 'approved' ? 'bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300' : b.status === 'rejected' ? 'bg-error-50 text-error-700 dark:bg-error-950/40 dark:text-error-300' : 'bg-warning-50 text-warning-700 dark:bg-warning-950/40 dark:text-warning-300'}`}>{b.status || 'pending'}</span>
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
