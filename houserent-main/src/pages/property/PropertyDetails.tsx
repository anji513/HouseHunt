import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Bed, Bath, Maximize, MapPin, Calendar, Phone, Mail, ArrowLeft,
  CheckCircle2, Sofa, Wifi, Car, Dumbbell, Snowflake, Waves, ShieldCheck, X,
} from 'lucide-react';
import { propertyService } from '../../services/propertyService';
import { bookingService } from '../../services/bookingService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Skeleton } from '../../components/Loader';
import Modal from '../../components/Modal';
import { ErrorState } from '../../components/EmptyState';
import { Property } from '../../components/PropertyCard';

const placeholder = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200';

const amenityIcon: Record<string, typeof Sofa> = {
  'wifi': Wifi, 'parking': Car, 'gym': Dumbbell, 'ac': Snowflake, 'pool': Waves, 'furnished': Sofa,
};

const fmtMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [booking, setBooking] = useState({ startDate: '', endDate: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await propertyService.get(id!);
      setProperty(res?.property || res?.data || res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { navigate('/login', { state: { from: `/properties/${id}` } }); return; }
    setSubmitting(true);
    try {
      await bookingService.create({ property: id!, startDate: booking.startDate, endDate: booking.endDate, message: booking.message });
      toast('Booking request sent to owner!', 'success');
      setBookingOpen(false);
      setBooking({ startDate: '', endDate: '', message: '' });
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="section py-10 space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full rounded-3xl" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4"><Skeleton className="h-6 w-3/4" /><Skeleton className="h-24 w-full" /></div>
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error || !property) return <div className="section py-20"><ErrorState message={error || 'Property not found'} onRetry={load} /></div>;

  const images = property.images?.length ? property.images : [placeholder];
  const isOwner = user?._id === property.owner?.email;

  return (
    <div className="section py-10">
      <Link to="/properties" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 transition mb-5">
        <ArrowLeft className="w-4 h-4" /> Back to properties
      </Link>

      {/* Gallery */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-3 mb-8">
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden">
          <img src={images[activeImg] || placeholder} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="chip bg-white/90 text-slate-800 capitalize backdrop-blur">{property.type}</span>
            {property.available === false && <span className="chip bg-error-500/90 text-white">Rented</span>}
          </div>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
          {images.slice(0, 3).map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)} className={`relative h-24 lg:h-32 rounded-2xl overflow-hidden border-2 transition ${activeImg === i ? 'border-primary-500' : 'border-transparent'}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mt-2">
              <MapPin className="w-4 h-4" /> {property.address}, {property.city}
            </p>
          </div>

          <div className="card p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
              { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
              { icon: Maximize, label: 'Area', value: `${property.area} ft²` },
              { icon: Calendar, label: 'Available', value: property.available === false ? 'Rented' : 'Now' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-1.5">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 grid place-items-center text-primary-600">
                  <s.icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="font-semibold">{s.value}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              This beautiful {property.type} located in {property.city} offers {property.bedrooms} bedrooms and {property.bathrooms} bathrooms across {property.area} sq ft. {property.address} is a prime location with excellent connectivity. Perfect for families and professionals looking for a premium living experience.
            </p>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((a) => {
                  const Icon = amenityIcon[a.toLowerCase()] || CheckCircle2;
                  return (
                    <div key={a} className="flex items-center gap-2.5 text-sm">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 grid place-items-center text-primary-600">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="capitalize">{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-6 sticky top-20">
            <p className="text-3xl font-bold font-display text-primary-600">{fmtMoney(property.rent)}<span className="text-sm font-medium text-slate-500">/month</span></p>
            <div className="mt-4 space-y-3">
              <button onClick={() => setBookingOpen(true)} disabled={isOwner} className="btn-primary w-full !py-3">
                <Calendar className="w-4 h-4" /> {isOwner ? 'Your listing' : 'Book now'}
              </button>
              <Link to="/properties" className="btn-outline w-full !py-3">Contact owner</Link>
            </div>

            {property.owner && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Listed by</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white font-bold">
                    {property.owner.name?.[0]?.toUpperCase() || 'O'}
                  </div>
                  <div>
                    <p className="font-semibold flex items-center gap-1">{property.owner.name} <ShieldCheck className="w-3.5 h-3.5 text-success-500" /></p>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><Mail className="w-3 h-3" /> {property.owner.email}</p>
                    {property.owner.phone && <p className="text-xs text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" /> {property.owner.phone}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={bookingOpen} onClose={() => setBookingOpen(false)} title="Book this property">
        <form onSubmit={submitBooking} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Start date</label>
              <input type="date" required value={booking.startDate} onChange={(e) => setBooking({ ...booking, startDate: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">End date</label>
              <input type="date" required value={booking.endDate} onChange={(e) => setBooking({ ...booking, endDate: e.target.value })} className="input" />
            </div>
          </div>
          <div>
            <label className="label">Message to owner (optional)</label>
            <textarea rows={3} value={booking.message} onChange={(e) => setBooking({ ...booking, message: e.target.value })} className="input resize-none" placeholder="Introduce yourself..." />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={submitting} className="btn-primary flex-1">{submitting ? 'Sending…' : 'Send request'}</button>
            <button type="button" onClick={() => setBookingOpen(false)} className="btn-outline"><X className="w-4 h-4" /></button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
