import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Eye } from 'lucide-react';
import { adminService } from '../../services/adminService';
import Loader from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';

const placeholder = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600';
const fmtMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function AdminProperties() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.properties();
      const list = res?.properties || res?.data || res || [];
      setItems(Array.isArray(list) ? list : []);
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
        <h1 className="text-2xl font-bold flex items-center gap-2"><Building2 className="w-6 h-6 text-primary-600" /> All Properties</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Every listing on the platform.</p>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <Loader full />
      ) : items.length === 0 ? (
        <EmptyState icon={Building2} title="No properties listed" />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-left text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Rent</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {items.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img src={p.images?.[0] || placeholder} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium line-clamp-1">{p.title}</p>
                          <p className="text-xs text-slate-500">{p.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{p.owner?.name || '—'}</td>
                    <td className="px-4 py-3 font-medium">{fmtMoney(p.rent)}</td>
                    <td className="px-4 py-3"><span className="chip bg-slate-100 dark:bg-slate-800 capitalize">{p.type}</span></td>
                    <td className="px-4 py-3">
                      <span className={`chip ${p.available === false ? 'bg-error-50 text-error-700 dark:bg-error-950/40 dark:text-error-300' : 'bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300'}`}>
                        {p.available === false ? 'Rented' : 'Available'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/properties/${p._id}`} className="btn-outline !py-1.5 !px-2.5"><Eye className="w-3.5 h-3.5" /></Link>
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
