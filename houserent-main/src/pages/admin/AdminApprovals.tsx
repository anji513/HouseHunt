import { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';

export default function AdminApprovals() {
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.users();
      const list = res?.users || res?.data || res || [];
      const arr = Array.isArray(list) ? list : [];
      setUsers(arr.filter((u: any) => u.role === 'owner' && !u.isApproved));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const approve = async (id: string) => {
    try {
      await adminService.approveOwner(id);
      toast('Owner approved', 'success');
      setUsers((u) => u.filter((x) => x._id !== id));
    } catch (e: any) {
      toast(e.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-primary-600" /> Owner Approvals</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Review pending owner applications.</p>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <Loader full />
      ) : users.length === 0 ? (
        <EmptyState icon={CheckCircle2} title="All caught up!" description="No pending owner approvals right now." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {users.map((u) => (
            <div key={u._id} className="card p-5 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 grid place-items-center text-white font-bold">
                  {u.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-slate-500">{u.email}</p>
                  {u.phone && <p className="text-xs text-slate-500">{u.phone}</p>}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => approve(u._id)} className="btn-primary flex-1 !py-2"><CheckCircle2 className="w-4 h-4" /> Approve</button>
                <button onClick={() => setUsers((p) => p.filter((x) => x._id !== u._id))} className="btn-outline !py-2 !px-3"><XCircle className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
