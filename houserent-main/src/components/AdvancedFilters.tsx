import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

export interface Filters {
  type?: string;
  city?: string;
  minRent?: number;
  maxRent?: number;
  bedrooms?: number;
  bathrooms?: number;
}

export default function AdvancedFilters({
  initial,
  onChange,
}: {
  initial?: Filters;
  onChange: (f: Filters) => void;
}) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<Filters>(initial || {});

  const apply = () => {
    onChange(f);
    setOpen(false);
  };

  const reset = () => {
    setF({});
    onChange({});
    setOpen(false);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="btn-outline w-full sm:w-auto">
        <SlidersHorizontal className="w-4 h-4" /> Filters
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 left-0 sm:left-auto sm:w-80 z-50 mt-2 card p-5 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Advanced Filters</h4>
              <button onClick={() => setOpen(false)} className="opacity-60 hover:opacity-100"><X className="w-4 h-4" /></button>
            </div>
            <Field label="Property Type">
              <select className="input" value={f.type || ''} onChange={(e) => setF({ ...f, type: e.target.value || undefined })}>
                <option value="">Any</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="condo">Condo</option>
              </select>
            </Field>
            <Field label="City">
              <input className="input" value={f.city || ''} onChange={(e) => setF({ ...f, city: e.target.value || undefined })} placeholder="e.g. New York" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Min Rent">
                <input type="number" className="input" value={f.minRent ?? ''} onChange={(e) => setF({ ...f, minRent: e.target.value ? +e.target.value : undefined })} />
              </Field>
              <Field label="Max Rent">
                <input type="number" className="input" value={f.maxRent ?? ''} onChange={(e) => setF({ ...f, maxRent: e.target.value ? +e.target.value : undefined })} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Bedrooms">
                <select className="input" value={f.bedrooms ?? ''} onChange={(e) => setF({ ...f, bedrooms: e.target.value ? +e.target.value : undefined })}>
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
                </select>
              </Field>
              <Field label="Bathrooms">
                <select className="input" value={f.bathrooms ?? ''} onChange={(e) => setF({ ...f, bathrooms: e.target.value ? +e.target.value : undefined })}>
                  <option value="">Any</option>
                  {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
                </select>
              </Field>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={apply} className="btn-primary flex-1">Apply</button>
              <button onClick={reset} className="btn-outline">Reset</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
