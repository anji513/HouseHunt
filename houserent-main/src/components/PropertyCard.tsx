import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin, Heart, Eye } from 'lucide-react';
import { useState } from 'react';

export interface Property {
  _id: string;
  title: string;
  rent: number;
  address: string;
  city: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities?: string[];
  images?: string[];
  owner?: { name: string; email: string; phone?: string };
  available?: boolean;
  createdAt?: string;
}

const fmtMoney = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const placeholder = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=900';

export default function PropertyCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);
  const img = property.images?.[0] || placeholder;

  return (
    <article className="card group overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-in">
      <div className="relative h-52 overflow-hidden">
        <img
          src={img}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="chip bg-white/90 text-slate-800 backdrop-blur capitalize">
            {property.type}
          </span>
          {property.available === false && (
            <span className="chip bg-error-500/90 text-white">Rented</span>
          )}
        </div>
        <button
          onClick={() => setSaved((s) => !s)}
          className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-white/90 backdrop-blur hover:scale-110 transition"
          aria-label="Save property"
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-error-500 text-error-500' : 'text-slate-700'}`} />
        </button>
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-lg font-bold font-display drop-shadow">{fmtMoney(property.rent)}<span className="text-xs font-medium opacity-90">/mo</span></p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{property.title}</h3>
          <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{property.address}, {property.city}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-primary-500" /> {property.bedrooms} Beds</span>
          <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-primary-500" /> {property.bathrooms} Baths</span>
          <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-primary-500" /> {property.area} ft²</span>
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((a) => (
              <span key={a} className="chip bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{a}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {property.owner?.name ? `By ${property.owner.name}` : 'Verified listing'}
          </span>
          <Link
            to={`/properties/${property._id}`}
            className="btn-primary !py-2 !px-3 text-xs group/btn"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </Link>
        </div>
      </div>
    </article>
  );
}
