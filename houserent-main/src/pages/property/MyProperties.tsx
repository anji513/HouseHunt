import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, Edit3, Trash2, Eye } from 'lucide-react';
import { propertyService } from '../../services/propertyService';
import { useToast } from '../../context/ToastContext';
import { CardSkeleton } from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';
import Modal from '../../components/Modal';
import { Property } from '../../components/PropertyCard';

const placeholder = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600';
const fmtMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function MyProperties() {
  const { toast } = useToast();
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await propertyService.myProperties();
      const list = res?.properties || res?.data || res || [];
      setItems(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await propertyService.remove(toDelete);
      toast('Property deleted', 'success');
      setItems((p) => p.filter((x) => x._id !== toDelete));
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Building2 className="w-6 h-6 text-primary-600" /> My Properties</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your rental listings.</p>
        </div>
        <Link to="/owner/properties/new" className="btn-primary"><Plus className="w-4 h-4" /> Add new</Link>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={Building2} title="No properties yet" description="List your first property to start receiving bookings." action={<Link to="/owner/properties/new" className="btn-primary"><Plus className="w-4 h-4" /> Add property</Link>} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <div key={p._id} className="card overflow-hidden hover:shadow-card transition-all duration-300 animate-fade-in">
              <div className="relative h-40 overflow-hidden">
                <img src={p.images?.[0] || placeholder} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="chip bg-white/90 text-slate-800 capitalize">{p.type}</span>
                  <span className={`chip ${p.available === false ? 'bg-error-500/90 text-white' : 'bg-success-500/90 text-white'}`}>{p.available === false ? 'Rented' : 'Available'}</span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                  <p className="text-sm text-slate-500">{p.city}</p>
                </div>
                <p className="text-lg font-bold text-primary-600">{fmtMoney(p.rent)}<span className="text-xs font-normal text-slate-500">/mo</span></p>
                <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Link to={`/properties/${p._id}`} className="btn-outline flex-1 !py-2 text-xs"><Eye className="w-3.5 h-3.5" /> View</Link>
                  <Link to={`/owner/properties/${p._id}/edit`} className="btn-outline !py-2 !px-3"><Edit3 className="w-3.5 h-3.5" /></Link>
                  <button onClick={() => setToDelete(p._id)} className="btn-danger !py-2 !px-3"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Delete property?" size="sm">
        <p className="text-sm text-slate-600 dark:text-slate-300">This action cannot be undone. Are you sure you want to delete this property?</p>
        <div className="flex gap-2 mt-5">
          <button onClick={confirmDelete} className="btn-danger flex-1">Delete</button>
          <button onClick={() => setToDelete(null)} className="btn-outline">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
