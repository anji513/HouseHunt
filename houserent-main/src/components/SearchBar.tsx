import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home } from 'lucide-react';

export default function SearchBar({ variant = 'hero' }: { variant?: 'hero' | 'page' }) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (city) params.set('city', city);
    if (type) params.set('type', type);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className={`glass-strong rounded-3xl shadow-card p-3 sm:p-4 ${variant === 'hero' ? 'max-w-3xl' : 'w-full'}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title or keyword"
            className="input !pl-9"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="input !pl-9"
          />
        </div>
        <div className="relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input !pl-9 appearance-none"
          >
            <option value="">All types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
            <option value="condo">Condo</option>
          </select>
        </div>
        <button type="submit" className="btn-primary h-full">
          <Search className="w-4 h-4" /> Search
        </button>
      </div>
    </form>
  );
}
