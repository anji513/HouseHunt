import { useEffect, useState } from 'react';
import { Users, Trash2, ShieldCheck, Search } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/Loader';
import { EmptyState, ErrorState } from '../../components/EmptyState';
import Modal from '../../components/Modal';

export default function AdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [toDelete, setToDelete] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.users();
      const list = res?.users || res?.data || res || [];
      setUsers(Array.isArray(list) ? list : []);
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
      await adminService.deleteUser(toDelete);
      toast('User removed', 'success');
      setUsers((u) => u.filter((x) => x._id !== toDelete));
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setToDelete(null);
    }
  };

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(q.toLowerCase()) || u.email?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-primary-600" /> Users</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage all platform users.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users..." className="input !pl-9" />
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <Loader full />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Users} title="No users found" />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-left text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white text-sm font-bold">
                          {u.name?.[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{u.email}</td>
                    <td className="px-4 py-3"><span className="chip bg-slate-100 dark:bg-slate-800 capitalize">{u.role}</span></td>
                    <td className="px-4 py-3">
                      {u.role === 'owner' && u.isApproved ? (
                        <span className="chip bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300"><ShieldCheck className="w-3.5 h-3.5" /> Approved</span>
                      ) : u.role === 'owner' ? (
                        <span className="chip bg-warning-50 text-warning-700 dark:bg-warning-950/40 dark:text-warning-300">Pending</span>
                      ) : (
                        <span className="chip bg-slate-100 dark:bg-slate-800">Active</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setToDelete(u._id)} className="btn-danger !py-1.5 !px-2.5"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Remove user?" size="sm">
        <p className="text-sm text-slate-600 dark:text-slate-300">This will permanently remove the user. Continue?</p>
        <div className="flex gap-2 mt-5">
          <button onClick={confirmDelete} className="btn-danger flex-1">Remove</button>
          <button onClick={() => setToDelete(null)} className="btn-outline">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
