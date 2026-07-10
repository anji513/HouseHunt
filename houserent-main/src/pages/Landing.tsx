import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, ShieldCheck, Zap, Headphones, ArrowRight, Star, Building2, Home as HomeIcon,
  MapPin, TrendingUp, Quote, CheckCircle2,
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyCard, { Property } from '../components/PropertyCard';
import { CardSkeleton } from '../components/Loader';
import { propertyService } from '../services/propertyService';

const heroImg = 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400';

const categories = [
  { name: 'Apartments', icon: Building2, count: '1.2k+', img: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Houses', icon: HomeIcon, count: '860+', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Villas', icon: HomeIcon, count: '320+', img: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Studios', icon: Building2, count: '540+', img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const locations = [
  { name: 'New York', count: '2,340 listings', img: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'San Francisco', count: '1,120 listings', img: 'https://images.pexels.com/photos/2086361/pexels-photo-2086361.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Chicago', count: '980 listings', img: 'https://images.pexels.com/photos/3785706/pexels-photo-3785706.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Miami', count: '760 listings', img: 'https://images.pexels.com/photos/3785706/pexels-photo-3785706.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const features = [
  { icon: ShieldCheck, title: 'Verified Listings', desc: 'Every property is verified by our team to ensure authenticity and safety.' },
  { icon: Zap, title: 'Instant Booking', desc: 'Book your favorite home in seconds with our seamless booking flow.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Our dedicated support team is always here to help you, anytime.' },
  { icon: TrendingUp, title: 'Best Prices', desc: 'Get the most competitive rental prices in the market, guaranteed.' },
];

const steps = [
  { num: '01', title: 'Search & Discover', desc: 'Browse thousands of verified rental properties with smart filters.' },
  { num: '02', title: 'Book a Viewing', desc: 'Schedule a visit or book directly with the owner in one click.' },
  { num: '03', title: 'Move In', desc: 'Sign your agreement and move into your new home seamlessly.' },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Renter', text: 'HouseHunt made finding my dream apartment effortless. The interface is beautiful and the booking process was instant!', rating: 5, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Michael Chen', role: 'Owner', text: 'As a property owner, I manage all my listings and bookings in one place. The dashboard is incredibly intuitive.', rating: 5, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Emily Davis', role: 'Renter', text: 'The verified listings gave me peace of mind. I found a perfect home within a week of joining HouseHunt.', rating: 5, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export default function Landing() {
  const [featured, setFeatured] = useState<Property[]>([]);
  const [latest, setLatest] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await propertyService.list({ limit: 8 });
        const list = res?.properties || res?.data || res || [];
        const arr: Property[] = Array.isArray(list) ? list : [];
        setFeatured(arr.slice(0, 4));
        setLatest(arr.slice(4, 8).length ? arr.slice(4, 8) : arr.slice(0, 4));
      } catch {
        setFeatured([]);
        setLatest([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-primary-900/70 to-slate-900/80" />
        </div>
        <div className="relative section py-20 sm:py-28 text-center text-white">
          <span className="chip bg-white/15 backdrop-blur text-white border border-white/20 animate-fade-in">
            <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" /> Trusted by 50,000+ users
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight text-balance animate-slide-up">
            Find the home you'll love,<br /> without the hassle.
          </h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto animate-fade-in">
            Discover, book, and manage premium rental properties — all in one beautiful platform built for renters and owners alike.
          </p>
          <div className="mt-8 flex justify-center animate-fade-in">
            <SearchBar />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success-400" /> No broker fees</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success-400" /> Verified listings</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success-400" /> Instant booking</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Browse by category</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Find the type of home that fits your lifestyle.</p>
          </div>
          <Link to="/properties" className="hidden sm:flex items-center gap-1 text-primary-600 font-medium hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link key={c.name} to={`/search?type=${c.name.toLowerCase().slice(0, -1)}`} className="card group overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-32 overflow-hidden">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <c.icon className="w-5 h-5 mb-1" />
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs opacity-80">{c.count} listings</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="section py-16 bg-white/50 dark:bg-slate-900/30">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="chip bg-accent-50 text-accent-700 dark:bg-accent-950/40 dark:text-accent-300">Featured</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">Handpicked properties</h2>
          </div>
          <Link to="/properties" className="hidden sm:flex items-center gap-1 text-primary-600 font-medium hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : featured.length
            ? featured.map((p) => <PropertyCard key={p._id} property={p} />)
            : <p className="text-slate-500 col-span-4 text-center py-10">No featured properties yet. Check back soon!</p>}
        </div>
      </section>

      {/* Popular Locations */}
      <section className="section py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Popular locations</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((l) => (
            <Link key={l.name} to={`/search?city=${encodeURIComponent(l.name)}`} className="card group overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-40 overflow-hidden">
                <img src={l.img} alt={l.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-semibold flex items-center gap-1"><MapPin className="w-4 h-4" /> {l.name}</p>
                  <p className="text-xs opacity-80">{l.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="section py-16 bg-white/50 dark:bg-slate-900/30">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="chip bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300">Why HouseHunt</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">Built for a better renting experience</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Everything you need to find, book, and manage rental homes — in one premium platform.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white shadow-soft">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mt-4">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="section py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="chip bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300">Just listed</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">Latest properties</h2>
          </div>
          <Link to="/properties" className="hidden sm:flex items-center gap-1 text-primary-600 font-medium hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : latest.length
            ? latest.map((p) => <PropertyCard key={p._id} property={p} />)
            : <p className="text-slate-500 col-span-4 text-center py-10">No new properties yet.</p>}
        </div>
      </section>

      {/* How it works */}
      <section className="section py-16 bg-white/50 dark:bg-slate-900/30">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="chip bg-accent-50 text-accent-700 dark:bg-accent-950/40 dark:text-accent-300">How it works</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">Rent your next home in 3 simple steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="card p-8 relative overflow-hidden">
              <span className="text-6xl font-bold font-display text-primary-100 dark:text-primary-900/40 absolute -top-2 -right-2">{s.num}</span>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-primary-600 text-white grid place-items-center font-bold">{i + 1}</div>
                <h3 className="font-semibold text-lg mt-4">{s.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="chip bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300">Testimonials</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">Loved by renters and owners</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6 hover:shadow-card transition-all duration-300">
              <Quote className="w-8 h-8 text-primary-200 dark:text-primary-800" />
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section py-16">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-10 sm:p-16 text-center text-white">
          <div className="absolute inset-0 bg-hero-grid bg-[size:24px_24px] opacity-20" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold font-display">Ready to find your next home?</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">Join HouseHunt today and discover thousands of premium rental properties.</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link to="/register" className="btn bg-white text-primary-700 hover:bg-white/90 !py-3 !px-6 font-semibold"><Search className="w-4 h-4" /> Get started free</Link>
              <Link to="/properties" className="btn bg-white/15 backdrop-blur text-white border border-white/20 hover:bg-white/25 !py-3 !px-6">Browse properties</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
